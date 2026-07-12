import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/sonner-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://firdavsvip.vercel.app"),
  title: {
    default: "FirdavsVIP — Enterprise Cybersecurity Platform",
    template: "%s | FirdavsVIP",
  },
  description: "Professional AI-powered cybersecurity SaaS platform with 25+ security tools, real-time analytics, and beautiful cyberpunk UI.",
  keywords: ["cybersecurity", "security tools", "JWT decoder", "HTTP analyzer", "penetration testing", "ethical hacking"],
  authors: [{ name: "FirdavsVIP" }],
  creator: "FirdavsVIP",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "FirdavsVIP — Enterprise Cybersecurity Platform",
    description: "Professional AI-powered cybersecurity SaaS platform with 25+ security tools.",
    siteName: "FirdavsVIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirdavsVIP — Enterprise Cybersecurity Platform",
    description: "Professional AI-powered cybersecurity SaaS platform with 25+ security tools.",
    creator: "@firdavsvip",
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable} ${display.variable}`}>
      <body className="min-h-screen bg-cyber-darker font-sans text-foreground antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="firdavsvip-theme">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
