
import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Entrestate DM AI",
  description: "Turn your Instagram DMs into a real estate expert."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
