"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, MapPin, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { seedProducts } from "@/lib/seeds/products";
import { formatCurrency } from "@/lib/utils";

export default function NewBookingPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [cart, setCart] = useState<{ productId: string; qty: number }[]>([]);

  const cartItems = cart.map((c) => {
    const product = seedProducts.find((p) => p.id === c.productId)!;
    return { ...product, qty: c.qty };
  });

  const totalGtq = cartItems.reduce((sum, item) => sum + item.price_gtq * item.qty, 0);
  const totalUsd = cartItems.reduce((sum, item) => sum + item.price_usd * item.qty, 0);

  const addToCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.productId === productId);
      if (existing) {
        return prev.map((c) => (c.productId === productId ? { ...c, qty: c.qty + 1 } : c));
      }
      return [...prev, { productId, qty: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((c) => c.productId !== productId));
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Link href="/dashboard/client">
          <ArrowLeft className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
        </Link>
        <h1 className="text-2xl font-bold">Crear nuevo evento</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalles del evento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre del evento</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Boda de María y Juan"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Fecha</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Ubicación</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ej: Antigua Guatemala"
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product selector */}
          <Card>
            <CardHeader>
              <CardTitle>Agregar productos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {seedProducts.slice(0, 10).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.provider_name} • {product.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-primary">{formatCurrency(product.price_gtq, "GTQ")}</span>
                        <span className="text-xs text-muted-foreground">/ {product.unit}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => addToCart(product.id)} className="shrink-0 gap-1">
                      <Plus className="w-3.5 h-3.5" />
                      Agregar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart summary */}
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Tu carrito está vacío. Agrega productos para tu evento.
                </p>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.qty} x {formatCurrency(item.price_gtq, "GTQ")}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <span className="font-medium">{formatCurrency(item.price_gtq * item.qty, "GTQ")}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="border-t border-border pt-3 mt-3 space-y-1">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total GTQ</span>
                      <span className="text-primary">{formatCurrency(totalGtq, "GTQ")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Total USD</span>
                      <span>{formatCurrency(totalUsd, "USD")}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" disabled={!title || !date || cart.length === 0}>
                    Confirmar reserva
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
