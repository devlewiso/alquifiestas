"use client";

import { useState } from "react";
import Link from "next/link";
import { seedBookings, type Booking } from "@/lib/seeds/bookings";
import { formatDate } from "@/lib/utils";

export default function ProviderEventsPage() {
  const [events] = useState<Booking[]>(seedBookings);
  const [filter, setFilter] = useState<
    "all" | "confirmed" | "pending" | "completed" | "cancelled" | "disputed"
  >("all");

  const filtered =
    filter === "all" ? events : events.filter((e) => e.status === filter);

  const statusLabel: Record<string, string> = {
    pending: "Pendiente",
    confirmed: "Confirmado",
    completed: "Completado",
    cancelled: "Cancelado",
    disputed: "Disputa",
  };

  const statusClass: Record<string, string> = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    confirmed:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    completed:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    cancelled:
      "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    disputed:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Mis eventos</h1>
        <div className="flex gap-2">
          {(
            [
              "all",
              "confirmed",
              "pending",
              "completed",
              "cancelled",
              "disputed",
            ] as const
          ).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "Todos" : statusLabel[f]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <p className="text-4xl mb-4">🎉</p>
          <h3 className="text-lg font-semibold mb-2">No hay eventos</h3>
          <p className="text-muted-foreground mb-6">
            Aún no tienes eventos{" "}
            {filter !== "all" ? `en estado "${statusLabel[filter]}"` : ""}.
          </p>
          <Link
            href="/dashboard/provider/calendar"
            className="inline-flex items-center justify-center bg-primary text-white font-medium px-5 py-2.5 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Ver calendario
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Evento</th>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Depósito</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((evt) => (
                  <tr
                    key={evt.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium">{evt.event_type}</p>
                      <p className="text-xs text-muted-foreground">
                        {evt.guest_count} invitados
                      </p>
                    </td>
                    <td className="px-4 py-3">{evt.client_name}</td>
                    <td className="px-4 py-3">
                      {formatDate(evt.event_date)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusClass[evt.status]}`}
                      >
                        {statusLabel[evt.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-green-600 dark:text-green-400">
                        Q{evt.deposit_gtq.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
