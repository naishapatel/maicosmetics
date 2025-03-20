
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  images?: string[];
}

export const acneProducts: Product[] = [
  {
    id: "a1",
    title: "Tower 28 SOS Spray",
    description: "Hypochlorous acid spray for acne-prone skin",
    price: "$28",
    category: "products for acne",
    link: "https://tower28beauty.com",
    images: ["https://images.unsplash.com/photo-1624453112345-d1a44208fbae?q=80&w=500&auto=format&fit=crop"]
  },
  {
    id: "a2",
    title: "Clean Faced Minerals",
    description: "Non-comedogenic mineral foundation",
    price: "$28",
    category: "products for acne",
    link: "https://cleanfacedcosmetics.com",
    images: ["https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?q=80&w=500&auto=format&fit=crop"]
  },
  {
    id: "a3",
    title: "Common Heir Vitamin C",
    description: "Plastic-free vitamin C serum",
    price: "$38",
    category: "products for acne",
    link: "https://commonheir.com",
    images: ["https://images.unsplash.com/photo-1562887250-9a52d844ad30?q=80&w=500&auto=format&fit=crop"]
  }
];
