/**
 * CMS Client
 * Handles data fetching from the CMS (Sanity)
 * Requirements: 16.1, 16.2, 16.3
 */

import { Product, Category, QueryOptions } from "@/types/product";
import { Certification } from "@/types/content";

// Mock data for development - replace with actual Sanity client
const mockProducts: Product[] = [
  // PARENT PRODUCT 1: Moringa Product
  {
    id: "1",
    slug: "moringa-powder",
    name: "Moringa Product",
    category: "herbal-powders",
    description:
      "Comprehensive range of premium moringa-based products sourced from organically grown moringa trees. Our moringa product line includes organic leaf powder, convenient dip teas and capsules, nutrient-rich seeds, and cold-pressed oil for various industrial and wellness applications.",
    shortDescription: "Complete range of premium moringa products for global markets",
    specifications: {
      meshSize: "Varies by product",
      moisture: "5-8%",
      color: "Green to Golden",
    },
    benefits: [
      "Rich in vitamins and minerals",
      "High antioxidant content",
      "Supports immunity and wellness",
      "Versatile applications",
      "Organic and sustainable sourcing",
    ],
    packing: {
      options: ["5kg bags", "10kg bags", "25kg bags", "Custom packaging available"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/moringa/moringa-product.jpg",
    keywords: ["moringa", "superfood", "organic", "vitamins", "antioxidants"],
    isParentProduct: true,
    subProducts: [
      {
        id: "1-1",
        slug: "moringa-organic-leaf-powder",
        name: "Moringa Organic Leaf Powder",
        category: "herbal-powders",
        description:
          "Moringa Organic Leaf Powder is a premium-grade herbal powder sourced from organically grown moringa leaves. Rich in antioxidants, vitamins, and minerals, it is widely used in dietary supplements, functional foods, and wellness formulations.",
        shortDescription: "Premium organic moringa leaf powder for supplements and foods",
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
        primaryImage: "/images/products/moringa/moringa-leaf-powder.jpg",
        keywords: ["moringa", "organic", "leaf powder", "supplements"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-15"),
        published: true,
      },
      {
        id: "1-2",
        slug: "moringa-dip-teas-capsules",
        name: "Moringa Dip Teas / Capsules",
        category: "herbal-powders",
        description:
          "Moringa Dip Teas and Capsules offer convenient formats for daily wellness. These products are formulated for easy consumption, providing the nutritional benefits of moringa in ready-to-use tea bags and capsule forms for dietary supplement applications.",
        shortDescription: "Convenient moringa tea bags and capsules for wellness",
        specifications: {
          meshSize: "Tea cut / Encapsulated",
          moisture: "6%",
          color: "Green",
        },
        benefits: [
          "Convenient consumption format",
          "Supports daily wellness",
          "Rich in nutrients",
          "Easy to incorporate into routine",
          "Standardized dosage",
        ],
        packing: {
          options: ["Tea bags in bulk", "Capsules in bottles", "Custom packaging"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/moringa/moringa-tea-capsules.jpg",
        keywords: ["moringa", "tea", "capsules", "supplements", "wellness"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-15"),
        published: true,
      },
      {
        id: "1-3",
        slug: "moringa-seeds",
        name: "Moringa Seeds",
        category: "herbal-powders",
        description:
          "Moringa Seeds are nutrient-dense seeds harvested from mature moringa pods. These seeds are used for oil extraction, planting, and as a nutritional ingredient in various food and wellness products for industrial applications.",
        shortDescription: "Premium moringa seeds for oil extraction and nutrition",
        specifications: {
          meshSize: "Whole seeds",
          moisture: "8%",
          color: "Brown",
        },
        benefits: [
          "High oil content",
          "Nutrient-rich",
          "Suitable for planting",
          "Industrial applications",
          "Natural and sustainable",
        ],
        packing: {
          options: ["10kg bags", "25kg bags", "50kg bags"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/moringa/moringa-seeds.jpg",
        keywords: ["moringa", "seeds", "oil extraction", "planting"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-15"),
        published: true,
      },
      {
        id: "1-4",
        slug: "moringa-cold-pressed-oil",
        name: "Moringa Cold-Pressed Oil",
        category: "herbal-powders",
        description:
          "Moringa Cold-Pressed Oil is extracted from moringa seeds using cold-press technology to preserve its nutritional properties. This premium oil is used in cosmetic formulations, skincare products, and as a nutritional supplement ingredient.",
        shortDescription: "Premium cold-pressed moringa oil for cosmetics and nutrition",
        specifications: {
          meshSize: "Liquid oil",
          moisture: "N/A",
          color: "Golden yellow",
        },
        benefits: [
          "Rich in oleic acid",
          "Excellent for skincare",
          "Natural moisturizer",
          "Anti-aging properties",
          "Nutritional supplement ingredient",
        ],
        packing: {
          options: ["5L containers", "10L containers", "25L drums"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/moringa/moringa-oil.jpg",
        keywords: ["moringa", "oil", "cold-pressed", "cosmetic", "skincare"],
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-15"),
        published: true,
      },
    ],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
    published: true,
  },
  
  // PARENT PRODUCT 2: Ashwagandha Product
  {
    id: "2",
    slug: "ashwagandha-powder",
    name: "Ashwagandha Product",
    category: "herbal-powders",
    subcategory: "adaptogenic",
    description:
      "Complete range of premium ashwagandha products known for adaptogenic properties. Our ashwagandha line includes pure root powder, standardized extracts with withanolides, and convenient capsule formats for stress relief and wellness applications.",
    shortDescription: "Comprehensive ashwagandha product range for stress relief and wellness",
    specifications: {
      meshSize: "Varies by product",
      moisture: "5-7%",
      color: "Beige to Brown",
    },
    benefits: [
      "Reduces stress and anxiety",
      "Improves energy levels",
      "Supports mental clarity",
      "Enhances physical performance",
      "Promotes better sleep",
    ],
    packing: {
      options: ["5kg bags", "10kg bags", "25kg bags", "Custom packaging"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/ashwagandha/ashwagandha-product.jpg",
    keywords: ["ashwagandha", "adaptogen", "stress relief", "energy", "wellness"],
    isParentProduct: true,
    subProducts: [
      {
        id: "2-1",
        slug: "ashwagandha-root-powder",
        name: "Ashwagandha Root Powder",
        category: "herbal-powders",
        description:
          "Ashwagandha Root Powder is a premium adaptogenic herb powder sourced from high-quality ashwagandha roots. This traditional Ayurvedic ingredient is widely used in dietary supplements and wellness formulations for stress management and vitality support.",
        shortDescription: "Pure ashwagandha root powder for stress relief and vitality",
        specifications: {
          meshSize: "80-120",
          moisture: "6%",
          color: "Beige",
        },
        benefits: [
          "Natural adaptogen",
          "Reduces stress and anxiety",
          "Improves energy levels",
          "Supports mental clarity",
          "Traditional Ayurvedic herb",
        ],
        packing: {
          options: ["5kg bags", "10kg bags", "25kg bags"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/ashwagandha/ashwagandha-root-powder.jpg",
        keywords: ["ashwagandha", "root powder", "adaptogen", "stress relief"],
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-16"),
        published: true,
      },
      {
        id: "2-2",
        slug: "ashwagandha-extract",
        name: "Ashwagandha Extract (5–10% Withanolides)",
        category: "herbal-powders",
        description:
          "Ashwagandha Extract is a standardized herbal extract containing 5-10% withanolides, the active compounds responsible for ashwagandha's adaptogenic properties. This concentrated extract is ideal for pharmaceutical and nutraceutical applications requiring consistent potency.",
        shortDescription: "Standardized ashwagandha extract with 5-10% withanolides",
        specifications: {
          meshSize: "Fine powder",
          moisture: "5%",
          color: "Brown",
        },
        benefits: [
          "Standardized withanolide content",
          "High potency",
          "Consistent quality",
          "Pharmaceutical grade",
          "Enhanced bioavailability",
        ],
        packing: {
          options: ["1kg bags", "5kg bags", "10kg bags"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/ashwagandha/ashwagandha-extract.jpg",
        keywords: ["ashwagandha", "extract", "withanolides", "standardized"],
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-16"),
        published: true,
      },
      {
        id: "2-3",
        slug: "ashwagandha-capsules",
        name: "Ashwagandha Capsules",
        category: "herbal-powders",
        description:
          "Ashwagandha Capsules provide a convenient format for daily supplementation. These capsules contain standardized ashwagandha extract in easy-to-consume vegetarian capsules, ideal for dietary supplement brands and wellness product lines.",
        shortDescription: "Convenient ashwagandha capsules for daily wellness",
        specifications: {
          meshSize: "Encapsulated",
          moisture: "N/A",
          color: "Capsule form",
        },
        benefits: [
          "Convenient dosage form",
          "Easy to consume",
          "Standardized content",
          "Vegetarian capsules",
          "Ready for retail packaging",
        ],
        packing: {
          options: ["Bulk bottles", "Blister packs", "Custom packaging"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/ashwagandha/ashwagandha-capsules.jpg",
        keywords: ["ashwagandha", "capsules", "supplements", "convenient"],
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-16"),
        published: true,
      },
    ],
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-16"),
    published: true,
  },
  
  // PARENT PRODUCT 3: Neem Product
  {
    id: "4",
    slug: "neem-powder",
    name: "Neem Product",
    category: "herbal-powders",
    description:
      "Premium neem product range with natural antibacterial and antifungal properties. Our neem line includes pure leaf powder for skincare and health applications, and cold-pressed neem oil for cosmetic and agricultural uses.",
    shortDescription: "Complete neem product range with antibacterial properties",
    specifications: {
      meshSize: "Varies by product",
      moisture: "5-8%",
      color: "Green to Golden",
    },
    benefits: [
      "Natural antibacterial",
      "Antifungal properties",
      "Supports skin health",
      "Immune system support",
      "Natural detoxifier",
    ],
    packing: {
      options: ["10kg bags", "20kg bags", "Custom packaging"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/neem/neem-product.jpg",
    keywords: ["neem", "antibacterial", "skincare", "natural", "detox"],
    isParentProduct: true,
    subProducts: [
      {
        id: "4-1",
        slug: "neem-powder-pure",
        name: "Neem Powder",
        category: "herbal-powders",
        description:
          "Neem Powder is a pure herbal powder made from dried neem leaves. This natural ingredient is widely used in skincare formulations, cosmetic products, and traditional wellness applications for its antibacterial and purifying properties.",
        shortDescription: "Pure neem leaf powder for skincare and wellness",
        specifications: {
          meshSize: "80-100",
          moisture: "7%",
          color: "Green",
        },
        benefits: [
          "Natural antibacterial",
          "Antifungal properties",
          "Supports skin health",
          "Natural detoxifier",
          "Traditional Ayurvedic ingredient",
        ],
        packing: {
          options: ["10kg bags", "20kg bags"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/neem/neem-powder.jpg",
        keywords: ["neem", "powder", "antibacterial", "skincare"],
        createdAt: new Date("2024-01-04"),
        updatedAt: new Date("2024-01-18"),
        published: true,
      },
      {
        id: "4-2",
        slug: "neem-oil",
        name: "Neem Oil",
        category: "herbal-powders",
        description:
          "Neem Oil is a cold-pressed oil extracted from neem seeds. This versatile oil is used in cosmetic formulations, skincare products, hair care applications, and as a natural ingredient in agricultural and pest control solutions.",
        shortDescription: "Cold-pressed neem oil for cosmetics and agriculture",
        specifications: {
          meshSize: "Liquid oil",
          moisture: "N/A",
          color: "Golden brown",
        },
        benefits: [
          "Natural pest control",
          "Skincare applications",
          "Hair care benefits",
          "Antibacterial properties",
          "Versatile industrial uses",
        ],
        packing: {
          options: ["5L containers", "10L containers", "25L drums"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/neem/neem-oil.jpg",
        keywords: ["neem", "oil", "cold-pressed", "cosmetic", "agriculture"],
        createdAt: new Date("2024-01-04"),
        updatedAt: new Date("2024-01-18"),
        published: true,
      },
    ],
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-18"),
    published: true,
  },
  
  // PARENT PRODUCT 4: Tulsi Product
  {
    id: "8",
    slug: "tulsi-powder",
    name: "Tulsi Product",
    category: "herbal-powders",
    description:
      "Comprehensive tulsi (holy basil) product range known for immunity and respiratory support. Our tulsi line includes dried leaves for tea applications, concentrated oil for aromatherapy and cosmetics, and standardized extracts for pharmaceutical use.",
    shortDescription: "Complete tulsi product range for immunity and wellness",
    specifications: {
      meshSize: "Varies by product",
      moisture: "5-8%",
      color: "Green to Golden",
    },
    benefits: [
      "Boosts immunity",
      "Stress relief",
      "Natural antioxidant",
      "Respiratory support",
      "Anti-inflammatory",
    ],
    packing: {
      options: ["5kg bags", "10kg bags", "25kg bags", "Custom packaging"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/tulsi/tulsi-product.jpg",
    keywords: ["tulsi", "holy basil", "immunity", "adaptogen", "stress relief"],
    isParentProduct: true,
    subProducts: [
      {
        id: "8-1",
        slug: "dried-tulsi-leaves",
        name: "Dried Tulsi Leaves (for Tea)",
        category: "herbal-powders",
        description:
          "Dried Tulsi Leaves are premium-quality holy basil leaves carefully dried to preserve their aromatic and medicinal properties. These leaves are ideal for herbal tea blends, wellness beverages, and traditional Ayurvedic preparations.",
        shortDescription: "Premium dried tulsi leaves for herbal tea and wellness",
        specifications: {
          meshSize: "Whole/Cut leaves",
          moisture: "8%",
          color: "Green",
        },
        benefits: [
          "Boosts immunity",
          "Stress relief",
          "Respiratory support",
          "Natural antioxidant",
          "Traditional Ayurvedic herb",
        ],
        packing: {
          options: ["5kg bags", "10kg bags", "25kg bags"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/tulsi/tulsi-dried-leaves.jpg",
        keywords: ["tulsi", "holy basil", "tea", "dried leaves", "immunity"],
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-22"),
        published: true,
      },
      {
        id: "8-2",
        slug: "tulsi-oil",
        name: "Tulsi Oil",
        category: "herbal-powders",
        description:
          "Tulsi Oil is a concentrated essential oil extracted from tulsi leaves through steam distillation. This aromatic oil is used in aromatherapy, cosmetic formulations, and wellness products for its therapeutic and stress-relieving properties.",
        shortDescription: "Concentrated tulsi essential oil for aromatherapy and cosmetics",
        specifications: {
          meshSize: "Liquid oil",
          moisture: "N/A",
          color: "Pale yellow",
        },
        benefits: [
          "Aromatherapy applications",
          "Stress relief",
          "Respiratory support",
          "Natural fragrance",
          "Therapeutic properties",
        ],
        packing: {
          options: ["100ml bottles", "500ml bottles", "1L containers"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/tulsi/tulsi-oil.jpg",
        keywords: ["tulsi", "oil", "essential oil", "aromatherapy", "therapeutic"],
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-22"),
        published: true,
      },
      {
        id: "8-3",
        slug: "tulsi-extract",
        name: "Tulsi Extract",
        category: "herbal-powders",
        description:
          "Tulsi Extract is a standardized herbal extract concentrated from tulsi leaves. This pharmaceutical-grade extract is used in dietary supplements, nutraceutical formulations, and wellness products requiring consistent potency and bioactive compound content.",
        shortDescription: "Standardized tulsi extract for pharmaceutical applications",
        specifications: {
          meshSize: "Fine powder/Liquid",
          moisture: "5%",
          color: "Dark green",
        },
        benefits: [
          "Standardized content",
          "High potency",
          "Pharmaceutical grade",
          "Enhanced bioavailability",
          "Consistent quality",
        ],
        packing: {
          options: ["1kg bags", "5kg bags", "10kg bags"],
          customAvailable: true,
        },
        images: [],
        primaryImage: "/images/products/tulsi/tulsi-extract.jpg",
        keywords: ["tulsi", "extract", "standardized", "pharmaceutical", "supplement"],
        createdAt: new Date("2024-01-08"),
        updatedAt: new Date("2024-01-22"),
        published: true,
      },
    ],
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-22"),
    published: true,
  },
  
  // Keep other existing products unchanged
  {
    id: "3",
    slug: "amla-powder",
    name: "Amla Powder",
    category: "herbal-powders",
    description:
      "Premium quality amla powder rich in natural Vitamin C and antioxidants. Widely used in herbal supplements, nutraceutical formulations, and wellness products. Amla (Indian Gooseberry) is a traditional Ayurvedic ingredient known for its rejuvenating properties and high nutritional value.",
    shortDescription: "Premium quality amla powder rich in natural Vitamin C and antioxidants. Widely used in herbal supplements, nutraceutical formulations, and wellness products.",
    specifications: {
      meshSize: "80-100",
      moisture: "7%",
      color: "Light Green to Beige",
    },
    benefits: [
      "Rich in natural Vitamin C",
      "High antioxidant content",
      "Supports immune system",
      "Promotes healthy hair and skin",
      "Aids digestion and metabolism",
      "Traditional Ayurvedic ingredient",
    ],
    packing: {
      options: ["10kg bags", "25kg bags", "50kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/amla/amla-powder.jpeg",
    keywords: ["amla", "vitamin c", "antioxidants", "ayurvedic", "immunity", "herbal"],
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-17"),
    published: true,
  },
  {
    id: "4",
    slug: "spirulina-powder",
    name: "Spirulina Powder",
    category: "herbal-powders",
    description:
      "Nutrient-dense blue-green algae powder known as a powerful superfood. Spirulina powder is rich in protein, vitamins, minerals, and antioxidants, widely used in health supplements and functional foods. This premium quality spirulina is carefully processed to retain maximum nutritional value.",
    shortDescription: "Nutrient-dense blue-green algae powder superfood rich in protein and antioxidants.",
    specifications: {
      meshSize: "80-120",
      moisture: "6%",
      color: "Dark Green",
    },
    benefits: [
      "High protein content",
      "Rich in vitamins and minerals",
      "Powerful antioxidant properties",
      "Supports immune system",
      "Natural energy booster",
      "Detoxification support",
    ],
    packing: {
      options: ["5kg bags", "10kg bags", "25kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/spirulina-powder.jpg",
    keywords: ["spirulina", "superfood", "protein", "antioxidants", "algae", "herbal"],
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-18"),
    published: true,
  },
  {
    id: "5",
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
  
  // COSMETIC PRODUCTS
  {
    id: "19",
    slug: "herbal-lip-balm",
    name: "Herbal Lip Balm",
    category: "cosmetic-powders",
    description:
      "Natural herbal lip balm formulated with botanical extracts and nourishing oils that help moisturize and protect lips. Made with premium herbal ingredients for daily lip care and protection against environmental factors.",
    shortDescription: "Natural herbal lip balm formulated with botanical extracts and nourishing oils that help moisturize and protect lips.",
    specifications: {
      form: "Balm",
      packaging: "Tubes/Jars",
      shelfLife: "24 months",
    },
    benefits: [
      "Deep moisturization",
      "Natural lip protection",
      "Botanical extracts",
      "Nourishing oils",
      "Long-lasting hydration",
      "Suitable for all skin types",
    ],
    packing: {
      options: ["Bulk tubes", "Bulk jars", "Custom packaging available"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/cosmetics/herbal-lip-balm.jpg",
    keywords: ["lip balm", "herbal", "cosmetic", "moisturizer", "natural"],
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-15"),
    published: true,
  },
  {
    id: "20",
    slug: "herbal-body-lotion",
    name: "Herbal Body Lotion",
    category: "cosmetic-powders",
    description:
      "Herbal body lotion enriched with plant-based ingredients designed to hydrate and nourish skin. This premium formulation combines traditional herbal extracts with modern skincare science for optimal skin health and radiance.",
    shortDescription: "Herbal body lotion enriched with plant-based ingredients designed to hydrate and nourish skin.",
    specifications: {
      form: "Lotion",
      packaging: "Bottles/Containers",
      shelfLife: "24 months",
    },
    benefits: [
      "Deep skin hydration",
      "Plant-based ingredients",
      "Nourishes and softens skin",
      "Non-greasy formula",
      "Suitable for daily use",
      "Natural fragrance",
    ],
    packing: {
      options: ["100ml bottles", "250ml bottles", "500ml bottles", "Bulk containers"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/cosmetics/herbal-body-lotion.jpg",
    keywords: ["body lotion", "herbal", "cosmetic", "moisturizer", "skincare"],
    createdAt: new Date("2024-02-02"),
    updatedAt: new Date("2024-02-16"),
    published: true,
  },
  {
    id: "21",
    slug: "herbal-toothpaste",
    name: "Herbal Toothpaste",
    category: "cosmetic-powders",
    description:
      "Herbal toothpaste made from natural extracts known for promoting oral hygiene and fresh breath. Formulated with traditional herbal ingredients that support dental health, gum care, and long-lasting freshness without harsh chemicals.",
    shortDescription: "Herbal toothpaste made from natural extracts known for promoting oral hygiene and fresh breath.",
    specifications: {
      form: "Paste",
      packaging: "Tubes",
      shelfLife: "36 months",
    },
    benefits: [
      "Natural oral hygiene",
      "Fresh breath",
      "Gum care support",
      "Herbal extracts",
      "No harsh chemicals",
      "Daily dental protection",
    ],
    packing: {
      options: ["Bulk tubes", "Custom packaging available"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/cosmetics/herbal-toothpaste.jpg",
    keywords: ["toothpaste", "herbal", "oral care", "dental hygiene", "natural"],
    createdAt: new Date("2024-02-03"),
    updatedAt: new Date("2024-02-17"),
    published: true,
  },
  
  // DEHYDRATED FRUITS & VEGETABLES
  {
    id: "22",
    slug: "raisins-dry-grapes",
    name: "Raisins (Dry Grapes)",
    category: "dehydrated-powders",
    description:
      "Premium quality dehydrated grapes with natural sweetness and high nutritional value. Our raisins are carefully processed to retain maximum nutrients, flavor, and natural sweetness, making them ideal for food processing, bakery applications, and direct consumption.",
    shortDescription: "Premium quality dehydrated grapes with natural sweetness and high nutritional value.",
    specifications: {
      moisture: "15-18%",
      color: "Golden/Dark Brown",
      size: "Medium to Large",
    },
    benefits: [
      "Natural sweetness",
      "High in fiber",
      "Rich in antioxidants",
      "Energy booster",
      "Iron and potassium source",
      "Versatile ingredient",
    ],
    packing: {
      options: ["5kg bags", "10kg bags", "25kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/dehydrated/raisins.jpg",
    keywords: ["raisins", "dry grapes", "dehydrated", "dried fruit", "natural"],
    createdAt: new Date("2024-02-04"),
    updatedAt: new Date("2024-02-18"),
    published: true,
  },
  {
    id: "23",
    slug: "curry-leaves",
    name: "Curry Leaves",
    category: "dehydrated-powders",
    description:
      "Carefully dehydrated curry leaves used in food processing and spice blends. These aromatic leaves retain their distinctive flavor and aroma even after dehydration, making them perfect for seasoning mixes, ready-to-eat meals, and culinary applications.",
    shortDescription: "Carefully dehydrated curry leaves used in food processing and spice blends.",
    specifications: {
      moisture: "8-10%",
      color: "Dark Green",
      form: "Whole/Crushed",
    },
    benefits: [
      "Aromatic flavor",
      "Long shelf life",
      "Convenient to use",
      "Retains natural properties",
      "Ideal for spice blends",
      "Food processing ready",
    ],
    packing: {
      options: ["1kg bags", "5kg bags", "10kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/dehydrated/curry-leaves.jpg",
    keywords: ["curry leaves", "dehydrated", "spice", "aromatic", "seasoning"],
    createdAt: new Date("2024-02-05"),
    updatedAt: new Date("2024-02-19"),
    published: true,
  },
  {
    id: "24",
    slug: "oregano",
    name: "Oregano",
    category: "dehydrated-powders",
    description:
      "High-quality dried oregano widely used in seasoning blends and culinary applications. Our premium oregano is carefully dried to preserve its robust flavor and aromatic properties, making it essential for Mediterranean cuisine, pizza seasonings, and herb blends.",
    shortDescription: "High-quality dried oregano widely used in seasoning blends and culinary applications.",
    specifications: {
      moisture: "10-12%",
      color: "Green",
      form: "Leaves/Crushed",
    },
    benefits: [
      "Robust flavor",
      "Aromatic properties",
      "Versatile seasoning",
      "Long shelf life",
      "Rich in antioxidants",
      "Culinary essential",
    ],
    packing: {
      options: ["1kg bags", "5kg bags", "10kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/dehydrated/oregano.jpg",
    keywords: ["oregano", "herb", "dehydrated", "seasoning", "culinary"],
    createdAt: new Date("2024-02-06"),
    updatedAt: new Date("2024-02-20"),
    published: true,
  },
  {
    id: "25",
    slug: "mint",
    name: "Mint",
    category: "dehydrated-powders",
    description:
      "Dehydrated mint leaves with strong aroma used in herbal teas and seasoning products. Our premium mint leaves are carefully dried to maintain their refreshing flavor and cooling properties, perfect for tea blends, culinary applications, and herbal formulations.",
    shortDescription: "Dehydrated mint leaves with strong aroma used in herbal teas and seasoning products.",
    specifications: {
      moisture: "8-10%",
      color: "Green",
      form: "Whole/Crushed",
    },
    benefits: [
      "Refreshing aroma",
      "Cooling properties",
      "Digestive support",
      "Versatile use",
      "Long-lasting freshness",
      "Natural flavor enhancer",
    ],
    packing: {
      options: ["1kg bags", "5kg bags", "10kg bags"],
      customAvailable: true,
    },
    images: [],
    primaryImage: "/images/products/dehydrated/mint.jpg",
    keywords: ["mint", "dehydrated", "herbal tea", "aromatic", "seasoning"],
    createdAt: new Date("2024-02-07"),
    updatedAt: new Date("2024-02-21"),
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
    productCount: 10,
  },
  {
    id: "2",
    slug: "cosmetic-powders",
    name: "Cosmetic Products",
    description:
      "Natural cosmetic products for skincare and beauty applications",
    order: 2,
    productCount: 8,
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
    productCount: 5,
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
