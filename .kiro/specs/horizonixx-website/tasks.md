# Implementation Plan: HORIZONIXX INTERNATIONAL Website

## Overview

This implementation plan breaks down the development of the HORIZONIXX INTERNATIONAL website into discrete, incremental tasks. The approach follows a bottom-up strategy: establishing the foundation (project setup, design system), building core components, implementing pages, integrating CMS, adding animations, and finally optimizing for performance and SEO.

Each task builds on previous work, ensuring no orphaned code. Testing tasks are marked as optional (*) for faster MVP delivery.

## Tasks

- [x] 1. Project Setup and Configuration
  - Initialize Next.js 14 project with TypeScript and App Router
  - Configure TailwindCSS with custom theme colors (Leaf Green #2e7d32, Natural Green #4caf50, Soft Beige #f5f7f2)
  - Set up ESLint, Prettier, and Husky for code quality
  - Configure environment variables structure
  - Install core dependencies: Framer Motion, next-themes, React Testing Library, fast-check
  - Create project directory structure (components/, app/, lib/, types/, styles/)
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 2. Design System and Theme Foundation
  - [x] 2.1 Create TypeScript type definitions for theme, colors, and design tokens
    - Define ThemeConfig, ColorPalette, FontConfig, AnimationConfig interfaces
    - Define Product, Category, Testimonial, Certification data model types
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 2.2 Implement theme configuration with light and dark mode palettes
    - Create theme.config.ts with light/dark color palettes
    - Configure TailwindCSS to use theme tokens
    - Set up CSS custom properties for dynamic theming
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
  
  - [x] 2.3 Create ThemeProvider component with next-themes
    - Implement theme context provider
    - Create useTheme custom hook
    - Add theme persistence to localStorage
    - _Requirements: 4.1, 4.2, 4.3, 4.4_
  
  - [x] 2.4 Write property test for theme persistence
    - **Property 10: Theme Persistence Round-Trip**
    - **Validates: Requirements 4.4**
  
  - [x] 2.5 Write property test for theme application consistency
    - **Property 9: Theme Application Consistency**
    - **Validates: Requirements 4.2, 4.3**

- [x] 3. Core Reusable Components
  - [x] 3.1 Create ThemeToggle component
    - Implement toggle button with sun/moon icons
    - Add smooth transition animation
    - Support keyboard accessibility
    - _Requirements: 4.1_
  
  - [x] 3.2 Create AnimatedSection component with Framer Motion
    - Implement scroll-triggered reveal animations (fadeIn, slideUp, slideLeft, slideRight)
    - Use Intersection Observer for viewport detection
    - Support configurable delay and threshold
    - _Requirements: 6.1_
  
  - [x] 3.3 Write property test for scroll animation trigger
    - **Property 12: Scroll Animation Trigger**
    - **Validates: Requirements 6.1**
  
  - [x] 3.4 Create AnimatedCounter component
    - Implement counting animation from 0 to target value
    - Trigger animation when component enters viewport
    - Support configurable duration and easing
    - _Requirements: 6.2, 8.5_
  
  - [x] 3.5 Write property test for counter animation behavior
    - **Property 13: Counter Animation Behavior**
    - **Validates: Requirements 6.2, 8.5**
  
  - [x] 3.6 Create Button component with hover micro-interactions
    - Implement primary and secondary variants
    - Add hover scale and shadow effects
    - Support loading and disabled states
    - _Requirements: 6.3_
  
  - [x] 3.7 Write property test for interactive element hover feedback
    - **Property 14: Interactive Element Hover Feedback**
    - **Validates: Requirements 6.3**

- [x] 4. Layout Components
  - [x] 4.1 Create Navigation component
    - Implement responsive navigation with mobile hamburger menu
    - Add sticky navigation on scroll
    - Highlight active page in navigation
    - Integrate ThemeToggle component
    - _Requirements: 19.1, 19.3, 19.5_
  
  - [x] 4.2 Write property test for active navigation highlighting
    - **Property 32: Active Navigation Highlighting**
    - **Validates: Requirements 19.3**
  
  - [x] 4.3 Write property test for sticky navigation behavior
    - **Property 33: Sticky Navigation Behavior**
    - **Validates: Requirements 19.5**
  
  - [x] 4.4 Create MegaMenu component for product categories
    - Implement dropdown with category groups
    - Add hover animations and transitions
    - Make keyboard accessible
    - _Requirements: 19.2_
  
  - [x] 4.5 Create Footer component
    - Display contact information, quick links, social links
    - Add company address and email
    - Make responsive for mobile
    - _Requirements: 14.1, 14.2, 14.3, 14.4_
  
  - [x] 4.6 Create RootLayout with Navigation and Footer
    - Wrap all pages with consistent layout
    - Integrate ThemeProvider
    - Add Google Analytics script
    - _Requirements: 17.1_

- [x] 5. Product Components
  - [x] 5.1 Create ProductCard component
    - Display product image, name, short description
    - Implement hover animation effects (scale, shadow)
    - Add link to product detail page
    - Support featured, standard, and compact variants
    - _Requirements: 2.5, 7.2, 7.3, 7.4_
  
  - [x] 5.2 Write property test for product card hover animation
    - **Property 4: Product Card Hover Animation**
    - **Validates: Requirements 2.5, 7.3**
  
  - [x] 5.3 Write property test for featured product card structure
    - **Property 17: Featured Product Card Structure**
    - **Validates: Requirements 7.2, 7.4**
  
  - [x] 5.4 Create ProductGrid component
    - Implement responsive CSS grid layout
    - Support filtering by category
    - Add empty state for no products
    - _Requirements: 7.5, 10.5, 11.1_
  
  - [x] 5.5 Write property test for responsive grid layout
    - **Property 18: Responsive Grid Layout**
    - **Validates: Requirements 7.5, 10.5**
  
  - [x] 5.6 Create ProductDetail component
    - Display full product information (name, image, description, specifications, benefits, packing)
    - Implement image gallery with zoom
    - Add specifications table
    - Display benefits as list
    - _Requirements: 2.1, 11.2_
  
  - [x] 5.7 Write property test for product display completeness
    - **Property 1: Product Display Completeness**
    - **Validates: Requirements 2.1, 11.2**
  
  - [x] 5.8 Write property test for no e-commerce features
    - **Property 2: No E-commerce Features Present**
    - **Validates: Requirements 2.2**

- [x] 6. Homepage Components
  - [x] 6.1 Create Hero section component
    - Display headline and subtext
    - Add two CTA buttons (Explore Products, Contact Us)
    - Implement floating leaf particles animation with Framer Motion
    - Add herbal background imagery
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  
  - [x] 6.2 Create FeaturedProducts section component
    - Display 6 featured products (Moringa, Ashwagandha, Tulsi, Amla, Neem, Spirulina)
    - Use ProductCard components in grid layout
    - Add section heading and description
    - _Requirements: 7.1, 7.2, 7.5_
  
  - [x] 6.3 Create WhyChooseUs section component
    - Display 5 feature cards with icons (Global Export Network, Quality Assured, ISO Certified, Reliable Supply Chain, Bulk Industrial Supply)
    - Implement glassmorphism card styling
    - Add icon animations on viewport entry
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 3.8_
  
  - [x] 6.4 Write property test for glassmorphism card styling
    - **Property 7: Glassmorphism Card Styling**
    - **Validates: Requirements 3.8**
  
  - [x] 6.5 Write property test for feature card styling consistency
    - **Property 19: Feature Card Styling Consistency**
    - **Validates: Requirements 9.6**
  
  - [x] 6.6 Create CompanyStats section component
    - Display 4 animated counters (Countries: 25+, Products: 300+, Clients: 150+, Years: 10+)
    - Use AnimatedCounter component
    - Add icons for each stat
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [x] 6.7 Create ProductCategories section component
    - Display 4 category cards (Herbal & Cosmetics, Healthcare Equipment, Spices, Dehydrated Foods)
    - Link each card to products page with category filter
    - Add category icons and descriptions
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 7. Checkpoint - Core Components Complete
  - Verify all core components render correctly
  - Test theme switching functionality
  - Test responsive behavior on mobile, tablet, desktop
  - Ensure all tests pass, ask the user if questions arise

- [x] 8. CMS Integration Setup
  - [x] 8.1 Set up Sanity CMS project
    - Initialize Sanity project
    - Configure Sanity Studio
    - Set up authentication and API tokens
    - _Requirements: 16.1_
  
  - [x] 8.2 Define Sanity schemas for content models
    - Create Product schema (name, slug, category, description, specifications, benefits, packing, images)
    - Create Category schema (name, slug, description, icon, image)
    - Create Testimonial schema (clientName, company, quote, avatar, rating)
    - Create Certification schema (name, issuer, scope, description, image)
    - _Requirements: 16.1_
  
  - [x] 8.3 Create CMS client utility functions
    - Implement getProducts, getProductBySlug, getCategories, getTestimonials, getCertifications
    - Add error handling and retry logic
    - Configure caching strategy
    - _Requirements: 16.1, 16.2_
  
  - [x] 8.4 Write property test for CMS data synchronization
    - **Property 28: CMS Data Synchronization Round-Trip**
    - **Validates: Requirements 16.2, 16.3, 16.4, 16.5**
  
  - [x] 8.5 Seed CMS with initial product data
    - Add all herbal powders (Amla, Ashwagandha, Neem, Moringa, Triphala, Shatavari, Brahmi)
    - Add cosmetic powders (Multani Mitti, Sandalwood, Hibiscus, Indigo)
    - Add spices (Turmeric, Ginger, Garlic, Black Pepper)
    - Add dehydrated powders (Beetroot, Mango, Banana, Carrot)
    - Add categories, testimonials, and certifications
    - _Requirements: 11.3, 11.4, 11.5, 11.6_

- [x] 9. Page Implementation - Homepage
  - [x] 9.1 Create homepage (app/page.tsx)
    - Compose Hero, FeaturedProducts, WhyChooseUs, CompanyStats, ProductCategories sections
    - Wrap sections with AnimatedSection for scroll reveals
    - Add SEO metadata (title, description, keywords, OpenGraph tags)
    - Implement structured data for Organization
    - _Requirements: 1.1, 1.2, 1.3, 7.1, 8.1, 8.2, 8.3, 8.4, 9.1, 9.2, 9.3, 9.4, 9.5, 10.1, 10.2, 10.3, 10.4, 15.1, 15.2, 15.3, 15.5_
  
  - [x] 9.2 Write unit tests for homepage
    - Test hero section displays correct content
    - Test featured products section renders
    - Test stats counters are present
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [x] 9.3 Write property test for SEO meta tags presence
    - **Property 24: SEO Meta Tags Presence**
    - **Validates: Requirements 15.1**
  
  - [x] 9.4 Write property test for OpenGraph tags presence
    - **Property 26: OpenGraph Tags Presence**
    - **Validates: Requirements 15.3**

- [ ] 10. Page Implementation - Products
  - [x] 10.1 Create SearchBar component
    - Implement real-time search input with debouncing
    - Filter products by name, description, and category
    - Display search suggestions
    - Show empty state message when no results
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5_
  
  - [x] 10.2 Write property test for search query filtering
    - **Property 34: Search Query Filtering**
    - **Validates: Requirements 20.2, 20.3**
  
  - [x] 10.3 Write property test for real-time search updates
    - **Property 35: Real-Time Search Updates**
    - **Validates: Requirements 20.4**
  
  - [x] 10.4 Create products page (app/products/page.tsx)
    - Fetch products from CMS
    - Implement category filtering
    - Integrate SearchBar and ProductGrid components
    - Add SEO metadata and structured data for products
    - _Requirements: 11.1, 11.2, 20.1, 15.1, 15.2, 15.3_
  
  - [x] 10.5 Write property test for product category organization
    - **Property 20: Product Category Organization**
    - **Validates: Requirements 11.1**
  
  - [x] 10.6 Write property test for product categorization
    - **Property 3: Product Categorization**
    - **Validates: Requirements 2.4**
  
  - [x] 10.7 Create dynamic product detail page (app/products/[slug]/page.tsx)
    - Fetch product by slug from CMS
    - Use ProductDetail component
    - Add related products section
    - Implement structured data for Product schema
    - Generate static params for all products (SSG)
    - _Requirements: 2.1, 2.3, 11.2, 15.2_
  
  - [x] 10.8 Write property test for structured data schema
    - **Property 25: Structured Data Schema**
    - **Validates: Requirements 15.2**

- [ ] 11. Page Implementation - About Us
  - [x] 11.1 Create About Us page (app/about/page.tsx)
    - Display company description and mission statement
    - Add company history timeline
    - Show product categories handled
    - Emphasize quality standards and global reach
    - Add SEO metadata
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 15.1_
  
  - [x] 11.2 Create GlobalExportMap component
    - Implement world map visualization with highlighted countries
    - Show 25+ export countries
    - Add interactive tooltips for regions
    - Style consistently with theme
    - _Requirements: 22.1, 22.2, 22.3, 22.4_
  
  - [x] 11.3 Write property test for map interaction information display
    - **Property 39: Map Interaction Information Display**
    - **Validates: Requirements 22.3**
  
  - [x] 11.4 Integrate GlobalExportMap into About page
    - Add map section with heading
    - Wrap with AnimatedSection
    - _Requirements: 22.4_

- [ ] 12. Page Implementation - Accreditation
  - [x] 12.1 Create CertificationCard component
    - Display certification name, issuer, scope, image
    - Implement card and badge variants
    - Add glassmorphism styling
    - _Requirements: 13.1, 13.2, 13.3, 13.4_
  
  - [x] 12.2 Write property test for certification image display
    - **Property 21: Certification Image Display**
    - **Validates: Requirements 13.2**
  
  - [x] 12.3 Write property test for certification card layout
    - **Property 22: Certification Card Layout**
    - **Validates: Requirements 13.4**
  
  - [x] 12.4 Create Accreditation page (app/accreditation/page.tsx)
    - Fetch certifications from CMS
    - Display ISO 9001:2015 certification prominently
    - Show certification scope details
    - Use CertificationCard components in grid
    - Add SEO metadata
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 15.1_

- [ ] 13. Page Implementation - Contact
  - [x] 13.1 Create ContactForm component
    - Implement form fields (name, email, phone, company, message, product interest)
    - Add client-side validation with error messages
    - Show loading state during submission
    - Display success/error messages
    - Implement rate limiting (max 5 per hour per IP)
    - _Requirements: 14.5_
  
  - [ ] 13.2 Write property test for contact form submission handling
    - **Property 23: Contact Form Submission Handling**
    - **Validates: Requirements 14.5**
  
  - [ ] 13.3 Write unit tests for form validation
    - Test required field validation
    - Test email format validation
    - Test error message display
    - _Requirements: 14.5_
  
  - [ ] 13.4 Create MapEmbed component
    - Embed Google Maps with office location
    - Add custom marker with company name
    - Make responsive
    - _Requirements: 14.6_
  
  - [ ] 13.5 Create WhatsAppButton component
    - Implement floating button with WhatsApp icon
    - Link to business WhatsApp number
    - Add hover animation
    - Position fixed at bottom-right
    - _Requirements: 14.7_
  
  - [ ] 13.6 Create API route for contact form (app/api/contact/route.ts)
    - Validate form data on server
    - Implement rate limiting
    - Send email notification or save to database
    - Return success/error response
    - _Requirements: 14.5_
  
  - [ ] 13.7 Create Contact page (app/contact/page.tsx)
    - Display contact information (phone numbers, address, email)
    - Integrate ContactForm component
    - Add MapEmbed component
    - Add WhatsAppButton component
    - Add SEO metadata
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 15.1_

- [ ] 14. Checkpoint - All Pages Complete
  - Test navigation between all pages
  - Verify all content displays correctly
  - Test forms and interactive elements
  - Ensure all tests pass, ask the user if questions arise

- [ ] 15. Testimonials and Additional Features
  - [ ] 15.1 Create TestimonialSlider component
    - Display testimonials with client name and company
    - Implement auto-advance every 5 seconds
    - Add manual navigation controls (prev/next)
    - Add pagination dots
    - Make responsive
    - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5_
  
  - [ ] 15.2 Write property test for testimonial display completeness
    - **Property 36: Testimonial Display Completeness**
    - **Validates: Requirements 21.2**
  
  - [ ] 15.3 Write property test for testimonial auto-advance timing
    - **Property 37: Testimonial Auto-Advance Timing**
    - **Validates: Requirements 21.3**
  
  - [ ] 15.4 Write property test for testimonial manual navigation
    - **Property 38: Testimonial Manual Navigation**
    - **Validates: Requirements 21.4**
  
  - [ ] 15.5 Integrate TestimonialSlider into homepage
    - Add testimonials section after CompanyStats
    - Fetch testimonials from CMS
    - Wrap with AnimatedSection
    - _Requirements: 21.1_

- [ ] 16. Responsive Design and Accessibility
  - [ ] 16.1 Implement responsive breakpoints for all components
    - Test and adjust layouts for mobile (< 768px)
    - Test and adjust layouts for tablet (768px - 1919px)
    - Test and adjust layouts for desktop (>= 1920px)
    - Ensure no horizontal scrolling at any viewport width
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
  
  - [ ] 16.2 Write property test for responsive layout without overflow
    - **Property 11: Responsive Layout Without Overflow**
    - **Validates: Requirements 5.4**
  
  - [ ] 16.3 Add ARIA labels and roles for accessibility
    - Add alt text to all images
    - Add ARIA labels to interactive elements
    - Ensure keyboard navigation works
    - Test with screen reader
    - _Requirements: 5.5_
  
  - [ ] 16.4 Write property test for semantic heading hierarchy
    - **Property 27: Semantic Heading Hierarchy**
    - **Validates: Requirements 15.4**
  
  - [ ] 16.5 Run accessibility tests with jest-axe
    - Test all pages for accessibility violations
    - Fix any issues found
    - _Requirements: 5.5_

- [ ] 17. Performance Optimization
  - [ ] 17.1 Implement image optimization
    - Use Next.js Image component for all images
    - Configure image formats (WebP, AVIF)
    - Set appropriate image sizes and quality
    - Add blur placeholders
    - _Requirements: 17.3_
  
  - [ ] 17.2 Write property test for image optimization
    - **Property 29: Image Optimization**
    - **Validates: Requirements 17.3**
  
  - [ ] 17.3 Implement lazy loading for images
    - Add loading="lazy" to images below the fold
    - Use Intersection Observer for custom lazy loading
    - _Requirements: 17.4_
  
  - [ ] 17.4 Write property test for lazy loading implementation
    - **Property 30: Lazy Loading Implementation**
    - **Validates: Requirements 17.4**
  
  - [ ] 17.5 Configure caching and revalidation
    - Set up ISR (Incremental Static Regeneration) for product pages
    - Configure cache headers for static assets
    - Implement stale-while-revalidate strategy
    - _Requirements: 17.2_
  
  - [ ] 17.6 Optimize bundle size
    - Analyze bundle with Next.js analyzer
    - Code-split large components
    - Remove unused dependencies
    - Tree-shake imports
    - _Requirements: 17.2_
  
  - [ ] 17.7 Run Lighthouse audits and optimize
    - Run Lighthouse on all pages
    - Achieve performance score > 85
    - Fix any issues identified
    - _Requirements: 17.5_
  
  - [ ] 17.8 Write property test for Lighthouse performance score
    - **Property 31: Lighthouse Performance Score**
    - **Validates: Requirements 17.5**

- [ ] 18. SEO and Analytics
  - [ ] 18.1 Create SEO metadata utility
    - Create generateMetadata function for all pages
    - Include title, description, keywords, OpenGraph, Twitter cards
    - Add canonical URLs
    - _Requirements: 15.1, 15.3_
  
  - [ ] 18.2 Implement structured data for all pages
    - Add Organization schema to homepage
    - Add Product schema to product pages
    - Add BreadcrumbList schema to all pages
    - Validate with Google Rich Results Test
    - _Requirements: 15.2_
  
  - [ ] 18.3 Create sitemap.xml
    - Generate dynamic sitemap with all pages and products
    - Include lastmod dates
    - Submit to Google Search Console
    - _Requirements: 15.1_
  
  - [ ] 18.4 Create robots.txt
    - Allow all pages for crawling
    - Add sitemap reference
    - _Requirements: 15.1_
  
  - [ ] 18.5 Set up Google Analytics 4
    - Add GA4 tracking code
    - Configure custom events (product views, form submissions, searches)
    - Test event tracking
    - _Requirements: 17.1_
  
  - [ ] 18.6 Set up Vercel Analytics
    - Enable Vercel Analytics
    - Monitor Web Vitals (LCP, FID, CLS)
    - _Requirements: 17.1_

- [ ] 19. Error Handling and Edge Cases
  - [ ] 19.1 Create custom 404 page
    - Design 404 page with navigation
    - Suggest related products or categories
    - Add search functionality
    - _Requirements: Error Handling_
  
  - [ ] 19.2 Create custom error page (error.tsx)
    - Handle runtime errors gracefully
    - Display user-friendly error message
    - Add retry button
    - Log errors for monitoring
    - _Requirements: Error Handling_
  
  - [ ] 19.3 Implement error boundaries for components
    - Wrap critical components with error boundaries
    - Provide fallback UI
    - Log errors to monitoring service
    - _Requirements: Error Handling_
  
  - [ ] 19.4 Add loading states for all async operations
    - Add skeleton loaders for products
    - Add spinners for form submissions
    - Add loading indicators for search
    - _Requirements: Error Handling_
  
  - [ ] 19.5 Implement fallback for CMS failures
    - Cache CMS data for offline access
    - Display cached data when CMS is unavailable
    - Show warning message to user
    - _Requirements: Error Handling_

- [ ] 20. Final Integration and Testing
  - [ ] 20.1 Integration testing for critical user flows
    - Test homepage → products → product detail flow
    - Test search functionality end-to-end
    - Test contact form submission flow
    - Test theme switching across pages
    - _Requirements: All_
  
  - [ ] 20.2 Run all property-based tests with 1000 iterations
    - Increase numRuns to 1000 for all property tests
    - Fix any failures discovered
    - _Requirements: All_
  
  - [ ] 20.3 Run full test suite and achieve coverage goals
    - Run all unit tests and property tests
    - Verify 80%+ code coverage
    - Fix any failing tests
    - _Requirements: All_
  
  - [ ] 20.4 Cross-browser testing
    - Test on Chrome, Firefox, Safari, Edge
    - Fix any browser-specific issues
    - Test on iOS Safari and Android Chrome
    - _Requirements: 5.1, 5.2, 5.3_
  
  - [ ] 20.5 Performance testing
    - Test page load times on 3G, 4G, and broadband
    - Verify all pages load within 3 seconds
    - Optimize any slow pages
    - _Requirements: 17.2_

- [ ] 21. Deployment and Launch Preparation
  - [ ] 21.1 Configure production environment variables
    - Set up Sanity production API keys
    - Configure Google Analytics ID
    - Set up Google Maps API key
    - Configure email service for contact form
    - _Requirements: 16.1, 17.1, 14.6_
  
  - [ ] 21.2 Deploy to Vercel
    - Connect GitHub repository to Vercel
    - Configure build settings
    - Set up environment variables
    - Deploy to production
    - _Requirements: All_
  
  - [ ] 21.3 Configure custom domain
    - Add custom domain to Vercel
    - Configure DNS settings
    - Set up SSL certificate
    - _Requirements: All_
  
  - [ ] 21.4 Post-deployment verification
    - Verify all pages load correctly
    - Test all forms and interactive features
    - Verify CMS integration works
    - Check analytics tracking
    - Run Lighthouse audit on production
    - _Requirements: All_
  
  - [ ] 21.5 Set up monitoring and error tracking
    - Integrate Sentry or similar error tracking
    - Set up uptime monitoring
    - Configure alerts for critical errors
    - _Requirements: Error Handling_

- [ ] 22. Final Checkpoint - Launch Ready
  - All pages deployed and accessible
  - All tests passing
  - Performance metrics meeting targets
  - Analytics tracking verified
  - Error monitoring active
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- The implementation follows a bottom-up approach: foundation → components → pages → optimization
- All code should be written in TypeScript with strict type checking
- Use Next.js 14 App Router with React Server Components where appropriate
- Follow accessibility best practices (WCAG 2.1 Level AA)
