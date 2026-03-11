# Design Document: HORIZONIXX INTERNATIONAL Website

## Overview

The HORIZONIXX INTERNATIONAL website is a premium B2B showcase platform built with Next.js 14, designed to present the company's herbal products, cosmetic ingredients, healthcare equipment, spices, and dehydrated foods to industrial clients worldwide. The architecture emphasizes visual excellence, performance, and future extensibility for e-commerce capabilities.

The system follows a modern JAMstack architecture with server-side rendering for SEO, a headless CMS for content management, and component-based design for maintainability. The design prioritizes smooth animations, responsive layouts, and a premium aesthetic that conveys trust and quality to B2B clients.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Next.js 14 Application (SSR/SSG)             │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │   Pages      │  │  Components  │  │   Hooks     │ │ │
│  │  │  - Home      │  │  - Hero      │  │  - useTheme │ │ │
│  │  │  - Products  │  │  - ProductCard│  │  - useAnim  │ │ │
│  │  │  - About     │  │  - Navigation│  │  - useCMS   │ │ │
│  │  │  - Contact   │  │  - Footer    │  │             │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────┘ │ │
│  │                                                        │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │        State Management (React Context)          │ │ │
│  │  │  - Theme State (Dark/Light)                      │ │ │
│  │  │  - Animation State                               │ │ │
│  │  │  - Search State                                  │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ API Routes / Data Fetching
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend Services Layer                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js API Routes                        │ │
│  │  - /api/products (fetch from CMS)                     │ │
│  │  - /api/contact (handle form submissions)            │ │
│  │  - /api/search (product search)                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ CMS API Calls
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  Headless CMS (Sanity/Strapi)               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Content Models                            │ │
│  │  - Product (name, description, specs, images)         │ │
│  │  - Category (name, slug, description)                 │ │
│  │  - Testimonial (client, company, quote)              │ │
│  │  - Certification (name, image, description)          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Analytics & Monitoring
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  - Google Analytics (tracking)                              │
│  - Vercel Analytics (performance)                           │
│  - Google Maps API (location embed)                         │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Next.js 14 (App Router with React Server Components)
- React 18
- TypeScript
- TailwindCSS for styling
- Framer Motion for animations
- next-themes for dark/light mode

**Backend:**
- Next.js API Routes
- Sanity.io or Strapi (Headless CMS)

**Deployment:**
- Vercel (hosting and CDN)
- Vercel Analytics
- Google Analytics 4

**Development Tools:**
- ESLint + Prettier
- Husky for git hooks
- TypeScript strict mode

### Design Patterns

1. **Component-Based Architecture**: All UI elements are reusable React components
2. **Server-Side Rendering (SSR)**: Critical pages rendered on server for SEO
3. **Static Site Generation (SSG)**: Product pages pre-rendered at build time
4. **Incremental Static Regeneration (ISR)**: Product data updated without full rebuild
5. **Context API**: Global state management for theme and UI state
6. **Custom Hooks**: Reusable logic for animations, theme, and data fetching
7. **Composition Pattern**: Complex components built from smaller, focused components

## Components and Interfaces

### Core Components

#### 1. Layout Components

**Navigation Component**
```typescript
interface NavigationProps {
  currentPage: string;
  isMobile: boolean;
}

interface NavigationItem {
  label: string;
  href: string;
  megaMenu?: MegaMenuConfig;
}

interface MegaMenuConfig {
  categories: CategoryGroup[];
}

interface CategoryGroup {
  title: string;
  items: { name: string; href: string; }[];
}
```

**Footer Component**
```typescript
interface FooterProps {
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  quickLinks: QuickLink[];
}

interface ContactInfo {
  address: string;
  phone: string[];
  email: string;
}
```

#### 2. Homepage Components

**Hero Section Component**
```typescript
interface HeroSectionProps {
  headline: string;
  subtext: string;
  ctaButtons: CTAButton[];
  backgroundImages: string[];
  enableParticles: boolean;
}

interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}
```

**Featured Products Component**
```typescript
interface FeaturedProductsProps {
  products: Product[];
  layout: 'grid' | 'carousel';
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  shortDescription: string;
  specifications?: ProductSpecification;
  benefits?: string[];
  packing?: string;
}

interface ProductSpecification {
  meshSize?: string;
  moisture?: string;
  color?: string;
  [key: string]: string | undefined;
}
```

