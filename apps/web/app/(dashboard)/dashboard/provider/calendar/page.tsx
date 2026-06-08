"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockBookings = [
  { date: "2026-06-15", title: "Boda Ramírez", time: "14:00 - 22:00", status: "confirmed" },
  { date: "2026-06-20", title: "Quinceañera López", time: "16:00 - 23:00", status: "confirmed" },
  { date: "2026-06-10", title: "Evento Corporate", time: "09:00 - 14:00", status: "completed" },
  { date: "2026-06-28", title: "Cumpleaños García", time: "13:00 - 18:00", status: "pending" },
];

export default function ProviderCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // June 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const bookingsForDay = (day: number) =>
    mockBookings.filter((b) => {
      const d = new Date(b.date);
      return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
    });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Calendario</h1>
        <p className="text-muted-foreground">Tus fechas reservadas y disponibilidad</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" />
              {monthNames[month]} {year}
            </CardTitle>
            <div className="flex gap-1">
              <button
                onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
                className="p-1 rounded hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
                className="p-1 rounded hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
                <div key={d} className="font-medium text-muted-foreground py-2">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {blanks.map((i) => (
                <div key={`blank-${i}`} className="aspect-square" />
              ))}
              {days.map((day) => {
                const bookings = bookingsForDay(day);
                return (
                  <div
                    key={day}
                    className={cn(
                      "aspect-square rounded-lg border border-border p-1 flex flex-col items-center justify-start cursor-pointer hover:border-primary/50 transition-colors",
                      bookings.length > 0 && "bg-primary/5 border-primary/20"
                    )}
                  >
                    <span className={cn("text-sm font-medium", bookings.length > 0 && "text-primary")}>{day}</span>
                    {bookings.length > 0 && (
                      <div className="mt-1 flex flex-col gap-0.5 w-full">
                        {bookings.map((b) => (
                          <div
                            key={b.title}
                            className={cn(
                              "text-[10px] px-1 py-0.5 rounded truncate w-full",
                              b.status === "confirmed" && "bg-primary/20 text-primary",
                              b.status === "completed" && "bg-muted text-muted-foreground",
                              b.status === "pending" && "bg-yellow-100 text-yellow-700"
                            )}
                          >
                            {b.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming events list */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockBookings.map((booking) => (
                <div key={booking.title} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{booking.title}</p>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "default"
                          : booking.status === "completed"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {booking.status === "confirmed" ? "Confirmado" : booking.status === "completed" ? "Completado" : "Pendiente"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{booking.date} • {booking.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
