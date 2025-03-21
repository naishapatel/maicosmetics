interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  url?: string;
  images?: string[];
}

export const acneProducts: Product[] = [
  {
    id: "a1",
    title: "Tower 28 SOS Daily Rescue Spray",
    description: "Hypochlorous acid spray for acne-prone skin",
    price: "$28",
    category: "products for acne",
    link: "https://tower28beauty.com",
    url: "https://tower28beauty.com/products/sos-daily-rescue-facial-spray",
    images: ["https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800"]
  }
];
