# Requirements Document

## Introduction

This document specifies the requirements for building a premium B2B export company website for HORIZONIXX INTERNATIONAL, a global distributor of herbal products, cosmetic ingredients, healthcare equipment, spices, and dehydrated foods. The website serves as a showcase platform for industrial clients worldwide, emphasizing quality, trust, and international export capabilities.

## Glossary

- **System**: The HORIZONIXX INTERNATIONAL website application
- **User**: Industrial B2B clients, procurement managers, or business visitors
- **Product_Showcase**: Display-only product pages without e-commerce checkout
- **Dark_Mode**: Alternative color scheme with dark backgrounds
- **Light_Mode**: Default color scheme with light backgrounds
- **Animation**: Visual motion effects triggered by user interaction or scroll position
- **CMS**: Content Management System for managing product data
- **Hero_Section**: Primary above-the-fold section on homepage
- **Product_Card**: Visual component displaying product information
- **Inquiry_Form**: Contact form for business inquiries
- **Responsive_Design**: Layout that adapts to different screen sizes
- **SEO**: Search Engine Optimization for discoverability

## Requirements

### Requirement 1: Homepage Hero Section

**User Story:** As a business visitor, I want to immediately understand what HORIZONIXX INTERNATIONAL offers, so that I can quickly determine if they meet my sourcing needs.

#### Acceptance Criteria

1. THE System SHALL display a hero section with the headline "Global Exporter of Premium Herbal & Natural Products"
2. THE System SHALL display subtext "Supplying high-quality herbal raw materials, cosmetic ingredients, spices and healthcare products to industries worldwide"
3. THE System SHALL provide two CTA buttons labeled "Explore Products" and "Contact Us"
4. WHEN the hero section loads, THE System SHALL display animated floating leaf particles
5. THE System SHALL display herbal imagery including leaves and moringa powder as background elements

### Requirement 2: Product Showcase Display

**User Story:** As a procurement manager, I want to view detailed product specifications without e-commerce features, so that I can evaluate products for bulk industrial orders.

#### Acceptance Criteria

1. THE System SHALL display product information including name, specifications, benefits, and packing details
2. THE System SHALL NOT include shopping cart, checkout, or pricing features
3. WHEN displaying products, THE System SHALL show mesh size, moisture content, and color specifications where applicable
4. THE System SHALL organize products into categories: Herbal Products, Cosmetic Products, Spices, and Dehydrated Fruits & Vegetables
5. WHEN a user hovers over a Product_Card, THE System SHALL display hover animation effects

### Requirement 3: Theme and Visual Design

**User Story:** As a user, I want a premium, modern interface with natural aesthetics, so that I perceive the company as trustworthy and high-quality.

#### Acceptance Criteria

