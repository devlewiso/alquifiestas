"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { refresh, signOut, user, profile, isLoading } = useAuth();

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  const isProvider = profile?.role === "provider";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link
            href="/"
            className="text-xl font-bold text-primary flex items-center gap-2"
          >
            <span className="text-2xl">🎉</span>
            Alquifiestas
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {isProvider ? (
            <>
              <NavLink href="/dashboard/provider" icon="📊">
                Dashboard
              </NavLink>
              <NavLink href="/dashboard/provider/calendar" icon="📅">
                Calendario
              </NavLink>
              <NavLink href="/dashboard/provider/products" icon="🎁">
                Productos
              </NavLink>
              <NavLink href="/dashboard/provider/events" icon="🎉">
                Eventos
              </NavLink>
              <NavLink href="/dashboard/provider/payments" icon="💰">
                Pagos
              </NavLink>
            </>
          ) : (
            <>
              <NavLink href="/dashboard/client" icon="🎉">
                Mis eventos
              </NavLink>
              <NavLink href="/dashboard/client/bookings/new" icon="➕">
                Nuevo evento
              </NavLink>
              <NavLink href="/dashboard/client/payments" icon="💳">
                Pagos
              </NavLink>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="mb-4 px-3 py-2 text-sm">
            <p className="font-medium truncate">{profile?.full_name || user.email}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {profile?.role || "client"}
            </p>
          </div>
          <button
            onClick={signOut}
            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex-1 flex flex-col md:ml-0">
        <header className="md:hidden border-b border-border bg-card p-4 flex items-center justify-between">
          <Link href="/" className="font-bold text-primary">
            Alquifiestas
          </Link>
          <button
            onClick={signOut}
            className="text-sm text-red-600"
          >
            Salir
          </button>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      <span>{icon}</span>
      {children}
    </Link>
  );
}
