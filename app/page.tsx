import AmbientBackground from "./components/AmbientBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import TrustSection from "./components/TrustSection";
import HowItWorks from "./components/HowItWorks";
import Comparison from "./components/Comparison";
import Niches from "./components/Niches";
import ProjectsShowcase from "./components/ProjectsShowcase";
import Pricing from "./components/Pricing";
import CTABanner from "./components/CTABanner";
import FAQ from "./components/FAQ";
import DemoSection from "./components/DemoSection";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Marquee />
        <TrustSection />
        <HowItWorks />
        <Comparison />
        <Niches />
        <ProjectsShowcase />
        <Pricing />
        <CTABanner />
        <FAQ />
        <DemoSection />
        <Footer />
      </div>
      <WhatsAppButton />
    </>
  );
}
