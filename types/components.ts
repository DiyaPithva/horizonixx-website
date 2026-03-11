/**
 * Component Props Types
 * Defines the structure for component props and interfaces
 * Requirements: Various component requirements
 */

import { Product, Category, FilterOptions } from './product';
import { Testimonial, Certification, ContactInfo, SocialLink, QuickLink, Feature, Statistic } from './content';

// Navigation Components
export interface NavigationProps {
  currentPage: string;
  isMobile: boolean;
}

export interface NavigationItem {
  label: string;
  href: string;
  megaMenu?: MegaMenuConfig;
}

export interface MegaMenuConfig {
  categories: CategoryGroup[];
}

export interface CategoryGroup {
  title: string;
  items: { name: string; href: string; }[];
}

export interface FooterProps {
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
}

// Homepage Components
export interface HeroSectionProps {
  headline: string;
  subtext: string;
  ctaButtons: CTAButton[];
  backgroundImages: string[];
  enableParticles: boolean;
}

export interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface FeaturedProductsProps {
  products: Product[];
  layout: 'grid' | 'carousel';
}

export interface ProductCardProps {
  product: Product;
  variant: 'featured' | 'standard' | 'compact';
  showHoverEffect: boolean;
  onClick?: () => void;
}

export interface StatsCounterProps {
  stats: Statistic[];
  animationDuration: number;
}

export interface WhyChooseUsProps {
  features: Feature[];
  layout: 'grid' | 'list';
}

// Product Components
export interface ProductGridProps {
  products: Product[];
  categories: Category[];
  searchQuery?: string;
  filterOptions?: FilterOptions;
}

export interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

export interface SearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
  suggestions?: string[];
}

// Contact Components
export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  fields: FormField[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  productInterest?: string;
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  label: string;
  required: boolean;
  validation?: ValidationRule;
}

export interface ValidationRule {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  message: string;
}

export interface MapEmbedProps {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  zoom: number;
  markerLabel?: string;
}

// Shared Components
export interface ThemeToggleProps {
  position: 'header' | 'footer' | 'floating';
  showLabel?: boolean;
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  animation: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';
  delay?: number;
  threshold?: number;
}

export interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlayInterval: number;
  showNavigation: boolean;
}

export interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  position: { bottom: string; right: string; };
}

export interface CertificationCardProps {
  certification: Certification;
  variant: 'card' | 'badge';
}

export interface GlobalExportMapProps {
  className?: string;
}

export interface ExportCountry {
  id: string;
  name: string;
  region: string;
  coordinates: { x: number; y: number };
  description?: string;
}