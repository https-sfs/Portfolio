import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { FoldfolioHero } from "@/components/hero/FoldfolioHero";
import { WorkSection } from "@/components/work/WorkSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { AboutSection } from "@/components/about/AboutSection";
import { AiEngineeringSection } from "@/components/ai/AiEngineeringSection";
import { TechStackSection } from "@/components/stack/TechStackSection";
import { ExperienceSection } from "@/components/experience/ExperienceSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <FoldfolioHero />
        <WorkSection />
        <ServicesSection />
        <AboutSection />
        <AiEngineeringSection />
        <TechStackSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