1. THE System SHALL use Leaf Green (#2e7d32) as the primary color
2. THE System SHALL use Natural Green (#4caf50) as the secondary color
3. THE System SHALL use Soft Beige (#f5f7f2) as the accent color
4. THE System SHALL use dark mode background color (#0f1a12) when Dark_Mode is active
5. THE System SHALL use Poppins or Playfair Display for heading typography
6. THE System SHALL use Inter font for body text
7. THE System SHALL include leaf illustrations and organic shapes throughout the design
8. THE System SHALL apply glassmorphism effects to card components

### Requirement 4: Dark Mode and Light Mode Toggle

**User Story:** As a user, I want to switch between dark and light themes, so that I can view the website comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE System SHALL provide a theme toggle control accessible from all pages
2. WHEN a user activates Dark_Mode, THE System SHALL apply dark color scheme to all components
3. WHEN a user activates Light_Mode, THE System SHALL apply light color scheme to all components
4. THE System SHALL persist the user's theme preference across page navigation
5. THE System SHALL transition smoothly between themes without jarring visual changes

### Requirement 5: Responsive Design

**User Story:** As a user on any device, I want the website to display properly, so that I can access information regardless of my screen size.

#### Acceptance Criteria

1. THE System SHALL render correctly on desktop screens (1920px and above)
2. THE System SHALL render correctly on tablet screens (768px to 1919px)
3. THE System SHALL render correctly on mobile screens (below 768px)
4. WHEN the viewport size changes, THE System SHALL adjust layout without horizontal scrolling
5. THE System SHALL maintain readability and usability across all breakpoints

### Requirement 6: Animation and Micro-interactions

**User Story:** As a user, I want smooth, engaging animations, so that the website feels modern and premium.

#### Acceptance Criteria

1. WHEN a user scrolls to a new section, THE System SHALL reveal that section with animation
2. WHEN animated counters become visible, THE System SHALL count up from zero to the target value
3. WHEN a user hovers over interactive elements, THE System SHALL provide visual feedback through micro-interactions
4. THE System SHALL animate icons when they enter the viewport
5. THE System SHALL implement smooth scroll behavior for navigation links

### Requirement 7: Featured Products Section

**User Story:** As a visitor, I want to see key products immediately on the homepage, so that I can quickly assess the product range.

#### Acceptance Criteria

1. THE System SHALL display featured products including Moringa Powder, Ashwagandha, Tulsi, Amla, Neem, and Spirulina
2. WHEN displaying featured products, THE System SHALL use premium product cards with images
3. WHEN a user hovers over a featured product card, THE System SHALL display hover animation
4. THE System SHALL link each featured product to its detailed product page
5. THE System SHALL display products in a responsive grid layout

### Requirement 8: Company Statistics Display

**User Story:** As a potential client, I want to see the company's track record, so that I can assess their experience and reach.

#### Acceptance Criteria

1. THE System SHALL display "Countries Exported: 25+" with animated counter
2. THE System SHALL display "Product Variants: 300+" with animated counter
3. THE System SHALL display "Industrial Clients: 150+" with animated counter
4. THE System SHALL display "Years Experience: 10+" with animated counter
5. WHEN the statistics section becomes visible, THE System SHALL animate counters from 0 to target values

### Requirement 9: Why Choose Us Section

**User Story:** As a decision-maker, I want to understand the company's value propositions, so that I can compare them with other suppliers.

#### Acceptance Criteria

1. THE System SHALL display "Global Export Network" with icon
2. THE System SHALL display "Quality Assured Products" with icon
3. THE System SHALL display "ISO Certified Company" with icon
4. THE System SHALL display "Reliable Supply Chain" with icon
5. THE System SHALL display "Bulk Industrial Supply" with icon
6. THE System SHALL present these items as icon cards with consistent styling

### Requirement 10: Product Categories Navigation

**User Story:** As a user, I want to browse products by category, so that I can find relevant products efficiently.

#### Acceptance Criteria

1. THE System SHALL provide navigation to Herbal & Cosmetics category
2. THE System SHALL provide navigation to Healthcare Equipment category
3. THE System SHALL provide navigation to Spices category
4. THE System SHALL provide navigation to Dehydrated Foods category
5. THE System SHALL display category cards in a grid layout on the homepage

### Requirement 11: Products Page Structure

**User Story:** As a procurement specialist, I want to view all products with detailed specifications, so that I can evaluate them for my requirements.

#### Acceptance Criteria

1. THE System SHALL display products organized by category
2. WHEN displaying a product, THE System SHALL show product name, image, description, specifications, benefits, and packing information
3. THE System SHALL display herbal products including Amla, Ashwagandha, Neem, Moringa, Triphala, Shatavari, and Brahmi
4. THE System SHALL display cosmetic products including Multani Mitti, Sandalwood, Hibiscus, and Indigo
5. THE System SHALL display spices including Turmeric, Ginger, Garlic, and Black Pepper powders
6. THE System SHALL display dehydrated fruits & vegetables including Beetroot, Mango, Banana, and Carrot

### Requirement 12: About Us Page

**User Story:** As a potential partner, I want to learn about the company's background and mission, so that I can understand their business model and values.

#### Acceptance Criteria

1. THE System SHALL display company description explaining HORIZONIXX INTERNATIONAL's role as a global distributor
2. THE System SHALL communicate the company's specialization in sourcing, repacking, and exporting
3. THE System SHALL present the company mission statement
4. THE System SHALL describe the product categories the company handles
5. THE System SHALL emphasize quality standards and global reach

### Requirement 13: Accreditation Display

**User Story:** As a quality-conscious buyer, I want to verify the company's certifications, so that I can ensure compliance with my standards.

#### Acceptance Criteria

1. THE System SHALL display ISO 9001:2015 certification information
2. THE System SHALL show certification images or badges
3. THE System SHALL specify certification scope: Import, Export and Repacking of Ayurvedic & Herbal Powders, Cosmetic Powder Spray, Dried Fruits & Vegetable Powders, Spices and Food Products
4. THE System SHALL present certifications in a professional card layout
5. THE System SHALL make certification details clearly readable

### Requirement 14: Contact Information and Inquiry Form

**User Story:** As an interested client, I want to contact the company easily, so that I can initiate business discussions.

#### Acceptance Criteria

1. THE System SHALL display contact for Hardat M Panchal, Logistics Manager: +91 99748 23781
2. THE System SHALL display contact for Vaibhavi A Panchal, Executive Coordinator: +91 81609 93130
3. THE System SHALL display office address: B/22 Suncity Park, Ankleshwar, Gujarat 393002, India
4. THE System SHALL display email: info.horizonixxinternational0509@gmail.com
5. THE System SHALL provide an Inquiry_Form for submitting business inquiries
6. THE System SHALL embed a Google map showing the office location
7. THE System SHALL provide a floating WhatsApp button linking to business contact

### Requirement 15: SEO Optimization

**User Story:** As a potential client searching online, I want to find HORIZONIXX INTERNATIONAL through search engines, so that I can discover their services.

#### Acceptance Criteria

1. THE System SHALL include meta tags for all pages with relevant descriptions
2. THE System SHALL implement structured schema markup for products and organization
3. THE System SHALL include OpenGraph tags for social media sharing
4. THE System SHALL use semantic HTML headings (h1, h2, h3) appropriately
5. THE System SHALL target keywords including "Herbal Exporter India", "Moringa Powder Exporter", "Bulk Herbal Ingredients Supplier", and "Ayurvedic Raw Material Exporter"

### Requirement 16: Content Management System Integration

**User Story:** As a content administrator, I want to manage product information through a CMS, so that I can update content without code changes.

#### Acceptance Criteria

1. THE System SHALL integrate with a CMS (Sanity or Strapi) for product management
2. WHEN product data is updated in the CMS, THE System SHALL reflect changes on the website
3. THE System SHALL allow managing product name, description, specifications, benefits, and images through the CMS
4. THE System SHALL support adding new products through the CMS
5. THE System SHALL support organizing products into categories through the CMS

### Requirement 17: Performance and Analytics

**User Story:** As a business owner, I want to track website performance and visitor behavior, so that I can optimize the website for better results.

#### Acceptance Criteria

1. THE System SHALL integrate Google Analytics for tracking visitor behavior
2. THE System SHALL load pages within 3 seconds on standard broadband connections
3. THE System SHALL optimize images for web delivery
4. THE System SHALL implement lazy loading for images below the fold
5. THE System SHALL achieve a Lighthouse performance score above 85

### Requirement 18: Future E-commerce Readiness

**User Story:** As a business owner, I want the website structure to support future e-commerce features, so that I can add online ordering without redesigning.

#### Acceptance Criteria

1. THE System SHALL structure product data models to accommodate pricing fields
2. THE System SHALL design Product_Card components to allow adding "Add to Cart" buttons
3. THE System SHALL organize code to separate product display from transaction logic
4. THE System SHALL use component architecture that supports extending with cart functionality
5. THE System SHALL maintain clean separation between presentation and business logic layers

### Requirement 19: Navigation and Site Structure

**User Story:** As a user, I want intuitive navigation, so that I can find information quickly.

#### Acceptance Criteria

1. THE System SHALL provide a navigation menu with links to Home, Products, About Us, Accreditation, and Contact pages
2. THE System SHALL implement a mega menu for product categories
3. THE System SHALL highlight the current page in the navigation menu
4. THE System SHALL provide a mobile-friendly hamburger menu on small screens
5. THE System SHALL make the navigation menu sticky on scroll

### Requirement 20: Product Search Functionality

**User Story:** As a user, I want to search for specific products, so that I can quickly find what I need without browsing all categories.

#### Acceptance Criteria

1. THE System SHALL provide a search input field accessible from the products page
2. WHEN a user enters a search query, THE System SHALL filter products matching the query
3. THE System SHALL search across product names, descriptions, and categories
4. THE System SHALL display search results in real-time as the user types
5. WHEN no products match the search query, THE System SHALL display a helpful message

### Requirement 21: Testimonials Display

**User Story:** As a potential client, I want to read testimonials from other clients, so that I can gauge the company's reputation.

#### Acceptance Criteria

1. THE System SHALL display client testimonials in a slider format
2. WHEN displaying testimonials, THE System SHALL show client name and company
3. THE System SHALL automatically advance testimonials every 5 seconds
4. THE System SHALL allow manual navigation between testimonials
5. THE System SHALL display at least 3 testimonials when available

### Requirement 22: Global Export Map Visualization

**User Story:** As a visitor, I want to see which countries the company exports to, so that I can understand their global reach.

#### Acceptance Criteria

1. THE System SHALL display a world map highlighting export countries
2. THE System SHALL visually indicate the 25+ countries served
3. WHEN a user interacts with the map, THE System SHALL provide additional information about export regions
4. THE System SHALL integrate the map into the homepage or about page
5. THE System SHALL style the map consistently with the overall design theme
