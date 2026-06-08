import { Metadata } from "next";
import {
  Search,
  GitCompare,
  CalendarCheck,
  PartyPopper,
  UserPlus,
  PackagePlus,
  Inbox,
  TrendingUp,
  ShieldCheck,
  FileText,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Cómo funciona — Alquifiestas",
  description:
    "Descubre cómo Alquifiestas conecta clientes con proveedores de eventos en Guatemala. Reserva equipos y servicios de forma segura.",
};

const clientSteps = [
  {
    icon: Search,
    title: "Buscar",
    description: "Encuentra equipos y servicios para tu evento cerca de ti.",
  },
  {
    icon: GitCompare,
    title: "Comparar",
    description: "Revisa calificaciones, precios y reseñas de otros clientes.",
  },
  {
    icon: CalendarCheck,
    title: "Reservar",
    description: "Apartalo con un depósito del 30% y protege tu fecha.",
  },
  {
    icon: PartyPopper,
    title: "Celebrar",
    description: "Disfruta tu evento y paga el saldo el día de la entrega.",
  },
];

const providerSteps = [
  {
    icon: UserPlus,
    title: "Registrarse",
    description: "Crea tu perfil de proveedor en minutos.",
  },
  {
    icon: PackagePlus,
    title: "Publicar",
    description: "Agrega tus productos, servicios e inventario disponible.",
  },
  {
    icon: Inbox,
    title: "Recibir reservas",
    description: "Recibe solicitudes de reserva directamente en tu panel.",
  },
  {
    icon: TrendingUp,
    title: "Crecer",
    description: "Construye reputación con reseñas verificadas de clientes.",
  },
];

const trustCards = [
  {
    icon: ShieldCheck,
    title: "Depósito protegido",
    description:
      "Tu depósito se mantiene seguro hasta que recibas el servicio contratado.",
  },
  {
    icon: FileText,
    title: "Contrato digital",
    description:
      "Cada reserva genera un contrato digital con los términos acordados.",
  },
  {
    icon: Star,
    title: "Reseñas verificadas",
    description:
      "Solo los clientes que completaron una reserva pueden dejar reseñas.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Cómo funciona</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Alquifiestas conecta a clientes que organizan eventos con proveedores
          de equipos y servicios en Guatemala. Así es como funciona para cada
          lado.
        </p>
      </div>

      {/* Para Clientes */}
      <section className="mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Para Clientes
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.title}
                className="border-border rounded-xl bg-card text-card-foreground shadow-sm"
              >
                <CardHeader className="pb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Para Proveedores */}
      <section className="mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Para Proveedores
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {providerSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={step.title}
                className="border-border rounded-xl bg-card text-card-foreground shadow-sm"
              >
                <CardHeader className="pb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Confianza */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          Reserva con confianza
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.title}
                className="border-border rounded-xl bg-card text-card-foreground shadow-sm"
              >
                <CardHeader className="pb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
