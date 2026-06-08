import { Metadata } from "next";
import {
  Fingerprint,
  Eye,
  Share2,
  Lock,
  Cookie,
  UserCheck,
  Archive,
  Bell,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Política de privacidad — Alquifiestas",
  description:
    "Conocé cómo Alquifiestas recopila, usa y protege tu información personal.",
};

const sections = [
  {
    icon: Fingerprint,
    title: "Información que recopilamos",
    content:
      "Recopilamos los datos necesarios para conectar clientes y proveedores de eventos: nombre completo, correo electrónico, número de teléfono, detalles del evento (tipo, fecha, ubicación) y preferencias de búsqueda. Si sos proveedor, también solicitamos información comercial como el nombre del negocio, descripción de servicios, área de cobertura y datos bancarios para los depósitos de garantía.",
  },
  {
    icon: Eye,
    title: "Cómo usamos tu información",
    content:
      "Usamos tu información para conectar clientes con los proveedores adecuados, procesar pagos y depósitos de garantía, enviar notificaciones sobre reservas y mensajes, mejorar nuestros servicios mediante análisis de uso, y prevenir fraudes o actividades no autorizadas. Nunca usamos tus datos para fines ajenos a la plataforma sin tu consentimiento explícito.",
  },
  {
    icon: Share2,
    title: "Compartir información",
    content:
      "Tu información se comparte únicamente entre las partes involucradas en una reserva: el cliente y el proveedor del servicio. No vendemos, alquilamos ni comercializamos tus datos personales con terceros ajenos a la plataforma. En casos específicos, podemos compartir información con proveedores de servicios de pago o autoridades competentes cuando la ley lo requiera.",
  },
  {
    icon: Lock,
    title: "Seguridad",
    content:
      "Implementamos medidas de seguridad robustas para proteger tu información: encriptación SSL/TLS en todas las comunicaciones, almacenamiento seguro en Supabase con controles de acceso estrictos, y protección de depósitos de garantía mediante procesos de escrow. Realizamos auditorías de seguridad periódicas y capacitamos a nuestro equipo en mejores prácticas de protección de datos.",
  },
  {
    icon: Cookie,
    title: "Cookies",
    content:
      "Utilizamos cookies y tecnologías similares para mejorar tu experiencia: cookies de sesión para mantenerte autenticado, cookies de preferencias para recordar tus filtros de búsqueda y configuraciones, y cookies de análisis para entender cómo se usa la plataforma y optimizar su rendimiento. Podés gestionar tus preferencias de cookies desde la configuración de tu navegador en cualquier momento.",
  },
  {
    icon: UserCheck,
    title: "Tus derechos",
    content:
      "Tenés derecho a acceder, corregir, eliminar o portar tu información personal. Para ejercer estos derechos, envianos un correo a privacy@alquifiestas.com con el asunto 'Solicitud de derechos ARCO'. Respondemos dentro de los 15 días hábiles siguientes a la recepción de tu solicitud. También podés darte de baja de las comunicaciones promocionales desde el enlace incluido en cada correo.",
  },
  {
    icon: Archive,
    title: "Retención",
    content:
      "Conservamos tu información personal mientras mantengas una cuenta activa en la plataforma o mientras sea necesario para cumplir con obligaciones legales y contables. Una vez que tu cuenta se cierra o que los plazos legales expiran, tus datos se anonimizan o eliminan de forma segura. Los registros de transacciones se conservan por el período exigido por la legislación guatemalteca vigente.",
  },
  {
    icon: Bell,
    title: "Cambios a esta política",
    content:
      "Podemos actualizar esta política de privacidad para reflejar cambios en nuestros servicios o en la legislación aplicable. Para cambios materiales que afecten significativamente tus derechos, te notificaremos por correo electrónico con al menos 30 días de anticipación. Los cambios menores se publicarán en esta página con la fecha de actualización correspondiente.",
  },
  {
    icon: Mail,
    title: "Contacto",
    content:
      "Si tenés preguntas, inquietudes o solicitudes relacionadas con esta política de privacidad o con el tratamiento de tus datos personales, contactanos a privacy@alquifiestas.com. Nos comprometemos a responder tus consultas de manera clara y oportuna.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Política de privacidad
        </h1>
        <p className="text-muted-foreground">
          Última actualización: 1 de junio de 2026
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title} className="bg-background">
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
