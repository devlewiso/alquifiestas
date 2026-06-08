export interface Review {
  id: string;
  provider_id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  event_type: string;
  comment: string;
  photos: string[];
  helpful_count: number;
  verified: boolean;
}

const reviewTexts: Record<string, string[]> = {
  positive: [
    "Excelente servicio, todo llegó a tiempo y en perfectas condiciones. Superaron nuestras expectativas.",
    "Muy profesionales. La calidad del mobiliario es premium. Definitivamente los volveremos a contratar.",
    "La atención al cliente es de otro nivel. Respondieron todas nuestras dudas y adaptaron el paquete a nuestras necesidades.",
    "Increíble experiencia. El setup quedó hermoso, todos los invitados quedaron encantados.",
    "Relación calidad-precio inmejorable. Todo muy limpio, organizado y puntual.",
    "Los recomiendo al 100%. Son serios, responsables y el servicio es impecable.",
    "Todo salió perfecto. Desde la reserva hasta el día del evento, sin contratiempos.",
    "El equipo es muy amable y profesional. Hicieron de nuestra boda un día inolvidable.",
  ],
  mixed: [
    "Buen servicio en general, aunque hubo un pequeño retraso en la entrega. El mobiliario estaba impecable.",
    "La calidad es buena, pero el precio es un poco elevado comparado con otros. Vale la pena por la confianza.",
    "Todo bien, pero les sugiero mejorar la comunicación vía WhatsApp. A veces tardan en responder.",
    "El evento salió bien, pero faltaron algunas piezas que habíamos acordado. De todas formas lo solucionaron rápido.",
  ],
};

const eventTypes = [
  "Boda",
  "Quinceañera",
  "Cumpleaños",
  "Evento Corporativo",
  "Bautizo",
  "Graduación",
  "Fiesta Privada",
  "Baby Shower",
];

const authors = [
  "María Elena García",
  "Carlos Roberto Morales",
  "Ana Lucía Fernández",
  "Luis Antonio Hernández",
  "Sofia Isabel Reyes",
  "Pedro José Castillo",
  "Daniela Michelle Lopez",
  "Andrés Esteban Ruiz",
  "Carmen Beatriz Santos",
  "Jorge Alberto Mejía",
];

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateReviewsForProvider(providerId: string): Review[] {
  const baseSeed = hashString(providerId);
  const count = 3 + Math.floor(seededRandom(baseSeed) * 8); // 3–10 reviews
  const reviews: Review[] = [];

  for (let i = 0; i < count; i++) {
    const seed = baseSeed + i * 997;
    const isPositive = seededRandom(seed) > 0.15;
    const texts = isPositive ? reviewTexts.positive : reviewTexts.mixed;
    const textIdx = Math.floor(seededRandom(seed + 1) * texts.length);
    const rating = isPositive
      ? 4 + Math.floor(seededRandom(seed + 2) * 2) // 4–5
      : 3 + Math.floor(seededRandom(seed + 2) * 2); // 3–4

    const authorIdx = Math.floor(seededRandom(seed + 3) * authors.length);
    const eventIdx = Math.floor(seededRandom(seed + 4) * eventTypes.length);
    const avatarIdx = 1 + Math.floor(seededRandom(seed + 5) * 10);

    // Random date within last 12 months
    const monthsAgo = Math.floor(seededRandom(seed + 6) * 12);
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);

    // Some reviews have photos (30% chance)
    const hasPhotos = seededRandom(seed + 7) > 0.7;
    const photoCount = hasPhotos ? 1 + Math.floor(seededRandom(seed + 8) * 3) : 0;
    const photos: string[] = [];
    for (let p = 0; p < photoCount; p++) {
      photos.push(`/images/cover.jpg`); // fallback, will randomize later
    }

    reviews.push({
      id: `rev-${providerId}-${i}`,
      provider_id: providerId,
      author: authors[authorIdx],
      avatar: `/images/avatar${avatarIdx}.jpg`,
      rating,
      date: date.toISOString().split("T")[0],
      event_type: eventTypes[eventIdx],
      comment: texts[textIdx],
      photos: photos.length ? photos : [],
      helpful_count: Math.floor(seededRandom(seed + 9) * 25),
      verified: seededRandom(seed + 10) > 0.2,
    });
  }

  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

import { seedProviders } from "./providers";

export function getAllReviews(): Review[] {
  return seedProviders.flatMap((p) => generateReviewsForProvider(p.id));
}
