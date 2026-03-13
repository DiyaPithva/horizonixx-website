import type { Metadata } from "next";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GlobalExportMap } from "@/components/ui/global-export-map";

// SEO Metadata
export const metadata: Metadata = {
  title:
    "About Us - HORIZONIXX INTERNATIONAL | Global Herbal Products Exporter",
  description:
    "Learn about HORIZONIXX INTERNATIONAL, a leading global distributor of herbal products, cosmetic ingredients, healthcare equipment, spices, and dehydrated foods. ISO 9001:2015 certified with 10+ years of experience.",
  keywords: [
    "About HORIZONIXX INTERNATIONAL",
    "Herbal Products Company",
    "Global Exporter India",
    "ISO Certified Company",
    "Herbal Raw Materials Supplier",
    "Company History",
    "Quality Standards",
    "Global Reach",
  ],
  authors: [{ name: "HORIZONIXX INTERNATIONAL" }],
  creator: "HORIZONIXX INTERNATIONAL",
  publisher: "HORIZONIXX INTERNATIONAL",
  robots: "index, follow",

  // OpenGraph tags
  openGraph: {
    title: "About HORIZONIXX INTERNATIONAL - Global Herbal Products Exporter",
    description:
      "Discover our journey as a leading global distributor of premium herbal products, cosmetic ingredients, and natural solutions. ISO certified with 25+ countries served.",
    type: "website",
    locale: "en_US",
    url: "https://horizonixx-international.com/about",
    siteName: "HORIZONIXX INTERNATIONAL",
    images: [
      {
        url: "/images/about-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About HORIZONIXX INTERNATIONAL - Our Story and Mission",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "About HORIZONIXX INTERNATIONAL - Global Herbal Products Exporter",
    description:
      "Discover our journey as a leading global distributor of premium herbal products and natural solutions.",
    images: ["/images/about-twitter-card.jpg"],
  },

  // Additional metadata
  alternates: {
    canonical: "https://horizonixx-international.com/about",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <AnimatedSection animation="fadeIn">
        <section className="bg-gradient-to-br from-green-100/50 via-emerald-100/30 to-teal-100/50 pt-8 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-6">
                About HORIZONIXX INTERNATIONAL
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
                Your trusted global partner in premium herbal products, cosmetic
                ingredients, and natural solutions
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Company Description Section */}
      <AnimatedSection animation="slideUp" delay={0.1}>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                    Who We Are
                  </h2>
                  <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                    <p>
                      HORIZONIXX INTERNATIONAL is a leading global distributor
                      specializing in the sourcing, repacking, and export of
                      premium herbal products, cosmetic ingredients, healthcare
                      equipment, spices, and dehydrated foods. Based in Gujarat,
                      India, we serve as a bridge between traditional Ayurvedic
                      wisdom and modern industrial requirements.
                    </p>
                    <p>
                      Our expertise lies in understanding the unique needs of
                      international markets while maintaining the highest
                      standards of quality and authenticity. We work closely
                      with trusted suppliers and manufacturers to ensure that
                      every product meets stringent quality parameters before
                      reaching our global clientele.
                    </p>
                    <p>
                      With over a decade of experience in the industry, we have
                      built a reputation for reliability, quality assurance, and
                      exceptional customer service across 25+ countries
                      worldwide.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/10">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          25+
                        </div>
                        <div className="text-sm text-gray-600">
                          Countries Served
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          300+
                        </div>
                        <div className="text-sm text-gray-600">
                          Product Variants
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          150+
                        </div>
                        <div className="text-sm text-gray-600">
                          Industrial Clients
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          10+
                        </div>
                        <div className="text-sm text-gray-600">
                          Years Experience
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
      {/* Mission Statement Section */}
      <AnimatedSection animation="slideUp" delay={0.1}>
        <section className="py-20 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
                Our Mission
              </h2>
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-primary/10">
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed italic">
                  &ldquo;To be the world&apos;s most trusted partner in sourcing
                  and supplying premium herbal products and natural ingredients,
                  bridging the gap between traditional wisdom and modern
                  industrial needs while maintaining the highest standards of
                  quality, sustainability, and customer satisfaction.&rdquo;
                </blockquote>
              </div>
              <div className="mt-12 grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Quality Assurance
                  </h3>
                  <p className="text-muted-foreground">
                    Rigorous testing and quality control at every stage
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Global Reach
                  </h3>
                  <p className="text-muted-foreground">
                    Serving clients across 25+ countries worldwide
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Customer Focus
                  </h3>
                  <p className="text-muted-foreground">
                    Dedicated to exceeding customer expectations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
      {/* Company History Timeline */}
      <AnimatedSection animation="slideUp" delay={0.1}>
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center">
                Our Journey
              </h2>
            </div>

            {/* Timeline Container with Center Line */}
            <div className="relative before:absolute before:left-1/2 before:top-0 before:h-full before:w-[2px] before:bg-green-200 before:-translate-x-1/2">
              <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
                {/* Left Column */}
                <div className="space-y-12">
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold text-sm shadow-md flex-shrink-0">
                        2014
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Foundation
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          HORIZONIXX INTERNATIONAL was established with a vision
                          to become a leading exporter of premium herbal and
                          natural products from India.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold text-sm shadow-md flex-shrink-0">
                        2018
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Global Expansion
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          Expanded operations to serve clients across 15+
                          countries, establishing strong partnerships in Europe,
                          North America, and Asia-Pacific regions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold text-sm shadow-md flex-shrink-0">
                        2024
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Market Leadership
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          Today, we proudly serve 25+ countries with 300+
                          product variants, maintaining our position as a
                          trusted global partner in natural products.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-12">
                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold text-sm shadow-md flex-shrink-0">
                        2016
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          ISO Certification
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          Achieved ISO 9001:2015 certification for quality
                          management systems, establishing our commitment to
                          international quality standards.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold text-sm shadow-md flex-shrink-0">
                        2020
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Product Diversification
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          Expanded product portfolio to include cosmetic
                          ingredients, healthcare equipment, and dehydrated
                          foods, serving diverse industrial needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
      {/* Product Categories Section */}
      <AnimatedSection animation="slideUp" delay={0.1}>
        <section className="py-20 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-16">
                Product Categories We Handle
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Herbal Products
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Premium Ayurvedic and herbal products including Moringa,
                    Ashwagandha, Neem, Amla, and more.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Moringa Powder</li>
                    <li>• Ashwagandha Powder</li>
                    <li>• Neem Powder</li>
                    <li>• Triphala Powder</li>
                  </ul>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Cosmetic Products
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Natural cosmetic ingredients for beauty and personal care
                    product manufacturing.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Multani Mitti</li>
                    <li>• Sandalwood Powder</li>
                    <li>• Hibiscus Powder</li>
                    <li>• Indigo Powder</li>
                  </ul>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Spices
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    High-quality spice powders for food processing and culinary
                    applications.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Turmeric Powder</li>
                    <li>• Ginger Powder</li>
                    <li>• Garlic Powder</li>
                    <li>• Black Pepper Powder</li>
                  </ul>
                </div>

                <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Dehydrated Foods
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Nutritious dehydrated fruit and vegetable powders for food
                    industry applications.
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Beetroot Powder</li>
                    <li>• Mango Powder</li>
                    <li>• Banana Powder</li>
                    <li>• Carrot Powder</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
      {/* Quality Standards Section */}
      <AnimatedSection animation="slideUp" delay={0.1}>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-16">
                Quality Standards & Global Reach
              </h2>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    ISO 9001:2015 Certified Excellence
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Our commitment to quality is demonstrated through our ISO
                      9001:2015 certification, which covers the import, export,
                      and repacking of Ayurvedic & herbal products, cosmetic
                      product spray, dried fruits & vegetable products, spices,
                      and food products.
                    </p>
                    <p>
                      We maintain rigorous quality control processes at every
                      stage of our operations, from sourcing raw materials to
                      final packaging and dispatch. Our quality assurance team
                      ensures that every product meets international standards
                      and customer specifications.
                    </p>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-6">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-primary mb-1">
                        100%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Quality Tested
                      </div>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-primary mb-1">
                        24/7
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Quality Control
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-6">
                    Global Reach & Reliable Supply Chain
                  </h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      With a robust global network spanning 25+ countries, we
                      have established ourselves as a reliable partner for
                      businesses worldwide. Our strategic location in Gujarat,
                      India, provides us with access to premium raw materials
                      and efficient logistics networks.
                    </p>
                    <p>
                      Our supply chain is designed for reliability and
                      scalability, ensuring consistent product availability and
                      timely deliveries. We work with trusted logistics partners
                      to maintain the integrity of our products during
                      transportation.
                    </p>
                  </div>
                  <div className="mt-8">
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-4">
                        Key Regions Served:
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <div>• North America</div>
                        <div>• Europe</div>
                        <div>• Asia-Pacific</div>
                        <div>• Middle East</div>
                        <div>• South America</div>
                        <div>• Africa</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Global Export Map Section */}
      <AnimatedSection animation="slideUp" delay={0.1}>
        <section className="py-20 bg-white/30 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <GlobalExportMap />
          </div>
        </section>
      </AnimatedSection>

      {/* Call to Action Section */}
      <AnimatedSection animation="slideUp" delay={0.1}>
        <section className="py-20 bg-gradient-to-br from-green-100/50 via-emerald-100/30 to-teal-100/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Ready to Partner with Us?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join our growing network of satisfied clients worldwide.
                Let&apos;s discuss how we can meet your specific requirements
                for premium herbal and natural products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Explore Our Products
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  Contact Us Today
                </a>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
