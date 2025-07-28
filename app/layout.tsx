import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senfio - Coletor de Cupons",
  description: "Coletor de cupons para o Senfio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
