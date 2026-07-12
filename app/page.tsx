import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { Features } from "@/components/sections/features";
import { ToolsPreview } from "@/components/sections/tools-preview";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { FAQSection } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <ToolsPreview />
        <Testimonials />
        <Pricing />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
