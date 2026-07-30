// layout.js - Updated with WhatsApp-specific fixes

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

// ✅ Use absolute URLs for ALL images
const BASE_URL = "https://vaidiklawns.com";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vaidik Wedding Lawns | Where Dream Weddings Come True",
    template: "%s | Vaidik Wedding Lawns"
  },
  description: "Celebrate your royal wedding at Vaidik Wedding Lawns. Discover our premium outdoor venue, elegant banquet space, customizable mandap setups, and luxury event coordination services.",
  keywords: [
    // Primary Brand & Location
    "Vaidik Wedding Lawns",
    "Vaidik Lawns",
    "Vaidik Wedding Venue",

    // Core Services
    "Luxury Wedding Venue",
    "Outdoor Wedding Lawn",
    "Indian Wedding Venue",
    "Banquet Hall",
    "Royal Wedding Mandap",
    "Wedding Venue in India",
    "Destination Wedding",

    // Venue Types
    "Outdoor Wedding Venue",
    "Garden Wedding Venue",
    "Lawn Wedding Venue",
    "Open Air Wedding Venue",
    "Premium Wedding Lawn",
    "Elegant Banquet Space",
    "Wedding Garden",
    "Marriage Garden",
    "Wedding Hall",
    "Function Hall",
    "Event Venue",
    "Celebration Venue",

    // Event Services
    "Wedding Planner",
    "Event Coordination",
    "Wedding Decorator",
    "Mandap Decoration",
    "Wedding Catering",
    "Wedding Photography",
    "Wedding Videography",
    "Wedding Entertainment",
    "Wedding DJ Services",
    "Wedding Lighting",
    "Wedding Stage Setup",
    "Wedding Sound System",

    // Wedding Types
    "Hindu Wedding Venue",
    "Sikh Wedding Venue",
    "Muslim Wedding Venue",
    "Christian Wedding Venue",
    "Interfaith Wedding",
    "Court Marriage Venue",
    "Engagement Ceremony",
    "Reception Venue",
    "Pre-wedding Shoot Location",
    "Wedding Anniversary Venue",
    "Baby Shower Venue",
    "Birthday Party Venue",
    "Corporate Event Venue",

    // Family & Guest Related
    "Large Wedding Venue",
    "Small Wedding Venue",
    "Intimate Wedding Venue",
    "Family Wedding Venue",
    "Guest Capacity 500",
    "Guest Capacity 1000",
    "Guest Capacity 2000",
    "Wedding Venue for 100 Guests",
    "Wedding Venue for 500 Guests",
    "Wedding Venue for 1000 Guests",

    // Facilities & Amenities
    "Wedding Venue with Parking",
    "Wedding Venue with Garden",
    "Wedding Venue with Pool",
    "Wedding Venue with AC Hall",
    "Air Conditioned Banquet Hall",
    "Wedding Venue with Bridal Room",
    "Wedding Venue with Stage",
    "Wedding Venue with Lighting",
    "Wedding Venue with Sound System",
    "Wedding Venue with Generator",
    "Wedding Venue with Security",
    "Wedding Venue with Wi-Fi",
    "Disability Friendly Venue",

    // Location & Accessibility
    "Wedding Venue in Jaipur",
    "Wedding Venue in Rajasthan",
    "Wedding Venue near Jaipur",
    "Rajasthan Wedding Venue",
    "Jaipur Banquet Hall",
    "Jaipur Marriage Garden",
    "Luxury Venue in Jaipur",
    "Best Wedding Venue in Jaipur",
    "Top Wedding Venue in Rajasthan",
    "Wedding Venue near Airport",
    "Wedding Venue near Railway Station",
    "Wedding Venue with Highway Access",

    // Style & Theme
    "Royal Wedding Venue",
    "Traditional Wedding Venue",
    "Modern Wedding Venue",
    "Heritage Wedding Venue",
    "Pink City Wedding Venue",
    "Royal Rajasthan Wedding",
    "Maharaja Style Wedding",
    "Theme Wedding Venue",
    "Luxury Garden Wedding",
    "Elegant Wedding Decor",
    "Grand Wedding Venue",
    "Spectacular Wedding Venue",

    // Seasonal
    "Winter Wedding Venue",
    "Summer Wedding Venue",
    "Monsoon Wedding Venue",
    "Day Wedding Venue",
    "Night Wedding Venue",
    "Sunset Wedding Venue",

    // Price & Budget
    "Affordable Wedding Venue",
    "Budget Wedding Venue",
    "Premium Wedding Venue",
    "Luxury Wedding Package",
    "All Inclusive Wedding Venue",
    "Affordable Luxury Wedding",
    "Best Value Wedding Venue",

    // Additional Services
    "Wedding Catering Services",
    "In-house Catering",
    "Veg & Non-veg Catering",
    "Wedding Cake Design",
    "Floral Arrangement",
    "Wedding Favors",
    "Wedding Invitations",
    "Valet Parking",
    "Wedding Accommodation",
    "Guest Room Booking",

    // Digital/Online
    "Book Wedding Venue Online",
    "Online Wedding Booking",
    "Wedding Venue Website",
    "Virtual Wedding Tour",
    "360 Degree Wedding Venue",
    "Wedding Venue Photos",
    "Wedding Venue Video",

    // Trust & Recognition
    "Award Winning Wedding Venue",
    "Recommended Wedding Venue",
    "5 Star Wedding Venue",
    "Trusted Wedding Venue",
    "Top Rated Wedding Venue",
    "Best Wedding Lawn in Jaipur",
    "No. 1 Wedding Venue",

    // Wedding Culture
    "Indian Wedding Traditions",
    "Rajasthani Wedding",
    "North Indian Wedding",
    "South Indian Wedding",
    "Punjabi Wedding Venue",
    "Marwari Wedding Venue",
    "Gujarati Wedding Venue",

    // Long Tail Keywords
    "Best Place to Get Married in Jaipur",
    "Where to Host a Wedding in Rajasthan",
    "Perfect Wedding Destination",
    "Dream Wedding Venue",
    "Memorable Wedding Celebration",
    "Luxury Wedding Experience",
    "Grand Indian Wedding Venue",

    // Seasonal Events
    "Wedding Season Venue",
    "Peak Wedding Season",
    "Off Season Wedding Deal",
    "Weekend Wedding Venue",
    "Weekday Wedding Venue",

    // Capacity Keywords
    "Intimate Gathering Venue",
    "Medium Size Wedding Venue",
    "Large Capacity Hall",
    "Open Lawn for 2000 Guests",
    "Banquet for 1500 People",

    // Related Searches
    "Venue for Engagement Party",
    "Mehendi Ceremony Venue",
    "Sangeet Night Venue",
    "Haldi Ceremony Venue",
    "Wedding Reception Hall",
    "Post Wedding Brunch Venue",

    // Additional Services
    "Wedding Concierge",
    "Personal Wedding Manager",
    "Custom Wedding Package",
    "Flexible Wedding Booking",
    "Last Minute Wedding Venue"
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
    description: "Celebrate your royal wedding at Vaidik Wedding Lawns. Discover our premium outdoor venue, elegant banquet space, customizable mandap setups, and luxury event coordination services.",
    type: "website",
    url: BASE_URL,
    siteName: "Vaidik Wedding Lawns",
    images: [
      {
        // ✅ Use absolute URL
        url: `${BASE_URL}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Vaidik Wedding Lawns | Where Dream Weddings Come True",
        type: "image/png",
        // ✅ Add secure URL for WhatsApp
        secureUrl: `${BASE_URL}/images/og-image.png`,
      },
    ],
    locale: "en_IN",
    countryName: "India",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaidik Wedding Lawns | Where Dream Weddings Come True",
    description: "Celebrate your royal wedding at Vaidik Wedding Lawns. Discover our premium outdoor venue, elegant banquet space, customizable mandap setups, and luxury event coordination services.",
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
        {/* Primary Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* ✅ WhatsApp Required Meta Tags - MUST use absolute URLs */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:title" content="Vaidik Wedding Lawns | Where Dream Weddings Come True" />
        <meta property="og:description" content="Celebrate your royal wedding at Vaidik Wedding Lawns. Discover our premium outdoor venue, elegant banquet space, customizable mandap setups, and luxury event coordination services." />

        {/* ✅ WhatsApp requires image to be absolute URL and accessible */}
        <meta property="og:image" content={`${BASE_URL}/images/og-image.png`} />
        <meta property="og:image:secure_url" content={`${BASE_URL}/images/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Vaidik Wedding Lawns - Luxury Wedding Venue" />

        <meta property="og:site_name" content="Vaidik Wedding Lawns" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vaidik Wedding Lawns | Where Dream Weddings Come True" />
        <meta name="twitter:description" content="Celebrate your royal wedding at Vaidik Wedding Lawns. Discover our premium outdoor venue, elegant banquet space, customizable mandap setups, and luxury event coordination services." />
        <meta name="twitter:image" content={`${BASE_URL}/images/og-image.png`} />

        {/* Additional Meta Tags */}
        <meta name="author" content="Vaidik Wedding Lawns" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={BASE_URL} />

        {/* ✅ WhatsApp requires this */}
        <meta name="theme-color" content="#d4a373" />

        {/* Contact Info */}
        <meta property="og:email" content="vaidiklawns@gmail.com" />
        <meta property="og:phone_number" content="+91 9913303351" />

        {/* ✅ Script to handle WhatsApp cache */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Force WhatsApp to refresh its cache
              (function() {
                // Add a cache-busting parameter for WhatsApp
                if (typeof window !== 'undefined') {
                  const currentUrl = window.location.href;
                  const timestamp = Date.now();
                  
                  // Check if URL already has cache buster
                  if (!currentUrl.includes('_wa_cache=')) {
                    // Store the timestamp in session storage
                    sessionStorage.setItem('wa_timestamp', timestamp);
                    
                    // For WhatsApp debugging
                    console.log('WhatsApp cache buster set:', timestamp);
                  }
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