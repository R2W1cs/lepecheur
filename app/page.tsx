import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import MenuPreview from "@/components/home/MenuPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <MenuPreview />
      <GalleryPreview />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  );
}
