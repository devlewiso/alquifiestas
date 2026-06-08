export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  imageUrl: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "cat-sillas-mesas",
    name: "Sillas y Mesas",
    slug: "sillas-y-mesas",
    description: "Sillas Tiffany, Napoleón, plegables, mesas redondas, rectangulares y altas.",
    icon: "Armchair",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop",
    productCount: 124,
  },
  {
    id: "cat-inflables",
    name: "Inflables",
    slug: "inflables",
    description: "Castillos, resbaladeras, brincolines, combos y juegos acuáticos.",
    icon: "Castle",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop",
    productCount: 56,
  },
  {
    id: "cat-sonido-iluminacion",
    name: "Sonido e Iluminación",
    slug: "sonido-e-iluminacion",
    description: "DJ profesional, bafles, micrófonos, luces LED, pantallas y proyección.",
    icon: "Music",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop",
    productCount: 89,
  },
  {
    id: "cat-carpas-toldos",
    name: "Carpas y Toldos",
    slug: "carpas-y-toldos",
    description: "Carpas elegantes, toldos para exteriores, pabellones y cubiertas.",
    icon: "Tent",
    imageUrl: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&h=400&fit=crop",
    productCount: 34,
  },
  {
    id: "cat-catering",
    name: "Catering",
    slug: "catering",
    description: "Banquetes completos, bufets, bocadillos, mesas de dulces y bebidas.",
    icon: "Utensils",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop",
    productCount: 67,
  },
  {
    id: "cat-decoracion",
    name: "Decoración",
    slug: "decoracion",
    description: "Arcos de globos, centros de mesa, cortinas, pistas de baile y backdrop.",
    icon: "Sparkles",
    imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    productCount: 92,
  },
  {
    id: "cat-fotografia-video",
    name: "Fotografía y Video",
    slug: "fotografia-y-video",
    description: "Fotógrafos profesionales, cabinas fotográficas, drones y videógrafos.",
    icon: "Camera",
    imageUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=400&fit=crop",
    productCount: 43,
  },
  {
    id: "cat-utensilios",
    name: "Utensilios",
    slug: "utensilios",
    description: "Vajillas, cristalería, cubiertos, ollas, dispensadores y calentadores.",
    icon: "Wine",
    imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop",
    productCount: 78,
  },
];