**Product Card Component**
```typescript
interface ProductCardProps {
  product: Product;
  variant: 'featured' | 'standard' | 'compact';
  showHoverEffect: boolean;
  onClick?: () => void;
}
```

**Stats Counter Component**
```typescript
interface StatsCounterProps {
  stats: Statistic[];
  animationDuration: number;
}

interface Statistic {
  label: string;
  value: number;
  suffix: string;
  icon?: string;
}
```

**Why Choose Us Component**
```typescript
interface WhyChooseUsProps {
  features: Feature[];
  layout: 'grid' | 'list';
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}
```

#### 3. Product Page Components

**Product Grid Component**
```typescript
interface ProductGridProps {
  products: Product[];
  categories: Category[];
  searchQuery?: string;
  filterOptions?: FilterOptions;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}

interface FilterOptions {
  category?: string;
  sortBy?: 'name' | 'category';
}
```

**Product Detail Component**
```typescript
interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}
```

**Search Component**
```typescript
interface SearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
  suggestions?: string[];
}
```

#### 4. Contact Page Components

**Contact Form Component**
```typescript
interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  fields: FormField[];
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  productInterest?: string;
}

interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  label: string;
  required: boolean;
  validation?: ValidationRule;
}
```

**Map Embed Component**
```typescript
interface MapEmbedProps {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  zoom: number;
  markerLabel?: string;
}
```

#### 5. Shared Components

**Theme Toggle Component**
```typescript
interface ThemeToggleProps {
  position: 'header' | 'footer' | 'floating';
  showLabel?: boolean;
}
```

**Animated Section Component**
```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  animation: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight';
  delay?: number;
  threshold?: number;
}
```

**Testimonial Slider Component**
```typescript
interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlayInterval: number;
  showNavigation: boolean;
}

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  quote: string;
  avatar?: string;
}
```

**WhatsApp Float Button Component**
```typescript
interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  position: { bottom: string; right: string; };
}
```

**Certification Card Component**
```typescript
interface CertificationCardProps {
  certification: Certification;
  variant: 'card' | 'badge';
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  scope: string;
  image: string;
  issueDate?: string;
}
```

### API Interfaces

#### CMS Data Fetching

```typescript
interface CMSClient {
  getProducts(options?: QueryOptions): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getCertifications(): Promise<Certification[]>;
}

interface QueryOptions {
  category?: string;
  limit?: number;
  offset?: number;
  search?: string;
}
```

#### API Route Handlers

```typescript
// /api/products
interface ProductsAPIRequest {
  category?: string;
  search?: string;
  limit?: number;
}

interface ProductsAPIResponse {
  products: Product[];
  total: number;
  page: number;
}

// /api/contact
interface ContactAPIRequest {
  formData: ContactFormData;
}

interface ContactAPIResponse {
  success: boolean;
  message: string;
  error?: string;
}

// /api/search
interface SearchAPIRequest {
  query: string;
  limit?: number;
}

interface SearchAPIResponse {
  results: Product[];
  suggestions: string[];
}
```

### Custom Hooks

```typescript
// useTheme hook
interface UseThemeReturn {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

// useScrollAnimation hook
interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLElement>;
  isVisible: boolean;
  hasAnimated: boolean;
}

// useCounter hook (for animated counters)
interface UseCounterOptions {
  end: number;
  duration: number;
  start?: number;
  trigger?: boolean;
}

interface UseCounterReturn {
  count: number;
  reset: () => void;
}

// useProducts hook
interface UseProductsOptions {
  category?: string;
  search?: string;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}
```

## Data Models

### Product Model

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  shortDescription: string;
  
  // Specifications
  specifications: ProductSpecification;
  
  // Benefits and features
  benefits: string[];
  features?: string[];
  
  // Packaging information
  packing: PackingInfo;
  
  // Media
  images: ProductImage[];
  primaryImage: string;
  
  // Metadata
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  
  // CMS metadata
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  
  // Future e-commerce fields (not displayed yet)
  sku?: string;
  price?: number;
  currency?: string;
  moq?: number; // Minimum Order Quantity
}

interface ProductImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  isPrimary: boolean;
}

