/**
 * Content Model Types
 * Defines the structure for testimonials, certifications, and other content
 * Requirements: 13.1, 13.2, 13.3, 21.1, 21.2
 */

export interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  country?: string;
  quote: string;
  avatar?: string;
  rating?: number;
  order: number;
  published: boolean;
  createdAt: Date;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  certificationNumber?: string;
  scope: string;
  description: string;
  image: string;
  issueDate?: Date;
  expiryDate?: Date;
  order: number;
  published: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  productInterest?: string;
  message: string;
  source: 'contact-form' | 'inquiry-form';
  status: 'new' | 'contacted' | 'converted' | 'closed';
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export interface ContactInfo {
  address: string;
  phone: string[];
  email: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface QuickLink {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Statistic {
  label: string;
  value: number;
  suffix: string;
  icon?: string;
}