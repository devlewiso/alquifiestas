"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon, SlidersHorizontal, MapPin, X } from "lucide-react";
import { seedProducts } from "@/lib/seeds/products";
import { categories } from "@/lib/seeds/categories";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return seedProducts.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.provider_name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !selectedCategory || p.category_slug === selectedCategory;
      const matchesPrice = p.price_gtq >= priceRange[0] && p.price_gtq <= priceRange[1];
      return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [query, selectedCategory, priceRange]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Buscar productos</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar sillas, inflables, sonido, catering..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-8 p-4 rounded-xl border border-border bg-card">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Categoría</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  !selectedCategory
                    ? "bg-primary text-white border-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    selectedCategory === cat.slug
                      ? "bg-primary text-white border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Precio máximo (GTQ)</h3>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={10000}
                step={100}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="flex-1"
              />
              <span className="text-sm font-medium w-24 text-right">
                Q{priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 text-sm text-muted-foreground">
        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No encontramos productos con esos filtros.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setQuery("");
              setSelectedCategory(null);
              setPriceRange([0, 10000]);
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
