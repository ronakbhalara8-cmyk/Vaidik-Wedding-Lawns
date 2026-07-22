import { Cinzel, Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollProgress from "@/components/common/ScrollProgress";
import Preloader from "@/components/common/Preloader";
import RouteChangeHandler from "@/components/common/RouteChangeHandler";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Vaidik Wedding Lawns | Luxury Wedding Venue & Banquet Hall",
  description: "Celebrate your royal wedding at Vaidik Wedding Lawns. Discover our premium outdoor venue, elegant banquet space, customizable mandap setups, and luxury event coordination services.",
  keywords: ["Vaidik Wedding Lawns", "Luxury Wedding Venue", "Outdoor Wedding Lawn", "Indian Wedding Venue", "Banquet Hall", "Royal Wedding Mandap"],
  openGraph: {
    title: "Vaidik Wedding Lawns | Luxury Wedding Venue & Banquet Hall",
    description: "Celebrate your royal wedding at Vaidik Wedding Lawns. Discover our premium outdoor venue, elegant banquet space, customizable mandap setups, and luxury event coordination services.",
    type: "website",
    url: "https://vaidikweddinglawns.com",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "Vaidik Wedding Lawns Logo",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cinzel.variable} ${cormorant.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-cream text-charcoal font-body flex flex-col">
        {/* <ErrorSuppressor /> */}
        <RouteChangeHandler />
        <Preloader />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
