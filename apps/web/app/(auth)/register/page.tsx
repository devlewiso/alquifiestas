"use client";

import { useState } from "react";
import Link from "next/link";
import { useSupabase } from "@/components/providers/SupabaseProvider";

export default function RegisterPage() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"client" | "provider">("client");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else if (data.user) {
      // Create profile
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await supabase.from("profiles").insert({
        id: data.user.id,
        email,
        full_name: fullName,
        role,
        preferred_currency: "GTQ",
      } as any);

      window.location.href = "/dashboard";
    }

    setLoading(false);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
      <h1 className="text-2xl font-bold mb-2">Crear cuenta</h1>
      <p className="text-muted-foreground mb-6">
        Únete a Alquifiestas para reservar o ofrecer servicios de eventos.
      </p>

      {error && (
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre completo</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Juan Pérez"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Correo electrónico</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="••••••••"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Mínimo 6 caracteres
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("client")}
            className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              role === "client"
                ? "bg-primary text-white border-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            Soy cliente
          </button>
          <button
            type="button"
            onClick={() => setRole("provider")}
            className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${
              role === "provider"
                ? "bg-primary text-white border-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            Soy proveedor
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-2.5 rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">¿Ya tienes cuenta?{" "}</span>
        <Link
          href="/login"
          className="text-primary font-medium hover:underline"
        >
          Inicia sesión
        </Link>
      </div>
    </div>
  );
}
