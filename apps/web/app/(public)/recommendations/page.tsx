"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Star,
  MapPin,
  TrendingUp,
  Award,
  ChevronRight,
  Package,
  Zap,
  Heart,
  Filter,
  X,
  Target,
  BadgeCheck,
} from "lucide-react";
import { findMatches, type UserIntent } from "@/lib/ai/match";
import { seedProviders } from "@/lib/seeds/providers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const EVENT_TYPES = [
  { id: "boda", label: "Boda", icon: "💍" },
  { id: "quinceañera", label: "Quinceañera", icon: "👗" },
  { id: "cumpleaños", label: "Cumpleaños", icon: "🎂" },
  { id: "corporativo", label: "Evento Corporativo", icon: "💼" },
  { id: "bautizo", label: "Bautizo", icon: "🕊️" },
  { id: "graduación", label: "Graduación", icon: "🎓" },
  { id: "babyshower", label: "Baby Shower", icon: "🍼" },
];

const DEPARTMENTS = [
  "Guatemala",
  "Sacatepéquez",
  "Quetzaltenango",
  "Quiché",
  "Huehuetenango",
  "Petén",
  "Sololá",
  "Alta Verapaz",
];

const BUDGETS = [
  { label: "Hasta Q2,000", value: 2000 },
  { label: "Hasta Q5,000", value: 5000 },
  { label: "Hasta Q10,000", value: 10000 },
  { label: "Hasta Q20,000", value: 20000 },
  { label: "Más de Q20,000", value: 50000 },
];

