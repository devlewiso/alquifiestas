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
  ChevronRight,
} from "lucide-react";
import { seedProducts } from "@/lib/seeds/products";
import { seedProviders } from "@/lib/seeds/providers";
import { categories } from "@/lib/seeds/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const departments = useMemo(() => {
    const depts = new Set(seedProviders.map((p) => p.department));
    return Array.from(depts).sort();
  }, []);

  const filteredProviders = useMemo(() => {
    return seedProviders.filter((provider) => {
      const providerServices = seedProducts.filter(
        (p) => p.provider_id === provider.id
      );

      const matchesQuery =
        !query ||
        provider.business_name.toLowerCase().includes(query.toLowerCase()) ||
        provider.description.toLowerCase().includes(query.toLowerCase()) ||
        provider.location.toLowerCase().includes(query.toLowerCase()) ||
        providerServices.some((s) =>
          s.name.toLowerCase().includes(query.toLowerCase())
        );

      const matchesCategory =
        !selectedCategory || provider.categories.includes(selectedCategory);

      const matchesDept =
        !selectedDepartment || provider.department === selectedDepartment;

      return matchesQuery && matchesCategory && matchesDept;
    });
  }, [query, selectedCategory, selectedDepartment]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">
          Encontrá proveedores para tu evento
        </h1>
        <p className="text-muted-foreground text-sm">
          Buscá por nombre del negocio, tipo de servicio o ubicación
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Banquetes Doña María, DJ, sillas, Antigua..."
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

      {/* Filters */}
      {showFilters && (
        <div className="mb-8 p-4 rounded-xl border border-border bg-card space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Tipo de servicio</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  !selectedCategory
                    ? "bg-primary text-white border-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                Todos
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
            <h3 className="text-sm font-medium mb-2">Departamento</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDepartment(null)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  !selectedDepartment
                    ? "bg-primary text-white border-primary"
                    : "border-border hover:border-primary/50"
                }`}
              >
                Todos
              </button>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    selectedDepartment === dept
                      ? "bg-primary text-white border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        {filteredProviders.length} proveedor
        {filteredProviders.length !== 1 ? "es" : ""} encontrado
        {filteredProviders.length !== 1 ? "s" : ""}
        {query && (
          <span>
            {" "}
            para &ldquo;<span className="font-medium text-foreground">{query}</span>&rdquo;
          </span>
        )}
      </div>

      {/* Provider cards */}
      {filteredProviders.length === 0 ? (
        <div className="text-center py-20">
          <SearchIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No encontramos proveedores con esos filtros.
          </p>
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
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredProviders.map((provider) => {
            const services = seedProducts.filter(
              (p) => p.provider_id === provider.id
            );
            const topServices = services.slice(0, 3);

            return (
              <div
                key={provider.id}
                className="border border-border rounded-xl bg-card overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Provider header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                      <Image
                        src={provider.image_url}
                        alt={provider.business_name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-bold text-lg truncate">
                          {provider.business_name}
                        </h2>
                        {provider.is_verified && (
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px] px-1.5 py-0">
                            <Award className="w-3 h-3 mr-0.5" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {provider.location}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm">
                        <div className="flex items-center gap-1 text-yellow-600">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{provider.rating}</span>
                          <span className="text-muted-foreground">
                            ({provider.review_count} reseñas)
                          </span>
                        </div>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          {provider.years_experience} años
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {provider.description}
                  </p>
                </div>

                {/* Services preview */}
                {topServices.length > 0 && (
                  <div className="px-5 py-3 border-t border-border bg-muted/30">
                    <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" />
                      Servicios destacados
                    </p>
                    <div className="space-y-2">
                      {topServices.map((service) => (
                        <Link
                          key={service.id}
                          href={`/product/${service.id}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-background transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                            <Image
                              src={service.images[0]}
                              alt={service.name}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {service.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatCurrency(service.price_gtq, "GTQ")} /{" "}
                              {service.unit}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </Link>
                      ))}
                    </div>
                    {services.length > 3 && (
                      <p className="text-xs text-muted-foreground mt-1 pl-2">
                        +{services.length - 3} servicios más
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="p-5 pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {provider.categories.slice(0, 3).map((cat) => (
                      <Badge
                        key={cat}
                        variant="outline"
                        className="text-[10px] px-1.5 py-0"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/providers/${provider.id}`}>
                    <Button size="sm" className="gap-1">
                      Ver perfil
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
