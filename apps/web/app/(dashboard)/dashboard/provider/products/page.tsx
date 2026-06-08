"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { seedProducts } from "@/lib/seeds/products";
import { formatCurrency } from "@/lib/utils";

const providerProducts = seedProducts.filter((p) => p.provider_id === "prov-1" || p.provider_id === "prov-2");

export default function ProviderProductsPage() {
  const [products, setProducts] = useState(providerProducts);

  const toggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: !p.is_active } : p))
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Mis productos</h1>
          <p className="text-muted-foreground">Gestiona tus servicios y tarifas</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo producto
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className={!product.is_active ? "opacity-60" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-sm">{product.name}</h3>
                    <Badge variant={product.is_active ? "default" : "secondary"}>
                      {product.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded hover:bg-muted transition-colors">
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-muted transition-colors">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-bold text-primary">{formatCurrency(product.price_gtq, "GTQ")}</span>
                  <span className="text-xs text-muted-foreground">/ {product.unit}</span>
                </div>
                <button
                  onClick={() => toggleActive(product.id)}
                  className="text-xs px-2 py-1 rounded border border-border hover:border-primary/50 transition-colors"
                >
                  {product.is_active ? "Desactivar" : "Activar"}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
