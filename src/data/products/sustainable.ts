
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  images?: string[];
}

export const sustainableProducts: Product[] = [
  {
    id: "s1",
    title: "Clean Faced Cosmetics Mascara",
    description: "Zero waste mascara in glass packaging",
    price: "$24",
    category: "sustainable beauty",
    link: "https://cleanfacedcosmetics.com",
    images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=500&auto=format&fit=crop"]
  },
  {
    id: "s2",
    title: "Dew Mighty Bloom Jelly",
    description: "Waterless, plastic-free serum bar",
    price: "$48",
    category: "sustainable beauty",
    link: "https://dewmighty.com",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=500&auto=format&fit=crop"]
  },
  {
    id: "s3",
    title: "River Organics Lip Butter",
    description: "Plastic-free vegan lip color",
    price: "$18",
    category: "sustainable beauty",
    link: "https://riverorganics.com",
    images: ["https://images.unsplash.com/photo-1599307767391-6166ae7ad6e5?q=80&w=500&auto=format&fit=crop"]
  }
];
