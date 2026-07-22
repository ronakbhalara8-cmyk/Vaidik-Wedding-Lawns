import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import VenuesHorizontal from "@/components/home/VenuesHorizontal";
import Services from "@/components/home/Services";
import Packages from "@/components/home/Packages";
import Testimonials from "@/components/home/Testimonials";
import InstaGallery from "@/components/home/InstaGallery";
import BookingCTA from "@/components/home/BookingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <VenuesHorizontal />
      <Services />
      <Packages />
      <Testimonials />
      <InstaGallery />
      <BookingCTA />
    </>
  );
}
