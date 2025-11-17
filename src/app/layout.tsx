import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FunnelIA - Generador Automático de Funnels de Ventas con IA",
  description: "Genera estrategias de funnels de ventas personalizadas utilizando IA y metodologías expertas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
