"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Calendar,
  MessageCircle,
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Heart,
  Minus,
  Plus,
  Package,
} from "lucide-react";
import { seedProducts } from "@/lib/seeds/products";
import { seedProviders } from "@/lib/seeds/providers";
import { generateReviewsForProvider } from "@/lib/seeds/reviews";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = seedProducts.find((p) => p.id === params.id);
  if (!product) return notFound();

  const provider = seedProviders.find((p) => p.id === product.provider_id);
  const reviews = provider ? generateReviewsForProvider(provider.id) : [];

  const whatsappNumber = provider?.phone.replace(/\D/g, "") || "";
  const whatsappMessage = encodeURIComponent(
    `Hola ${provider?.business_name}, vi "${product.name}" en Alquifiestas y quisiera cotizar para ${quantity} unidad(es). ¿Está disponible? 🎉`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating.toFixed(1);

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/search" className="hover:text-foreground transition-colors">Buscar</Link>
          <span>/</span>
          <Link href={`/categories/${product.category_slug}`} className="hover:text-foreground transition-colors">
            {product.category_slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-md">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border">
              <Image
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`p-2 rounded-full backdrop-blur-sm transition-colors ${liked ? "bg-red-500/90 text-white" : "bg-black/30 text-white hover:bg-black/50"}`}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-colors ${
                      selectedImage === idx ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs">{product.category_slug}</Badge>
              {product.is_active ? (
                <Badge className="bg-green-100 text-green-700 border border-green-200 text-xs">Disponible</Badge>
              ) : (
                <Badge className="bg-red-100 text-red-700 border border-red-200 text-xs">No disponible</Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="font-semibold">{avgRating}</span>
                <span className="text-sm text-muted-foreground">({reviews.length} reseñas)</span>
              </div>
              <span className="text-muted-foreground">·</span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {product.location}
              </div>
            </div>

            <p className="text-muted-foreground mt-4 leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="mt-6 p-5 bg-card border border-border rounded-xl">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{formatCurrency(product.price_gtq, "GTQ")}</span>
                <span className="text-muted-foreground">/ {product.unit}</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                ≈ {formatCurrency(product.price_usd, "USD")}
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-4 mt-4">
                <span className="text-sm font-medium">Cantidad:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Cotizar por WhatsApp
                </a>
                <Link href={`/booking/new?product=${product.id}&provider=${provider?.id || ""}`}>
                  <Button variant="outline" className="w-full gap-2">
                    <Calendar className="w-4 h-4" />
                    Reservar ahora
                  </Button>
                </Link>
              </div>
            </div>

            {/* Provider card */}
            {provider && (
              <Link
                href={`/providers/${provider.id}`}
                className="mt-4 flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                  <Image src={provider.image_url} alt={provider.business_name} width={56} height={56} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{provider.business_name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                    <span>{provider.rating} ({provider.review_count} reseñas)</span>
                  </div>
                </div>
                <ChevronLeft className="w-5 h-5 rotate-180 text-muted-foreground shrink-0" />
              </Link>
            )}

            {/* Trust badges */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Pago protegido</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Proveedor verificado</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Incluye delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                <Package className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Cancelación flexible</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        {reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Reseñas del proveedor</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.slice(0, 6).map((review) => (
                <div key={review.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                      <Image src={review.avatar} alt={review.author} width={32} height={32} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-semibold">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{review.comment}</p>
                  <Badge variant="outline" className="mt-3 text-xs">{review.event_type}</Badge>
                </div>
              ))}
            </div>
            {provider && reviews.length > 6 && (
              <div className="text-center mt-4">
                <Link href={`/providers/${provider.id}?tab=reviews`}>
                  <Button variant="outline">Ver todas las reseñas</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Cotizar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
