"use client";

import { DollarSign, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const payouts = [
  { id: "po-1", event: "Boda Ramírez", amount_gtq: 3960, amount_usd: 505, status: "paid", date: "2026-06-16" },
  { id: "po-2", event: "Quinceañera López", amount_gtq: 2816, amount_usd: 359, status: "pending", date: "2026-06-21" },
  { id: "po-3", event: "Evento Corporate", amount_gtq: 5104, amount_usd: 650, status: "paid", date: "2026-06-11" },
  { id: "po-4", event: "Cumpleaños García", amount_gtq: 1848, amount_usd: 235, status: "paid", date: "2026-06-06" },
];

export default function ProviderPaymentsPage() {
  const totalPaid = payouts.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount_gtq, 0);
  const totalPending = payouts.filter((p) => p.status === "pending").reduce((s, p) => s + p.amount_gtq, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Pagos y retiros</h1>
        <p className="text-muted-foreground">Tus ingresos y payouts</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <DollarSign className="w-5 h-5 text-primary mb-2" />
            <div className="text-2xl font-bold">{formatCurrency(totalPaid, "GTQ")}</div>
            <div className="text-sm text-muted-foreground">Pagado este mes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{formatCurrency(totalPending, "GTQ")}</div>
            <div className="text-sm text-muted-foreground">Pendiente por pagar</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12%</div>
            <div className="text-sm text-muted-foreground">Comisión plataforma</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {payouts.map((p) => (
              <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border gap-4">
                <div>
                  <p className="font-medium">{p.event}</p>
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(p.amount_gtq, "GTQ")}</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(p.amount_usd, "USD")}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    p.status === "paid" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                  }`}>
                    {p.status === "paid" ? "Pagado" : "Pendiente"}
                  </span>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="w-3.5 h-3.5" />
                    Detalle
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
