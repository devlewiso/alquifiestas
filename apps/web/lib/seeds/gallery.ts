export interface GalleryEvent {
  id: string;
  provider_id: string;
  title: string;
  description: string;
  date: string;
  event_type: string;
  client_name: string;
  guest_count: number;
  images: string[];
  location: string;
}

const eventTitles = [
  "Boda Elegante en Jardín",
  "Quinceañera Temática Vintage",
  "Evento Corporativo Anual",
  "Bautizo Familiar Íntimo",
  "Fiesta de Graduación",
  "Celebración de Aniversario",
  "Baby Shower Primaveral",
  "Fiesta de Cumpleaños Sorpresa",
  "Cena de Gala Empresarial",
  "Evento al Aire Libre",
  "Recepción Nupcial",
  "Fiesta de Fin de Año",
];

const eventDescriptions = [
  "Un evento inolvidable con decoración sofisticada y atención impecable en cada detalle.",
  "Celebración llena de alegría, colores vibrantes y momentos especiales para toda la familia.",
  "Setup profesional que impresionó a todos los asistentes. El sonido y la iluminación fueron perfectos.",
  "Ambiente cálido y acogedor con toques personalizados que reflejaron el estilo de los anfitriones.",
  "Gran escala con producción de primer nivel. Coordinación impecable de principio a fin.",
  "Evento íntimo pero elegante. Cada elemento estuvo cuidadosamente seleccionado.",
];

const locations = [
  "Zona 10, Ciudad de Guatemala",
  "Antigua Guatemala",
  "Quetzaltenango",
  "Lake Atitlán, Sololá",
  "Cobán, Alta Verapaz",
  "Flores, Petén",
  "Monterrico, Santa Rosa",
  "Tikal, Petén",
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

export function generateGalleryForProvider(providerId: string): GalleryEvent[] {
  const baseSeed = hashString(providerId);
  const count = 2 + Math.floor(seededRandom(baseSeed) * 4); // 2–5 events
  const events: GalleryEvent[] = [];

  const imagePool = [
    "/images/cover.jpg",
    "/images/silla.jpg",
    "/images/inflable.jpg",
    "/images/dj.jpg",
    "/images/mesa.jpg",
    "/images/catering.jpg",
    "/images/decoracion.jpg",
    "/images/foto.jpg",
    "/images/vajilla.jpg",
    "/images/salon.jpg",
  ];

  for (let i = 0; i < count; i++) {
    const seed = baseSeed + i * 431;
    const titleIdx = Math.floor(seededRandom(seed) * eventTitles.length);
    const descIdx = Math.floor(seededRandom(seed + 1) * eventDescriptions.length);
    const locIdx = Math.floor(seededRandom(seed + 2) * locations.length);

    const monthsAgo = Math.floor(seededRandom(seed + 3) * 18);
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);

    // Pick 3–6 unique images
    const imgCount = 3 + Math.floor(seededRandom(seed + 4) * 4);
    const shuffled = [...imagePool].sort(() => seededRandom(seed + 5) - 0.5);
    const images = shuffled.slice(0, imgCount);

    events.push({
      id: `evt-${providerId}-${i}`,
      provider_id: providerId,
      title: eventTitles[titleIdx],
      description: eventDescriptions[descIdx],
      date: date.toISOString().split("T")[0],
      event_type: eventTitles[titleIdx].split(" ")[0],
      client_name: `Cliente ${String.fromCharCode(65 + i)}`,
      guest_count: 30 + Math.floor(seededRandom(seed + 6) * 250),
      images,
      location: locations[locIdx],
    });
  }

  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
