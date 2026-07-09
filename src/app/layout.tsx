import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://firdavsvip.uz"),
  title: { default: "FIRDAVS VIP — Dark Future Vision", template: "%s | FIRDAVS VIP" },
  description: "FIRDAVS — Cyber Security Student · Python & Telegram Bot Developer · AI Enthusiast from Uzbekistan. Dark Future Vision.",
  keywords: ["Firdavs VIP", "FirdavsVIP", "Cyber Security", "Telegram Bot", "Python", "AI", "Portfolio", "Uzbekistan"],
  authors: [{ name: "Firdavs", url: "https://t.me/FirdavsVIP" }],
  creator: "Firdavs VIP", publisher: "Firdavs VIP",
  openGraph: { type: "website", locale: "en_US", url: "/", siteName: "FIRDAVS VIP", title: "FIRDAVS VIP — Dark Future Vision", description: "Born in the shadows · Living without limits · Dark future vision." },
  twitter: { card: "summary_large_image", title: "FIRDAVS VIP — Dark Future Vision", description: "Cyber Security · Python · AI · Telegram Bots" },
  robots: { index: true, follow: true }, alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#050505", width: "device-width", initialScale: 1, maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${orbitron.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
