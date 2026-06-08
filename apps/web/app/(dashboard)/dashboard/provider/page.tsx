"use client";

import { TrendingUp, Calendar, DollarSign, Star, Package, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

const stats = [
  { label: "Ingresos este mes", value: formatCurrency(18500, "GTQ"), change: "+12%", icon: DollarSign },
  { label: "Eventos confirmados", value: "8", change: "+3 este mes", icon: Calendar },
  { label: "Nuevos leads", value: "24", change: "+8 esta semana", icon: Users },
  { label: "Rating promedio", value: "4.8", change: "127 reviews", icon: Star },
];

const recentEvents = [
  { title: "Boda Ramírez", date: "2026-06-15", amount: 4500, status: "confirmed" },
  { title: "Quinceañera López", date: "2026-06-20", amount: 3200, status: "confirmed" },
  { title: "Evento Corporate", date: "2026-06-10", amount: 5800, status: "completed" },
  { title: "Cumpleaños García", date: "2026-06-05", amount: 2100, status: "completed" },
];

export default function ProviderDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Resumen de tu negocio</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold mt-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Eventos recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.title} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{formatCurrency(event.amount, "GTQ")}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        event.status === "confirmed"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {event.status === "confirmed" ? "Confirmado" : "Completado"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {[
                { label: "Agregar nuevo producto", desc: "Publica un nuevo servicio", icon: Package },
                { label: "Ver calendario", desc: "Revisa tus fechas ocupadas", icon: Calendar },
                { label: "Ver pagos", desc: "Revisa tus ingresos", icon: DollarSign },
                { label: "Analíticas", desc: "Tendencias de tu negocio", icon: TrendingUp },
              ].map((action) => (
                <button
                  key={action.label}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                >
                  <action.icon className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
