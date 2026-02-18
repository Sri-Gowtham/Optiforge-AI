import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OptiForge AI — Design Optimization Platform",
  description:
    "AI-powered product design optimization. Analyze, iterate, and optimize your designs with intelligent insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-bg-page text-text-dark min-h-screen">
        {children}
      </body>
    </html>
  );
}
