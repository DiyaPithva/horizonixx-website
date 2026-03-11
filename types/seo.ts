/**
 * SEO and Metadata Types
 * Defines the structure for SEO metadata and structured data
 * Requirements: 15.1, 15.2, 15.3
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonical?: string;
  structuredData?: StructuredData;
}

export interface StructuredData {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: any;
}

// Specific structured data types
export interface OrganizationSchema extends StructuredData {
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  address: PostalAddress;
  contactPoint: ContactPoint[];
  sameAs: string[];
}

export interface ProductSchema extends StructuredData {
  '@type': 'Product';
  name: string;
  description: string;
  image: string[];
  brand: Brand;
  category: string;
  offers?: Offer;
}

export interface PostalAddress {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface ContactPoint {
  '@type': 'ContactPoint';
  telephone: string;
  contactType: string;
  availableLanguage: string[];
}

export interface Brand {
  '@type': 'Brand';
  name: string;
}

export interface Offer {
  '@type': 'Offer';
  availability: string;
  priceCurrency?: string;
  price?: string;
}

export interface BreadcrumbList extends StructuredData {
  '@type': 'BreadcrumbList';
  itemListElement: ListItem[];
}

export interface ListItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item: string;
}