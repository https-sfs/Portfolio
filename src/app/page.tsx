import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { FoldfolioHero } from "@/components/hero/FoldfolioHero";
import { SelectedWorkSection } from "@/components/work/SelectedWorkSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { AboutSection } from "@/components/about/AboutSection";
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
        <SelectedWorkSection />
        <ServicesSection id="services" />
        <AboutSection />
        <TechStackSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
