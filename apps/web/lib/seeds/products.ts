export interface SeedProduct {
  id: string;
  provider_id: string;
  provider_name: string;
  category_id: string;
  category_slug: string;
  name: string;
  description: string;
  price_gtq: number;
  price_usd: number;
  unit: string;
  images: string[];
  is_active: boolean;
  location: string;
  rating: number;
  review_count: number;
}

export const seedProducts: SeedProduct[] = [
  // Sillas y Mesas
  {
    id: "prod-1", provider_id: "prov-1", provider_name: "Eventos Elegantes GT",
    category_id: "cat-sillas-mesas", category_slug: "sillas-y-mesas",
    name: "Silla Tiffany Dorada",
    description: "Silla estilo Tiffany con cojín blanco. Ideal para bodas, bautizos y eventos formales.",
    price_gtq: 55, price_usd: 7, unit: "unidad",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop"],
    is_active: true, location: "Zona 10, Ciudad de Guatemala", rating: 4.8, review_count: 45,
  },
  {
    id: "prod-2", provider_id: "prov-1", provider_name: "Eventos Elegantes GT",
    category_id: "cat-sillas-mesas", category_slug: "sillas-y-mesas",
    name: "Mesa Redonda 10 Personas",
    description: "Mesa redonda con mantel incluido. Capacidad para 10 comensales.",
    price_gtq: 350, price_usd: 45, unit: "unidad",
    images: ["https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=400&fit=crop"],
    is_active: true, location: "Zona 10, Ciudad de Guatemala", rating: 4.7, review_count: 32,
  },
  {
    id: "prod-3", provider_id: "prov-1", provider_name: "Eventos Elegantes GT",
    category_id: "cat-sillas-mesas", category_slug: "sillas-y-mesas",
    name: "Silla Plegable Blanca",
    description: "Silla plegable resistente, ideal para eventos al aire libre.",
    price_gtq: 18, price_usd: 2.30, unit: "unidad",
    images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=600&h=400&fit=crop"],
    is_active: true, location: "Zona 10, Ciudad de Guatemala", rating: 4.5, review_count: 67,
  },
  // Inflables
  {
    id: "prod-4", provider_id: "prov-2", provider_name: "Brinca Brinca Inflables",
    category_id: "cat-inflables", category_slug: "inflables",
    name: "Castillo Inflable Mediano",
    description: "Castillo con tobogán integrado. 4x4 metros. Para niños de 3 a 10 años.",
    price_gtq: 800, price_usd: 102, unit: "4 horas",
    images: ["https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop"],
    is_active: true, location: "Mixco, Guatemala", rating: 4.9, review_count: 89,
  },
  {
    id: "prod-5", provider_id: "prov-2", provider_name: "Brinca Brinca Inflables",
    category_id: "cat-inflables", category_slug: "inflables",
    name: "Resbaladera Acuática Mega",
    description: "Resbaladera acuática de 8 metros de alto. Incluye inflador y extensión.",
    price_gtq: 1200, price_usd: 153, unit: "4 horas",
    images: ["https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&h=400&fit=crop"],
    is_active: true, location: "Mixco, Guatemala", rating: 4.8, review_count: 56,
  },
  // Sonido
  {
    id: "prod-6", provider_id: "prov-3", provider_name: "DJ Carlos M. - Sonido Profesional",
    category_id: "cat-sonido-iluminacion", category_slug: "sonido-e-iluminacion",
    name: "Paquete DJ Básico",
    description: "DJ profesional + 2 bafles JBL + mezclador Pioneer. 4 horas de servicio.",
    price_gtq: 2500, price_usd: 319, unit: "evento",
    images: ["https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop"],
    is_active: true, location: "Zona 14, Ciudad de Guatemala", rating: 4.7, review_count: 43,
  },
  {
    id: "prod-7", provider_id: "prov-3", provider_name: "DJ Carlos M. - Sonido Profesional",
    category_id: "cat-sonido-iluminacion", category_slug: "sonido-e-iluminacion",
    name: "Paquete DJ Premium + Luces",
    description: "DJ + 4 bafles + subwoofer + luces LED robotizadas + máquina de humo.",
    price_gtq: 4500, price_usd: 574, unit: "evento",
    images: ["https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=600&h=400&fit=crop"],
    is_active: true, location: "Zona 14, Ciudad de Guatemala", rating: 4.9, review_count: 28,
  },
  {
    id: "prod-8", provider_id: "prov-9", provider_name: "Mega Sonido Huehue",
    category_id: "cat-sonido-iluminacion", category_slug: "sonido-e-iluminacion",
    name: "Karaoke + Pantalla Gigante",
    description: "Máquina de karaoke con 10,000 canciones + pantalla 85\" + 2 micrófonos inalámbricos.",
    price_gtq: 1500, price_usd: 191, unit: "4 horas",
    images: ["https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=600&h=400&fit=crop"],
    is_active: true, location: "Huehuetenango", rating: 4.4, review_count: 19,
  },
  // Carpas
  {
    id: "prod-9", provider_id: "prov-4", provider_name: "Carpas del Altiplano",
    category_id: "cat-carpas-toldos", category_slug: "carpas-y-toldos",
    name: "Carpa Elegante 5x5m",
    description: "Carpa con piso de madera, iluminación interior y cortinas laterales. 25 personas.",
    price_gtq: 1800, price_usd: 230, unit: "unidad",
    images: ["https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=400&fit=crop"],
    is_active: true, location: "Quetzaltenango", rating: 4.6, review_count: 21,
  },
  {
    id: "prod-10", provider_id: "prov-4", provider_name: "Carpas del Altiplano",
    category_id: "cat-carpas-toldos", category_slug: "carpas-y-toldos",
    name: "Toldo Para Exteriores 6x3m",
    description: "Toldo resistente a lluvia y viento. Ideal para jardines y patios.",
    price_gtq: 950, price_usd: 121, unit: "unidad",
    images: ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&h=400&fit=crop"],
    is_active: true, location: "Quetzaltenango", rating: 4.5, review_count: 14,
  },
  // Catering
  {
    id: "prod-11", provider_id: "prov-5", provider_name: "Banquetes Doña María",
    category_id: "cat-catering", category_slug: "catering",
    name: "Buffet Guatemalteco Completo",
    description: "Pepián, kaq ik, tamales, arroz, tortillas hechas a mano, refrescos naturales. 50 personas.",
    price_gtq: 5500, price_usd: 701, unit: "50 personas",
    images: ["https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop"],
    is_active: true, location: "Antigua Guatemala", rating: 4.9, review_count: 78,
  },
  {
    id: "prod-12", provider_id: "prov-5", provider_name: "Banquetes Doña María",
    category_id: "cat-catering", category_slug: "catering",
    name: "Mesa de Dulces Tradicional",
    description: "Canillos de leche, cocadas, dulces de ayote, champurradas, atol de elote. Decoración incluida.",
    price_gtq: 1200, price_usd: 153, unit: "evento",
    images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop"],
    is_active: true, location: "Antigua Guatemala", rating: 4.8, review_count: 45,
  },
  {
    id: "prod-13", provider_id: "prov-10", provider_name: "Catering Petén Selva",
    category_id: "cat-catering", category_slug: "catering",
    name: "Banquete Selva Petenera",
    description: "Pescado fresco del lago, frutas tropicales, chaya, tamales de chipilín. 30 personas.",
    price_gtq: 4200, price_usd: 535, unit: "30 personas",
    images: ["https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop"],
    is_active: true, location: "Flores, Petén", rating: 4.6, review_count: 12,
  },
  // Decoración
  {
    id: "prod-14", provider_id: "prov-6", provider_name: "Decorarte Quiché",
    category_id: "cat-decoracion", category_slug: "decoracion",
    name: "Arco de Globos Temático",
    description: "Arco orgánico de globos en colores a elección. 3 metros de ancho. Incluye delivery en Quiché.",
    price_gtq: 850, price_usd: 108, unit: "unidad",
    images: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop"],
    is_active: true, location: "Santa Cruz del Quiché", rating: 4.8, review_count: 23,
  },
  {
    id: "prod-15", provider_id: "prov-6", provider_name: "Decorarte Quiché",
    category_id: "cat-decoracion", category_slug: "decoracion",
    name: "Centro de Mesa Maya",
    description: "Centro de mesa con flores nativas, textiles tradicionales y velas artesanales. 10 piezas.",
    price_gtq: 650, price_usd: 83, unit: "10 unidades",
    images: ["https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=400&fit=crop"],
    is_active: true, location: "Santa Cruz del Quiché", rating: 4.7, review_count: 18,
  },
  // Fotografía
  {
    id: "prod-16", provider_id: "prov-7", provider_name: "FotoMaya Estudio",
    category_id: "cat-fotografia-video", category_slug: "fotografia-y-video",
    name: "Paquete Fotografía Boda",
    description: "8 horas de cobertura. 2 fotógrafos. 500+ fotos editadas. Álbum digital y físico.",
    price_gtq: 8500, price_usd: 1083, unit: "evento",
    images: ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop"],
    is_active: true, location: "Zona 1, Ciudad de Guatemala", rating: 4.7, review_count: 34,
  },
  {
    id: "prod-17", provider_id: "prov-7", provider_name: "FotoMaya Estudio",
    category_id: "cat-fotografia-video", category_slug: "fotografia-y-video",
    name: "Cabina Fotográfica FunBox",
    description: "Cabina fotográfica con accesorios, impresión instantánea y galería digital. 4 horas.",
    price_gtq: 1800, price_usd: 230, unit: "4 horas",
    images: ["https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&h=400&fit=crop"],
    is_active: true, location: "Zona 1, Ciudad de Guatemala", rating: 4.6, review_count: 28,
  },
  // Utensilios
  {
    id: "prod-18", provider_id: "prov-8", provider_name: "Vajillas de Lujo Xela",
    category_id: "cat-utensilios", category_slug: "utensilios",
    name: "Vajilla de Porcelana Completa",
    description: "Plato base, plato fuerte, plato postre, taza y saucer. 50 servicios. Incluye lavado.",
    price_gtq: 2200, price_usd: 280, unit: "50 servicios",
    images: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop"],
    is_active: true, location: "Quetzaltenango", rating: 4.5, review_count: 19,
  },
  {
    id: "prod-19", provider_id: "prov-8", provider_name: "Vajillas de Lujo Xela",
    category_id: "cat-utensilios", category_slug: "utensilios",
    name: "Cristalería Elegante",
    description: "Copas de vino, agua, champagne y whiskey. 50 piezas de cada tipo. Ideal para bodas.",
    price_gtq: 1500, price_usd: 191, unit: "200 piezas",
    images: ["https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=400&fit=crop"],
    is_active: true, location: "Quetzaltenango", rating: 4.4, review_count: 15,
  },
  {
    id: "prod-20", provider_id: "prov-8", provider_name: "Vajillas de Lujo Xela",
    category_id: "cat-utensilios", category_slug: "utensilios",
    name: "Dispensador de Agua 20L",
    description: "Dispensador de acero inoxidable con capacidad para 20 litros. Incluye base.",
    price_gtq: 120, price_usd: 15, unit: "unidad",
    images: ["https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=400&fit=crop"],
    is_active: true, location: "Quetzaltenango", rating: 4.3, review_count: 42,
  },
];