interface PackingInfo {
  options: string[]; // e.g., ["10kg HDPE bags", "25kg HDPE bags"]
  customAvailable: boolean;
}

type ProductCategory = 
  | 'herbal-powders'
  | 'cosmetic-powders'
  | 'spices'
  | 'dehydrated-powders'
  | 'healthcare-equipment';
```

### Category Model

```typescript
interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon?: string;
  image?: string;
  parentCategory?: string;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  productCount?: number;
}
```

### Testimonial Model

```typescript
interface Testimonial {
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
```

### Certification Model

```typescript
interface Certification {
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
```

### Contact Form Submission Model

```typescript
interface ContactSubmission {
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
```

### Theme Configuration Model

```typescript
interface ThemeConfig {
  colors: {
    light: ColorPalette;
    dark: ColorPalette;
  };
  fonts: FontConfig;
  animations: AnimationConfig;
}

interface ColorPalette {
  primary: string;      // #2e7d32
  secondary: string;    // #4caf50
  accent: string;       // #f5f7f2
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

interface FontConfig {
  heading: string;  // 'Poppins' or 'Playfair Display'
  body: string;     // 'Inter'
}

interface AnimationConfig {
  duration: {
    fast: number;    // 200ms
    normal: number;  // 300ms
    slow: number;    // 500ms
  };
  easing: {
    default: string;  // 'ease-in-out'
    spring: string;   // 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  };
}
```

### SEO Metadata Model

```typescript
interface SEOMetadata {
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

interface StructuredData {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: any;
}
```

### Analytics Event Model

```typescript
interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: Date;
}

// Common events
type ProductViewEvent = AnalyticsEvent & {
  category: 'Product';
  action: 'View';
  label: string; // product name
};

type ContactFormEvent = AnalyticsEvent & {
  category: 'Contact';
  action: 'Submit' | 'Error';
  label?: string; // error message if applicable
};

type SearchEvent = AnalyticsEvent & {
  category: 'Search';
  action: 'Query';
  label: string; // search query
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property-Based Testing Properties

Property 1: Product Display Completeness
*For any* product rendered on the website, the display should include product name, image, description, specifications, benefits, and packing information.
**Validates: Requirements 2.1, 11.2**

Property 2: No E-commerce Features Present
*For any* page in the system, there should be no shopping cart, checkout, or pricing display components present in the rendered output.
**Validates: Requirements 2.2**

Property 3: Product Categorization
*For any* product in the system, it should belong to exactly one of the following categories: Herbal Powders, Cosmetic Powders, Spices, or Dehydrated Powders.
**Validates: Requirements 2.4**

Property 4: Product Card Hover Animation
*For any* product card component, triggering a hover event should activate animation effects (transform, shadow, or opacity changes).
**Validates: Requirements 2.5, 7.3**

Property 5: Theme Configuration Correctness
*For any* theme mode (light or dark), the theme configuration should contain all required color values (primary, secondary, accent, background, foreground) with valid hex color codes.
**Validates: Requirements 3.1, 3.2, 3.3, 3.4**

Property 6: Typography Consistency
*For any* heading element (h1-h6), it should use either Poppins or Playfair Display font family, and for any body text element, it should use Inter font family.
**Validates: Requirements 3.5, 3.6**

Property 7: Glassmorphism Card Styling
*For any* card component, it should have glassmorphism CSS properties including backdrop-filter and semi-transparent background.
**Validates: Requirements 3.8**

Property 8: Theme Toggle Accessibility
*For any* page in the application, a theme toggle control should be present and accessible in the DOM.
**Validates: Requirements 4.1**

Property 9: Theme Application Consistency
*For any* theme mode selection (light or dark), all components should apply the corresponding color palette consistently across the entire page.
**Validates: Requirements 4.2, 4.3**

Property 10: Theme Persistence Round-Trip
*For any* theme preference set by the user, navigating to a different page and returning should preserve the same theme selection.
**Validates: Requirements 4.4**

Property 11: Responsive Layout Without Overflow
*For any* viewport width between 320px and 2560px, the page should render without horizontal scrolling (document width should equal viewport width).
**Validates: Requirements 5.4**

Property 12: Scroll Animation Trigger
*For any* section with scroll-reveal animation, when the section enters the viewport, the animation should be triggered exactly once.
**Validates: Requirements 6.1**

Property 13: Counter Animation Behavior
*For any* animated counter component, when it becomes visible in the viewport, it should animate from 0 to its target value over the specified duration.
**Validates: Requirements 6.2, 8.5**

Property 14: Interactive Element Hover Feedback
*For any* interactive element (button, link, card), hovering should change at least one visual property (color, transform, shadow, or opacity).
**Validates: Requirements 6.3**

Property 15: Icon Animation on Viewport Entry
*For any* icon with animation enabled, when it enters the viewport, it should trigger its animation effect.
**Validates: Requirements 6.4**

Property 16: Smooth Scroll Navigation
*For any* navigation link that targets an on-page anchor, clicking it should trigger smooth scrolling behavior rather than instant jump.
**Validates: Requirements 6.5**

Property 17: Featured Product Card Structure
*For any* featured product, it should be rendered as a card component with an image, and the card should link to the product's detail page.
**Validates: Requirements 7.2, 7.4**

Property 18: Responsive Grid Layout
*For any* collection of product cards, they should be arranged in a CSS grid layout that adjusts column count based on viewport width.
**Validates: Requirements 7.5, 10.5**

Property 19: Feature Card Styling Consistency
*For any* feature card in the "Why Choose Us" section, it should have consistent styling properties (padding, border-radius, background, icon size).
**Validates: Requirements 9.6**

Property 20: Product Category Organization
*For any* products page view, products should be grouped by their category, with all products of the same category appearing together.
**Validates: Requirements 11.1**

Property 21: Certification Image Display
*For any* certification in the system, it should have an associated image that is displayed in the certification card.
**Validates: Requirements 13.2**

Property 22: Certification Card Layout
*For any* certification, it should be rendered in a card layout component with consistent structure.
**Validates: Requirements 13.4**

Property 23: Contact Form Submission Handling
*For any* valid contact form submission (all required fields filled), the system should process the submission and return a success response.
**Validates: Requirements 14.5**

Property 24: SEO Meta Tags Presence
*For any* page in the application, the HTML head should contain meta description, title, and viewport tags.
**Validates: Requirements 15.1**

Property 25: Structured Data Schema
*For any* product page, the HTML should include valid JSON-LD structured data with @type "Product" and required product properties.
**Validates: Requirements 15.2**

Property 26: OpenGraph Tags Presence
*For any* page in the application, the HTML head should contain OpenGraph tags (og:title, og:description, og:image, og:type).
**Validates: Requirements 15.3**

Property 27: Semantic Heading Hierarchy
*For any* page, there should be exactly one h1 element, and all heading levels should follow proper nesting (h2 under h1, h3 under h2, etc.).
**Validates: Requirements 15.4**

Property 28: CMS Data Synchronization Round-Trip
*For any* product updated in the CMS, fetching that product from the website API should return data matching the CMS update within the revalidation period.
**Validates: Requirements 16.2, 16.3, 16.4, 16.5**

Property 29: Image Optimization
*For any* image rendered on the website, it should be served in an optimized format (WebP or AVIF) with appropriate compression and sizing.
**Validates: Requirements 17.3**

Property 30: Lazy Loading Implementation
*For any* image positioned below the fold (outside initial viewport), it should have the loading="lazy" attribute or use intersection observer for lazy loading.
**Validates: Requirements 17.4**

Property 31: Lighthouse Performance Score
*For any* page in the application, running a Lighthouse audit should yield a performance score of 85 or higher.
**Validates: Requirements 17.5**

Property 32: Active Navigation Highlighting
*For any* page, the navigation menu item corresponding to the current page should have an active state (different styling from inactive items).
**Validates: Requirements 19.3**

Property 33: Sticky Navigation Behavior
*For any* scroll position beyond 100px from the top, the navigation menu should have position: sticky or fixed and remain visible.
**Validates: Requirements 19.5**

Property 34: Search Query Filtering
*For any* search query entered, the displayed products should only include those whose name, description, or category contains the query string (case-insensitive).
**Validates: Requirements 20.2, 20.3**

Property 35: Real-Time Search Updates
*For any* keystroke in the search input, the product results should update within 300ms to reflect the new query.
**Validates: Requirements 20.4**

Property 36: Testimonial Display Completeness
*For any* testimonial rendered in the slider, it should display both the client name and company name.
**Validates: Requirements 21.2**

Property 37: Testimonial Auto-Advance Timing
*For any* testimonial slider with auto-play enabled, the slider should automatically advance to the next testimonial after 5 seconds (±500ms tolerance).
**Validates: Requirements 21.3**

Property 38: Testimonial Manual Navigation
*For any* testimonial slider, clicking the next/previous navigation controls should immediately change the displayed testimonial.
**Validates: Requirements 21.4**

Property 39: Map Interaction Information Display
*For any* interactive region on the export map, clicking or hovering should display additional information about that export region.
**Validates: Requirements 22.3**

## Error Handling

### Client-Side Error Handling

**Form Validation Errors:**
- All form inputs should validate on blur and on submit
- Display inline error messages below invalid fields
- Prevent form submission when validation fails
- Show field-specific error messages (e.g., "Email format is invalid")

**Network Errors:**
- Display user-friendly error messages when API calls fail
- Implement retry logic for failed requests (max 3 attempts)
- Show loading states during API calls
- Provide fallback UI when data fetching fails

**404 Not Found:**
- Custom 404 page with navigation back to home
- Suggest related products or categories
- Maintain site navigation and footer

**Image Loading Errors:**
- Display placeholder image when product image fails to load
- Log image loading errors for monitoring
- Provide alt text for accessibility

**Search Errors:**
- Handle empty search results gracefully with helpful message
- Suggest alternative search terms or popular products
- Never show technical error messages to users

### Server-Side Error Handling

**API Route Errors:**
- Return appropriate HTTP status codes (400, 404, 500)
- Log all errors with context for debugging
- Return consistent error response format:
  ```typescript
  {
    success: false,
    error: string,
    code: string
  }
  ```

**CMS Connection Errors:**
- Implement fallback to cached data when CMS is unavailable
- Log CMS connection failures
- Set appropriate cache headers for resilience

**Rate Limiting:**
- Implement rate limiting on contact form (max 5 submissions per hour per IP)
- Return 429 status code when rate limit exceeded
- Display friendly message to user

**Validation Errors:**
- Validate all input data on server side
- Return detailed validation errors for form submissions
- Sanitize user input to prevent XSS attacks

### Error Monitoring

- Integrate error tracking service (e.g., Sentry)
- Track client-side JavaScript errors
- Monitor API error rates
- Set up alerts for critical errors
- Log errors with user context (but no PII)

## Testing Strategy

### Dual Testing Approach

The testing strategy employs both unit testing and property-based testing as complementary approaches:

**Unit Tests** focus on:
- Specific examples of correct behavior
- Edge cases and boundary conditions
- Error handling scenarios
- Integration between components
- Specific UI interactions

**Property-Based Tests** focus on:
- Universal properties that hold for all inputs
- Comprehensive input coverage through randomization
- Invariants that should never be violated
- Round-trip properties (e.g., theme persistence)
- Metamorphic properties (e.g., search filtering)

Both approaches are necessary for comprehensive coverage. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Property-Based Testing Configuration

**Library Selection:**
- Use `fast-check` for JavaScript/TypeScript property-based testing
- Integrate with Jest or Vitest test framework

**Test Configuration:**
- Minimum 100 iterations per property test (due to randomization)
- Increase to 1000 iterations for critical properties
- Use seed-based randomization for reproducibility
- Configure timeout to 10 seconds per property test

**Property Test Tagging:**
Each property-based test must include a comment tag referencing its design document property:

```typescript
// Feature: horizonixx-website, Property 1: Product Display Completeness
test('product display includes all required fields', () => {
  fc.assert(
    fc.property(productArbitrary, (product) => {
      const rendered = renderProduct(product);
      expect(rendered).toContainFields([
        'name', 'image', 'description', 
        'specifications', 'benefits', 'packing'
      ]);
    }),
    { numRuns: 100 }
  );
});
```

### Unit Testing Strategy

**Component Testing:**
- Test each component in isolation using React Testing Library
- Mock external dependencies (CMS, APIs)
- Test user interactions (clicks, hovers, form submissions)
- Verify correct rendering with different props
- Test responsive behavior at key breakpoints

**Integration Testing:**
- Test page-level components with real routing
- Test form submission flows end-to-end
- Test navigation between pages
- Test theme switching across components
- Test search functionality with real data

**API Route Testing:**
- Test each API route with valid and invalid inputs
- Test error handling and status codes
- Test rate limiting
- Mock CMS responses
- Test data validation

**Accessibility Testing:**
- Use jest-axe for automated accessibility testing
- Test keyboard navigation
- Test screen reader compatibility
- Verify ARIA labels and roles
- Test color contrast ratios

### Test Coverage Goals

- Minimum 80% code coverage for all components
- 100% coverage for critical paths (contact form, product display)
- All 39 correctness properties implemented as property tests
- All edge cases covered by unit tests
- All error scenarios tested

### Testing Tools

- **Test Framework:** Jest or Vitest
- **Component Testing:** React Testing Library
- **Property Testing:** fast-check
- **E2E Testing:** Playwright (for critical user flows)
- **Accessibility:** jest-axe, axe-core
- **Visual Regression:** Percy or Chromatic (optional)
- **Performance:** Lighthouse CI

### Continuous Integration

- Run all tests on every pull request
- Block merges if tests fail
- Run Lighthouse audits on preview deployments
- Generate coverage reports
- Run property tests with increased iterations (1000) on main branch

### Test Organization

```
tests/
├── unit/
│   ├── components/
│   │   ├── Hero.test.tsx
│   │   ├── ProductCard.test.tsx
│   │   └── Navigation.test.tsx
│   ├── pages/
│   │   ├── Home.test.tsx
│   │   └── Products.test.tsx
│   └── api/
│       ├── products.test.ts
│       └── contact.test.ts
├── properties/
│   ├── product-display.property.test.ts
│   ├── theme-switching.property.test.ts
│   ├── responsive-layout.property.test.ts
│   └── search-filtering.property.test.ts
├── integration/
│   ├── contact-flow.test.tsx
│   └── navigation.test.tsx
└── e2e/
    ├── homepage.spec.ts
    └── product-browsing.spec.ts
```

### Example Property Test Implementation

```typescript
import fc from 'fast-check';
import { renderProduct } from '@/components/ProductCard';
import { productArbitrary } from '@/test-utils/arbitraries';

describe('Product Display Properties', () => {
  // Feature: horizonixx-website, Property 1: Product Display Completeness
  test('all products display required fields', () => {
    fc.assert(
      fc.property(productArbitrary, (product) => {
        const rendered = renderProduct(product);
        
        expect(rendered.querySelector('[data-testid="product-name"]'))
          .toHaveTextContent(product.name);
        expect(rendered.querySelector('[data-testid="product-image"]'))
          .toBeInTheDocument();
        expect(rendered.querySelector('[data-testid="product-description"]'))
          .toHaveTextContent(product.description);
        expect(rendered.querySelector('[data-testid="product-specifications"]'))
          .toBeInTheDocument();
        expect(rendered.querySelector('[data-testid="product-benefits"]'))
          .toBeInTheDocument();
        expect(rendered.querySelector('[data-testid="product-packing"]'))
          .toBeInTheDocument();
      }),
      { numRuns: 100 }
    );
  });

  // Feature: horizonixx-website, Property 3: Product Categorization
  test('all products belong to valid category', () => {
    const validCategories = [
      'herbal-powders',
      'cosmetic-powders',
      'spices',
      'dehydrated-powders'
    ];
    
    fc.assert(
      fc.property(productArbitrary, (product) => {
        expect(validCategories).toContain(product.category);
      }),
      { numRuns: 100 }
    );
  });
});
```

### Example Unit Test Implementation

```typescript
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/Hero';

describe('Hero Component', () => {
  test('displays correct headline', () => {
    render(<Hero />);
    
    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Global Exporter of Premium Herbal & Natural Products');
  });

  test('displays both CTA buttons', () => {
    render(<Hero />);
    
    expect(screen.getByRole('button', { name: /explore products/i }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: /contact us/i }))
      .toBeInTheDocument();
  });

  test('CTA buttons have correct links', () => {
    render(<Hero />);
    
    const exploreButton = screen.getByRole('link', { name: /explore products/i });
    expect(exploreButton).toHaveAttribute('href', '/products');
    
    const contactButton = screen.getByRole('link', { name: /contact us/i });
    expect(contactButton).toHaveAttribute('href', '/contact');
  });
});
```
