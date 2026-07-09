import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://firdavsvip.example.com"),
  title: { default: "FIRDAVS VIP — Cyber Portfolio", template: "%s | FIRDAVS VIP" },
  description: "FIRDAVS VIP — Cyber Security Student, Python & Telegram Bot Developer, AI Enthusiast from Uzbekistan. Dark future vision.",
  keywords: ["Firdavs VIP", "Cyber Security", "Telegram Bot Developer", "Python", "AI", "Uzbekistan", "Portfolio"],
  authors: [{ name: "Firdavs" }, { url: "https://t.me/FirdavsVIP" }],
  creator: "FIRDAVS VIP",
  openGraph: {
    type: "website", locale: "en_US", url: "/",
    title: "FIRDAVS VIP — Cyber Portfolio",
    description: "Born in the shadows, living without limits, dark future vision.",
    siteName: "FIRDAVS VIP",
  },
  twitter: { card: "summary_large_image", title: "FIRDAVS VIP — Cyber Portfolio", description: "Cyber Security · Python · AI · Telegram Bots" },
  robots: { index: true, follow: true },
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
