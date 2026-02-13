import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Chooze",
  description: "Smart JoSAA Counselling Helper",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </main>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}