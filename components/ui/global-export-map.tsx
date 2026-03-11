'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedSection } from './animated-section';

interface ExportCountry {
  id: string;
  name: string;
  region: string;
  coordinates: { x: number; y: number };
  description?: string;
}

interface GlobalExportMapProps {
  className?: string;
}

// Export countries data - 25+ countries as per requirement 22.2
const exportCountries: ExportCountry[] = [
  // North America
  { id: 'usa', name: 'United States', region: 'North America', coordinates: { x: 200, y: 150 }, description: 'Major market for herbal supplements and cosmetic ingredients' },
  { id: 'canada', name: 'Canada', region: 'North America', coordinates: { x: 180, y: 120 }, description: 'Growing demand for organic herbal products' },
  { id: 'mexico', name: 'Mexico', region: 'North America', coordinates: { x: 160, y: 200 }, description: 'Traditional medicine and cosmetics market' },
  
  // South America
  { id: 'brazil', name: 'Brazil', region: 'South America', coordinates: { x: 280, y: 320 }, description: 'Large consumer of natural health products' },
  { id: 'argentina', name: 'Argentina', region: 'South America', coordinates: { x: 270, y: 380 }, description: 'Expanding wellness industry' },
  { id: 'chile', name: 'Chile', region: 'South America', coordinates: { x: 250, y: 370 }, description: 'Premium natural products market' },
  
  // Europe
  { id: 'uk', name: 'United Kingdom', region: 'Europe', coordinates: { x: 480, y: 130 }, description: 'Leading European market for herbal medicines' },
  { id: 'germany', name: 'Germany', region: 'Europe', coordinates: { x: 510, y: 140 }, description: 'Largest European market for natural products' },
  { id: 'france', name: 'France', region: 'Europe', coordinates: { x: 490, y: 150 }, description: 'Premium cosmetics and wellness market' },
  { id: 'italy', name: 'Italy', region: 'Europe', coordinates: { x: 520, y: 170 }, description: 'Traditional herbal medicine heritage' },
  { id: 'spain', name: 'Spain', region: 'Europe', coordinates: { x: 470, y: 180 }, description: 'Growing organic products sector' },
  { id: 'netherlands', name: 'Netherlands', region: 'Europe', coordinates: { x: 500, y: 130 }, description: 'Distribution hub for European markets' },
  
  // Asia Pacific
  { id: 'japan', name: 'Japan', region: 'Asia Pacific', coordinates: { x: 720, y: 180 }, description: 'Premium wellness and beauty market' },
  { id: 'south_korea', name: 'South Korea', region: 'Asia Pacific', coordinates: { x: 710, y: 170 }, description: 'K-beauty and wellness trends' },
  { id: 'singapore', name: 'Singapore', region: 'Asia Pacific', coordinates: { x: 680, y: 260 }, description: 'Gateway to Southeast Asian markets' },
  { id: 'malaysia', name: 'Malaysia', region: 'Asia Pacific', coordinates: { x: 670, y: 270 }, description: 'Traditional and modern medicine blend' },
  { id: 'thailand', name: 'Thailand', region: 'Asia Pacific', coordinates: { x: 660, y: 250 }, description: 'Spa and wellness tourism market' },
  { id: 'australia', name: 'Australia', region: 'Asia Pacific', coordinates: { x: 740, y: 380 }, description: 'Natural health products leader' },
  { id: 'new_zealand', name: 'New Zealand', region: 'Asia Pacific', coordinates: { x: 780, y: 420 }, description: 'Organic and natural products focus' },
  
  // Middle East & Africa
  { id: 'uae', name: 'United Arab Emirates', region: 'Middle East', coordinates: { x: 580, y: 220 }, description: 'Luxury wellness and beauty hub' },
  { id: 'saudi_arabia', name: 'Saudi Arabia', region: 'Middle East', coordinates: { x: 570, y: 230 }, description: 'Traditional medicine and modern wellness' },
  { id: 'south_africa', name: 'South Africa', region: 'Africa', coordinates: { x: 540, y: 380 }, description: 'Natural products and traditional medicine' },
  { id: 'egypt', name: 'Egypt', region: 'Africa', coordinates: { x: 540, y: 200 }, description: 'Ancient herbal traditions meet modern needs' },
  
  // Additional countries to reach 25+
  { id: 'china', name: 'China', region: 'Asia', coordinates: { x: 650, y: 180 }, description: 'Traditional Chinese medicine market' },
  { id: 'russia', name: 'Russia', region: 'Europe/Asia', coordinates: { x: 600, y: 120 }, description: 'Growing natural health awareness' },
  { id: 'turkey', name: 'Turkey', region: 'Europe/Asia', coordinates: { x: 550, y: 180 }, description: 'Bridge between European and Asian markets' },
  { id: 'israel', name: 'Israel', region: 'Middle East', coordinates: { x: 560, y: 200 }, description: 'Innovation in natural health products' }
];

