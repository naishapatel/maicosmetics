import { ProductRecommendation } from "@/types/quiz";

interface ProductDatabase {
  [key: string]: ProductRecommendation[];
}

export const makeupProducts: ProductDatabase = {
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
  natural: [
    {
      name: "Clean Mascara",
      brand: "Āether Beauty",
      price: "$28",
      description: "100% natural mascara for defined, lengthened lashes",
      link: ""
    },
    {
      name: "Organic Lip Tint",
      brand: "Plain Jane Beauty",
      price: "$18",
      description: "Natural lip tint made with organic ingredients",
      link: ""
    }
  ],
  coverage: [
    {
      name: "Full Coverage Foundation",
      brand: "The Lip Bar",
      price: "$32",
      description: "Buildable, full-coverage foundation for flawless skin",
      link: ""
    },
    {
      name: "Color Corrector Palette",
      brand: "Juvia's Place",
      price: "$25",
      description: "Professional color correcting palette for all skin concerns",
      link: ""
    }
  ]
};