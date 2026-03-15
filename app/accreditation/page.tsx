/**
 * Accreditation Page
 * Displays company certifications and accreditations
 * Requirements: 13.1, 13.2, 13.3, 13.4, 15.1
 */

import React from 'react';
import { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/animated-section';

export const metadata: Metadata = {
  title: 'Accreditation & Certifications | HORIZONIXX INTERNATIONAL',
  description: 'View our ISO 9001:2015 certification and other quality accreditations. HORIZONIXX INTERNATIONAL maintains the highest standards in herbal product export and manufacturing.',
  keywords: [
    'ISO 9001:2015 certification',
    'quality management system',
    'herbal product certification',
    'FSSAI license',
    'APEDA certificate',
    'MSME certificate',
    'quality assurance',
    'international standards',
    'certified herbal exporter',
    'quality control',
  ],
  openGraph: {
    title: 'Accreditation & Certifications | HORIZONIXX INTERNATIONAL',
    description: 'View our ISO 9001:2015 certification and other quality accreditations.',
    type: 'website',
  },
};

// ─── Certification data ───────────────────────────────────────────────────────

const primaryCertifications = [
  {
    id: 'iso',
    name: 'ISO 9001:2015 Certified',
    issuer: 'International Organization for Standardization',
    certNumber: 'ISO-9001-2015-001',
    logo: 'https://w7.pngwing.com/pngs/676/295/png-transparent-iso-9000-iso-9001-2015-international-organization-for-standardization-certification-business-label-people-logo-thumbnail.png',
  },
  {
    id: 'organic',
    name: 'India Organic Certification',
    issuer: 'Certified Organic Product Standards',
    certNumber: null,
    logo: 'https://npop.apeda.gov.in/themes/custom/apedals/assets/img/Indian_Organic_Logo.png',
  },
];

const additionalCertifications = [
  {
    id: 'fssai',
    name: 'FSSAI License',
    issuer: 'Food Safety and Standards Authority of India',
    logo: 'https://e7.pngegg.com/pngimages/333/237/png-clipart-food-safety-and-standards-authority-of-india-logo-india-food-text.png',
  },
  {
    id: 'apeda',
    name: 'APEDA Certificate',
    issuer: 'Agricultural and Processed Food Products Export Development Authority',
    logo: 'https://npop.apeda.gov.in/themes/custom/apedals/assets/img/APEDA_Footer_Logo.png',
  },
  {
    id: 'msme',
    name: 'MSME Certificate',
    issuer: 'Ministry of Micro, Small and Medium Enterprises, Government of India',
    logo: 'https://w7.pngwing.com/pngs/158/831/png-transparent-ministry-of-micro-small-and-medium-enterprises-government-of-india-industry-small-business-india-thumbnail.png',
  },
];

export default function AccreditationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">

      {/* Hero */}
      <AnimatedSection animation="fadeIn" className="relative pt-8 pb-20 bg-gradient-to-br from-green-100/50 via-emerald-100/30 to-teal-100/50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Accreditation &amp;
            <span className="text-primary"> Certifications</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            HORIZONIXX INTERNATIONAL maintains the highest quality standards through internationally
            recognized certifications and accreditations, ensuring excellence in every product we export.
          </p>
        </div>
      </AnimatedSection>

      {/* Primary Certifications — ISO + India Organic as separate cards */}
      <AnimatedSection animation="slideUp" delay={0.2} className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Primary Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are proud to hold internationally recognized certifications demonstrating our
              commitment to quality management and organic standards.
            </p>
          </div>

          <div
            className="grid gap-6 max-w-3xl mx-auto"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
          >
            {primaryCertifications.map((cert) => (
              <div
                key={cert.id}
                className="relative overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                <div className="relative z-10 flex flex-col items-center">
                  {/* Logo */}
                  <div className="mb-4 flex items-center justify-center" style={{ height: '60px' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.logo}
                      alt={`${cert.name} logo`}
                      style={{ maxHeight: '60px', objectFit: 'contain', marginBottom: '10px' }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-foreground text-center mb-2">
                    {cert.name}
                  </h3>

                  {/* Issuer */}
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {cert.issuer}
                  </p>

                  {/* Cert number (ISO only) */}
                  {cert.certNumber && (
                    <div className="pt-4 border-t border-white/10 w-full text-center">
                      <p className="text-xs text-muted-foreground">
                        Cert. No: {cert.certNumber}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Additional Certifications — FSSAI, APEDA, MSME */}
      <AnimatedSection animation="slideUp" delay={0.4} className="py-16 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Additional Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive certification portfolio ensures compliance with international
              standards and regulatory requirements.
            </p>
          </div>

          <div
            className="grid gap-6 max-w-4xl mx-auto"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}
          >
            {additionalCertifications.map((cert, index) => (
              <AnimatedSection
                key={cert.id}
                animation="slideUp"
                delay={0.1 * (index + 1)}
                className="flex justify-center"
              >
                <div className="relative overflow-hidden backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl p-6 w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
                  <div className="relative z-10 flex flex-col items-center">

                    {/* Logo */}
                    <div className="mb-4 flex items-center justify-center" style={{ height: '60px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cert.logo}
                        alt={`${cert.name} logo`}
                        style={{ maxHeight: '60px', objectFit: 'contain', marginBottom: '10px' }}
                      />
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-foreground text-center mb-2 leading-tight">
                      {cert.name}
                    </h3>

                    {/* Issuer */}
                    <p className="text-sm text-muted-foreground text-center font-medium leading-snug">
                      Issued by {cert.issuer}
                    </p>

                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Quality Commitment */}
      <AnimatedSection animation="fadeIn" delay={0.6} className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Commitment to Quality
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At HORIZONIXX INTERNATIONAL, quality is not just a goal—it&apos;s our foundation.
              Our certifications represent our unwavering commitment to delivering products
              that meet the highest international standards.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                  title: 'Quality Assurance',
                  text: 'Rigorous quality control processes at every stage of production',
                },
                {
                  icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9',
                  title: 'Global Standards',
                  text: 'Compliance with international quality and safety standards',
                },
                {
                  icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                  title: 'Continuous Improvement',
                  text: 'Regular audits and updates to maintain certification standards',
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

    </div>
  );
}
