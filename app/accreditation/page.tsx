/**
 * Accreditation Page
 * Displays company certifications and accreditations
 * Requirements: 13.1, 13.2, 13.3, 13.4, 15.1
 */

import React from 'react';
import { Metadata } from 'next';
import { CMSClient } from '@/lib/cms/client';
import { CertificationCard } from '@/components/ui/certification-card';
import { AnimatedSection } from '@/components/ui/animated-section';

export const metadata: Metadata = {
  title: 'Accreditation & Certifications | HORIZONIXX INTERNATIONAL',
  description: 'View our ISO 9001:2015 certification and other quality accreditations. HORIZONIXX INTERNATIONAL maintains the highest standards in herbal product export and manufacturing.',
  keywords: [
    'ISO 9001:2015 certification',
    'quality management system',
    'herbal product certification',
    'export license',
    'FSSAI license',
    'GMP certificate',
    'quality assurance',
    'international standards',
    'certified herbal exporter',
    'quality control'
  ],
  openGraph: {
    title: 'Accreditation & Certifications | HORIZONIXX INTERNATIONAL',
    description: 'View our ISO 9001:2015 certification and other quality accreditations. HORIZONIXX INTERNATIONAL maintains the highest standards in herbal product export and manufacturing.',
    type: 'website',
    images: [
      {
        url: '/images/certifications/iso-9001-2015.png',
        width: 1200,
        height: 630,
        alt: 'ISO 9001:2015 Certification - HORIZONIXX INTERNATIONAL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accreditation & Certifications | HORIZONIXX INTERNATIONAL',
    description: 'View our ISO 9001:2015 certification and other quality accreditations.',
    images: ['/images/certifications/iso-9001-2015.png'],
  },
};

export default async function AccreditationPage() {
  const certifications = await CMSClient.getCertifications();
  
  // Find ISO 9001:2015 certification to display prominently
  const isoCertification = certifications.find(cert => cert.name === 'ISO 9001:2015');
  const otherCertifications = certifications.filter(cert => cert.name !== 'ISO 9001:2015');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <AnimatedSection animation="fadeIn" className="relative pt-8 pb-20 bg-gradient-to-br from-green-100/50 via-emerald-100/30 to-teal-100/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Accreditation & 
              <span className="text-primary"> Certifications</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              HORIZONIXX INTERNATIONAL maintains the highest quality standards through internationally 
              recognized certifications and accreditations, ensuring excellence in every product we export.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* ISO 9001:2015 Prominent Display */}
      {isoCertification && (
        <AnimatedSection animation="slideUp" delay={0.2} className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Primary Certification
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We are proud to be ISO 9001:2015 certified, demonstrating our commitment to 
                quality management and customer satisfaction.
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="max-w-md">
                <CertificationCard 
                  certification={isoCertification} 
                  variant="card" 
                />
              </div>
            </div>
            
            {/* Detailed Scope Information */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 dark:border-white/10">
                <h3 className="text-2xl font-semibold text-foreground mb-4 text-center">
                  Certification Scope
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed text-lg">
                  {isoCertification.scope}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">Certification Number</h4>
                    <p className="text-muted-foreground">{isoCertification.certificationNumber}</p>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-foreground mb-2">Valid Until</h4>
                    <p className="text-muted-foreground">
                      {isoCertification.expiryDate?.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Other Certifications */}
      {otherCertifications.length > 0 && (
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {otherCertifications.map((certification, index) => (
                <AnimatedSection
                  key={certification.id}
                  animation="slideUp"
                  delay={0.1 * (index + 1)}
                  className="flex justify-center"
                >
                  <CertificationCard 
                    certification={certification} 
                    variant="card" 
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Quality Commitment Section */}
      <AnimatedSection animation="fadeIn" delay={0.6} className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Commitment to Quality
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              At HORIZONIXX INTERNATIONAL, quality is not just a goal—it&apos;s our foundation. 
              Our certifications represent our unwavering commitment to delivering products 
              that meet the highest international standards. From sourcing to packaging, 
              every step of our process is designed to ensure excellence.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Rigorous quality control processes at every stage of production
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Global Standards</h3>
                <p className="text-muted-foreground">
                  Compliance with international quality and safety standards
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Continuous Improvement</h3>
                <p className="text-muted-foreground">
                  Regular audits and updates to maintain certification standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}