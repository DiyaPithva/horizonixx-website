import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { themeInitScript } from "@/lib/theme-script";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

// Configure Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title:
    "HORIZONIXX INTERNATIONAL - Global Exporter of Premium Herbal & Natural Products",
  description:
    "Supplying high-quality herbal raw materials, cosmetic ingredients, spices and healthcare products to industries worldwide. ISO 9001:2015 certified manufacturer and exporter.",
  keywords: [
    // Herbal Products
    "Herbal Exporter India",
    "Moringa Powder Exporter",
    "Bulk Herbal Ingredients Supplier",
    "Ayurvedic Raw Material Exporter",
    "Natural Products Supplier",
    "Herbal supplements",
    "Ayurvedic medicine",
    "Organic herbs",
    "Certified organic",
    "GMP certified herbal products",
    "Pure plant-based",
    "Triphala powder supplier",
    "Tulsi powder exporter",
    "Shatavari powder bulk",
    "Psyllium husk exporter",
    "Makhana fox nuts supplier",

    // Cosmetic Ingredients
    "Cosmetic Ingredients Exporter",
    "Aloe Vera Gel Supplier",
    "Sandalwood Powder Exporter",
    "Rose Water Supplier",
    "Vegan cosmetics",
    "Cruelty-free makeup",
    "Paraben-free skincare",
    "Eco-friendly beauty products",
    "Best foundation for oily skin",
    "Anti-aging serum for sensitive skin",
    "Hydrating face cream for dry skin",

    // Spices
    "Buy organic spices online",
    "Bulk Indian spices",
    "Authentic garam masala",
    "Exotic spice blends",
    "Red chilli powder exporter",
    "Cardamom elaichi supplier",
    "Black pepper exporter",
    "Turmeric powder bulk",

    // Medical Equipment
    "Medical equipment supplier",
    "Hospital furniture",
    "Diagnostic equipment",
    "Surgical instruments",

    // Manufacturer Keywords
    "Herbal manufacturer",
    "Spices manufacturer",
    "Cosmetic manufacturer",
    "Moringa manufacturer",
    "Ayurvedic products manufacturer India",
    "ISO certified exporter",
    "Quality herbal products exporter",
  ],
  authors: [{ name: "HORIZONIXX INTERNATIONAL" }],
  creator: "HORIZONIXX INTERNATIONAL",
  publisher: "HORIZONIXX INTERNATIONAL",
  robots: "index, follow",
  metadataBase: new URL("https://horizonixx-international.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization script - prevents FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-body antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