export function GlobalExportMap({ className = '' }: GlobalExportMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<ExportCountry | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleCountryHover = (country: ExportCountry, event: React.MouseEvent) => {
    setHoveredCountry(country);
    const rect = event.currentTarget.closest('.relative')?.getBoundingClientRect();
    if (rect) {
      setTooltipPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
  };

  const handleCountryLeave = () => {
    setHoveredCountry(null);
  };

  return (
    <AnimatedSection animation="fadeIn" className={className}>
      <div className="relative w-full max-w-6xl mx-auto">
        {/* Map Title */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Global Export Network
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Serving 25+ countries worldwide with premium herbal products, cosmetic ingredients, 
            and natural wellness solutions. Our global reach ensures quality products reach 
            international markets.
          </p>
        </div>

        {/* World Map with Image Background */}
        <div className="relative rounded-xl shadow-sm border p-6 bg-white/40 backdrop-blur-sm overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: '55.56%' }}>
            {/* World Map Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                filter: 'brightness(0.9) contrast(1.1)'
              }}
            />
            
            {/* Overlay for better dot visibility */}
            <div className="absolute inset-0 bg-green-50/20 rounded-lg" />

            {/* Export Countries Markers */}
            {exportCountries.map((country, index) => (
              <motion.div
                key={country.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${(country.coordinates.x / 900) * 100}%`,
                  top: `${(country.coordinates.y / 500) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.3,
                  ease: "easeOut"
                }}
                onMouseEnter={(e) => handleCountryHover(country, e)}
                onMouseLeave={handleCountryLeave}
              >
                {/* Main dot */}
                <motion.div
                  className="w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow-lg relative z-10"
                  whileHover={{ 
                    scale: 1.5,
                    backgroundColor: "var(--color-green-700)"
                  }}
                />
                
                {/* Pulsing animation ring */}
                <motion.div
                  className="absolute inset-0 w-3 h-3 bg-green-600/30 rounded-full"
                  animate={{
                    scale: [1, 3, 1],
                    opacity: [0.3, 0, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Interactive Tooltip */}
          {hoveredCountry && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute z-10 bg-card border border-border rounded-lg p-4 shadow-xl max-w-xs pointer-events-none"
              style={{
                left: tooltipPosition.x + 10,
                top: tooltipPosition.y - 10,
                transform: 'translateY(-100%)'
              }}
            >
              <h4 className="font-semibold text-foreground mb-1">
                {hoveredCountry.name}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {hoveredCountry.region}
              </p>
              {hoveredCountry.description && (
                <p className="text-xs text-muted-foreground">
                  {hoveredCountry.description}
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <div className="text-sm text-muted-foreground">Countries Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-sm text-muted-foreground">Continents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Global Partners</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>

        {/* Regional Breakdown */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'North America', filter: (country: ExportCountry) => country.region === 'North America' },
            { name: 'Europe', filter: (country: ExportCountry) => country.region === 'Europe' || country.region === 'Europe/Asia' },
            { name: 'Asia Pacific', filter: (country: ExportCountry) => country.region === 'Asia Pacific' || country.region === 'Asia' },
            { name: 'Middle East', filter: (country: ExportCountry) => country.region === 'Middle East' },
            { name: 'South America', filter: (country: ExportCountry) => country.region === 'South America' },
            { name: 'Africa', filter: (country: ExportCountry) => country.region === 'Africa' }
          ].map((regionConfig) => {
            const regionCountries = exportCountries.filter(regionConfig.filter);
            
            return (
              <motion.div
                key={regionConfig.name}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                whileHover={{ y: -2 }}
              >
                <h4 className="font-semibold text-foreground mb-3">{regionConfig.name}</h4>
                <div className="text-2xl font-bold text-primary mb-2">
                  {regionCountries.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Countries served in this region
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}