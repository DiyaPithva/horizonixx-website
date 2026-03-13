import type { Metadata, Viewport } from 'next';
import { Hero } from '@/components/homepage/hero';
import { FeaturedProducts } from '@/components/homepage/featured-products';
import { WhyChooseUs } from '@/components/homepage/why-choose-us';
import { CompanyStats } from '@/components/homepage/company-stats';
import { TestimonialSlider } from '@/components/homepage/testimonial-slider';
import { ProductCategories } from '@/components/homepage/product-categories';
import { AnimatedSection } from '@/components/ui/animated-section';

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// SEO Metadata
export const metadata: Metadata = {
  title: 'HORIZONIXX INTERNATIONAL - Global Exporter of Premium Herbal & Natural Products',
  description: 'Supplying high-quality herbal raw materials, cosmetic ingredients, spices and healthcare products to industries worldwide. ISO 9001:2015 certified with 25+ countries served.',
  keywords: [
    'Herbal Exporter India',
    'Moringa Powder Exporter',
    'Bulk Herbal Ingredients Supplier',
    'Ayurvedic Raw Material Exporter',
    'Natural Products Supplier',
    'Cosmetic Ingredients Exporter',
    'Spices Exporter',
    'Dehydrated Foods Supplier',
    'ISO Certified Herbal Company'
  ],
  authors: [{ name: 'HORIZONIXX INTERNATIONAL' }],
  creator: 'HORIZONIXX INTERNATIONAL',
  publisher: 'HORIZONIXX INTERNATIONAL',
  robots: 'index, follow',
  
  // OpenGraph tags
  openGraph: {
    title: 'HORIZONIXX INTERNATIONAL - Global Herbal Products Exporter',
    description: 'Premium herbal products, cosmetic ingredients, spices and healthcare products. ISO certified with global reach to 25+ countries.',
    type: 'website',
    locale: 'en_US',
    url: 'https://horizonixx-international.com',
    siteName: 'HORIZONIXX INTERNATIONAL',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HORIZONIXX INTERNATIONAL - Premium Herbal Products Exporter'
      }
    ]
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'HORIZONIXX INTERNATIONAL - Global Herbal Products Exporter',
    description: 'Premium herbal products, cosmetic ingredients, spices and healthcare products. ISO certified with global reach.',
    images: ['/images/twitter-card.jpg']
  },
  
  // Additional metadata
  alternates: {
    canonical: 'https://horizonixx-international.com'
  },
  
  metadataBase: new URL('https://horizonixx-international.com')
};

// Structured Data for Organization
const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HORIZONIXX INTERNATIONAL',
  description: 'Global distributor of herbal products, cosmetic ingredients, healthcare equipment, spices, and dehydrated foods',
  url: 'https://horizonixx-international.com',
  logo: 'https://horizonixx-international.com/images/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-99748-23781',
    contactType: 'customer service',
    areaServed: 'Worldwide',
    availableLanguage: 'English'
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'B/22 Suncity Park',
    addressLocality: 'Ankleshwar',
    addressRegion: 'Gujarat',
    postalCode: '393002',
    addressCountry: 'IN'
  },
  sameAs: [
    'https://www.linkedin.com/company/horizonixx-international',
    'https://www.facebook.com/horizonixxinternational'
  ],
  foundingDate: '2014',
  numberOfEmployees: '50-100',
  industry: 'Import/Export',
  keywords: 'herbal products, cosmetic ingredients, spices, dehydrated foods, healthcare equipment',
  certification: 'ISO 9001:2015'
};

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData)
        }}
      />

      {/* Main Content */}
      <main className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* 1. Hero Section (includes ScrollingBanner inside) */}
        <Hero />

        {/* 2. Featured Products Section */}
        <AnimatedSection animation="slideUp" delay={0.2}>
          <FeaturedProducts />
        </AnimatedSection>

        {/* 4. Product Categories Section */}
        <AnimatedSection animation="slideUp" delay={0.1}>
          <ProductCategories />
        </AnimatedSection>

        {/* 5. Why Choose Horizonixx */}
        <AnimatedSection animation="slideUp" delay={0.1}>
          <WhyChooseUs />
        </AnimatedSection>

        {/* 6. Our Impact in Numbers */}
        <AnimatedSection animation="slideUp" delay={0.1}>
          <CompanyStats />
        </AnimatedSection>

        {/* 7. What Our Global Partners Say (Testimonials) */}
        <AnimatedSection animation="slideUp" delay={0.1}>
          <TestimonialSlider />
        </AnimatedSection>
      </main>
    </>
  );
}
