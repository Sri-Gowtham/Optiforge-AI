import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OptiForge AI - Design Optimization Platform",
  description: "AI-powered product design optimization platform for better designs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
