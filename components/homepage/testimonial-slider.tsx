'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  clientName: string;
  company: string;
  country: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      company: "NaturalCare Industries",
      country: "USA",
      quote: "HORIZONIXX has been our trusted partner for premium herbal extracts. Their quality consistency and reliable supply chain have helped us maintain our product standards across global markets.",
      rating: 5
    },
    {
      id: 2,
      clientName: "Dr. Michael Chen",
      company: "Asian Wellness Corp",
      country: "Singapore",
      quote: "The quality of Moringa and Ashwagandha powders from HORIZONIXX exceeds our expectations. Their ISO certification and attention to detail make them our preferred supplier.",
      rating: 5
    },
    {
      id: 3,
      clientName: "Emma Rodriguez",
      company: "European Botanicals Ltd",
      country: "Germany",
      quote: "Outstanding service and premium quality products. HORIZONIXX understands our European market requirements and consistently delivers beyond expectations.",
      rating: 5
    },
    {
      id: 4,
      clientName: "James Thompson",
      company: "Organic Solutions Inc",
      country: "Canada",
      quote: "Their extensive range of herbal products and cosmetic ingredients has helped us expand our product line. Professional service and timely deliveries every time.",
      rating: 5
    },
    {
      id: 5,
      clientName: "Priya Sharma",
      company: "Ayurveda Exports",
      country: "UAE",
      quote: "HORIZONIXX provides authentic Ayurvedic ingredients with proper certifications. Their expertise in herbal products is unmatched in the industry.",
      rating: 5
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12,2L13.09,8.26L22,9L13.09,9.74L12,16L10.91,9.74L2,9L10.91,8.26L12,2Z"/>
      </svg>
    ));
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-green-100/20 via-emerald-100/10 to-teal-100/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-primary">Global Partners</span> Say
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-3xl mx-auto px-4 sm:px-0">
            Trusted by leading companies worldwide for premium herbal products and exceptional service
          </p>
        </motion.div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Testimonial Display */}
          <div className="relative h-96 sm:h-80 md:h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="text-center space-y-6">
                    {/* Quote */}
                    <blockquote className="text-base sm:text-lg md:text-xl text-foreground leading-relaxed italic px-4 sm:px-0">
                      "{testimonials[currentIndex].quote}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex justify-center space-x-1">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>

                    {/* Client Info */}
                    <div className="space-y-2">
                      <h4 className="font-heading font-bold text-base sm:text-lg text-foreground">
                        {testimonials[currentIndex].clientName}
                      </h4>
                      <p className="text-primary font-medium text-sm sm:text-base">
                        {testimonials[currentIndex].company}
                      </p>
                      <div className="flex items-center justify-center space-x-2 text-muted">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{testimonials[currentIndex].country}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 sm:mt-8 px-4 sm:px-0">
            {/* Previous Button */}
            <motion.button
              onClick={prevTestimonial}
              className="p-3 bg-card border border-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Pagination Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${index === currentIndex 
                      ? 'bg-primary scale-125' 
                      : 'bg-border hover:bg-primary/50'
                    }
                  `}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextTestimonial}
              className="p-3 bg-card border border-border rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Auto-play Indicator */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-primary animate-pulse' : 'bg-muted'}`}></div>
            <span className="text-xs text-muted">
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 max-w-3xl mx-auto px-4 sm:px-0"
        >
          {[
            { number: "150+", label: "Happy Clients" },
            { number: "25+", label: "Countries Served" },
            { number: "99%", label: "Client Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted font-medium text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}