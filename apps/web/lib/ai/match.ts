import { seedProviders, type SeedProvider } from "@/lib/seeds/providers";
import { seedProducts, type SeedProduct } from "@/lib/seeds/products";
import { categories } from "@/lib/seeds/categories";


/**
 * Alquifiestas AI Matching Engine
 * Sistema de recomendación y matching para conectar clientes con proveedores.
 *
 * Scoring multi-factorial:
 * - Text relevance (query vs name, description, services)
 * - Event type affinity (boda vs quinceañera vs corporativo)
 * - Budget compatibility (user budget vs provider price range)
 * - Location proximity (Guatemala departments)
 * - Social proof (rating, review count, verified status)
 * - Availability score (simulated inventory health)
 */

// ────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────

export interface UserIntent {
  query?: string;
  eventType?: string;
  budgetGtq?: number;
  location?: string;
  date?: string;
  guestCount?: number;
  preferredCategories?: string[];
}

export interface MatchResult {
  provider: SeedProvider;
  score: number;
  factors: MatchFactors;
  recommendedServices: SeedProduct[];
  matchReasons: string[];
}

export interface MatchFactors {
  textScore: number;       // 0–1
  eventTypeScore: number;  // 0–1
  budgetScore: number;     // 0–1
  locationScore: number;   // 0–1
  socialScore: number;     // 0–1
  availabilityScore: number; // 0–1
}

// ────────────────────────────────────────────────
// Keywords & Taxonomy
// ────────────────────────────────────────────────

const eventTypeKeywords: Record<string, string[]> = {
  boda: ["boda", "matrimonio", "nupcial", "recién casados", "ceremonia", "recepción"],
  quinceañera: ["quinceañera", "quince", "15 años", "xv", "cumpleaños 15"],
  cumpleaños: ["cumpleaños", "fiesta", "celebración", "aniversario personal"],
  corporativo: ["empresarial", "corporativo", "conferencia", "seminario", "team building", "evento de empresa"],
  bautizo: ["bautizo", "comunión", "confirmación", "evento religioso"],
  graduación: ["graduación", "promoción", "colegio", "universidad", "entrega de diplomas"],
  babyshower: ["baby shower", "embarazo", "bienvenida bebé"],
};

const categoryKeywords: Record<string, string[]> = {
  "sillas-y-mesas": ["silla", "mesa", "mobiliario", "comedor", "banquete", "tiffany", "napoleón"],
  inflables: ["inflable", "castillo", "resbaladera", "brincolín", "juego", "niños"],
  "sonido-e-iluminacion": ["sonido", "dj", "música", "bafle", "micrófono", "luz", "iluminación", "karaoke"],
  "carpas-y-toldos": ["carpa", "toldo", "pabellón", "cubierta", "exterior", "jardín"],
  catering: ["comida", "catering", "banquete", "buffet", "dulce", "bebida", "chef", "cocina"],
  decoracion: ["decoración", "globo", "arco", "flor", "centro de mesa", "backdrop", "pista de baile"],
  "fotografia-y-video": ["foto", "vídeo", "fotógrafo", "cámara", "drone", "cabina fotográfica"],
  utensilios: ["vajilla", "cristal", "cubiertos", "porcelana", "servicio de mesa", "ollas"],
  "salones-y-lugares": ["salón", "lugar", "jardín", "hacienda", "terraza", "espacio", "venue"],
};

