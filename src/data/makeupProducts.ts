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
      description: "Clean beauty foundation with botanical extracts suitable for all skin types. Provides medium coverage with a natural finish.",
      link: ""
    },
    {
      name: "Stick Foundation",
      brand: "The Lip Bar",
      price: "$25",
      description: "Creamy, buildable coverage foundation in diverse shades. Perfect for those seeking maximum coverage with a matte finish.",
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
  matte: [
    {
      name: "Matte Perfection Foundation",
      brand: "The Lip Bar",
      price: "$28",
      description: "Long-wearing matte foundation perfect for oily skin types",
      link: ""
    },
    {
      name: "Velvet Matte Foundation",
      brand: "Mented Cosmetics",
      price: "$30",
      description: "Soft-matte finish with medium to full coverage",
      link: ""
    }
  ],
  dewy: [
    {
      name: "Luminous Dewy Foundation",
      brand: "Range Beauty",
      price: "$32",
      description: "Hydrating foundation with a radiant, dewy finish",
      link: ""
    },
    {
      name: "Glow Serum Foundation",
      brand: "RÓEN",
      price: "$42",
      description: "Lightweight foundation that creates a natural, dewy glow",
      link: ""
    }
  ],
  natural: [
    {
      name: "Second Skin Foundation",
      brand: "Ami Colé",
      price: "$32",
      description: "Skin-like finish with buildable coverage",
      link: ""
    },
    {
      name: "Everyday Foundation",
      brand: "Laws of Nature Cosmetics",
      price: "$28",
      description: "Natural-looking coverage that lets skin shine through",
      link: ""
    }
  ],
  minimal: [
    {
      name: "Tinted Moisturizer",
      brand: "Range Beauty",
      price: "$24",
      description: "Sheer coverage for a barely-there look",
      link: ""
    }
  ],
  light: [
    {
      name: "Light Coverage Foundation",
      brand: "Ami Colé",
      price: "$28",
      description: "Lightweight formula for everyday wear",
      link: ""
    }
  ],
  medium: [
    {
      name: "Buildable Coverage Foundation",
      brand: "Mented Cosmetics",
      price: "$30",
      description: "Medium coverage that can be built up where needed",
      link: ""
    }
  ],
  maximum: [
    {
      name: "Full Coverage Foundation",
      brand: "The Lip Bar",
      price: "$32",
      description: "Maximum coverage for complete complexion perfection",
      link: ""
    }
  ]
};
