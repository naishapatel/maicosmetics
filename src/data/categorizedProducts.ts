interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
}

export const categorizedProducts: Product[] = [
  // Sustainable Beauty
  {
    id: "s1",
    title: "Eco Foundation",
    description: "Zero-waste foundation with refillable packaging",
    price: "$32",
    category: "sustainable beauty"
  },
  {
    id: "s2",
    title: "Bamboo Mascara",
    description: "Sustainable mascara with bamboo packaging",
    price: "$24",
    category: "sustainable beauty"
  },
  {
    id: "s3",
    title: "Refillable Lipstick",
    description: "Premium lipstick with refillable metal case",
    price: "$28",
    category: "sustainable beauty"
  },
  {
    id: "s4",
    title: "Glass Bottle Serum",
    description: "Recyclable glass bottle foundation serum",
    price: "$36",
    category: "sustainable beauty"
  },
  {
    id: "s5",
    title: "Biodegradable Glitter",
    description: "Ocean-safe biodegradable makeup glitter",
    price: "$18",
    category: "sustainable beauty"
  },
  {
    id: "s6",
    title: "Zero-Waste Blush",
    description: "Compressed powder blush in cardboard packaging",
    price: "$26",
    category: "sustainable beauty"
  },

  // Eco-friendly Beauty
  {
    id: "e1",
    title: "Solar-Powered Lip Tint",
    description: "Made in solar-powered facilities",
    price: "$22",
    category: "eco-friendly beauty"
  },
  {
    id: "e2",
    title: "Ocean Plastic Palette",
    description: "Eyeshadow palette made from recycled ocean plastic",
    price: "$42",
    category: "eco-friendly beauty"
  },
  {
    id: "e3",
    title: "Wind-Powered Bronzer",
    description: "Produced using wind energy",
    price: "$34",
    category: "eco-friendly beauty"
  },
  {
    id: "e4",
    title: "Recycled Metal Compact",
    description: "Pressed powder in recycled aluminum case",
    price: "$38",
    category: "eco-friendly beauty"
  },
  {
    id: "e5",
    title: "Green Energy Concealer",
    description: "Made with 100% renewable energy",
    price: "$28",
    category: "eco-friendly beauty"
  },
  {
    id: "e6",
    title: "Low-Carbon Highlighter",
    description: "Carbon-neutral production process",
    price: "$32",
    category: "eco-friendly beauty"
  },

  // Vegan Beauty
  {
    id: "v1",
    title: "Plant-Based Mascara",
    description: "100% vegan formula for length and volume",
    price: "$24",
    category: "vegan beauty"
  },
  {
    id: "v2",
    title: "Botanical Lip Stain",
    description: "Natural plant-based lip color",
    price: "$26",
    category: "vegan beauty"
  },
  {
    id: "v3",
    title: "Algae Eyeliner",
    description: "Seaweed-derived liquid liner",
    price: "$22",
    category: "vegan beauty"
  },
  {
    id: "v4",
    title: "Mushroom Extract Foundation",
    description: "Vegan foundation with adaptogenic mushrooms",
    price: "$38",
    category: "vegan beauty"
  },
  {
    id: "v5",
    title: "Hemp Brow Gel",
    description: "Cannabis sativa seed oil brow shaper",
    price: "$20",
    category: "vegan beauty"
  },
  {
    id: "v6",
    title: "Fruit Pigment Blush",
    description: "Color from real fruit extracts",
    price: "$28",
    category: "vegan beauty"
  },

  // Products for Acne
  {
    id: "a1",
    title: "Tea Tree Concealer",
    description: "Concealer with tea tree oil for acne-prone skin",
    price: "$24",
    category: "products for acne"
  },
  {
    id: "a2",
    title: "Salicylic Foundation",
    description: "Foundation with 0.5% salicylic acid",
    price: "$32",
    category: "products for acne"
  },
  {
    id: "a3",
    title: "Niacinamide Setting Powder",
    description: "Oil-control powder with niacinamide",
    price: "$28",
    category: "products for acne"
  },
  {
    id: "a4",
    title: "Zinc Oxide BB Cream",
    description: "Non-comedogenic BB cream with zinc",
    price: "$26",
    category: "products for acne"
  },
  {
    id: "a5",
    title: "Clay Stick Foundation",
    description: "Kaolin clay-infused stick foundation",
    price: "$30",
    category: "products for acne"
  },
  {
    id: "a6",
    title: "Witch Hazel Setting Spray",
    description: "Clarifying makeup setting spray",
    price: "$22",
    category: "products for acne"
  },

  // Products for College Kids
  {
    id: "c1",
    title: "Quick Fix Concealer",
    description: "Fast-applying concealer for busy mornings",
    price: "$18",
    category: "products for college kids"
  },
  {
    id: "c2",
    title: "All-Nighter Foundation",
    description: "Long-lasting foundation for late study sessions",
    price: "$24",
    category: "products for college kids"
  },
  {
    id: "c3",
    title: "Multi-Use Stick",
    description: "3-in-1 lip, cheek, and eye color",
    price: "$16",
    category: "products for college kids"
  },
  {
    id: "c4",
    title: "Budget Mascara",
    description: "Affordable but effective mascara",
    price: "$12",
    category: "products for college kids"
  },
  {
    id: "c5",
    title: "Travel Size Kit",
    description: "Compact makeup essentials for dorm life",
    price: "$28",
    category: "products for college kids"
  },
  {
    id: "c6",
    title: "Waterproof Eyeliner",
    description: "Smudge-proof liner for long days",
    price: "$14",
    category: "products for college kids"
  },

  // Pure Skin Co Products
  {
    id: "psc1",
    title: "Sensitive Skin Foundation",
    description: "Hypoallergenic foundation for sensitive skin",
    price: "$38",
    category: "sustainable beauty"
  },
  {
    id: "psc2",
    title: "Calming Concealer",
    description: "Concealer with chamomile and aloe vera",
    price: "$26",
    category: "sustainable beauty"
  },
  {
    id: "psc3",
    title: "Gentle Mineral Blush",
    description: "Non-irritating mineral blush for sensitive skin",
    price: "$28",
    category: "sustainable beauty"
  },
  {
    id: "psc4",
    title: "Soothing BB Cream",
    description: "BB cream with calendula extract",
    price: "$32",
    category: "products for acne"
  },
  {
    id: "psc5",
    title: "Pure Defense Powder",
    description: "Non-comedogenic setting powder",
    price: "$24",
    category: "products for acne"
  },
  {
    id: "psc6",
    title: "Clear Skin Concealer",
    description: "Oil-free concealer with tea tree oil",
    price: "$22",
    category: "products for acne"
  },

  // Natural Beauty Products
  {
    id: "nb1",
    title: "Vegan Liquid Lipstick",
    description: "Long-lasting plant-based liquid lip color",
    price: "$24",
    category: "vegan beauty"
  },
  {
    id: "nb2",
    title: "Organic Eye Palette",
    description: "100% organic pressed powder eyeshadows",
    price: "$42",
    category: "vegan beauty"
  },
  {
    id: "nb3",
    title: "Natural Glow Highlighter",
    description: "Vegan highlighter with coconut oil",
    price: "$28",
    category: "vegan beauty"
  },
  {
    id: "nb4",
    title: "Hemp Brow Pomade",
    description: "Long-wearing brow pomade with hemp oil",
    price: "$20",
    category: "vegan beauty"
  },
  {
    id: "nb5",
    title: "Bamboo Bronzer",
    description: "Matte bronzer in bamboo compact",
    price: "$34",
    category: "eco-friendly beauty"
  },
  {
    id: "nb6",
    title: "Zero Waste Mascara",
    description: "Refillable mascara in glass tube",
    price: "$26",
    category: "eco-friendly beauty"
  },

  // Eco Glow Products
  {
    id: "eg1",
    title: "Recycled Glass Foundation",
    description: "Foundation in recycled glass bottle",
    price: "$36",
    category: "eco-friendly beauty"
  },
  {
    id: "eg2",
    title: "Compostable Lip Balm",
    description: "Tinted lip balm in compostable tube",
    price: "$16",
    category: "eco-friendly beauty"
  },
  {
    id: "eg3",
    title: "Student Starter Kit",
    description: "Essential makeup basics for students",
    price: "$45",
    category: "products for college kids"
  },
  {
    id: "eg4",
    title: "Campus Beauty Bundle",
    description: "Multi-use products for busy students",
    price: "$38",
    category: "products for college kids"
  },
  {
    id: "eg5",
    title: "Study Break Palette",
    description: "Quick-apply eyeshadow quad",
    price: "$22",
    category: "products for college kids"
  },
  {
    id: "eg6",
    title: "Lecture-Ready Kit",
    description: "5-minute makeup essentials",
    price: "$32",
    category: "products for college kids"
  },
  {
    id: "eg7",
    title: "Dorm Room Beauty Set",
    description: "Space-saving makeup collection",
    price: "$48",
    category: "products for college kids"
  },
  {
    id: "eg8",
    title: "Student Budget Brush Set",
    description: "Affordable essential makeup brushes",
    price: "$25",
    category: "products for college kids"
  }
];
