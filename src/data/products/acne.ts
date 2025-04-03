
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
  // Removed: Tower 28 SOS Daily Rescue Spray
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