const locationHierarchy: Record<string, string[]> = {
  Guatemala: ["Ciudad de Guatemala", "Guatemala", "Mixco", "Villa Nueva", "Fraijanes", "San Miguel Petapa", "Santa Catarina Pinula", "Zona 1", "Zona 10", "Zona 14", "Zona 15"],
  Sacatepéquez: ["Antigua Guatemala", "Antigua", "Jocotenango", "San Juan del Obispo"],
  Quetzaltenango: ["Quetzaltenango", "Xela", "Olintepeque", "San Juan Ostuncalco"],
  Quiché: ["Santa Cruz del Quiché", "Quiché", "Chichicastenango", "Nebaj"],
  Huehuetenango: ["Huehuetenango", "Jacaltenango", "San Juan Ixcoy"],
  Petén: ["Flores", "Petén", "San José", "Santa Elena"],
  Sololá: ["Sololá", "Panajachel", "San Pedro La Laguna", "Santiago Atitlán", "Lake Atitlán", "Atitlán"],
  AltaVerapaz: ["Cobán", "Alta Verapaz", "Semuc Champey", "Lanquín"],
};

// ────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .split(/\s+/)
    .filter((t) => t.length > 2);
}

function textSimilarity(a: string, b: string): number {
  const ta = tokenize(a);
  const tb = tokenize(b);
  if (ta.length === 0 || tb.length === 0) return 0;
  const common = ta.filter((w) => tb.includes(w));
  return common.length / Math.max(ta.length, tb.length);
}

function detectEventType(query: string): string | null {
  const q = query.toLowerCase();
  for (const [type, keywords] of Object.entries(eventTypeKeywords)) {
    if (keywords.some((k) => q.includes(k))) return type;
  }
  return null;
}

function detectCategories(query: string): string[] {
  const q = query.toLowerCase();
  const found: string[] = [];
  for (const [slug, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((k) => q.includes(k))) found.push(slug);
  }
  return found;
}

function locationScore(provider: SeedProvider, userLocation?: string): number {
  if (!userLocation) return 0.5; // neutral
  const ul = userLocation.toLowerCase();

  // Exact location match
  if (provider.location.toLowerCase().includes(ul) || ul.includes(provider.location.toLowerCase())) {
    return 1.0;
  }

  // Department match
  if (provider.department.toLowerCase().includes(ul) || ul.includes(provider.department.toLowerCase())) {
    return 0.85;
  }

  // Nearby departments
  for (const [dept, towns] of Object.entries(locationHierarchy)) {
    if (dept.toLowerCase() === provider.department.toLowerCase()) {
      if (towns.some((t) => ul.includes(t.toLowerCase()))) return 0.85;
    }
  }

  return 0.3;
}


function socialScore(provider: SeedProvider): number {
  // Rating component (0–5 → 0–0.6)
  const ratingPart = (provider.rating / 5) * 0.6;

  // Volume component (more reviews = more trustworthy)
  const volumePart = Math.min(provider.review_count / 50, 1) * 0.25;

  // Verified bonus
  const verifiedPart = provider.is_verified ? 0.15 : 0;

  return Math.min(ratingPart + volumePart + verifiedPart, 1);
}

function eventTypeAffinity(provider: SeedProvider, eventType?: string): number {
  if (!eventType) return 0.5;

  // Map event types to likely categories
  const eventCategoryMap: Record<string, string[]> = {
    boda: ["sillas-y-mesas", "catering", "decoracion", "fotografia-y-video", "sonido-e-iluminacion", "salones-y-lugares"],
    quinceañera: ["sillas-y-mesas", "catering", "decoracion", "fotografia-y-video", "sonido-e-iluminacion", "salones-y-lugares"],
    cumpleaños: ["inflables", "catering", "decoracion", "sonido-e-iluminacion"],
    corporativo: ["catering", "sonido-e-iluminacion", "fotografia-y-video", "salones-y-lugares", "sillas-y-mesas"],
    bautizo: ["catering", "decoracion", "fotografia-y-video", "sillas-y-mesas"],
    graduación: ["sonido-e-iluminacion", "catering", "fotografia-y-video", "decoracion", "salones-y-lugares"],
    babyshower: ["catering", "decoracion", "fotografia-y-video"],
  };

  const relevantCats = eventCategoryMap[eventType] || [];
  const overlap = provider.categories.filter((c) => relevantCats.includes(c));

  if (overlap.length >= 3) return 1.0;
  if (overlap.length === 2) return 0.85;
  if (overlap.length === 1) return 0.65;
  return 0.3;
}

