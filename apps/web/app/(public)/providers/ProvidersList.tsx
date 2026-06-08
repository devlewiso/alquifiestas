"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Search,
  X,
  Award,
  ChevronDown,
} from "lucide-react";
import { seedProviders, SeedProvider } from "@/lib/seeds/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type SortOption = "rating" | "experience" | "reviews";

const departments = Array.from(
  new Set(seedProviders.map((p) => p.department))
).sort();

export default function ProvidersList() {
  const [query, setQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("rating");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filtered = useMemo(() => {
    let result = seedProviders.filter((p) => {
      const matchesQuery =
        !query ||
        p.business_name.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase());
      const matchesDept = !selectedDept || p.department === selectedDept;
      return matchesQuery && matchesDept;
    });

    result = [...result].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "experience") return b.years_experience - a.years_experience;
      if (sort === "reviews") return b.review_count - a.review_count;
      return 0;
    });

    return result;
  }, [query, selectedDept, sort]);

  const sortLabels: Record<SortOption, string> = {
    rating: "Mejor rating",
    experience: "Más experiencia",
    reviews: "Más reseñas",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Nuestros Proveedores
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Los proveedores de eventos más confiables de Guatemala. Cada uno
          verificado, con experiencia real y listo para hacer tu celebración
          inolvidable.
        </p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre de negocio..."
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
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

        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 w-full sm:w-auto justify-between"
          >
            <span>{sortLabels[sort]}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
          {showSortMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-sm z-20 overflow-hidden">
              {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setSort(key);
                    setShowSortMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-muted transition-colors ${
                    sort === key
                      ? "font-medium text-primary"
                      : "text-foreground"
                  }`}
                >
                  {sortLabels[key]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Department chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedDept(null)}
          className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
            !selectedDept
              ? "bg-primary text-white border-primary"
              : "border-border hover:border-primary/50"
          }`}
        >
          Todos
        </button>
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() =>
              setSelectedDept(selectedDept === dept ? null : dept)
            }
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              selectedDept === dept
                ? "bg-primary text-white border-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-muted-foreground">
        {filtered.length} proveedor{filtered.length !== 1 ? "es" : ""}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            No encontramos proveedores con esos filtros.
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setQuery("");
              setSelectedDept(null);
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProviderCard({ provider }: { provider: SeedProvider }) {
  return (
    <Link href={`/providers/${provider.id}`} className="group">
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="items-center text-center pb-2">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-muted border-2 border-border mb-3">
            <Image
              src={provider.image_url}
              alt={provider.business_name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
          <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
            {provider.business_name}
          </h3>
        </CardHeader>

        <CardContent className="text-center space-y-2 pb-4">
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {provider.location}
          </div>

          <div className="flex items-center justify-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{provider.rating}</span>
            </div>
            <span className="text-muted-foreground">
              ({provider.review_count} reseñas)
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>{provider.years_experience} años de experiencia</span>
          </div>
        </CardContent>

        <CardFooter className="justify-center gap-2 pt-0 pb-6 flex-wrap">
          <Badge variant="secondary">{provider.department}</Badge>
          {provider.is_verified && (
            <Badge variant="verified">
              <Award className="w-3 h-3 mr-1" />
              Verificado
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
