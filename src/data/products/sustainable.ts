
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  url?: string;
}

export const sustainableProducts: Product[] = [
  // Verified: Dew Mighty Bloom Jelly Bar - URL is valid and points to specific product
  {
    id: "s2",
    title: "Dew Mighty Bloom Jelly Bar",
    description: "Solid facial serum in plastic-free packaging",
    price: "$34",
    category: "sustainable beauty",
    link: "https://dewmighty.com",
    url: "https://dewmighty.com/products/bloom-jelly-serum-bar"
  }
  // Removed: River Organics Lip Butter
];
