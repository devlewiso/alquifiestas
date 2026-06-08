"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  MapPin,
  X,
  Star,
  TrendingUp,
  Award,
  Package,
  Users,
} from "lucide-react";
import { seedProducts } from "@/lib/seeds/products";
import { seedProviders } from "@/lib/seeds/providers";
import { categories } from "@/lib/seeds/categories";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SearchPage() {
  const [tab, setTab] = useState<"services" | "providers">("services");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
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

  const departments = useMemo(() => {
    const depts = new Set(seedProviders.map((p) => p.department));
    return Array.from(depts).sort();
  }, []);

  const filteredProviders = useMemo(() => {
    return seedProviders.filter((p) => {
      const matchesQuery =
        !query ||
        p.business_name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        !selectedCategory || p.categories.includes(selectedCategory);
      const matchesDept = !selectedDepartment || p.department === selectedDepartment;
      return matchesQuery && matchesCategory && matchesDept;
    });
  }, [query, selectedCategory, selectedDepartment]);

  const activeCount = tab === "services" ? filteredProducts.length : filteredProviders.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Buscar en Alquifiestas</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 border-b border-border">
          <button
            onClick={() => setTab("services")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              tab === "services"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="w-4 h-4" />
            Servicios
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted">{filteredProducts.length}</span>
          </button>
          <button
            onClick={() => setTab("providers")}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              tab === "providers"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-4 h-4" />
            Proveedores
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted">{filteredProviders.length}</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                tab === "services"
                  ? "Buscar sillas, inflables, sonido, catering..."
                  : "Buscar proveedores por nombre o ubicación..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-8 p-4 rounded-xl border border-border bg-card space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Categoría</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  !selectedCategory ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    selectedCategory === cat.slug ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {tab === "services" && (
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
                <span className="text-sm font-medium w-24 text-right">Q{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          )}

          {tab === "providers" && (
            <div>
              <h3 className="text-sm font-medium mb-2">Departamento</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDepartment(null)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    !selectedDepartment ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  Todos
                </button>
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      selectedDepartment === dept ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mb-4 text-sm text-muted-foreground">
        {activeCount} resultado{activeCount !== 1 ? "s" : ""}
        {query && (
          <span>
            {" "}
            para &ldquo;<span className="font-medium text-foreground">{query}</span>&rdquo;
          </span>
        )}
      </div>

      {/* SERVICES TAB */}
      {tab === "services" && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No encontramos servicios con esos filtros.</p>
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
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}

      {/* PROVIDERS TAB */}
      {tab === "providers" && (
        <>
          {filteredProviders.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No encontramos proveedores con esos filtros.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setQuery("");
                  setSelectedCategory(null);
                  setSelectedDepartment(null);
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <Link
                  key={provider.id}
                  href={`/providers/${provider.id}`}
                  className="group p-5 rounded-xl border border-border bg-card hover:shadow-md transition-all flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                      <Image
                        src={provider.image_url}
                        alt={provider.business_name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                        {provider.business_name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {provider.department}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">
                    {provider.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {provider.categories.slice(0, 3).map((cat) => (
                      <Badge key={cat} variant="outline" className="text-[10px] px-1.5 py-0">
                        {cat}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-border">
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="font-semibold">{provider.rating}</span>
                      <span className="text-muted-foreground">({provider.review_count})</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {provider.years_experience}a
                      </span>
                      {provider.is_verified && (
                        <span className="flex items-center gap-1 text-blue-600">
                          <Award className="w-3 h-3" />
                          Verif.
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
