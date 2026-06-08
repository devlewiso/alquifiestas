"use client";

import Link from "next/link";
import Image from "next/image";
import { Armchair, Castle, Music, Tent, Utensils, Sparkles, Camera, Wine, Building } from "lucide-react";
import type { Category } from "@/lib/seeds/categories";

const iconMap: Record<string, React.ElementType> = {
  Armchair,
  Castle,
  Music,
  Tent,
  Utensils,
  Sparkles,
  Camera,
  Wine,
  Building,
};

interface CategoryCardProps {
  category: Category;
  variant?: "default" | "compact";
}

export function CategoryCard({ category, variant = "default" }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Sparkles;

  if (variant === "compact") {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all group"
      >
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className="text-sm font-medium text-center">{category.name}</span>
        <span className="text-xs text-muted-foreground">{category.productCount} items</span>
      </Link>
    );
  }

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative overflow-hidden rounded-xl border border-border bg-card hover:shadow-md transition-all"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 text-white">
            <Icon className="w-5 h-5" />
            <h3 className="font-semibold">{category.name}</h3>
          </div>
          <p className="text-white/80 text-sm mt-1 line-clamp-2">{category.description}</p>
        </div>
      </div>
      <div className="p-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{category.productCount} productos</span>
        <span className="text-xs font-medium text-primary">Ver todo →</span>
      </div>
    </Link>
  );
}
