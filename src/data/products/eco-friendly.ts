
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  images?: string[];
}

export const ecoFriendlyProducts: Product[] = [
  {
    id: "e1",
    title: "Aether Beauty Eyeshadow",
    description: "Zero-waste crystal-inspired palette",
    price: "$58",
    category: "eco-friendly beauty",
    link: "https://aetherbeautyco.com",
    images: ["https://images.unsplash.com/photo-1616683693504-d5a44561f1dc?q=80&w=500&auto=format&fit=crop"]
  },
  {
    id: "e2",
    title: "Axiology Balmies",
    description: "Zero-waste multi-use color crayon",
    price: "$14",
    category: "eco-friendly beauty",
    link: "https://axiologybeauty.com",
    images: ["https://images.unsplash.com/photo-1599733594230-6b823268757a?q=80&w=500&auto=format&fit=crop"]
  },
  {
    id: "e3",
    title: "Meow Meow Tweet Powder",
    description: "Plastic-free setting powder",
    price: "$25",
    category: "eco-friendly beauty",
    link: "https://meowmeowtweet.com",
    images: ["https://images.unsplash.com/photo-1631215583473-4711e4b4b012?q=80&w=500&auto=format&fit=crop"]
  }
];
