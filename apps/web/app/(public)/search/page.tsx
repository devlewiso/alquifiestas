"use client";

import { useState, useMemo, useCallback } from "react";
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
  Sparkles,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import { findMatches, getSearchSuggestions } from "@/lib/ai/match";
import type { UserIntent } from "@/lib/ai/match";
import { seedProviders } from "@/lib/seeds/providers";
import { categories } from "@/lib/seeds/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);
  const [activeEventType, setActiveEventType] = useState<string | null>(null);

  const departments = useMemo(() => {
    const depts = new Set(seedProviders.map((p) => p.department));
    return Array.from(depts).sort();
  }, []);

  const intent: UserIntent = useMemo(() => {
    return {
      query: query || undefined,
      eventType: activeEventType || undefined,
      location: selectedDept || undefined,
      budgetGtq: selectedBudget || undefined,
      preferredCategories: selectedCategory ? [selectedCategory] : undefined,
    };
  }, [query, activeEventType, selectedDept, selectedBudget, selectedCategory]);

  const matches = useMemo(() => findMatches(intent, 20), [intent]);
  const suggestions = useMemo(() => getSearchSuggestions(query), [query]);

  const clearFilters = useCallback(() => {
    setQuery("");
    setSelectedCategory(null);
    setSelectedDept(null);
    setSelectedBudget(null);
    setActiveEventType(null);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Buscar proveedores</h1>
        <p className="text-muted-foreground text-sm">
          Nuestro algoritmo encuentra los proveedores que mejor se ajustan a lo que buscás
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ej: Banquetes Doña María, DJ para boda, sillas en Antigua..."
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

        {/* Smart suggestions */}
        {suggestions.length > 0 && query.length >= 2 && (
          <div className="mt-2 p-2 rounded-xl border border-border bg-card shadow-sm">
            <p className="text-xs text-muted-foreground px-2 py-1">Sugerencias inteligentes</p>
            {suggestions.map((s, i) => (
              <Link
                key={i}
                href={s.redirectTo}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors text-sm"
              >
                <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{s.text}</span>
                <Badge variant="outline" className="text-[10px] ml-auto">{s.type}</Badge>
              </Link>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>Búsqueda potenciada por IA — entiende intenciones como &ldquo;DJ para boda en Antigua&rdquo;</span>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-8 p-5 rounded-xl border border-border bg-card space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Tipo de evento</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveEventType(null)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${!activeEventType ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"}`}
              >Cualquiera</button>
              {[
                { id: "boda", label: "Boda" },
                { id: "quinceañera", label: "Quinceañera" },
                { id: "cumpleaños", label: "Cumpleaños" },
                { id: "corporativo", label: "Corporativo" },
                { id: "bautizo", label: "Bautizo" },
              ].map((evt) => (
                <button
                  key={evt.id}
                  onClick={() => setActiveEventType(activeEventType === evt.id ? null : evt.id)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${activeEventType === evt.id ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"}`}
                >{evt.label}</button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Servicio</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${!selectedCategory ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"}`}
              >Todos</button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${selectedCategory === cat.slug ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"}`}
                >{cat.name}</button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Departamento</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDept(null)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${!selectedDept ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"}`}
              >Todos</button>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(selectedDept === dept ? null : dept)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${selectedDept === dept ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"}`}
                >{dept}</button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Presupuesto (GTQ)</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedBudget(null)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${!selectedBudget ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"}`}
              >Cualquiera</button>
              {[
                { label: "Hasta Q2,000", value: 2000 },
                { label: "Hasta Q5,000", value: 5000 },
                { label: "Hasta Q10,000", value: 10000 },
                { label: "Hasta Q20,000", value: 20000 },
              ].map((b) => (
                <button
                  key={b.value}
                  onClick={() => setSelectedBudget(selectedBudget === b.value ? null : b.value)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${selectedBudget === b.value ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"}`}
                >{b.label}</button>
              ))}
            </div>
          </div>

          {(selectedCategory || selectedDept || selectedBudget || activeEventType) && (
            <button onClick={clearFilters} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
              <X className="w-3.5 h-3.5" />
              Limpiar todos los filtros
            </button>
          )}
        </div>
      )}

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {matches.length} resultado{matches.length !== 1 ? "s" : ""}
          {query && (
            <span> para &ldquo;<span className="font-medium text-foreground">{query}</span>&rdquo;</span>
          )}
        </span>
        {matches.length > 0 && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            Ordenados por relevancia IA
          </span>
        )}
      </div>

      {matches.length === 0 ? (
        <div className="text-center py-20">
          <SearchIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No encontramos proveedores con esos criterios.</p>
          <p className="text-sm text-muted-foreground mt-1">Probá con términos más generales o ampliá tu presupuesto.</p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>Limpiar filtros</Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {matches.map((match, index) => (
            <div
              key={match.provider.id}
              className={`border rounded-xl bg-card overflow-hidden hover:shadow-md transition-shadow ${index === 0 ? "border-primary/30 ring-1 ring-primary/20" : "border-border"}`}
            >
              {index === 0 && (
                <div className="bg-primary text-white text-xs font-medium px-4 py-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Mejor match — {Math.round(match.score * 100)}% compatibilidad
                </div>
              )}

              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                    <Image src={match.provider.image_url} alt={match.provider.business_name} width={64} height={64} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-lg truncate">{match.provider.business_name}</h2>
                      {match.provider.is_verified && (
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px] px-1.5 py-0">
                          <Award className="w-3 h-3 mr-0.5" />Verificado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                      <MapPin className="w-3.5 h-3.5" />{match.provider.location}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <div className="flex items-center gap-1 text-yellow-600">
                        <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold">{match.provider.rating}</span>
                        <span className="text-muted-foreground">({match.provider.review_count} reseñas)</span>
                      </div>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />{match.provider.years_experience}a
                      </span>
                    </div>
                  </div>
                </div>

                {match.matchReasons.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {match.matchReasons.map((reason, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-xs bg-primary/5 text-primary px-2 py-1 rounded-full">
                        <BadgeCheck className="w-3 h-3" />{reason}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{match.provider.description}</p>

                {match.recommendedServices.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" />Servicios destacados
                    </p>
                    <div className="space-y-2">
                      {match.recommendedServices.map((service) => (
                        <Link key={service.id} href={`/product/${service.id}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                            <Image src={service.images[0]} alt={service.name} width={48} height={48} className="object-cover w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{service.name}</p>
                            <p className="text-xs text-muted-foreground">{formatCurrency(service.price_gtq, "GTQ")} / {service.unit}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex flex-wrap gap-1.5">
                    {match.provider.categories.slice(0, 3).map((cat) => (
                      <Badge key={cat} variant="outline" className="text-[10px] px-1.5 py-0">{cat}</Badge>
                    ))}
                  </div>
                  <Link href={`/providers/${match.provider.id}`}>
                    <Button size="sm" className="gap-1">Ver perfil<ChevronRight className="w-4 h-4" /></Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
