import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://firdavsvip.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FirdavsVIP — Enterprise Cybersecurity Platform",
    template: "%s | FirdavsVIP",
  },
  description: "Professional AI-powered cybersecurity SaaS platform with 25+ security tools, real-time collaboration, and beautiful cyberpunk UI.",
  keywords: ["FirdavsVIP", "cybersecurity", "security testing", "penetration testing", "API testing", "JWT decoder", "hash generator", "cyberpunk", "enterprise security", "AI security assistant"],
  authors: [{ name: "FirdavsVIP Team" }],
  creator: "FirdavsVIP",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "FirdavsVIP — Enterprise Cybersecurity Platform",
    description: "Professional AI-powered cybersecurity SaaS platform with 25+ security tools and beautiful cyberpunk UI.",
    siteName: "FirdavsVIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirdavsVIP — Enterprise Cybersecurity Platform",
    description: "Professional AI-powered cybersecurity SaaS platform with 25+ security tools.",
    creator: "@firdavsvip",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable} ${grotesk.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster position="top-right" theme="dark" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
