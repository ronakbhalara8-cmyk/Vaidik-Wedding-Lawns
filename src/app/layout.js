// layout.js - WhatsApp & Meta Tags Fully Fixed

import { Marcellus, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollProgress from "@/components/common/ScrollProgress";
import Preloader from "@/components/common/Preloader";
import RouteChangeHandler from "@/components/common/RouteChangeHandler";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

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

const BASE_URL = "https://vaidik-wedding-lawns.vercel.app";

// ✅ SHORT DESCRIPTION FOR SOCIAL MEDIA (under 125 chars)
const SOCIAL_DESCRIPTION = "Book your dream wedding at Vaidik Wedding Lawns. Premium venue with grand entrance, lush lawns & luxury amenities in Jaipur."; // 123 characters

// ✅ SEO DESCRIPTION FOR GOOGLE (150-160 chars)
const SEO_DESCRIPTION = "Celebrate your royal wedding at Vaidik Wedding Lawns. Book our premium outdoor venue, elegant banquet space, and luxury event coordination services in Jaipur."; // 155 characters

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vaidik Wedding Lawns | Where Dream Weddings Come True",
    template: "%s | Vaidik Wedding Lawns"
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "Vaidik Wedding Lawns",
    "Wedding Venue Jaipur",
    "Luxury Wedding Venue",
    "Outdoor Wedding Lawn",
    "Banquet Hall Jaipur",
    "Royal Wedding Mandap",
    "Best Wedding Venue in Jaipur",
    "Marriage Garden Jaipur",
    "Wedding Planner Jaipur",
    "Event Venue Jaipur",
    "Destination Wedding Rajasthan",
    "Premium Wedding Lawn",
    "Grand Wedding Venue",
    "Wedding Venue with Parking",
    "Wedding Venue with Bridal Room",
    "Jaipur Banquet Hall",
    "Rajasthan Wedding Venue",
    "Garden Wedding Venue",
    "Open Air Wedding Venue",
    "Indian Wedding Venue"
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
    title: "Vaidik Wedding Lawns | Where Dream Weddings Come True",
    description: SOCIAL_DESCRIPTION, // 123 chars
    type: "website",
    url: BASE_URL,
    siteName: "Vaidik Wedding Lawns",
    images: [
      {
        // ✅ CORRECT ASPECT RATIO: 1200x630 (1.91:1)
        url: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Vaidik Wedding Lawns - Book Your Dream Wedding in Jaipur",
        type: "image/png",
        secureUrl: `${BASE_URL}/images/og-image.png`,
      },
    ],
    locale: "en_IN",
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaidik Wedding Lawns | Where Dream Weddings Come True",
    description: SOCIAL_DESCRIPTION,
    images: [`${BASE_URL}/images/og-image.png`],
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
    apple: [
      { url: "/images/apple-icon.png" },
    ],
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

        {/* ✅ WHATSAPP REQUIRED META TAGS */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:title" content="Vaidik Wedding Lawns | Where Dream Weddings Come True" />
        <meta property="og:description" content={SOCIAL_DESCRIPTION} />

        {/* ✅ CORRECT 1200x630 IMAGE FOR WHATSAPP */}
        <meta property="og:image" content={`${BASE_URL}/images/og-image.png`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/images/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Vaidik Wedding Lawns - Book Your Dream Wedding in Jaipur | Call +91 9913303351" />

        <meta property="og:site_name" content="Vaidik Wedding Lawns" />
        <meta property="og:locale" content="en_IN" />

        {/* TWITTER META TAGS */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vaidik Wedding Lawns | Where Dream Weddings Come True" />
        <meta name="twitter:description" content={SOCIAL_DESCRIPTION} />
        <meta name="twitter:image" content={`${BASE_URL}/images/og-image.png`} />

        <meta name="author" content="Vaidik Wedding Lawns" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={BASE_URL} />

        <meta name="theme-color" content="#d4a373" />

        {/* CONTACT INFO */}
        <meta property="og:email" content="vaidiklawns@gmail.com" />
        <meta property="og:phone_number" content="+91 9913303351" />

        {/* WHATSAPP CACHE BUSTER */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  const timestamp = Date.now();
                  sessionStorage.setItem('wa_timestamp', timestamp);
                  console.log('WhatsApp cache buster set:', timestamp);
                }
              })();
            `
          }}
        />
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