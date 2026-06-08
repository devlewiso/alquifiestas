export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-primary flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            Alquifiestas
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="/search" className="hover:text-primary transition-colors">Servicios</a>
            <a href="/providers" className="hover:text-primary transition-colors">Proveedores</a>
            <a href="/categories" className="hover:text-primary transition-colors">Categorías</a>
            <a href="/how-it-works" className="hover:text-primary transition-colors">Cómo funciona</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Iniciar sesión
            </a>
            <a
              href="/register"
              className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Registrarse
            </a>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
