export interface InventoryItem {
  id: string;
  provider_id: string;
  name: string;
  category: string;
  quantity: number;
  condition: "Nuevo" | "Excelente" | "Bueno" | "Regular";
  price_gtq: number;
  price_usd: number;
  unit: string;
  image: string;
  description: string;
  available: boolean;
}

const inventoryTemplates: Omit<InventoryItem, "id" | "provider_id">[] = [
  {
    name: "Sillas Tiffany Blancas",
    category: "Mobiliario",
    quantity: 200,
    condition: "Excelente",
    price_gtq: 55,
    price_usd: 7,
    unit: "unidad",
    image: "/images/silla.jpg",
    description: "Sillas estilo Tiffany con cojín acolchonado. Disponibles en blanco, dorado y plateado.",
    available: true,
  },
  {
    name: "Mesas Redondas 10 pax",
    category: "Mobiliario",
    quantity: 25,
    condition: "Excelente",
    price_gtq: 350,
    price_usd: 45,
    unit: "unidad",
    image: "/images/mesa.jpg",
    description: "Mesas redondas de 1.80m de diámetro con mantel incluido. Capacidad 10 personas.",
    available: true,
  },
  {
    name: "Castillo Inflable 4x4m",
    category: "Inflables",
    quantity: 3,
    condition: "Bueno",
    price_gtq: 800,
    price_usd: 102,
    unit: "4 horas",
    image: "/images/inflable.jpg",
    description: "Castillo inflable mediano con tobogán integrado. Ideal para fiestas infantiles.",
    available: true,
  },
  {
    name: "Equipo de Sonido JBL",
    category: "Audio",
    quantity: 2,
    condition: "Nuevo",
    price_gtq: 2500,
    price_usd: 319,
    unit: "evento",
    image: "/images/dj.jpg",
    description: "2 bafles JBL EON615 + mezclador + 2 micrófonos inalámbricos. Potencia para 200 personas.",
    available: true,
  },
  {
    name: "Carpa Blanca 5x5m",
    category: "Carpas",
    quantity: 8,
    condition: "Excelente",
    price_gtq: 1800,
    price_usd: 230,
    unit: "unidad",
    image: "/images/mesa.jpg",
    description: "Carpa elegante con piso de madera, iluminación interior y cortinas laterales.",
    available: true,
  },
  {
    name: "Vajilla de Porcelana",
    category: "Utensilios",
    quantity: 500,
    condition: "Excelente",
    price_gtq: 18,
    price_usd: 2.30,
    unit: "servicio",
    image: "/images/vajilla.jpg",
    description: "Plato base, plato fuerte, plato postre, taza y saucer. Lustre impecable.",
    available: true,
  },
  {
    name: "Arco de Globos Orgánico",
    category: "Decoración",
    quantity: 10,
    condition: "Nuevo",
    price_gtq: 850,
    price_usd: 108,
    unit: "unidad",
    image: "/images/decoracion.jpg",
    description: "Arco de globos orgánico de 3 metros. Colores personalizables según temática.",
    available: true,
  },
  {
    name: "Cabina Fotográfica FunBox",
    category: "Entretenimiento",
    quantity: 1,
    condition: "Excelente",
    price_gtq: 1800,
    price_usd: 230,
    unit: "4 horas",
    image: "/images/foto.jpg",
    description: "Cabina fotográfica con accesorios, impresión instantánea y galería digital.",
    available: true,
  },
  {
    name: "Pista de Baile LED",
    category: "Entretenimiento",
    quantity: 1,
    condition: "Bueno",
    price_gtq: 5000,
    price_usd: 638,
    unit: "evento",
    image: "/images/dj.jpg",
    description: "Pista de baile iluminada con luces LED programables. 4x4 metros.",
    available: true,
  },
  {
    name: "Mantelería Blanca Premium",
    category: "Textiles",
    quantity: 100,
    condition: "Excelente",
    price_gtq: 45,
    price_usd: 6,
    unit: "unidad",
    image: "/images/silla.jpg",
    description: "Manteles de tela premium, servilletas y cubre sillas. Blanco o beige.",
    available: true,
  },
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

export function generateInventoryForProvider(providerId: string): InventoryItem[] {
  const baseSeed = hashString(providerId);
  const count = 3 + Math.floor(seededRandom(baseSeed) * 6); // 3–8 items
  const items: InventoryItem[] = [];

  const shuffled = [...inventoryTemplates].sort(() => seededRandom(baseSeed) - 0.5);

  for (let i = 0; i < count; i++) {
    const tmpl = shuffled[i % shuffled.length];
    items.push({
      ...tmpl,
      id: `inv-${providerId}-${i}`,
      provider_id: providerId,
      quantity: Math.max(1, tmpl.quantity + Math.floor(seededRandom(baseSeed + i * 73) * 20) - 10),
      price_gtq: Math.round(tmpl.price_gtq * (0.8 + seededRandom(baseSeed + i * 137) * 0.4)),
      price_usd: Math.round(tmpl.price_usd * (0.8 + seededRandom(baseSeed + i * 137) * 0.4)),
      available: seededRandom(baseSeed + i * 211) > 0.1,
    });
  }

  return items;
}
