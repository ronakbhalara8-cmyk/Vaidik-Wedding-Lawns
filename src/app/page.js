import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import VenuesHorizontal from "@/components/home/VenuesHorizontal";
import Services from "@/components/home/Services";
import Packages from "@/components/home/Packages";
import InstaGallery from "@/components/home/InstaGallery";
import BookingCTA from "@/components/home/BookingCTA";
import ReviewSection from "@/components/home/ReviewSection";
// import TestimonialsSection from "@/components/common/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <VenuesHorizontal />
      <Services />
      <Packages />
      <ReviewSection />
      <InstaGallery />
      {/* <TestimonialsSection /> */}
      <BookingCTA />
    </>
  );
}
