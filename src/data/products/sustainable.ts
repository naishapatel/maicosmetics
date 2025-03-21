
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

export const sustainableProducts: Product[] = [
  // Verified: Dew Mighty Bloom Jelly Bar - URL is valid
  {
    id: "s2",
    title: "Dew Mighty Bloom Jelly Bar",
    description: "Solid facial serum in plastic-free packaging",
    price: "$34",
    category: "sustainable beauty",
    link: "https://dewmighty.com",
    url: "https://dewmighty.com/products/bloom-jelly-serum-bar",
    images: ["https://images.unsplash.com/photo-1566958769312-82cef41d19ef?auto=format&fit=crop&w=800"]
  },
  // Verified: Updated River Organics Lip Butter - fixed URL that was previously redirecting to a wine website
  {
    id: "s3",
    title: "River Organics Lip Butter",
    description: "Plastic-free vegan lip color",
    price: "$18",
    category: "sustainable beauty",
    link: "https://riverorganics.com",
    url: "https://riverorganics.com/products/lip-butter",
    images: ["https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4?auto=format&fit=crop&w=800"]
  }
];
