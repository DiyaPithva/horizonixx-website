/**
 * CertificationCard Component
 * Displays certification information with glassmorphism styling
 * Requirements: 13.1, 13.2, 13.3, 13.4
 */

import React from 'react';
import Image from 'next/image';
import { CertificationCardProps } from '@/types/components';

export function CertificationCard({ certification, variant = 'card' }: CertificationCardProps) {
  const isCard = variant === 'card';
  const isBadge = variant === 'badge';

  const cardClasses = `
    relative overflow-hidden transition-all duration-300 hover:scale-105
    backdrop-blur-md bg-white/10 dark:bg-white/5
    border border-white/20 dark:border-white/10
    shadow-lg hover:shadow-xl
    ${isCard ? 'rounded-2xl p-6 space-y-4 min-h-[200px] max-w-sm' : ''}
    ${isBadge ? 'rounded-xl p-4 space-y-2 min-h-[160px] max-w-xs' : ''}
  `;

  const imageClasses = `
    relative mx-auto bg-white/20 dark:bg-white/10 rounded-lg overflow-hidden
    ${isCard ? 'w-24 h-24 mb-4' : ''}
    ${isBadge ? 'w-16 h-16 mb-2' : ''}
  `;

  const nameClasses = `
    font-semibold text-foreground text-center leading-tight
    ${isCard ? 'text-lg mb-2' : ''}
    ${isBadge ? 'text-sm mb-1' : ''}
  `;

  const issuerClasses = `
    text-muted-foreground text-center font-medium
    ${isCard ? 'text-sm mb-3' : ''}
    ${isBadge ? 'text-xs mb-1' : ''}
  `;

  return (
    <div
      className={cardClasses}
      data-testid="certification-card"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Certification Image */}
        <div className={imageClasses}>
          <Image
            src={certification.image}
            alt={`${certification.name} certification`}
            fill
            className="object-contain p-2"
            data-testid="certification-image"
          />
        </div>

        {/* Certification Name */}
        <h3 
          className={nameClasses}
          data-testid="certification-name"
        >
          {certification.name}
        </h3>

        {/* Issuer */}
        <p 
          className={issuerClasses}
          data-testid="certification-issuer"
        >
          Issued by {certification.issuer}
        </p>


      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default CertificationCard;