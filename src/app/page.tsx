import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SelectedWorkSection from "@/components/sections/SelectedWorkSection";
import ClientsSection from "@/components/sections/ClientsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PricingSection from "@/components/sections/PricingSection";
import FeaturedBlogsSection from "@/components/sections/FeaturedBlogsSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <SelectedWorkSection />
        <ClientsSection />
        <TestimonialsSection />
        <ServicesSection />
        <PricingSection />
        <FeaturedBlogsSection />
        <CaseStudiesSection />
      </main>
      <Footer />
    </>
  );
}
