
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  url?: string;
}

export const acneProducts: Product[] = [
  // Verified: Tower 28 SOS Daily Rescue Spray - URL is valid and points to specific product
  {
    id: "a1",
    title: "Tower 28 SOS Daily Rescue Spray",
    description: "Hypochlorous acid spray for acne-prone skin",
    price: "$28",
    category: "products for acne",
    link: "https://tower28beauty.com",
    url: "https://tower28beauty.com/products/sos-daily-rescue-facial-spray"
  },
  // Verified: Cocokind Turmeric Spot Treatment - URL is valid and points to specific product
  {
    id: "a2",
    title: "Cocokind Turmeric Spot Treatment",
    description: "Natural spot treatment for blemishes",
    price: "$9",
    category: "products for acne",
    link: "https://www.cocokind.com",
    url: "https://www.cocokind.com/products/turmeric-spot-treatment"
  }
];
