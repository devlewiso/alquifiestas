export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" | "disputed";

export interface BookingItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price_gtq: number;
  unit_price_usd: number;
  unit: string;
}

export interface Booking {
  id: string;
  client_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  provider_id: string;
  provider_name: string;
  event_date: string;
  event_type: string;
  event_location: string;
  guest_count: number;
  items: BookingItem[];
  total_gtq: number;
  total_usd: number;
  deposit_gtq: number; // 30%
  deposit_usd: number;
  status: BookingStatus;
  payment_status: "pending" | "paid" | "refunded" | "released";
  contract_signed: boolean;
  contract_signed_at: string | null;
  contract_terms_accepted: boolean;
  created_at: string;
  updated_at: string;
  notes: string;
  // Review gate
  review_eligible: boolean;
  review_left: boolean;
}

export const seedBookings: Booking[] = [
  // Completed bookings (eligible for review)
  {
    id: "book-1",
    client_id: "user-client-1",
    client_name: "María Elena García",
    client_email: "maria.garcia@gmail.com",
    client_phone: "+502 5555-8888",
    provider_id: "prov-1",
    provider_name: "Eventos Elegantes GT",
    event_date: "2026-05-15",
    event_type: "Boda",
    event_location: "Jardín de Fray Bartolomé, Antigua Guatemala",
    guest_count: 120,
    items: [
      { product_id: "prod-1", product_name: "Silla Tiffany Dorada", quantity: 120, unit_price_gtq: 55, unit_price_usd: 7, unit: "unidad" },
      { product_id: "prod-2", product_name: "Mesa Redonda 10 Personas", quantity: 15, unit_price_gtq: 350, unit_price_usd: 45, unit: "unidad" },
    ],
    total_gtq: 11850,
    total_usd: 1510,
    deposit_gtq: 3555,
    deposit_usd: 453,
    status: "completed",
    payment_status: "released",
    contract_signed: true,
    contract_signed_at: "2026-04-20T10:30:00Z",
    contract_terms_accepted: true,
    created_at: "2026-04-15T14:00:00Z",
    updated_at: "2026-05-16T09:00:00Z",
    notes: "Evento exitoso. Todo llegó puntual y en perfectas condiciones.",
    review_eligible: true,
    review_left: true,
  },
  {
    id: "book-2",
    client_id: "user-client-2",
    client_name: "Carlos Roberto Morales",
    client_email: "carlos.morales@hotmail.com",
    client_phone: "+502 5555-7777",
    provider_id: "prov-2",
    provider_name: "Brinca Brinca Inflables",
    event_date: "2026-04-10",
    event_type: "Cumpleaños",
    event_location: "Casa familiar, Mixco",
    guest_count: 30,
    items: [
      { product_id: "prod-4", product_name: "Castillo Inflable Mediano", quantity: 1, unit_price_gtq: 800, unit_price_usd: 102, unit: "4 horas" },
      { product_id: "prod-5", product_name: "Resbaladera Acuática Mega", quantity: 1, unit_price_gtq: 1200, unit_price_usd: 153, unit: "4 horas" },
    ],
    total_gtq: 2000,
    total_usd: 255,
    deposit_gtq: 600,
    deposit_usd: 77,
    status: "completed",
    payment_status: "released",
    contract_signed: true,
    contract_signed_at: "2026-03-25T11:00:00Z",
    contract_terms_accepted: true,
    created_at: "2026-03-20T16:00:00Z",
    updated_at: "2026-04-11T08:00:00Z",
    notes: "Los niños se divirtieron mucho. Inflables limpios y seguros.",
    review_eligible: true,
    review_left: true,
  },
  {
    id: "book-3",
    client_id: "user-client-3",
    client_name: "Ana Lucía Fernández",
    client_email: "ana.fernandez@yahoo.com",
    client_phone: "+502 5555-6666",
    provider_id: "prov-3",
    provider_name: "DJ Carlos M. - Sonido Profesional",
    event_date: "2026-05-20",
    event_type: "Quinceañera",
    event_location: "Salón El Castillo, Zona 10",
    guest_count: 200,
    items: [
      { product_id: "prod-7", product_name: "Paquete DJ Premium + Luces", quantity: 1, unit_price_gtq: 4500, unit_price_usd: 574, unit: "evento" },
    ],
    total_gtq: 4500,
    total_usd: 574,
    deposit_gtq: 1350,
    deposit_usd: 172,
    status: "completed",
    payment_status: "released",
    contract_signed: true,
    contract_signed_at: "2026-05-01T09:00:00Z",
    contract_terms_accepted: true,
    created_at: "2026-04-25T10:00:00Z",
    updated_at: "2026-05-21T07:00:00Z",
    notes: "La quinceañera fue un éxito. La iluminación fue espectacular.",
    review_eligible: true,
    review_left: false,
  },
  // Confirmed upcoming booking
  {
    id: "book-4",
    client_id: "user-client-4",
    client_name: "Luis Antonio Hernández",
    client_email: "luis.hernandez@gmail.com",
    client_phone: "+502 5555-5555",
    provider_id: "prov-5",
    provider_name: "Banquetes Doña María",
    event_date: "2026-08-15",
    event_type: "Boda",
    event_location: "Hacienda de los Sueños, Antigua Guatemala",
    guest_count: 150,
    items: [
      { product_id: "prod-11", product_name: "Buffet Guatemalteco Completo", quantity: 1, unit_price_gtq: 5500, unit_price_usd: 701, unit: "50 personas" },
      { product_id: "prod-12", product_name: "Mesa de Dulces Tradicional", quantity: 1, unit_price_gtq: 1200, unit_price_usd: 153, unit: "evento" },
    ],
    total_gtq: 13200,
    total_usd: 1683,
    deposit_gtq: 3960,
    deposit_usd: 505,
    status: "confirmed",
    payment_status: "paid",
    contract_signed: true,
    contract_signed_at: "2026-06-01T15:00:00Z",
    contract_terms_accepted: true,
    created_at: "2026-05-20T12:00:00Z",
    updated_at: "2026-06-01T15:00:00Z",
    notes: "Menú personalizado. Cliente pidió kaq ik en vez de pepián.",
    review_eligible: false,
    review_left: false,
  },
  // Cancelled booking (deposit refunded minus fee)
  {
    id: "book-5",
    client_id: "user-client-5",
    client_name: "Sofia Isabel Reyes",
    client_email: "sofia.reyes@outlook.com",
    client_phone: "+502 5555-4444",
    provider_id: "prov-7",
    provider_name: "FotoMaya Estudio",
    event_date: "2026-06-10",
    event_type: "Boda",
    event_location: "Catedral Metropolitana, Zona 1",
    guest_count: 100,
    items: [
      { product_id: "prod-16", product_name: "Paquete Fotografía Boda", quantity: 1, unit_price_gtq: 3500, unit_price_usd: 446, unit: "evento" },
    ],
    total_gtq: 3500,
    total_usd: 446,
    deposit_gtq: 1050,
    deposit_usd: 134,
    status: "cancelled",
    payment_status: "refunded",
    contract_signed: true,
    contract_signed_at: "2026-05-15T10:00:00Z",
    contract_terms_accepted: true,
    created_at: "2026-05-10T08:00:00Z",
    updated_at: "2026-05-20T14:00:00Z",
    notes: "Cancelación por enfermedad familiar. Depósito reembolsado al 100%.",
    review_eligible: false,
    review_left: false,
  },
  // Disputed booking
  {
    id: "book-6",
    client_id: "user-client-6",
    client_name: "Pedro José Castillo",
    client_email: "pedro.castillo@gmail.com",
    client_phone: "+502 5555-3333",
    provider_id: "prov-9",
    provider_name: "Mega Sonido Huehue",
    event_date: "2026-05-25",
    event_type: "Fiesta Privada",
    event_location: "Finca Las Palmas, Huehuetenango",
    guest_count: 80,
    items: [
      { product_id: "prod-8", product_name: "Karaoke + Pantalla Gigante", quantity: 1, unit_price_gtq: 1500, unit_price_usd: 191, unit: "4 horas" },
    ],
    total_gtq: 1500,
    total_usd: 191,
    deposit_gtq: 450,
    deposit_usd: 57,
    status: "disputed",
    payment_status: "pending",
    contract_signed: true,
    contract_signed_at: "2026-05-10T16:00:00Z",
    contract_terms_accepted: true,
    created_at: "2026-05-05T09:00:00Z",
    updated_at: "2026-05-26T10:00:00Z",
    notes: "Disputa: equipo llegó 2 horas tarde. Cliente solicita 50% de descuento. En mediación.",
    review_eligible: false,
    review_left: false,
  },
];

export function getBookingsForProvider(providerId: string): Booking[] {
  return seedBookings.filter((b) => b.provider_id === providerId);
}

export function getBookingsForClient(clientId: string): Booking[] {
  return seedBookings.filter((b) => b.client_id === clientId);
}

export function canLeaveReview(providerId: string, clientId?: string): boolean {
  const bookings = getBookingsForProvider(providerId);
  return bookings.some(
    (b) =>
      b.status === "completed" &&
      b.review_eligible &&
      !b.review_left &&
      (!clientId || b.client_id === clientId)
  );
}

export function getCompletedBookingCount(providerId: string): number {
  return seedBookings.filter(
    (b) => b.provider_id === providerId && b.status === "completed"
  ).length;
}
