export const mockProducts = [
  {
    id: "sku-gold-long-leaf",
    name: "Gold Long Leaf Tea",
    slug: "gold-long-leaf",
    tagline: "Beas Special - Authentic Whole Leaf",
    images: ["/brand/media_1787991645006.jpg", "/brand/placeholder-leaf.jpg"],
    badges: ["Premium", "Whole Leaf"],
    weights: [
      { grams: 100, label: "100g", priceInr: 299 },
      { grams: 250, label: "250g", priceInr: 599 },
      { grams: 1000, label: "1Kg", priceInr: 1999 },
    ],
    fbt: ["sku-sampler"],
    origin: "Assam",
    description: "Premium whole leaf tea sourced directly from the finest estates in Assam."
  },
  {
    id: "sku-gold-tea",
    name: "Gold Tea",
    slug: "gold-tea",
    tagline: "Khushboo Khile, Swad Mile",
    images: ["/brand/media_1787991645120.jpg", "/brand/placeholder-gold.jpg"],
    badges: ["Best Seller", "Everyday Chai"],
    weights: [
      { grams: 250, label: "250g", priceInr: 199 },
      { grams: 500, label: "500g", priceInr: 349 },
      { grams: 1000, label: "1Kg", priceInr: 649 },
    ],
    fbt: ["sku-kadak-chai"],
    origin: "Assam",
    description: "Our signature blend offering a rich aroma and perfect taste for your daily cup."
  },
  {
    id: "sku-punjabi-masala",
    name: "Punjabi Masala Tea",
    slug: "punjabi-masala",
    tagline: "Vento Chai Josh Jagaye - Premium Spices",
    images: ["/brand/media_1787991645006.jpg", "/brand/placeholder-masala.jpg"],
    badges: ["Immunity Booster", "Real Spices"],
    weights: [
      { grams: 100, label: "100g", priceInr: 149 },
      { grams: 250, label: "250g", priceInr: 299 },
    ],
    fbt: ["sku-gold-tea"],
    origin: "Assam & Kerala Spices",
    description: "A robust blend of black tea with authentic Indian spices for a warming, spicy kick."
  },
  {
    id: "sku-kadak-chai",
    name: "Kadak Chai",
    slug: "kadak-chai",
    tagline: "Vento Chai Josh Jagaye - Extra Strong",
    images: ["/brand/media_1787991645076.jpg", "/brand/placeholder-kadak.jpg"],
    badges: ["Extra Strong", "Morning Energy"],
    weights: [
      { grams: 250, label: "250g", priceInr: 179 },
      { grams: 500, label: "500g", priceInr: 329 },
      { grams: 1000, label: "1Kg", priceInr: 599 },
    ],
    fbt: ["sku-punjabi-masala"],
    origin: "Assam CTC",
    description: "A strong, full-bodied CTC tea perfect for making traditional Indian milk tea."
  },
  {
    id: "sku-sampler",
    name: "Vento Sampler Pack",
    slug: "sampler-pack",
    tagline: "Try Them All",
    images: ["/brand/placeholder-sampler.jpg"],
    badges: ["Great Gift"],
    weights: [
      { grams: 200, label: "4 x 50g", priceInr: 399 },
    ],
    fbt: [],
    origin: "Mixed",
    description: "Experience the complete Vento range with this introductory sampler box."
  }
];

export const CART_REWARD_THRESHOLD = 999;
