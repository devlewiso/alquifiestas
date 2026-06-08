"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Phone,
  Mail,
  Award,
  Calendar,
  Clock,
  MessageCircle,
  ThumbsUp,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ExternalLink,
  Package,
  Images,
  ClipboardList,
  MessageSquare,
  ShieldCheck,
  Users,
  TrendingUp,
  Heart,
  Share2,
} from "lucide-react";
import { seedProviders } from "@/lib/seeds/providers";
import { seedProducts } from "@/lib/seeds/products";
import { generateReviewsForProvider } from "@/lib/seeds/reviews";
import { generateGalleryForProvider } from "@/lib/seeds/gallery";
import { generateInventoryForProvider } from "@/lib/seeds/inventory";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

interface ProviderPageProps {
  params: { id: string };
}

export default function ProviderPage({ params }: ProviderPageProps) {
  const [activeTab, setActiveTab] = useState<"products" | "inventory" | "gallery" | "reviews" | "contact">("products");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);

  const provider = seedProviders.find((p) => p.id === params.id);
  if (!provider) return notFound();

  const products = seedProducts.filter((p) => p.provider_id === params.id);
  const reviews = generateReviewsForProvider(params.id);
  const gallery = generateGalleryForProvider(params.id);
  const inventory = generateInventoryForProvider(params.id);

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : provider.rating.toFixed(1);

  const whatsappNumber = provider.phone.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    `Hola ${provider.business_name}, vi su perfil en Alquifiestas y quisiera cotizar para un evento. ¿Podrían ayudarme? 🎉`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const key = Math.min(5, Math.max(1, r.rating)) as keyof typeof ratingCounts;
    ratingCounts[key]++;
  });
  const maxCount = Math.max(...Object.values(ratingCounts));

  return (
    <div className="min-h-screen bg-background">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Link
          href="/search"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver a proveedores
        </Link>
      </div>

      {/* Cover */}
      <div className="relative h-48 sm:h-64 md:h-80 mt-4">
        <Image
          src={provider.cover_url}
          alt={provider.business_name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={() => setLiked(!liked)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${liked ? "bg-red-500/90 text-white" : "bg-black/40 text-white hover:bg-black/60"}`}
          >
            <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
          </button>
          <button className="p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-16">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl border-4 border-background overflow-hidden bg-card shadow-xl shrink-0">
            <Image
              src={provider.image_url}
              alt={provider.business_name}
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Info card */}
          <div className="flex-1 bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {provider.is_verified && (
                <Badge variant="verified" className="bg-green-100 text-green-700 border-green-200">
                  <Award className="w-3 h-3 mr-1" /> Verificado
                </Badge>
              )}
              <Badge variant="secondary">{provider.department}</Badge>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {provider.years_experience} años
              </Badge>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold">{provider.business_name}</h1>
            <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">{provider.description}</p>

            {/* Rating summary */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-lg">{avgRating}</span>
                <span className="text-muted-foreground text-sm">({reviews.length} reseñas)</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                {provider.location}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Users className="w-4 h-4" />
                {products.length} productos
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 mt-5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Cotizar por WhatsApp
              </a>
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                Reservar
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Button>
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          {[
            { label: "Eventos completados", value: `${provider.review_count + 50}+`, icon: Calendar },
            { label: "Años de experiencia", value: `${provider.years_experience}`, icon: TrendingUp },
            { label: "Productos", value: `${products.length}`, icon: Package },
            { label: "Rating", value: `${avgRating}/5`, icon: Star },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Pago protegido por Alquifiestas</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Proveedor verificado</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-2 rounded-lg text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Cancelación flexible</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-border">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {[
              { key: "products" as const, label: "Servicios", icon: ClipboardList, count: products.length },
              { key: "inventory" as const, label: "Inventario", icon: Package, count: inventory.length },
              { key: "gallery" as const, label: "Galería", icon: Images, count: gallery.length },
              { key: "reviews" as const, label: "Reseñas", icon: MessageSquare, count: reviews.length },
              { key: "contact" as const, label: "Contacto", icon: Phone },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {typeof tab.count === "number" && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-primary/10" : "bg-muted"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {/* PRODUCTS TAB */}
          {activeTab === "products" && (
            <>
              {products.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground border border-border rounded-xl">
                  Este proveedor aún no tiene servicios publicados.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* INVENTORY TAB */}
          {activeTab === "inventory" && (
            <div className="border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b border-border">
                      <th className="text-left px-4 py-3 font-medium">Artículo</th>
                      <th className="text-left px-4 py-3 font-medium">Categoría</th>
                      <th className="text-left px-4 py-3 font-medium">Estado</th>
                      <th className="text-left px-4 py-3 font-medium">Cantidad</th>
                      <th className="text-left px-4 py-3 font-medium">Precio</th>
                      <th className="text-left px-4 py-3 font-medium">Disponible</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted shrink-0">
                              <Image src={item.image} alt={item.name} width={40} height={40} className="object-cover w-full h-full" />
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                            item.condition === "Nuevo" ? "bg-green-100 text-green-700" :
                            item.condition === "Excelente" ? "bg-blue-100 text-blue-700" :
                            item.condition === "Bueno" ? "bg-yellow-100 text-yellow-700" :
                            "bg-gray-100 text-gray-600"
                          }`}>
                            <CheckCircle2 className="w-3 h-3" />
                            {item.condition}
                          </span>
                        </td>
                        <td className="px-4 py-3">{item.quantity} {item.unit}</td>
                        <td className="px-4 py-3 font-medium">
                          {formatCurrency(item.price_gtq, "GTQ")}
                          <span className="text-muted-foreground text-xs ml-1">
                            / {item.unit}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {item.available ? (
                            <span className="inline-flex items-center gap-1 text-xs text-green-600">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              Sí
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs text-red-500">
                              <div className="w-2 h-2 rounded-full bg-red-500" />
                              No
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === "gallery" && (
            <div className="space-y-8">
              {gallery.map((event) => (
                <div key={event.id} className="border border-border rounded-xl overflow-hidden">
                  <div className="p-4 sm:p-5 border-b border-border bg-card">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-base">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {event.guest_count} invitados
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-3">
                    {event.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightboxImage(img)}
                        className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                      >
                        <Image src={img} alt={`${event.title} ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {gallery.length === 0 && (
                <div className="text-center py-16 text-muted-foreground border border-border rounded-xl">
                  Este proveedor aún no ha compartido fotos de eventos pasados.
                </div>
              )}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === "reviews" && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Rating summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                  <div className="text-center">
                    <div className="text-5xl font-bold">{avgRating}</div>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-5 h-5 ${s <= Math.round(Number(avgRating)) ? "fill-yellow-500 text-yellow-500" : "text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Basado en {reviews.length} reseñas</p>
                  </div>

                  <div className="mt-6 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = ratingCounts[stars as keyof typeof ratingCounts] || 0;
                      const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
                      return (
                        <div key={stars} className="flex items-center gap-3 text-sm">
                          <span className="w-3 text-muted-foreground">{stars}</span>
                          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Review list */}
              <div className="lg:col-span-2 space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                          <Image src={review.avatar} alt={review.author} width={40} height={40} className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{review.author}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{review.date}</span>
                            {review.verified && (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle2 className="w-3 h-3" />
                                Verificado
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-semibold">{review.rating}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">{review.event_type}</Badge>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed">{review.comment}</p>

                    {review.photos.length > 0 && (
                      <div className="mt-3 flex gap-2">
                        {review.photos.map((photo, idx) => (
                          <button
                            key={idx}
                            onClick={() => setLightboxImage(photo)}
                            className="relative w-20 h-20 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                          >
                            <Image src={photo} alt={`Review photo ${idx + 1}`} fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-border flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        Útil ({review.helpful_count})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === "contact" && (
            <div className="max-w-xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold mt-4">Contactar a {provider.business_name}</h2>
                <p className="text-muted-foreground mt-2">
                  Responden en menos de 2 horas en promedio. Cotizá directo sin intermediarios.
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3.5 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Escribir por WhatsApp
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <a
                    href={`tel:${provider.phone}`}
                    className="flex items-center justify-center gap-3 w-full bg-card border border-border hover:bg-muted font-medium py-3.5 rounded-xl transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    Llamar al {provider.phone}
                  </a>

                  <a
                    href={`mailto:${provider.email}`}
                    className="flex items-center justify-center gap-3 w-full bg-card border border-border hover:bg-muted font-medium py-3.5 rounded-xl transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    Enviar email
                  </a>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-xl text-sm text-left space-y-2">
                  <p className="font-medium">💡 Tips para una cotización rápida:</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Indicá la fecha y hora del evento</li>
                    <li>Mencioná la cantidad de invitados aproximada</li>
                    <li>Describí el tipo de evento (boda, cumple, corporativo...)</li>
                    <li>Si tenés ubicación confirmada, ¡mejor!</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button className="absolute top-4 right-4 text-white p-2">
            <ChevronLeft className="w-8 h-8 rotate-180" />
          </button>
          <Image
            src={lightboxImage}
            alt="Galería"
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
