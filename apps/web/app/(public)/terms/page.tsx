import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { standardContract } from "@/lib/seeds/contract";

export const metadata: Metadata = {
  title: "Términos de servicio — Alquifiestas",
  description: "Términos y condiciones de uso de la plataforma Alquifiestas para la contratación de servicios y alquiler de equipos para eventos en Guatemala.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Términos de servicio</h1>
        <p className="text-sm text-muted-foreground">
          Última actualización: 1 de junio de 2026
        </p>
      </div>

      <p className="text-muted-foreground leading-relaxed mb-8">
        Estos términos rigen el uso de la plataforma Alquifiestas. Al acceder, registrarte o contratar
        servicios a través de nuestro sitio, aceptás cumplir con las siguientes condiciones. Si no
        estás de acuerdo con alguno de ellos, te pedimos que no utilices la plataforma.
      </p>

      <div className="space-y-6">
        {standardContract.sections.map((section) => (
          <Card key={section.id} className="bg-background">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground leading-relaxed">
                {section.clauses.map((clause, clauseIndex) => (
                  <li key={clauseIndex} className="pl-1">
                    {clause}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Si tenés alguna duda sobre estos términos o necesitás reportar una disputa,
          contactanos a{" "}
          <a
            href="mailto:disputes@alquifiestas.com"
            className="text-primary underline underline-offset-4"
          >
            disputes@alquifiestas.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
