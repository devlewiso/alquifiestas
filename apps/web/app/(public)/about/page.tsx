import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shield, Eye, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nosotros — Alquifiestas",
  description: "Conocé la historia, misión y equipo detrás de Alquifiestas, el marketplace líder de servicios para eventos en Guatemala.",
};

const stats = [
  { value: "100+", label: "Proveedores" },
  { value: "50+", label: "Ciudades" },
  { value: "1000+", label: "Eventos" },
  { value: formatCurrency(8000000, "GTQ"), label: "Meta de transacciones" },
];

const values = [
  {
    icon: Shield,
    title: "Confianza",
    description: "Verificamos cada proveedor para que contrates con total seguridad y tranquilidad.",
  },
  {
    icon: Eye,
    title: "Transparencia",
    description: "Precios claros, sin letras chiquitas. Sabés exactamente qué pagás y qué recibís.",
  },
  {
    icon: Users,
    title: "Comunidad",
    description: "Creemos en conectar personas. Cada evento fortalece la red de emprendedores locales.",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description: "Usamos tecnología para simplificar lo complejo: organizar un evento debería ser fácil.",
  },
];

const team = [
  {
    name: "Carlos Lemus",
    role: "Co-fundador & CEO",
    avatar: "/images/avatar1.jpg",
  },
  {
    name: "Ana Marroquín",
    role: "Co-fundadora & COO",
    avatar: "/images/avatar2.jpg",
  },
  {
    name: "Luis Castillo",
    role: "Co-fundador & CTO",
    avatar: "/images/avatar3.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Hero */}
      <section className="text-center space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          Transformando eventos en Guatemala
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Nuestra misión es conectar a los mejores proveedores de servicios para eventos con
          personas que sueñan en grande. Desde una boda íntima hasta un festival corporativo,
          hacemos que cada celebración sea inolvidable.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Story */}
      <section className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Nuestra historia</h2>
        <p className="text-muted-foreground leading-relaxed">
          Alquifiestas nació en 2025 con una idea simple: organizar un evento no debería ser
          un dolor de cabeza. Empezamos conectando proveedores locales de la Ciudad de
          Guatemala y poco a poco expandimos nuestra red a más de 50 ciudades en Guatemala y
          Centroamérica. Hoy somos el punto de encuentro entre quienes ofrecen servicios para
          eventos y quienes los necesitan.
        </p>
      </section>

      {/* Values */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Nuestros valores</h2>
          <p className="text-muted-foreground">Lo que nos mueve todos los días</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <Card key={value.title} className="bg-background">
                <CardHeader className="flex flex-col items-center text-center space-y-3 pb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardContent className="p-0 space-y-1">
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">El equipo</h2>
          <p className="text-muted-foreground">Las personas que hacen magia detrás del telón</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="text-center">
              <CardContent className="p-6 space-y-4">
                <div className="relative h-24 w-24 mx-auto rounded-full overflow-hidden border border-border">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold">¿Tenés un servicio para eventos?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Unite a nuestra red de proveedores y empezá a recibir reservas desde todo el país.
          Es gratis registrarse.
        </p>
        <Link href="/register">
          <Button size="lg">Registrate como proveedor</Button>
        </Link>
      </section>
    </div>
  );
}
