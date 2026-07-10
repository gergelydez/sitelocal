import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import HowItWorks from "./components/HowItWorks";
import Differentiation from "./components/Differentiation";
import CTABanner from "./components/CTABanner";
import FAQ from "./components/FAQ";
import DemoSection from "./components/DemoSection";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Marquee />
        <HowItWorks />
        <Differentiation />
        <CTABanner />
        <FAQ />
        <DemoSection />
        <footer className="text-center py-9 px-6 text-muted text-[13px] border-t border-white/8">
          © site local · Baia Mare
        </footer>
      </div>
    </>
  );
}
