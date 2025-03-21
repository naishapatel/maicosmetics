
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

export const ecoFriendlyProducts: Product[] = [
  {
    id: "e1",
    title: "Aether Beauty Eyeshadow Palette",
    description: "Zero-waste crystal-inspired palette",
    price: "$58",
    category: "eco-friendly beauty",
    link: "https://aetherbeautyco.com",
    url: "https://aetherbeautyco.com/collections/palettes",
    images: ["https://images.unsplash.com/photo-1599750760297-fa56e219bb7d?auto=format&fit=crop&w=800"]
  },
  {
    id: "e2",
    title: "Axiology Balmies",
    description: "Zero-waste multi-use color crayon",
    price: "$14",
    category: "eco-friendly beauty",
    link: "https://axiologybeauty.com",
    url: "https://axiologybeauty.com/collections/balmies",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800"]
  },
  {
    id: "e3",
    title: "Meow Meow Tweet Powder",
    description: "Plastic-free setting powder",
    price: "$25",
    category: "eco-friendly beauty",
    link: "https://meowmeowtweet.com",
    url: "https://meowmeowtweet.com/products/everyday-setting-powder",
    images: ["https://images.unsplash.com/photo-1596285508419-8faef7c8b9b7?auto=format&fit=crop&w=800"]
  }
];