function availabilityScore(provider: SeedProvider): number {
  const services = seedProducts.filter((p) => p.provider_id === provider.id);
  const activeCount = services.filter((s) => s.is_active).length;
  const totalCount = services.length;
  if (totalCount === 0) return 0.5;
  return 0.3 + (activeCount / totalCount) * 0.7;
}

// ────────────────────────────────────────────────
// Main Matching Engine
// ────────────────────────────────────────────────

export function findMatches(intent: UserIntent, limit = 10): MatchResult[] {
  const detectedEventType = intent.eventType || (intent.query ? detectEventType(intent.query) : null);
  const detectedCategories = intent.preferredCategories || (intent.query ? detectCategories(intent.query) : []);

  const results = seedProviders.map((provider): MatchResult => {
    const services = seedProducts.filter((p) => p.provider_id === provider.id);
    // reviews used in socialScore

    // 1. Text relevance
    let textScore = 0.5;
    if (intent.query) {
      const q = intent.query;
      const nameSim = textSimilarity(q, provider.business_name) * 0.3;
      const descSim = textSimilarity(q, provider.description) * 0.2;
      const locSim = textSimilarity(q, provider.location) * 0.15;

      // Service name/description match
      let serviceSim = 0;
      for (const s of services) {
        serviceSim = Math.max(serviceSim, textSimilarity(q, s.name) * 0.2);
        serviceSim = Math.max(serviceSim, textSimilarity(q, s.description) * 0.15);
      }

      textScore = Math.min(nameSim + descSim + locSim + serviceSim, 1);
    }

    // 2. Event type affinity
    const eventTypeScore = eventTypeAffinity(provider, detectedEventType || undefined);

    // 3. Budget compatibility
    const budgetScore = budgetScoreFn(provider, intent.budgetGtq);

    // 4. Location proximity
    const locScore = locationScore(provider, intent.location);

    // 5. Social proof
    const socScore = socialScore(provider);

    // 6. Availability
    const availScore = availabilityScore(provider);

    // Weighted total
    const weights = {
      text: 0.25,
      eventType: 0.15,
      budget: 0.15,
      location: 0.20,
      social: 0.15,
      availability: 0.10,
    };

    const totalScore =
      textScore * weights.text +
      eventTypeScore * weights.eventType +
      budgetScore * weights.budget +
      locScore * weights.location +
      socScore * weights.social +
      availScore * weights.availability;

    // Generate match reasons
    const reasons: string[] = [];
    if (textScore > 0.7) reasons.push("Coincide con tu búsqueda");
    if (eventTypeScore > 0.8) reasons.push(`Especialista en ${detectedEventType || "eventos"}`);
    if (locScore >= 0.85) reasons.push("Cerca de tu ubicación");
    if (socScore > 0.8) reasons.push("Muy bien calificado");
    if (provider.is_verified && socScore > 0.7) reasons.push("Proveedor verificado");
    if (budgetScore >= 0.75 && intent.budgetGtq) reasons.push("Dentro de tu presupuesto");
    if (services.length >= 3) reasons.push("Amplia variedad de servicios");

    // Pick top 3 reasons
    const topReasons = reasons.slice(0, 3);

    // Recommended services for this provider
    const recommendedServices = services
      .filter((s) => s.is_active)
      .sort((a, b) => {
        // If event type detected, prefer services matching that context
        if (detectedCategories.length > 0) {
          const aMatch = detectedCategories.includes(a.category_slug) ? 1 : 0;
          const bMatch = detectedCategories.includes(b.category_slug) ? 1 : 0;
          if (aMatch !== bMatch) return bMatch - aMatch;
        }
        // Then by rating
        return b.rating - a.rating;
      })
      .slice(0, 3);

    return {
      provider,
      score: totalScore,
      factors: {
        textScore,
        eventTypeScore,
        budgetScore,
        locationScore: locScore,
        socialScore: socScore,
        availabilityScore: availScore,
      },
      recommendedServices,
      matchReasons: topReasons,
    };
  });

  // Sort by score desc, filter very low scores
  return results
    .filter((r) => r.score > 0.25)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function budgetScoreFn(provider: SeedProvider, budget?: number): number {
  if (!budget || budget <= 0) return 0.5;
  const services = seedProducts.filter((p) => p.provider_id === provider.id);
  if (services.length === 0) return 0.5;
  const prices = services.map((s) => s.price_gtq);
  const minPrice = Math.min(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  if (budget >= avgPrice) return 1.0;
  if (budget >= minPrice) return 0.75;
  if (budget >= minPrice * 0.7) return 0.5;
  return 0.2;
}

// ────────────────────────────────────────────────
// Smart Search Suggestions
// ────────────────────────────────────────────────

export interface SearchSuggestion {
  text: string;
  type: "provider" | "service" | "category" | "location" | "event";
  icon: string;
  redirectTo: string;
}

export function getSearchSuggestions(query: string): SearchSuggestion[] {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase();
  const suggestions: SearchSuggestion[] = [];

  // Provider name matches
  seedProviders
    .filter((p) => p.business_name.toLowerCase().includes(q))
    .slice(0, 3)
    .forEach((p) => {
      suggestions.push({
        text: p.business_name,
        type: "provider",
        icon: "Store",
        redirectTo: `/providers/${p.id}`,
      });
    });

  // Category matches
  categories
    .filter((c) => c.name.toLowerCase().includes(q) || c.slug.includes(q))
    .slice(0, 2)
    .forEach((c) => {
      suggestions.push({
        text: c.name,
        type: "category",
        icon: "Tag",
        redirectTo: `/categories/${c.slug}`,
      });
    });

  // Service name matches
  seedProducts
    .filter((p) => p.name.toLowerCase().includes(q))
    .slice(0, 2)
    .forEach((p) => {
      suggestions.push({
        text: `${p.name} — ${p.provider_name}`,
        type: "service",
        icon: "Package",
        redirectTo: `/product/${p.id}`,
      });
    });

  // Location matches
  const allLocations = Object.values(locationHierarchy).flat();
  allLocations
    .filter((loc) => loc.toLowerCase().includes(q))
    .slice(0, 2)
    .forEach((loc) => {
      suggestions.push({
        text: `Proveedores en ${loc}`,
        type: "location",
        icon: "MapPin",
        redirectTo: `/search?location=${encodeURIComponent(loc)}`,
      });
    });

  // Event type suggestions
  for (const [event, keywords] of Object.entries(eventTypeKeywords)) {
    if (keywords.some((k) => q.includes(k))) {
      suggestions.push({
        text: `Todo para ${event}`,
        type: "event",
        icon: "Calendar",
        redirectTo: `/search?event=${encodeURIComponent(event)}`,
      });
      break;
    }
  }

  return suggestions.slice(0, 8);
}

// ────────────────────────────────────────────────
// Personalized "For You" Recommendations
// ────────────────────────────────────────────────

export interface UserProfile {
  eventHistory: string[]; // event types they've booked
  preferredLocations: string[];
  budgetRange: [number, number];
  favoriteProviders: string[]; // provider IDs
  lastSearchQueries: string[];
}

export function getPersonalizedRecommendations(
  userProfile: UserProfile,
  limit = 6
): MatchResult[] {
  const intent: UserIntent = {
    eventType: userProfile.eventHistory[0],
    location: userProfile.preferredLocations[0],
    budgetGtq: userProfile.budgetRange[1],
  };

  const results = findMatches(intent, limit * 2);

  // Boost favorite providers
  return results
    .map((r) => {
      if (userProfile.favoriteProviders.includes(r.provider.id)) {
        return { ...r, score: r.score * 1.2 };
      }
      return r;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
