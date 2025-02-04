interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
}

export const acneProducts: Product[] = [
  {
    id: "a1",
    title: "Tower 28 SOS Spray",
    description: "Hypochlorous acid spray for acne-prone skin",
    price: "$28",
    category: "products for acne",
    link: "https://tower28beauty.com"
  },
  {
    id: "a2",
    title: "Clean Faced Minerals",
    description: "Non-comedogenic mineral foundation",
    price: "$28",
    category: "products for acne",
    link: "https://cleanfacedcosmetics.com"
  },
  {
    id: "a3",
    title: "Common Heir Vitamin C",
    description: "Plastic-free vitamin C serum",
    price: "$38",
    category: "products for acne",
    link: "https://commonheir.com"
  }
];