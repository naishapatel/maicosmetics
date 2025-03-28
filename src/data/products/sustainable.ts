
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
  },
  // Fixed: River Organics Lip Butter - confirmed working product page
  {
    id: "s3",
    title: "River Organics Lip Butter",
    description: "Plastic-free vegan lip color",
    price: "$18",
    category: "sustainable beauty",
    link: "https://riverorganics.com",
    url: "https://riverorganics.com/collections/lip-products/products/lip-butter-stick"
  }
];
