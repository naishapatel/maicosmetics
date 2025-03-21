
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
  // Dew Mighty Bloom Jelly Bar remains removed - I verified the URL and product no longer exists
  {
    id: "s3",
    title: "River Organics Lip Butter",
    description: "Plastic-free vegan lip color",
    price: "$18",
    category: "sustainable beauty",
    link: "https://riverorganics.com",
    url: "https://riverorganics.com/collections/lip-butter",
    images: ["https://images.unsplash.com/photo-1594125311687-3b1b3eafa9f4?auto=format&fit=crop&w=800"]
  }
];
