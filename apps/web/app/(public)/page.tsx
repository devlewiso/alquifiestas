import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-background dark:from-primary-950/20 dark:to-background py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Todo para tu evento,{" "}
            <span className="text-primary">en un solo lugar</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Conectamos proveedores de sillas, mesas, inflables, sonido, catering y
            más con clientes en Guatemala y Centroamérica. Ahorra tiempo, compara
            precios y reserva con confianza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="inline-flex items-center justify-center bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-600 transition-colors text-lg"
            >
              Buscar proveedores
            </Link>
            <Link
              href="/register/provider"
              className="inline-flex items-center justify-center border-2 border-primary text-primary font-semibold px-8 py-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/30 transition-colors text-lg"
            >
              Soy proveedor
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { value: "500+", label: "Proveedores" },
              { value: "10,000+", label: "Eventos" },
              { value: "GTQ + USD", label: "Pagos" },
              { value: "24h", label: "Soporte" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-20 bg-surface-light dark:bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Cómo funciona
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Busca",
                desc: "Encuentra sillas, mesas, inflables, sonido y más cerca de ti.",
              },
              {
                step: "2",
                title: "Reserva",
                desc: "Compara precios en GTQ o USD, reserva y paga seguro.",
              },
              {
                step: "3",
                title: "Celebra",
                desc: "El proveedor llega a tu evento. Tú disfrutas sin estrés.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-background dark:bg-background/50 border border-border/10 rounded-2xl p-8 text-center"
              >
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Proveedores */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Eres proveedor de eventos?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Únete a la red de proveedores de Alquifiestas y llega a más clientes en
            Guatemala y Centroamérica. Gestiona tu inventario, calendario y
            pagos en un solo lugar.
          </p>
          <Link
            href="/register/provider"
            className="inline-flex items-center justify-center bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary-600 transition-colors text-lg"
          >
            Registrarme como proveedor
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Alquifiestas — Hecho con ❤️ en Guatemala
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
