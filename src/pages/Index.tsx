import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import CategoriesSection from "@/components/CategoriesSection";
import CoursesSection from "@/components/CoursesSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstructorsSection from "@/components/InstructorsSection";
import BlogSection from "@/components/BlogSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import DiscountModal from "@/components/DiscountModal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <DiscountModal />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <CoursesSection />
      <AboutSection />
      <TestimonialsSection />
      <InstructorsSection />
      <BlogSection />
      <CTASection />
      <ContactSection />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;
