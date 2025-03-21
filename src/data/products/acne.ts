
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
  // Verified Tower 28 SOS Daily Rescue Spray - URL is valid
  {
    id: "a1",
    title: "Tower 28 SOS Daily Rescue Spray",
    description: "Hypochlorous acid spray for acne-prone skin",
    price: "$28",
    category: "products for acne",
    link: "https://tower28beauty.com",
    url: "https://tower28beauty.com/products/sos-daily-rescue-facial-spray",
    images: ["https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800"]
  },
  // Verified Cocokind Turmeric Spot Treatment - URL is valid
  {
    id: "a2",
    title: "Cocokind Turmeric Spot Treatment",
    description: "Natural spot treatment for blemishes",
    price: "$9",
    category: "products for acne",
    link: "https://www.cocokind.com",
    url: "https://www.cocokind.com/products/turmeric-spot-treatment",
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800"]
  }
];
