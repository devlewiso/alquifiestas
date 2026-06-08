import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MessageCircle,
  Mail,
  Clock,
  MapPin,
  Share2,
  Send,
  ChevronDown,
} from "lucide-react";

export const metadata = {
  title: "Contacto — Alquifiestas",
  description:
    "Contáctanos por WhatsApp, email o llena el formulario. Estamos para ayudarte con tu evento en Guatemala.",
};

const faqs = [
  {
    question: "¿Cuánto tiempo antes debo reservar?",
    answer:
      "Recomendamos reservar con al menos 2 semanas de anticipación para asegurar disponibilidad, especialmente en temporada alta (noviembre–enero y mayo–agosto).",
  },
  {
    question: "¿Puedo visitar los productos antes de rentar?",
    answer:
      "Sí. Coordinamos citas presenciales en Ciudad de Guatemala para que veas el mobiliario, decoración y equipo antes de confirmar tu reserva.",
  },
  {
    question: "¿Cuáles son las políticas de cancelación?",
    answer:
      "Puedes cancelar sin penalización hasta 7 días antes del evento. Cancelaciones entre 3 y 6 días tienen un cargo del 25 %. Menos de 3 días no aplica reembolso.",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contacto</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          ¿Tienes dudas o quieres cotizar? Escríbenos y te respondemos lo antes
          posible.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Form */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Envíanos un mensaje</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" action="#" method="POST">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="hola@ejemplo.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefono">Teléfono</Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  placeholder="+502 5555-0000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo de usuario</Label>
                <Select name="tipo">
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cliente">Cliente</SelectItem>
                    <SelectItem value="proveedor">Proveedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder="¿En qué podemos ayudarte?"
                  rows={5}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Enviar mensaje
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right: Info */}
        <div className="space-y-6">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 shadow-sm">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="rounded-lg bg-green-100 dark:bg-green-900 p-3 shrink-0">
                <MessageCircle className="w-5 h-5 text-green-700 dark:text-green-300" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  WhatsApp
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                  +502 5555-0000
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 shadow-sm">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="rounded-lg bg-blue-100 dark:bg-blue-900 p-3 shrink-0">
                <Mail className="w-5 h-5 text-blue-700 dark:text-blue-300" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Correo electrónico
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  hola@alquifiestas.com
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 shadow-sm">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="rounded-lg bg-amber-100 dark:bg-amber-900 p-3 shrink-0">
                <Clock className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">
                  Horario de atención
                </h3>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                  Lunes a Viernes 8am–6pm
                  <br />
                  Sábados 9am–2pm
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="rounded-lg bg-muted p-3 shrink-0">
                <MapPin className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Ubicación</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Ciudad de Guatemala, Guatemala
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Social links */}
          <div className="flex items-center gap-3 pt-2">
            <span className="text-sm text-muted-foreground">
              Síguenos:
            </span>
            <Button variant="outline" size="icon" aria-label="Facebook">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Instagram">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="TikTok">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* FAQ mini-section */}
      <div className="mt-16 max-w-3xl">
        <h2 className="text-2xl font-bold mb-6">
          Preguntas frecuentes
        </h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border bg-background shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between p-4 font-medium select-none">
                {faq.question}
                <ChevronDown className="w-4 h-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