export default function RecommendationsPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [likedProviders, setLikedProviders] = useState<Set<string>>(new Set());

  // Build intent from selections
  const intent: UserIntent = useMemo(() => {
    return {
      eventType: selectedEvent || undefined,
      location: selectedDept || undefined,
      budgetGtq: selectedBudget || undefined,
      preferredCategories: selectedEvent
        ? getCategoriesForEvent(selectedEvent)
        : undefined,
    };
  }, [selectedEvent, selectedDept, selectedBudget]);

  const matches = useMemo(() => findMatches(intent, 12), [intent]);

  // Also get "trending" — top rated providers regardless of filters
  const trending = useMemo(() => {
    return seedProviders
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, []);

  const toggleLike = (id: string) => {
    setLikedProviders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Powered by Alquifiestas AI
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Encontrá el proveedor ideal para tu evento
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Nuestro algoritmo analiza tu tipo de evento, ubicación y presupuesto para
          recomendarte los proveedores que mejor hacen match.
        </p>
      </div>

      {/* Smart filters */}
      <div className="bg-card border border-border rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            ¿Qué tipo de evento organizás?
          </h2>
          {(selectedEvent || selectedDept || selectedBudget) && (
            <button
              onClick={() => {
                setSelectedEvent(null);
                setSelectedDept(null);
                setSelectedBudget(null);
              }}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Event type pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {EVENT_TYPES.map((evt) => (
            <button
              key={evt.id}
              onClick={() =>
                setSelectedEvent(selectedEvent === evt.id ? null : evt.id)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedEvent === evt.id
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "border-border hover:border-primary/50 bg-background"
              }`}
            >
              <span className="mr-1">{evt.icon}</span>
              {evt.label}
            </button>
          ))}
        </div>

        {/* More filters toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Ocultar filtros avanzados" : "Más filtros"}
        </button>

        {showFilters && (
          <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm font-medium mb-2">Departamento</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDept(null)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    !selectedDept
                      ? "bg-primary text-white border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  Cualquiera
                </button>
                {DEPARTMENTS.map((dept) => (
                  <button
                    key={dept}
                    onClick={() =>
                      setSelectedDept(selectedDept === dept ? null : dept)
                    }
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      selectedDept === dept
                        ? "bg-primary text-white border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Presupuesto estimado</p>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b.value}
                    onClick={() =>
                      setSelectedBudget(
                        selectedBudget === b.value ? null : b.value
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                      selectedBudget === b.value
                        ? "bg-primary text-white border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Match results */}
      {matches.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Mejores matches para vos
              {selectedEvent && (
                <Badge variant="secondary" className="text-xs">
                  {EVENT_TYPES.find((e) => e.id === selectedEvent)?.label}
                </Badge>
              )}
            </h2>
            <span className="text-sm text-muted-foreground">
              {matches.length} resultados
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {matches.map((match, index) => (
              <div
                key={match.provider.id}
                className={`border rounded-xl bg-card overflow-hidden hover:shadow-md transition-shadow ${
                  index === 0
                    ? "border-primary/30 ring-1 ring-primary/20"
                    : "border-border"
                }`}
              >
                {/* Top match badge */}
                {index === 0 && (
                  <div className="bg-primary text-white text-xs font-medium px-4 py-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Match perfecto — {Math.round(match.score * 100)}% compatibilidad
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                      <Image
                        src={match.provider.image_url}
                        alt={match.provider.business_name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg truncate">
                          {match.provider.business_name}
                        </h3>
                        {match.provider.is_verified && (
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px] px-1.5 py-0">
                            <Award className="w-3 h-3 mr-0.5" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {match.provider.location}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm">
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">
                            {match.provider.rating}
                          </span>
                          <span className="text-muted-foreground">
                            ({match.provider.review_count} reseñas)
                          </span>
                        </div>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {match.provider.years_experience}a
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLike(match.provider.id)}
                      className={`p-2 rounded-full transition-colors ${
                        likedProviders.has(match.provider.id)
                          ? "bg-red-50 text-red-500"
                          : "text-muted-foreground hover:text-red-400"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedProviders.has(match.provider.id)
                            ? "fill-current"
                            : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Match reasons */}
                  {match.matchReasons.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {match.matchReasons.map((reason, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-xs bg-primary/5 text-primary px-2 py-1 rounded-full"
                        >
                          <BadgeCheck className="w-3 h-3" />
                          {reason}
                        </span>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {match.provider.description}
                  </p>

                  {/* Recommended services */}
                  {match.recommendedServices.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Package className="w-3.5 h-3.5" />
                        Servicios recomendados para tu evento
                      </p>
                      <div className="space-y-2">
                        {match.recommendedServices.map((service) => (
                          <Link
                            key={service.id}
                            href={`/product/${service.id}`}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                              <Image
                                src={service.images[0]}
                                alt={service.name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {service.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {formatCurrency(service.price_gtq, "GTQ")} /{" "}
                                {service.unit}
                              </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-1.5">
                      {match.provider.categories.slice(0, 3).map((cat) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="text-[10px] px-1.5 py-0"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                    <Link href={`/providers/${match.provider.id}`}>
                      <Button size="sm" className="gap-1">
                        Ver perfil
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No matches */}
      {matches.length === 0 && (selectedEvent || selectedDept || selectedBudget) && (
        <div className="text-center py-16">
          <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No encontramos matches con esos filtros. Probá con opciones más amplias.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSelectedEvent(null);
              setSelectedDept(null);
              setSelectedBudget(null);
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* Trending section — always shown */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Proveedores destacados
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((provider) => (
            <Link
              key={provider.id}
              href={`/providers/${provider.id}`}
              className="group p-5 rounded-xl border border-border bg-card hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
                  <Image
                    src={provider.image_url}
                    alt={provider.business_name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                    {provider.business_name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-yellow-600">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-muted-foreground">
                      ({provider.review_count})
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {provider.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {provider.department}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function getCategoriesForEvent(eventType: string): string[] {
  const map: Record<string, string[]> = {
    boda: [
      "sillas-y-mesas",
      "catering",
      "decoracion",
      "fotografia-y-video",
      "sonido-e-iluminacion",
      "salones-y-lugares",
    ],
    quinceañera: [
      "sillas-y-mesas",
      "catering",
      "decoracion",
      "fotografia-y-video",
      "sonido-e-iluminacion",
      "salones-y-lugares",
    ],
    cumpleaños: [
      "inflables",
      "catering",
      "decoracion",
      "sonido-e-iluminacion",
    ],
    corporativo: [
      "catering",
      "sonido-e-iluminacion",
      "fotografia-y-video",
      "salones-y-lugares",
      "sillas-y-mesas",
    ],
    bautizo: [
      "catering",
      "decoracion",
      "fotografia-y-video",
      "sillas-y-mesas",
    ],
    graduación: [
      "sonido-e-iluminacion",
      "catering",
      "fotografia-y-video",
      "decoracion",
      "salones-y-lugares",
    ],
    babyshower: ["catering", "decoracion", "fotografia-y-video"],
  };
  return map[eventType] || [];
}
