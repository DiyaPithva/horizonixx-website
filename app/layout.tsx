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
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "HORIZONIXX INTERNATIONAL - Global Exporter of Premium Herbal & Natural Products",
  description: "Supplying high-quality herbal raw materials, cosmetic ingredients, spices and healthcare products to industries worldwide",
  keywords: [
    "Herbal Exporter India",
    "Moringa Powder Exporter", 
    "Bulk Herbal Ingredients Supplier",
    "Ayurvedic Raw Material Exporter",
    "Natural Products Supplier",
    "Cosmetic Ingredients Exporter"
  ],
  authors: [{ name: "HORIZONIXX INTERNATIONAL" }],
  creator: "HORIZONIXX INTERNATIONAL",
  publisher: "HORIZONIXX INTERNATIONAL",
  robots: "index, follow",
  metadataBase: new URL('https://horizonixx-international.com')
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
          <main>
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
