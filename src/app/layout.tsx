import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/effects/SmoothScroll";
import ServiceWorkerInit from "@/components/effects/ServiceWorkerInit";
import KonamiCode from "@/components/effects/KonamiCode";
import VoiceGreeting from "@/components/effects/VoiceGreeting";
import CustomCursor from "@/components/effects/CustomCursor";
import MusicPlayer from "@/components/effects/MusicPlayer";
import CommandPalette from "@/components/effects/CommandPalette";
import VisitorCounter from "@/components/effects/VisitorCounter";
import HackerTyper from "@/components/effects/HackerTyper";
import CyberFact from "@/components/effects/CyberFact";
import LiveStatus from "@/components/effects/LiveStatus";
import ScrollProgress from "@/components/effects/ScrollProgress";
import AIChat from "@/components/effects/AIChat";
import SearchPalette from "@/components/effects/SearchPalette";
import PushPermission from "@/components/effects/PushPermission";
import AnalyticsProvider from "@/components/effects/Analytics";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { FavoritesProvider } from "@/lib/favorites";
import { ReadingListProvider } from "@/lib/reading-list";

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
  manifest: "/manifest.json",
  openGraph: { type: "website", locale: "en_US", url: "/", siteName: "FIRDAVS VIP", title: "FIRDAVS VIP — Dark Future Vision", description: "Born in the shadows · Living without limits · Dark future vision." },
  twitter: { card: "summary_large_image", title: "FIRDAVS VIP — Dark Future Vision", description: "Cyber Security · Python · AI · Telegram Bots" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  appleWebApp: { capable: true, title: "FIRDAVS VIP", statusBarStyle: "black-translucent" },
  icons: { icon: [{ url: "/icon-192.png" }] },
};

export const viewport: Viewport = { themeColor: "#050505", width: "device-width", initialScale: 1, maximumScale: 5 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${orbitron.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <I18nProvider>
            <FavoritesProvider>
              <ReadingListProvider>
                <SmoothScroll>{children}</SmoothScroll>
                <ServiceWorkerInit />
                <KonamiCode />
                <VoiceGreeting />
                <CustomCursor />
                <MusicPlayer />
                <CommandPalette />
                <SearchPalette />
                <VisitorCounter />
                <HackerTyper />
                <CyberFact />
                <LiveStatus />
                <ScrollProgress />
                <AIChat />
                <PushPermission />
                <AnalyticsProvider />
              </ReadingListProvider>
            </FavoritesProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
