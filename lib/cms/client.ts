/**
 * CMS Client
 * Handles data fetching from the CMS (Sanity)
 * Requirements: 16.1, 16.2, 16.3
 */

import { Product, Category, QueryOptions } from "@/types/product";
import { Certification } from "@/types/content";

// Mock data for development - replace with actual Sanity client
const mockProducts: Product[] = [
  {
    id: "1",
    slug: "moringa-powder",
    name: "Moringa Powder",
    category: "herbal-powders",
    description:
      "Premium quality moringa powder rich in nutrients and antioxidants. Sourced from organic moringa leaves and processed using advanced techniques to retain maximum nutritional value.",
    shortDescription: "Organic moringa powder rich in vitamins and minerals",
    specifications: {
      meshSize: "80-100",
      moisture: "5%",
      color: "Green",
    },
    benefits: [
      "Rich in vitamins A, C, and E",
      "High in antioxidants",
      "Boosts immunity",
      "Supports healthy digestion",
      "Natural energy booster",
    ],
    packing: {
      options: ["10kg HDPE bags", "25kg HDPE bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/moringa-powder.webp",
    keywords: ["superfood", "organic", "vitamins", "antioxidants"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    published: true,
  },
  {
    id: "2",
    slug: "ashwagandha-powder",
    name: "Ashwagandha Powder",
    category: "herbal-powders",
    subcategory: "adaptogenic",
    description:
      "Premium ashwagandha root powder known for its adaptogenic properties. Helps reduce stress, improve energy levels, and support overall wellness.",
    shortDescription: "Adaptogenic ashwagandha powder for stress relief",
    specifications: {
      meshSize: "80-120",
      moisture: "6%",
      color: "Beige",
    },
    benefits: [
      "Reduces stress and anxiety",
      "Improves energy levels",
      "Supports mental clarity",
      "Enhances physical performance",
      "Promotes better sleep",
    ],
    packing: {
      options: ["5kg bags", "10kg bags", "25kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/Ashwaganda_powder.avif",
    keywords: ["adaptogen", "stress relief", "energy", "wellness"],
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-16"),
    published: true,
  },
  {
    id: "3",
    slug: "turmeric-powder",
    name: "Turmeric Powder",
    category: "spices",
    description:
      "High-quality turmeric powder with high curcumin content. Known for its anti-inflammatory properties and vibrant color.",
    shortDescription: "Pure turmeric powder with high curcumin content",
    specifications: {
      meshSize: "60-80",
      moisture: "8%",
      color: "Golden Yellow",
    },
    benefits: [
      "Anti-inflammatory properties",
      "Rich in curcumin",
      "Supports joint health",
      "Natural antioxidant",
      "Digestive support",
    ],
    packing: {
      options: ["25kg bags", "50kg bags"],
      customAvailable: false,
    },
    images: [],
    primaryImage: "/images/products/turmeric-powder.jpg",
    keywords: ["spice", "curcumin", "anti-inflammatory", "antioxidant"],
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-17"),
    published: true,
  },
  {
    id: "4",
    slug: "neem-powder",
    name: "Neem Powder",
    category: "herbal-powders",
    description:
      "Pure neem leaf powder with natural antibacterial and antifungal properties. Excellent for skincare and health applications.",
    shortDescription: "Natural neem powder with antibacterial properties",
    specifications: {
      meshSize: "80-100",
      moisture: "7%",
      color: "Green",
    },
    benefits: [
      "Natural antibacterial",
      "Antifungal properties",
      "Supports skin health",
      "Immune system support",
      "Natural detoxifier",
    ],
    packing: {
      options: ["10kg bags", "20kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/Neem_powder.webp",
    keywords: ["antibacterial", "skincare", "natural", "detox"],
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-18"),
    published: true,
  },
  {
    id: "5",
    slug: "multani-mitti",
    name: "Multani Mitti (Fuller's Earth)",
    category: "cosmetic-powders",
    description:
      "Premium quality Multani Mitti (Fuller's Earth) powder for cosmetic and skincare applications. Natural clay with excellent absorption properties.",
    shortDescription: "Natural clay powder for skincare applications",
    specifications: {
      meshSize: "100-200",
      moisture: "4%",
      color: "Light Brown",
    },
    benefits: [
      "Natural oil absorption",
      "Deep pore cleansing",
      "Skin tightening",
      "Removes impurities",
      "Natural exfoliation",
    ],
    packing: {
      options: ["15kg bags", "30kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/multani-mitti-powder.jpg",
    keywords: ["clay", "skincare", "cosmetic", "natural"],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-19"),
    published: true,
  },
  {
    id: "6",
    slug: "beetroot-powder",
    name: "Beetroot Powder",
    category: "dehydrated-powders",
    description:
      "Dehydrated beetroot powder rich in nitrates and natural sugars. Perfect for food coloring and nutritional applications.",
    shortDescription: "Natural beetroot powder for food and nutrition",
    specifications: {
      meshSize: "80-100",
      moisture: "5%",
      color: "Deep Red",
    },
    benefits: [
      "Rich in nitrates",
      "Natural food coloring",
      "Supports cardiovascular health",
      "High in fiber",
      "Natural energy source",
    ],
    packing: {
      options: ["10kg bags", "25kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/beet-root-powder.jpg",
    keywords: ["dehydrated", "natural coloring", "nitrates", "nutrition"],
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-20"),
    published: true,
  },
  {
    id: "7",
    slug: "triphala-powder",
    name: "Triphala Powder",
    category: "herbal-powders",
    description:
      "Traditional Ayurvedic herbal blend supporting digestion and detoxification. A powerful combination of three fruits: Amalaki, Bibhitaki, and Haritaki.",
    shortDescription: "Traditional Ayurvedic blend for digestion and detox",
    specifications: {
      meshSize: "80-100",
      moisture: "6%",
      color: "Brown",
    },
    benefits: [
      "Supports digestion",
      "Natural detox support",
      "Rich in antioxidants",
      "Promotes gut health",
      "Balances doshas",
    ],
    packing: {
      options: ["10kg bags", "25kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/triphala-powder.jpg",
    keywords: ["ayurvedic", "digestion", "detox", "antioxidants"],
    createdAt: new Date("2024-01-07"),
    updatedAt: new Date("2024-01-21"),
    published: true,
  },
  {
    id: "8",
    slug: "tulsi-powder",
    name: "Tulsi Powder",
    category: "herbal-powders",
    description:
      "Holy basil powder known for immunity and respiratory support. Sacred herb with powerful adaptogenic properties.",
    shortDescription: "Holy basil powder for immunity and stress relief",
    specifications: {
      meshSize: "80-100",
      moisture: "7%",
      color: "Green",
    },
    benefits: [
      "Boosts immunity",
      "Stress relief",
      "Natural antioxidant",
      "Respiratory support",
      "Anti-inflammatory",
    ],
    packing: {
      options: ["5kg bags", "10kg bags", "25kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/Tulsi_powder.webp",
    keywords: ["holy basil", "immunity", "adaptogen", "stress relief"],
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-22"),
    published: true,
  },
  {
    id: "9",
    slug: "shatavari-powder",
    name: "Shatavari Powder",
    category: "herbal-powders",
    description:
      'Ayurvedic herb widely used for hormonal balance and vitality. Known as the "Queen of Herbs" for women\'s wellness.',
    shortDescription: "Ayurvedic herb for hormonal balance and vitality",
    specifications: {
      meshSize: "80-120",
      moisture: "6%",
      color: "Cream",
    },
    benefits: [
      "Women's wellness",
      "Hormonal balance",
      "Natural adaptogen",
      "Supports reproductive health",
      "Enhances vitality",
    ],
    packing: {
      options: ["10kg bags", "25kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/shatavari-powder.jpg",
    keywords: ["women's health", "hormonal balance", "adaptogen", "vitality"],
    createdAt: new Date("2024-01-09"),
    updatedAt: new Date("2024-01-23"),
    published: true,
  },
  {
    id: "10",
    slug: "makhana-fox-nuts",
    name: "Makhana (Fox Nuts)",
    category: "herbal-powders",
    description:
      "Premium quality fox nuts used as a healthy snack and Ayurvedic ingredient. Rich in protein and minerals.",
    shortDescription: "Premium fox nuts - healthy snack and ingredient",
    specifications: {
      meshSize: "Whole",
      moisture: "8%",
      color: "White",
    },
    benefits: [
      "High protein snack",
      "Rich in calcium",
      "Heart healthy",
      "Low in calories",
      "Gluten-free",
    ],
    packing: {
      options: ["5kg bags", "10kg bags", "20kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/makhana.jpg",
    keywords: ["fox nuts", "protein", "healthy snack", "calcium"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-24"),
    published: true,
  },
  {
    id: "11",
    slug: "psyllium-husk-powder",
    name: "Psyllium Husk Powder",
    category: "herbal-powders",
    description:
      "Natural dietary fiber widely used for digestive health. Excellent source of soluble fiber for gut wellness.",
    shortDescription: "Natural fiber powder for digestive health",
    specifications: {
      meshSize: "80-100",
      moisture: "10%",
      color: "Light Brown",
    },
    benefits: [
      "Digestive health",
      "High fiber",
      "Supports gut health",
      "Natural laxative",
      "Cholesterol management",
    ],
    packing: {
      options: ["15kg bags", "25kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/psyllium-husk.jpg",
    keywords: ["fiber", "digestive health", "gut wellness", "natural"],
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-25"),
    published: true,
  },
  {
    id: "12",
    slug: "aloe-vera-gel",
    name: "Aloe Vera Gel",
    category: "cosmetic-powders",
    description:
      "Natural aloe vera gel used in skincare and cosmetic formulations. Pure and concentrated for maximum benefits.",
    shortDescription: "Natural aloe vera gel for skincare applications",
    specifications: {
      meshSize: "Gel",
      moisture: "98%",
      color: "Clear",
    },
    benefits: [
      "Skin hydration",
      "Soothing properties",
      "Anti-inflammatory",
      "Wound healing",
      "Natural moisturizer",
    ],
    packing: {
      options: ["5kg containers", "10kg containers", "25kg containers"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/aloe-vera-gel.jpg",
    keywords: ["aloe vera", "skincare", "cosmetic", "moisturizer"],
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-26"),
    published: true,
  },
  {
    id: "13",
    slug: "aloe-vera-powder",
    name: "Aloe Vera Powder",
    category: "cosmetic-powders",
    description:
      "Concentrated aloe vera powder used in beauty and wellness products. Spray-dried for maximum potency.",
    shortDescription: "Concentrated aloe vera powder for beauty products",
    specifications: {
      meshSize: "80-100",
      moisture: "5%",
      color: "Light Yellow",
    },
    benefits: [
      "Skin nourishment",
      "Hair care",
      "Anti-aging properties",
      "Natural healing",
      "Vitamin rich",
    ],
    packing: {
      options: ["10kg bags", "25kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/aloe-vera-powder.jpg",
    keywords: ["aloe vera", "beauty", "skincare", "hair care"],
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-27"),
    published: true,
  },
  {
    id: "14",
    slug: "sandalwood-powder",
    name: "Sandalwood Powder (Chandan)",
    category: "cosmetic-powders",
    description:
      "Premium sandalwood powder used in skincare and traditional beauty remedies. Known for its aromatic and cooling properties.",
    shortDescription: "Premium sandalwood powder for skincare",
    specifications: {
      meshSize: "100-200",
      moisture: "6%",
      color: "Light Brown",
    },
    benefits: [
      "Skin brightening",
      "Anti-aging",
      "Cooling effect",
      "Aromatic properties",
      "Natural antiseptic",
    ],
    packing: {
      options: ["5kg bags", "10kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/sandalwood-powder.jpg",
    keywords: ["sandalwood", "chandan", "skincare", "beauty"],
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-28"),
    published: true,
  },
  {
    id: "15",
    slug: "rose-water",
    name: "Rose Water",
    category: "cosmetic-powders",
    description:
      "Natural rose water used as toner and cosmetic ingredient. Steam-distilled from fresh rose petals.",
    shortDescription: "Natural rose water for toner and cosmetics",
    specifications: {
      meshSize: "Liquid",
      moisture: "100%",
      color: "Clear",
    },
    benefits: [
      "Natural toner",
      "Skin refreshing",
      "Anti-inflammatory",
      "Aromatic",
      "pH balancing",
    ],
    packing: {
      options: ["5L bottles", "10L bottles", "25L containers"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/rose-water.jpg",
    keywords: ["rose water", "toner", "cosmetic", "natural"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-29"),
    published: true,
  },
  {
    id: "16",
    slug: "red-chilli-powder",
    name: "Red Chilli Powder",
    category: "spices",
    description:
      "High quality red chilli powder for culinary and export markets. Vibrant color and perfect heat level.",
    shortDescription: "Premium red chilli powder for culinary use",
    specifications: {
      meshSize: "40-60",
      moisture: "10%",
      color: "Bright Red",
    },
    benefits: [
      "Rich flavor",
      "Natural color",
      "Metabolism booster",
      "Vitamin C rich",
      "Culinary versatility",
    ],
    packing: {
      options: ["25kg bags", "50kg bags"],
      customAvailable: false,
    },
    images: [],
    primaryImage: "/images/products/red-chilli.jpg",
    keywords: ["chilli", "spice", "culinary", "export quality"],
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-30"),
    published: true,
  },
  {
    id: "17",
    slug: "cardamom-elaichi",
    name: "Cardamom (Elaichi)",
    category: "spices",
    description:
      "Premium green cardamom known for aroma and flavor. Queen of spices with distinctive taste.",
    shortDescription: "Premium green cardamom for aroma and flavor",
    specifications: {
      meshSize: "Whole/Powder",
      moisture: "12%",
      color: "Green",
    },
    benefits: [
      "Aromatic spice",
      "Digestive aid",
      "Fresh breath",
      "Antioxidant rich",
      "Culinary excellence",
    ],
    packing: {
      options: ["5kg bags", "10kg bags", "25kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/cardamom.jpg",
    keywords: ["cardamom", "elaichi", "spice", "aromatic"],
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-31"),
    published: true,
  },
  {
    id: "18",
    slug: "black-pepper",
    name: "Black Pepper",
    category: "spices",
    description:
      "Export quality black pepper used globally as a spice and seasoning. King of spices with bold flavor.",
    shortDescription: "Export quality black pepper for global markets",
    specifications: {
      meshSize: "Whole/Powder",
      moisture: "12%",
      color: "Black",
    },
    benefits: [
      "Bold flavor",
      "Digestive support",
      "Antioxidant properties",
      "Nutrient absorption",
      "Versatile spice",
    ],
    packing: {
      options: ["25kg bags", "50kg bags"],
      customAvailable: false,
    },
    images: [],
    primaryImage: "/images/products/black-pepper.jpg",
    keywords: ["black pepper", "spice", "export quality", "seasoning"],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-02-01"),
    published: true,
  },
];

const mockCategories: Category[] = [
  {
    id: "1",
    slug: "herbal-powders",
    name: "Herbal Products",
    description:
      "Premium quality herbal products for health and wellness applications",
    order: 1,
    productCount: 9,
  },
  {
    id: "2",
    slug: "cosmetic-powders",
    name: "Cosmetic Products",
    description:
      "Natural cosmetic products for skincare and beauty applications",
    order: 2,
    productCount: 5,
  },
  {
    id: "3",
    slug: "spices",
    name: "Spices",
    description: "High-quality spice powders for culinary and industrial use",
    order: 3,
    productCount: 4,
  },
  {
    id: "4",
    slug: "dehydrated-powders",
    name: "Dehydrated Fruits & Vegetables",
    description:
      "Dehydrated fruit and vegetable products for food applications",
    order: 4,
    productCount: 1,
  },
];

const mockCertifications: Certification[] = [
  {
    id: "1",
    name: "ISO 9001:2015",
    issuer: "International Organization for Standardization",
    certificationNumber: "ISO-9001-2015-001",
    scope:
      "Import, Export and Repacking of Ayurvedic & Herbal Products, Cosmetic Product Spray, Dried Fruits & Vegetable Products, Spices and Food Products",
    description:
      "Quality Management System certification ensuring consistent quality and customer satisfaction through effective processes and continuous improvement.",
    image: "/images/certifications/iso-9001-2015.png",
    issueDate: new Date("2023-01-15"),
    expiryDate: new Date("2026-01-14"),
    order: 1,
    published: true,
  },
  {
    id: "2",
    name: "FSSAI License",
    issuer: "Food Safety and Standards Authority of India",
    certificationNumber: "FSSAI-12345678901234",
    scope:
      "Manufacturing and Trading of Food Products including Spices, Herbal Products, and Dehydrated Food Products",
    description:
      "Food Safety and Standards Authority of India license for manufacturing and trading of food products.",
    image: "/images/certifications/fssai-license.png",
    issueDate: new Date("2023-03-10"),
    expiryDate: new Date("2028-03-09"),
    order: 2,
    published: true,
  },
  {
    id: "3",
    name: "Export License",
    issuer: "Directorate General of Foreign Trade (DGFT)",
    certificationNumber: "IEC-0123456789",
    scope:
      "Export of Herbal Products, Spices, Cosmetic Ingredients, and Food Products to International Markets",
    description:
      "Import Export Code (IEC) license for international trade of herbal and food products.",
    image: "/images/certifications/export-license.png",
    issueDate: new Date("2022-12-01"),
    expiryDate: new Date("2027-11-30"),
    order: 3,
    published: true,
  },
  {
    id: "4",
    name: "GMP Certificate",
    issuer: "Good Manufacturing Practice Authority",
    certificationNumber: "GMP-2023-HZ-001",
    scope:
      "Good Manufacturing Practices for Herbal and Cosmetic Powder Production",
    description:
      "Good Manufacturing Practice certification ensuring high standards in production processes and quality control.",
    image: "/images/certifications/gmp-certificate.png",
    issueDate: new Date("2023-06-20"),
    expiryDate: new Date("2025-06-19"),
    order: 4,
    published: true,
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class CMSClient {
  static async getProducts(options: QueryOptions = {}): Promise<Product[]> {
    await delay(100); // Simulate network delay

    let products = [...mockProducts];

    // Filter by category
    if (options.category) {
      products = products.filter(
        (product) => product.category === options.category
      );
    }

    // Filter by search query
    if (options.search) {
      const query = options.search.toLowerCase();
      products = products.filter((product) => {
        const searchableText = [
          product.name,
          product.description,
          product.shortDescription,
          product.category.replace("-", " "),
          product.subcategory || "",
          ...(product.benefits || []),
          ...(product.keywords || []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    // Apply pagination
    if (options.offset || options.limit) {
      const start = options.offset || 0;
      const end = options.limit ? start + options.limit : undefined;
      products = products.slice(start, end);
    }

    return products;
  }

  static async getProductBySlug(slug: string): Promise<Product | null> {
    await delay(100);
    return mockProducts.find((product) => product.slug === slug) || null;
  }

  static async getCategories(): Promise<Category[]> {
    await delay(50);
    return [...mockCategories];
  }

  static async getFeaturedProducts(limit: number = 6): Promise<Product[]> {
    await delay(100);
    return mockProducts.slice(0, limit);
  }

  static async getCertifications(): Promise<Certification[]> {
    await delay(50);
    return [...mockCertifications].sort((a, b) => a.order - b.order);
  }
}
