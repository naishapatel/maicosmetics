import { ProductRecommendation } from "@/types/quiz";

interface ProductDatabase {
  [key: string]: ProductRecommendation[];
}

export const makeupProducts: ProductDatabase = {
  foundation: [
    {
      name: "True Complexion Foundation",
      brand: "Range Beauty",
      price: "$27",
      description: "Clean beauty foundation with botanical extracts suitable for all skin types",
      link: ""
    },
    {
      name: "Stick Foundation",
      brand: "The Lip Bar",
      price: "$25",
      description: "Creamy, buildable coverage foundation in diverse shades",
      link: ""
    }
  ],
  concealer: [
    {
      name: "Bright Fix Eye Brightener",
      brand: "Mented Cosmetics",
      price: "$22",
      description: "Creamy concealer that brightens and covers dark circles",
      link: ""
    },
    {
      name: "Skin Perfecting Concealer",
      brand: "Beauty Bakerie",
      price: "$20",
      description: "Long-wearing concealer with full coverage",
      link: ""
    }
  ],
  blush: [
    {
      name: "Light Work Cream Blush",
      brand: "Ami Colé",
      price: "$20",
      description: "Buildable cream blush for a natural flush",
      link: ""
    },
    {
      name: "Cheek to Cheek Blush",
      brand: "Danessa Myricks Beauty",
      price: "$20",
      description: "Versatile powder blush for all skin types",
      link: ""
    }
  ],
  bronzer: [
    {
      name: "Sun Goddess Bronzer",
      brand: "Juvia's Place",
      price: "$18",
      description: "Warm-toned bronzer for a sun-kissed glow",
      link: ""
    },
    {
      name: "Bronzing Balm",
      brand: "Ami Colé",
      price: "$22",
      description: "Cream bronzer for natural-looking warmth",
      link: ""
    }
  ],
  eyeshadow: [
    {
      name: "The Nubian Palette",
      brand: "Juvia's Place",
      price: "$20",
      description: "Highly pigmented neutral eyeshadow palette",
      link: ""
    },
    {
      name: "Lid Lustre",
      brand: "RÓEN",
      price: "$29",
      description: "Cream eyeshadow with multidimensional shimmer",
      link: ""
    }
  ],
  mascara: [
    {
      name: "Clean Lash Mascara",
      brand: "Āether Beauty",
      price: "$24",
      description: "Lengthening and volumizing clean mascara",
      link: ""
    },
    {
      name: "Major Length Mascara",
      brand: "The Lip Bar",
      price: "$12",
      description: "Lengthening mascara for dramatic lashes",
      link: ""
    }
  ],
  lipstick: [
    {
      name: "Matte Lipstick",
      brand: "Mented Cosmetics",
      price: "$18",
      description: "Hydrating matte lipstick in nude shades",
      link: ""
    },
    {
      name: "Lip Bar Liquid Matte",
      brand: "The Lip Bar",
      price: "$13",
      description: "Long-wearing liquid lipstick",
      link: ""
    }
  ],
  dry: [
    {
      name: "Hydrating Foundation",
      brand: "Range Beauty",
      price: "$27",
      description: "Clean beauty foundation with botanical extracts for dry skin types",
      link: ""
    },
    {
      name: "Cream Blush",
      brand: "Ami Colé",
      price: "$22",
      description: "Moisturizing cream blush that melts into skin for a natural flush",
      link: ""
    }
  ],
  oily: [
    {
      name: "Oil-Control Foundation",
      brand: "Mented Cosmetics",
      price: "$30",
      description: "Matte finish foundation perfect for oily skin types",
      link: ""
    },
    {
      name: "Setting Powder",
      brand: "Beauty Bakerie",
      price: "$24",
      description: "Oil-absorbing setting powder for a flawless finish",
      link: ""
    }
  ],
  sensitive: [
    {
      name: "Gentle Coverage Foundation",
      brand: "RÓEN",
      price: "$42",
      description: "Clean foundation formulated for sensitive skin",
      link: ""
    },
    {
      name: "Mineral Blush",
      brand: "Laws of Nature Cosmetics",
      price: "$24",
      description: "Pure mineral blush safe for sensitive skin",
      link: ""
    }
  ],
  combination: [
    {
      name: "Adaptive Foundation",
      brand: "Range Beauty",
      price: "$32",
      description: "Foundation that adapts to combination skin needs",
      link: ""
    },
    {
      name: "Dual-Finish Powder",
      brand: "Danessa Myricks Beauty",
      price: "$35",
      description: "Versatile powder that works for combination skin",
      link: ""
    }
  ],
  normal: [
    {
      name: "Everyday Foundation",
      brand: "The Lip Bar",
      price: "$28",
      description: "Perfect for normal skin types with balanced coverage",
      link: ""
    },
    {
      name: "Universal Blush",
      brand: "Ami Colé",
      price: "$22",
      description: "Suits all skin types with buildable color",
      link: ""
    }
  ]
};