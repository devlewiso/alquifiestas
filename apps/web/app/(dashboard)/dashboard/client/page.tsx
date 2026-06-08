"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Calendar, MapPin, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";

const mockEvents = [
  {
    id: "evt-1",
    title: "Boda de María y Juan",
    event_date: "2026-07-15",
    location: "Antigua Guatemala",
    status: "confirmed" as const,
    total_gtq: 12500,
    items: 4,
  },
  {
    id: "evt-2",
    title: "Quinceañera de Lucía",
    event_date: "2026-08-22",
    location: "Zona 10, Ciudad de Guatemala",
    status: "draft" as const,
    total_gtq: 8500,
    items: 3,
  },
  {
    id: "evt-3",
    title: "Evento Corporativo NeuralCodeLab",
    event_date: "2026-06-20",
    location: "Zona 14, Ciudad de Guatemala",
    status: "completed" as const,
    total_gtq: 15000,
    items: 6,
  },
];

const statusMap = {
  draft: { label: "Borrador", variant: "secondary" as const },
  confirmed: { label: "Confirmado", variant: "default" as const },
  completed: { label: "Completado", variant: "verified" as const },
  cancelled: { label: "Cancelado", variant: "destructive" as const },
};

export default function ClientDashboardPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filtered = mockEvents.filter((e) => {
    if (filter === "upcoming") return e.status === "confirmed" || e.status === "draft";
    if (filter === "past") return e.status === "completed";
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Mis eventos</h1>
          <p className="text-muted-foreground">Gestiona tus reservas y eventos</p>
        </div>
        <Link href="/dashboard/client/bookings/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo evento
          </Button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">3</div>
            <div className="text-sm text-muted-foreground">Eventos totales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{formatCurrency(21000, "GTQ")}</div>
            <div className="text-sm text-muted-foreground">Invertido este año</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">2</div>
            <div className="text-sm text-muted-foreground">Próximos eventos</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 mb-6">
        {(["all", "upcoming", "past"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              filter === f ? "bg-primary text-white border-primary" : "border-border hover:border-primary/50"
            }`}
          >
              {f === "all" ? "Todos" : f === "upcoming" ? "Próximos" : "Pasados"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((event) => (
          <Card key={event.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{event.title}</h3>
                    <Badge variant={statusMap[event.status].variant}>{statusMap[event.status].label}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(event.event_date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {event.items} proveedores
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(event.total_gtq, "GTQ")}</div>
                    <div className="text-xs text-muted-foreground">{formatCurrency(event.total_gtq / 7.85, "USD")}</div>
                  </div>
                  <Link href={`/dashboard/client/events/${event.id}`}>
                    <ChevronRight className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
