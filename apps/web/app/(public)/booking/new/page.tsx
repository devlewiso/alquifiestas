"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  CreditCard,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { seedProducts } from "@/lib/seeds/products";
import { seedProviders } from "@/lib/seeds/providers";
import { standardContract } from "@/lib/seeds/contract";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

function BookingForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const providerId = searchParams.get("provider");

  const product = productId ? seedProducts.find((p) => p.id === productId) : null;
  const provider = providerId
    ? seedProviders.find((p) => p.id === providerId)
    : product
      ? seedProviders.find((p) => p.id === product.provider_id)
      : null;

  const [quantity, setQuantity] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [contractExpanded, setContractExpanded] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("Boda");
  const [guestCount, setGuestCount] = useState(50);
  const [eventLocation, setEventLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!provider) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">No se encontró el proveedor</h1>
        <p className="text-muted-foreground mt-2">Verificá los parámetros de la URL.</p>
        <Link href="/search" className="inline-block mt-4 text-primary hover:underline">
          Volver a buscar
        </Link>
      </div>
    );
  }

  const unitPriceGtq = product ? product.price_gtq : 0;
  const unitPriceUsd = product ? product.price_usd : 0;
  const totalGtq = unitPriceGtq * quantity;
  const totalUsd = unitPriceUsd * quantity;
  const depositGtq = Math.round(totalGtq * 0.3);
  const balanceGtq = totalGtq - depositGtq;

  const whatsappNumber = provider.phone.replace(/\D/g, "");
  const bookingSummary = product
    ? `Hola ${provider.business_name}, quiero reservar ${quantity}x "${product.name}" para mi ${eventType} el ${eventDate || "[fecha por confirmar]"} en ${eventLocation || "[lugar por confirmar]"}. ¿Confirmás disponibilidad?`
    : `Hola ${provider.business_name}, vi su perfil en Alquifiestas y quiero reservar para un evento. ¿Podemos coordinar?`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(bookingSummary)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mt-6">¡Reserva registrada!</h1>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Tu solicitud fue enviada a <strong>{provider.business_name}</strong>. Te contactarán en menos de 2 horas para confirmar disponibilidad y coordinar el pago del depósito.
        </p>
        <div className="mt-6 space-y-3 max-w-sm mx-auto">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Contactar por WhatsApp
          </a>
          <Link href={`/providers/${provider.id}`}>
            <Button variant="outline" className="w-full">Volver al perfil del proveedor</Button>
          </Link>
        </div>
        <div className="mt-8 p-4 bg-muted/50 rounded-xl text-sm text-left max-w-md mx-auto space-y-2">
          <p className="font-medium">📋 Próximos pasos:</p>
          <ol className="list-decimal list-inside text-muted-foreground space-y-1">
            <li>El proveedor confirma disponibilidad</li>
            <li>Firmás el contrato digital y pagás el depósito del 30%</li>
            <li>Alquifiestas retiene el depósito como garantía</li>
            <li>Después del evento, liberamos el pago al proveedor</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Breadcrumb */}
      <div className="pt-4 pb-2">
        <Link
          href={product ? `/product/${product.id}` : `/providers/${provider.id}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver
        </Link>
      </div>

      <h1 className="text-2xl font-bold mt-2">Reservar con {provider.business_name}</h1>
      <p className="text-muted-foreground text-sm">Completa los datos de tu evento. El depósito del 30% se paga después de confirmar disponibilidad.</p>

      <div className="grid lg:grid-cols-3 gap-8 mt-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event details */}
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h2 className="font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Datos del evento
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Fecha del evento</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Tipo de evento</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {["Boda", "Quinceañera", "Cumpleaños", "Evento Corporativo", "Bautizo", "Graduación", "Fiesta Privada", "Baby Shower"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Cantidad de invitados</label>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(10, guestCount - 10))}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center text-sm">{guestCount}</span>
                  <button
                    type="button"
                    onClick={() => setGuestCount(guestCount + 10)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Ubicación del evento</label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Ej: Jardín de Fray Bartolomé, Antigua"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Notas adicionales</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Horario específico, acceso al lugar, restricciones..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
            </div>
          </div>

          {/* Product / Service */}
          {product && (
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <h2 className="font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Servicio seleccionado
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                  <Image src={product.images[0]} alt={product.name} width={80} height={80} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.provider_name}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {product.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-sm text-muted-foreground">Cantidad:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-muted transition-colors">
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-muted transition-colors">
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-baseline justify-end gap-2 pt-1">
                <span className="text-lg font-bold text-primary">{formatCurrency(totalGtq, "GTQ")}</span>
                <span className="text-sm text-muted-foreground">/ {product.unit}</span>
              </div>
            </div>
          )}

          {/* Contract */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setContractExpanded(!contractExpanded)}
              className="w-full flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-semibold">Contrato de servicios</span>
              </div>
              {contractExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {contractExpanded && (
              <div className="px-5 pb-5 space-y-4 max-h-[500px] overflow-y-auto">
                <p className="text-sm text-muted-foreground">{standardContract.title} — v{standardContract.version}</p>
                {standardContract.sections.map((section) => (
                  <div key={section.id} className="space-y-2">
                    <h3 className="text-sm font-semibold">{section.title}</h3>
                    <ul className="space-y-1.5">
                      {section.clauses.map((clause, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground pl-4 relative">
                          <span className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-primary/50" />
                          {clause}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Accept terms */}
          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-primary/20"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
              He leído y acepto los <span className="text-foreground font-medium">términos del contrato</span>, incluyendo la política de cancelación, responsabilidad de daños y mediación de disputas por Alquifiestas.
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              disabled={!termsAccepted || !eventDate}
              className="w-full py-3 text-base gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Solicitar reserva
            </Button>
            {!termsAccepted && (
              <p className="text-xs text-amber-600 mt-2 text-center">Debés aceptar los términos para continuar.</p>
            )}
          </form>
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-24 space-y-4">
            <h2 className="font-semibold">Resumen de la reserva</h2>

            {/* Provider mini card */}
            <div className="flex items-center gap-3 pb-4 border-b border-border">
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted shrink-0">
                <Image src={provider.image_url} alt={provider.business_name} width={48} height={48} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="font-medium text-sm">{provider.business_name}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ShieldCheck className="w-3 h-3 text-green-600" />
                  Proveedor verificado
                </div>
              </div>
            </div>

            {product && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{product.name} x{quantity}</span>
                  <span>{formatCurrency(totalGtq, "GTQ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Depósito (30%)</span>
                  <span className="font-semibold text-primary">{formatCurrency(depositGtq, "GTQ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saldo al proveedor</span>
                  <span>{formatCurrency(balanceGtq, "GTQ")}</span>
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-border space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total estimado</span>
                <span className="font-bold text-lg">{formatCurrency(totalGtq, "GTQ")}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                ≈ {formatCurrency(totalUsd, "USD")} · El saldo se paga directo al proveedor el día del evento.
              </p>
            </div>

            {/* Trust badges */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Depósito protegido por Alquifiestas
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Contrato digital incluido
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 px-3 py-2 rounded-lg">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Cancelación flexible
              </div>
            </div>

            {/* Cancellation policy mini */}
            <div className="text-xs text-muted-foreground space-y-1 pt-2">
              <p className="font-medium text-foreground">Política de cancelación:</p>
              <p>• +15 días: reembolso 100%</p>
              <p>• 7–15 días: reembolso 50%</p>
              <p>• –7 días: no reembolsable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="max-w-2xl mx-auto py-20 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/2 mx-auto" />
            <div className="h-4 bg-muted rounded w-2/3 mx-auto" />
            <div className="h-32 bg-muted rounded" />
          </div>
        </div>
      }>
        <BookingForm />
      </Suspense>
    </div>
  );
}
