import LoadingScreen from "@/components/layout/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CursorGlow from "@/components/effects/CursorGlow";
import MouseTrail from "@/components/effects/MouseTrail";
import GridBackground from "@/components/effects/GridBackground";
import MatrixRain from "@/components/effects/MatrixRain";
import ParticleField from "@/components/effects/ParticleField";
import ThreeScene from "@/components/effects/ThreeScene";
import Scanline from "@/components/effects/Scanline";
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
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import GithubStats from "@/components/sections/GithubStats";
import Blog from "@/components/sections/Blog";
import Gallery from "@/components/sections/Gallery";
import Achievements from "@/components/sections/Achievements";
import Timeline from "@/components/sections/Timeline";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <LoadingScreen />
      <ScrollProgress />
      <div aria-hidden className="fixed inset-0 -z-50 grid-bg opacity-50" />
      <GridBackground />
      <ThreeScene />
      <ParticleField />
      <MatrixRain opacity={0.08} />
      <Scanline />
      <CursorGlow />
      <MouseTrail />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Stats />
        <GithubStats />
        <Achievements />
        <Gallery />
        <Timeline />
        <Testimonials />
        <Blog />
        <Newsletter />
        <Contact />
      </div>
      <Footer />
      <HackerTyper />
      <CyberFact />
      <LiveStatus />
    </main>
  );
}
