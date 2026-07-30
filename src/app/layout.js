// layout.js - Fixed import issue

import { Marcellus, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollProgress from "@/components/common/ScrollProgress";
import Preloader from "@/components/common/Preloader";
import RouteChangeHandler from "@/components/common/RouteChangeHandler";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

// ❌ Remove this - public images cannot be imported directly
// import ogImage from "./public/og-image.png";

const heading = Marcellus({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const body = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://vaidiklawns.com";

// ✅ Direct image URL from public folder
const OG_IMAGE_URL = `${BASE_URL}/images/og-image.png`;

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vaidik Wedding Lawns | Premium Wedding Venue in Jaipur",
    template: "%s | Vaidik Wedding Lawns"
  },
  description: "Book Vaidik Wedding Lawns - Jaipur's premier luxury wedding venue. Perfect for royal weddings, receptions & events. Call now!",
  keywords: [
    "Vaidik Wedding Lawns",
    "Wedding Venue Jaipur",
    "Luxury Wedding Venue",
    "Outdoor Wedding Lawn",
    "Indian Wedding Venue",
    // ... tame lakhya keywords 6e
  ],
  authors: [{ name: "Vaidik Wedding Lawns" }],
  creator: "Vaidik Wedding Lawns",
  publisher: "Vaidik Wedding Lawns",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Vaidik Wedding Lawns | Premium Wedding Venue in Jaipur",
    description: "Book Vaidik Wedding Lawns - Jaipur's premier luxury wedding venue. Perfect for royal weddings, receptions & events.",
    type: "website",
    url: BASE_URL,
    siteName: "Vaidik Wedding Lawns",
    images: [
      {
        // ✅ Use direct URL
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Vaidik Wedding Lawns - Luxury Wedding Venue Jaipur | Book Now",
        type: "image/png",
        secureUrl: OG_IMAGE_URL,
      },
    ],
    locale: "en_IN",
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaidik Wedding Lawns | Premium Wedding Venue in Jaipur",
    description: "Book Vaidik Wedding Lawns - Jaipur's premier luxury wedding venue. Perfect for royal weddings, receptions & events.",
    images: [OG_IMAGE_URL],
    site: "@vaidikwedding",
    creator: "@vaidikwedding",
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/logo.png", type: "image/png" },
    ],
    apple: [{ url: "/images/apple-icon.png" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
  },
  category: "Wedding Venue",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* ✅ Short Description (Under 125 characters) */}
        <meta name="description" content="Book Vaidik Wedding Lawns - Jaipur's premier luxury wedding venue. Perfect for royal weddings, receptions & events." />

        {/* ✅ OpenGraph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:title" content="Vaidik Wedding Lawns | Premium Wedding Venue in Jaipur" />
        <meta property="og:description" content="Book Vaidik Wedding Lawns - Jaipur's premier luxury wedding venue. Perfect for royal weddings, receptions & events." />

        {/* ✅ Image - Using direct URL */}
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Vaidik Wedding Lawns - Luxury Wedding Venue Jaipur | Book Now" />

        <meta property="og:site_name" content="Vaidik Wedding Lawns" />
        <meta property="og:locale" content="en_IN" />

        {/* ✅ Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vaidik Wedding Lawns | Premium Wedding Venue in Jaipur" />
        <meta name="twitter:description" content="Book Vaidik Wedding Lawns - Jaipur's premier luxury wedding venue. Perfect for royal weddings, receptions & events." />
        <meta name="twitter:image" content={OG_IMAGE_URL} />

        <meta name="author" content="Vaidik Wedding Lawns" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={BASE_URL} />

        <meta name="theme-color" content="#d4a373" />

        <meta property="og:email" content="vaidiklawns@gmail.com" />
        <meta property="og:phone_number" content="+91 9913303351" />
      </head>
      <body className="min-h-full bg-cream text-charcoal font-body flex flex-col">
        <RouteChangeHandler />
        <Preloader />
        <ScrollProgress />
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton phoneNumber="9913303351" />
        </SmoothScroll>
      </body>
    </html>
  );
}