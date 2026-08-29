export const mockProducts = [
  {
    id: "sku-gold-long-leaf",
    name: "Gold Long Leaf Tea",
    slug: "gold-long-leaf",
    tagline: "Beas Special - Authentic Whole Leaf",
    images: [
      "/brand/client/products/gold-long-leaf/4.png",
      "/brand/client/products/gold-long-leaf/1.png",
      "/brand/client/products/gold-long-leaf/2.png",
      "/brand/client/products/gold-long-leaf/3.png",
    ],
    badges: ["Premium"],
    category: "Whole Leaf",
    priceInr: 299,
    discount: 36,
    weights: [
      { grams: 100, label: "100g", priceInr: 299 },
      { grams: 250, label: "250g", priceInr: 599 },
      { grams: 1000, label: "1Kg", priceInr: 1999 },
    ],
    fbt: ["sku-sampler"],
    origin: "Assam",
    description: "Premium whole leaf tea sourced directly from the finest estates in Assam. Unbroken leaves retain maximum flavor and essential oils.",
    features: [
      { title: "100% Natural", desc: "No artificial flavors" },
      { title: "Whole Leaf", desc: "Maximum aroma and taste" }
    ],
    specifications: [
      { label: "Material", value: "Premium Whole Leaf Assam Tea" },
      { label: "Colour", value: "Rich Golden Amber" },
      { label: "Weight Options", value: "100g, 250g, 1Kg" },
      { label: "Brewing", value: "Best brewed without milk at 95°C for 3-4 mins" }
    ]
  },
  {
    id: "sku-gold-tea",
    name: "Gold Tea",
    slug: "gold-tea",
    tagline: "Khushboo Khile, Swad Mile",
    images: [
      "/brand/client/products/gold-tea/5.png",
      "/brand/client/products/gold-tea/6.png",
      "/brand/client/products/gold-tea/1.png",
      "/brand/client/products/gold-tea/2.png",
      "/brand/client/products/gold-tea/3.png",
      "/brand/client/products/gold-tea/4.png",
    ],
    badges: ["Best Seller"],
    category: "Everyday Chai",
    priceInr: 199,
    discount: 23,
    weights: [
      { grams: 250, label: "250g", priceInr: 199 },
      { grams: 500, label: "500g", priceInr: 349 },
      { grams: 1000, label: "1Kg", priceInr: 649 },
    ],
    fbt: ["sku-kadak-chai"],
    origin: "Assam",
    description: "Our signature blend offering a rich aroma and perfect taste for your daily cup. Perfectly balanced for making Indian milk tea.",
    features: [
      { title: "Rich Aroma", desc: "Handpicked selective leaves" },
      { title: "Perfect Blend", desc: "Optimized for milk & sugar" }
    ],
    specifications: [
      { label: "Material", value: "CTC & Long Leaf Blend" },
      { label: "Colour", value: "Deep Crimson" },
      { label: "Weight Options", value: "250g, 500g, 1Kg" },
      { label: "Brewing", value: "Boil with water, milk, and sugar to taste" }
    ]
  },
  {
    id: "sku-punjabi-masala",
    name: "Punjabi Masala Tea",
    slug: "punjabi-masala",
    tagline: "Vento Chai Josh Jagaye - Premium Spices",
    images: [
      "/brand/client/products/punjabi-masala/4.png",
      "/brand/client/products/punjabi-masala/1.png",
      "/brand/client/products/punjabi-masala/2.png",
      "/brand/client/products/punjabi-masala/3.png",
    ],
    badges: ["Immunity Booster"],
    category: "Masala Chai",
    priceInr: 149,
    discount: 21,
    weights: [
      { grams: 100, label: "100g", priceInr: 149 },
      { grams: 250, label: "250g", priceInr: 299 },
    ],
    fbt: ["sku-gold-tea"],
    origin: "Assam & Kerala Spices",
    description: "A robust blend of black tea with authentic Indian spices like cardamom, ginger, cloves, and cinnamon for a warming kick.",
    features: [
      { title: "Immunity Booster", desc: "Rich in Ayurvedic spices" },
      { title: "Warming", desc: "Perfect for cold mornings" }
    ],
    specifications: [
      { label: "Ingredients", value: "Assam CTC, Ginger, Cardamom, Clove, Black Pepper" },
      { label: "Colour", value: "Dark Amber" },
      { label: "Weight Options", value: "100g, 250g" },
      { label: "Brewing", value: "Boil thoroughly with milk for maximum spice extraction" }
    ]
  },
  {
    id: "sku-kadak-chai",
    name: "Kadak Chai",
    slug: "kadak-chai",
    tagline: "Vento Chai Josh Jagaye - Extra Strong",
    images: [
      "/brand/client/products/kadak-chai/4.png",
      "/brand/client/products/kadak-chai/1.png",
      "/brand/client/products/kadak-chai/2.png",
      "/brand/client/products/kadak-chai/3.png",
    ],
    badges: ["Extra Strong"],
    category: "Everyday Chai",
    priceInr: 179,
    discount: 15,
    weights: [
      { grams: 250, label: "250g", priceInr: 179 },
      { grams: 500, label: "500g", priceInr: 329 },
      { grams: 1000, label: "1Kg", priceInr: 599 },
    ],
    fbt: ["sku-punjabi-masala"],
    origin: "Assam CTC",
    description: "A strong, full-bodied CTC tea perfect for making traditional strong Indian milk tea that wakes you up.",
    features: [
      { title: "Extra Strong", desc: "High caffeine CTC grains" },
      { title: "Bold Color", desc: "Yields a bright, dark cup" }
    ],
    specifications: [
      { label: "Material", value: "100% Assam CTC Dust & Fannings" },
      { label: "Colour", value: "Deep Ruby Red" },
      { label: "Weight Options", value: "250g, 500g, 1Kg" },
      { label: "Brewing", value: "Fast infusing, requires less boiling time" }
    ]
  },
  {
    id: "sku-sampler",
    name: "Vento Sampler Pack",
    slug: "sampler-pack",
    tagline: "Try Them All",
    images: ["/brand/media_1787991645085.jpg"],
    badges: ["Great Gift"],
    category: "Gift Boxes",
    priceInr: 399,
    discount: 10,
    weights: [
      { grams: 200, label: "4 x 50g", priceInr: 399 },
    ],
    fbt: [],
    origin: "Mixed",
    description: "Experience the complete Vento range with this introductory sampler box featuring our top 4 blends.",
    features: [
      { title: "Premium Gifting", desc: "Beautifully packed box" },
      { title: "Variety", desc: "4 distinct flavor profiles" }
    ],
    specifications: [
      { label: "Contents", value: "Gold, Gold Long Leaf, Masala, Kadak" },
      { label: "Packaging", value: "Premium Hardboard Gift Box" },
      { label: "Weight Options", value: "200g Total (4x50g)" },
      { label: "Ideal For", value: "Gifting, Trial tasting" }
    ]
  }
];

export const FREE_SHIPPING_THRESHOLD = 499;
export const CART_REWARD_THRESHOLD = 999;
