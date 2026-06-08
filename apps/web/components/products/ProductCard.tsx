"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { SeedProduct } from "@/lib/seeds/products";

interface ProductCardProps {
  product: SeedProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {product.rating}
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-sm line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
            </Link>
            <Link href={`/providers/${product.provider_id}`}>
              <p className="text-xs text-muted-foreground mt-0.5 hover:text-primary transition-colors">{product.provider_name}</p>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
          <MapPin className="w-3 h-3" />
          {product.location}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-bold text-primary">
            {formatCurrency(product.price_gtq, "GTQ")}
          </span>
          <span className="text-xs text-muted-foreground">
            / {product.unit}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatCurrency(product.price_usd, "USD")}
        </span>
      </CardFooter>
    </Card>
  );
}
