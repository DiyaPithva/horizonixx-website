/**
 * Contact Page Layout
 * Provides metadata for the contact page
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - HORIZONIXX INTERNATIONAL',
  description: 'Get in touch with HORIZONIXX INTERNATIONAL for herbal products, cosmetic ingredients, spices, and healthcare equipment. Contact our export team for bulk orders and inquiries.',
  keywords: [
    'contact horizonixx international',
    'herbal exporter contact',
    'bulk herbal products inquiry',
    'export inquiry india',
    'moringa powder supplier contact',
    'ayurvedic products exporter',
  ],
  openGraph: {
    title: 'Contact Us - HORIZONIXX INTERNATIONAL',
    description: 'Get in touch with HORIZONIXX INTERNATIONAL for herbal products, cosmetic ingredients, spices, and healthcare equipment.',
    type: 'website',
    url: '/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}