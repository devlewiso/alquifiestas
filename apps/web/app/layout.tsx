import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SupabaseProvider from "@/components/providers/SupabaseProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Alquifiestas — Alquiler de equipos y servicios para eventos",
  description:
    "Conectamos proveedores de eventos con clientes en Guatemala y Centroamérica. Sillas, mesas, inflables, sonido, catering y más.",
  keywords: [
    "alquiler eventos",
    "sillas mesas",
    "inflables",
    "sonido",
    "catering",
    "Guatemala",
    "Centroamérica",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
