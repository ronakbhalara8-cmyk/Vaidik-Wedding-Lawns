// === FULL SEO METADATA START (For Home Page Only) ===
export const metadata = {
  // ✅ IMPORTANT: Title sahi karo (Wedding nu rakho, Gardening nu nai)
  title: "Vaidik Wedding Lawns | Where Dream Weddings Come True",
  description: "Book the best wedding venue in Surat at Vaidik Wedding Lawns. Premium open lawns, AC banquet halls, and luxury event spaces for a royal celebration.",

  metadataBase: new URL('https://vaidiklawns.com'),

  openGraph: {
    title: "Vaidik Wedding Lawns | Dream Wedding Venue in Surat",
    description: "Celebrate your special day at Vaidik Wedding Lawns. Exclusive outdoor lawn and banquet hall with premium amenities in Surat.",
    url: 'https://vaidiklawns.com',
    siteName: 'Vaidik Wedding Lawns',
    images: [
      {
        url: 'https://vaidiklawns.com/images/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: "Vaidik Wedding Lawns - Top Wedding Venue in Surat",
    description: "Book a luxury wedding venue with lush lawns and grand banquet halls in Surat.",
    images: ['https://vaidiklawns.com/images/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://vaidiklawns.com',
  },
};
// === FULL SEO METADATA END ===


// Tamara badha existing imports
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import VenuesHorizontal from "@/components/home/VenuesHorizontal";
import Services from "@/components/home/Services";
import Packages from "@/components/home/Packages";
import InstaGallery from "@/components/home/InstaGallery";
import BookingCTA from "@/components/home/BookingCTA";
import ReviewSection from "@/components/home/ReviewSection";
import TestimonialsSection from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <VenuesHorizontal />
      <Services />
      <Packages />
      <WhyChooseUs />
      {/* <ReviewSection /> */}
      <InstaGallery />
      <TestimonialsSection />
      {/* <BookingCTA /> */}
    </>
  );
}