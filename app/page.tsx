import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import TrustBar from "@/components/landing/TrustBar";
import FeatureClusters from "@/components/landing/FeatureClusters";
import IndustryTabs from "@/components/landing/IndustryTabs";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustBar />
      <FeatureClusters />
      <IndustryTabs />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
