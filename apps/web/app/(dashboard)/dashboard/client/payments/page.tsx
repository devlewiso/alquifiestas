"use client";

import { CreditCard, Download, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const transactions = [
  { id: "pay-1", event: "Boda de María y Juan", amount_gtq: 12500, amount_usd: 1592, method: "Stripe", status: "paid", date: "2026-06-01" },
  { id: "pay-2", event: "Quinceañera de Lucía", amount_gtq: 4250, amount_usd: 541, method: "Banrural", status: "pending", date: "2026-06-05" },
  { id: "pay-3", event: "Evento Corporativo", amount_gtq: 15000, amount_usd: 1911, method: "Stripe", status: "paid", date: "2026-05-15" },
];

export default function ClientPaymentsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Pagos</h1>
        <p className="text-muted-foreground">Historial de transacciones y facturas</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <CreditCard className="w-5 h-5 text-primary mb-2" />
            <div className="text-2xl font-bold">{formatCurrency(31750, "GTQ")}</div>
            <div className="text-sm text-muted-foreground">Total pagado</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{formatCurrency(4250, "GTQ")}</div>
            <div className="text-sm text-muted-foreground">Pendiente</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">Transacciones</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de pagos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((t) => (
              <div key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-border gap-4">
                <div>
                  <p className="font-medium">{t.event}</p>
                  <p className="text-xs text-muted-foreground">{t.date} • {t.method}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(t.amount_gtq, "GTQ")}</p>
                    <p className="text-xs text-muted-foreground">{formatCurrency(t.amount_usd, "USD")}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                    t.status === "paid" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"
                  }`}>
                    {t.status === "paid" ? <CheckCircle className="w-3 h-3" /> : null}
                    {t.status === "paid" ? "Pagado" : "Pendiente"}
                  </span>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="w-3.5 h-3.5" />
                    Factura
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
