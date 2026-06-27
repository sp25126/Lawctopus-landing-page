import type { Metadata } from "next";
import { Inter, Crimson_Text, IBM_Plex_Mono, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import WatermarkSVG from "../components/WatermarkSVG";
import SmoothScrollProvider from "../components/SmoothScrollProvider";
import Navigation from "../components/Navigation";
import { WATERMARK } from "../hooks/useWatermark";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const crimsonText = Crimson_Text({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const lora = Lora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Expert-Level Contract Drafting & Freelancing | Lawctopus",
  description:
    "Master contract drafting and build a freelance legal practice. Designed by senior corporate counsels.",
  other: {
    designer: "Saumya Patel",
    "designer-linkedin": "https://linkedin.com/in/saumya-rajeshbhai-patel-857290372",
    "designer-github": "https://github.com/sp25126",
    copyright: "Page design © 2026 Saumya Patel. All rights reserved.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="designer" content="Saumya Patel" />
        <meta
          name="designer-linkedin"
          content="https://linkedin.com/in/saumya-rajeshbhai-patel-857290372"
        />
        <meta name="designer-github" content="https://github.com/sp25126" />
        <meta
          name="copyright"
          content="Page design © 2026 Saumya Patel. All rights reserved."
        />
      </head>
      <body
        className={`${inter.variable} ${crimsonText.variable} ${ibmPlexMono.variable} ${playfairDisplay.variable} ${lora.variable} font-sans antialiased bg-legal-50 text-legal-900 min-h-screen relative`}
      >
        {/* Layer 4: CSS Sub-Pixel Binary Grid */}
        <div className="invisible-watermark-grid" aria-hidden="true" />

        <SmoothScrollProvider>
          {/* Layer 3: Semantic nav */}
          <Navigation />

          {children}
        </SmoothScrollProvider>

        {/* Layer 2: Invisible SVG with Attribution Metadata */}
        <WatermarkSVG />

        {/* Layer 1 Root Watermark Container */}
        <div
          id="legal-watermark-holder"
          className="absolute pointer-events-none opacity-0 select-none w-0 h-0 overflow-hidden"
          aria-hidden="true"
        >
          {WATERMARK}
        </div>
      </body>
    </html>
  );
}
