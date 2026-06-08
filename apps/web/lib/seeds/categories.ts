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
    imageUrl: "/images/silla.jpg",
    productCount: 124,
  },
  {
    id: "cat-inflables",
    name: "Inflables",
    slug: "inflables",
    description: "Castillos, resbaladeras, brincolines, combos y juegos acuáticos.",
    icon: "Castle",
    imageUrl: "/images/inflable.jpg",
    productCount: 56,
  },
  {
    id: "cat-sonido-iluminacion",
    name: "Sonido e Iluminación",
    slug: "sonido-e-iluminacion",
    description: "DJ profesional, bafles, micrófonos, luces LED, pantallas y proyección.",
    icon: "Music",
    imageUrl: "/images/dj.jpg",
    productCount: 89,
  },
  {
    id: "cat-carpas-toldos",
    name: "Carpas y Toldos",
    slug: "carpas-y-toldos",
    description: "Carpas elegantes, toldos para exteriores, pabellones y cubiertas.",
    icon: "Tent",
    imageUrl: "/images/mesa.jpg",
    productCount: 34,
  },
  {
    id: "cat-catering",
    name: "Catering",
    slug: "catering",
    description: "Banquetes completos, bufets, bocadillos, mesas de dulces y bebidas.",
    icon: "Utensils",
    imageUrl: "/images/catering.jpg",
    productCount: 67,
  },
  {
    id: "cat-decoracion",
    name: "Decoración",
    slug: "decoracion",
    description: "Arcos de globos, centros de mesa, cortinas, pistas de baile y backdrop.",
    icon: "Sparkles",
    imageUrl: "/images/decoracion.jpg",
    productCount: 92,
  },
  {
    id: "cat-fotografia-video",
    name: "Fotografía y Video",
    slug: "fotografia-y-video",
    description: "Fotógrafos profesionales, cabinas fotográficas, drones y videógrafos.",
    icon: "Camera",
    imageUrl: "/images/foto.jpg",
    productCount: 43,
  },
  {
    id: "cat-utensilios",
    name: "Utensilios",
    slug: "utensilios",
    description: "Vajillas, cristalería, cubiertos, ollas, dispensadores y calentadores.",
    icon: "Wine",
    imageUrl: "/images/vajilla.jpg",
    productCount: 78,
  },
];
