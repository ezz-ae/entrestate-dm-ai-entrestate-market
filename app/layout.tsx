import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Entrestate DM AI",
  description: "Turn your Instagram DMs into a real estate expert."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
