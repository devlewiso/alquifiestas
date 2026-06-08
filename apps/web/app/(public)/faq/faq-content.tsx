"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  title: string;
  items: FaqItem[];
};

const faqData: FaqCategory[] = [
  {
    title: "Clientes",
    items: [
      {
        question: "¿Cómo reservo un servicio?",
        answer:
          "Explora las categorías, elige el proveedor que se ajuste a tu evento, selecciona la fecha y envía tu solicitud de reserva. El proveedor confirmará la disponibilidad y podrás proceder con el pago del depósito.",
      },
      {
        question: "¿El depósito es reembolsable?",
        answer:
          "El depósito es reembolsable si cancelas con al menos 7 días de anticipación según la política del proveedor. Cancelaciones con menos tiempo pueden aplicar penalizaciones.",
      },
      {
        question: "¿Qué pasa si el proveedor no llega?",
        answer:
          "Si el proveedor no cumple con el servicio, Alquifiestas te ayuda a gestionar una solución inmediata, ya sea encontrando un reemplazo o procesando un reembolso completo.",
      },
      {
        question: "¿Cómo sé que las reseñas son reales?",
        answer:
          "Solo los clientes que han completado una reserva y recibido el servicio pueden dejar reseñas. Cada calificación está vinculada a una transacción verificada en la plataforma.",
      },
      {
        question: "¿Puedo pagar en cuotas?",
        answer:
          "Sí, para reservas superiores a Q5,000 puedes solicitar pago a plazos. Las cuotas se acuerdan directamente con el proveedor y quedan registradas en tu contrato digital.",
      },
    ],
  },
  {
    title: "Proveedores",
    items: [
      {
        question: "¿Cómo me registro como proveedor?",
        answer:
          "Completa el formulario de registro de proveedor, sube tus documentos de identificación y comercial, y espera la verificación de nuestro equipo. El proceso suele tomar 1 a 2 días hábiles.",
      },
      {
        question: "¿Cuánto cobra Alquifiestas por reserva?",
        answer:
          "Alquifiestas retiene una comisión del 8% sobre el monto total de cada reserva confirmada. No hay costos de registro ni membresías mensuales.",
      },
      {
        question: "¿Cuándo recibo mi pago?",
        answer:
          "Recibes el 50% del depósito del cliente dentro de las 48 horas hábiles posteriores a la confirmación. El saldo restante se transfiere 24 horas después de que el evento se haya completado.",
      },
      {
        question: "¿Puedo rechazar una reserva?",
        answer:
          "Sí, puedes rechazar o aceptar cualquier solicitud según tu disponibilidad. Te recomendamos mantener tu calendario actualizado para evitar solicitudes en fechas ocupadas.",
      },
    ],
  },
  {
    title: "Pagos",
    items: [
      {
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos transferencia bancaria, depósito, tarjeta de crédito y débito, y pagos mediante PayPal. Todos los métodos están procesados de forma segura dentro de la plataforma.",
      },
      {
        question: "¿Es seguro pagar por la plataforma?",
        answer:
          "Sí, utilizamos cifrado SSL y pasarelas de pago certificadas. Tu dinero se mantiene en custodia hasta que el servicio se completa, protegiendo tanto al cliente como al proveedor.",
      },
    ],
  },
  {
    title: "Reservas",
    items: [
      {
        question: "¿Puedo modificar mi reserva?",
        answer:
          "Puedes solicitar modificaciones de fecha o servicio hasta 72 horas antes del evento. Los cambios están sujetos a la disponibilidad del proveedor y pueden generar ajustes de precio.",
      },
      {
        question: "¿Qué pasa si necesito cancelar?",
        answer:
          "Las cancelaciones con más de 7 días de anticipación recuperan el 100% del depósito. Entre 3 y 7 días se retiene el 50%. Con menos de 72 horas, el depósito no es reembolsable.",
      },
    ],
  },
  {
    title: "Seguridad",
    items: [
      {
        question: "¿Cómo protegen mi información?",
        answer:
          "Tu información personal y financiera está cifrada con estándares bancarios. No compartimos tus datos con terceros y cumplimos con la Ley de Protección de Datos Personales de Guatemala.",
      },
      {
        question: "¿Qué es el contrato digital?",
        answer:
          "Es un acuerdo firmado electrónicamente entre cliente y proveedor que detalla los servicios, precios, fechas y condiciones de cancelación. Tiene validez legal en Guatemala.",
      },
      {
        question: "¿Cómo manejan las disputas?",
        answer:
          "Si surge un conflicto, nuestro equipo de mediación interviene para buscar una solución justa. En casos complejos, activamos el fondo de garantía para compensar al cliente si corresponde.",
      },
    ],
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex w-full items-center justify-between py-4 text-left transition-colors",
          "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg px-2 -mx-2"
        )}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-sm sm:text-base pr-4">{item.question}</span>
        <span className="shrink-0 text-muted-foreground">
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-muted-foreground leading-relaxed px-2">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: FaqCategory }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <h2 className="text-xl font-semibold">{category.title}</h2>
      </CardHeader>
      <CardContent className="pt-0">
        {category.items.map((item, idx) => (
          <AccordionItem
            key={idx}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default function FaqContent() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Preguntas frecuentes</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Resolvemos tus dudas sobre cómo funciona Alquifiestas para clientes y proveedores en Guatemala.
        </p>
      </div>
      <div className="space-y-8">
        {faqData.map((category) => (
          <CategoryCard key={category.title} category={category} />
        ))}
      </div>
    </div>
  );
}
