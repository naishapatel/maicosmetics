
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  images?: string[];
}

export const veganProducts: Product[] = [
  {
    id: "v1",
    title: "Fat and the Moon Stain",
    description: "All-natural lip and cheek tint",
    price: "$20",
    category: "vegan beauty",
    link: "https://www.fatandthemoon.com",
    images: ["https://images.unsplash.com/photo-1615236220496-9d35584f91dc?q=80&w=500&auto=format&fit=crop"]
  },
  {
    id: "v2",
    title: "HABIT Cream Blush",
    description: "Clean, vegan cream blush",
    price: "$24",
    category: "vegan beauty",
    link: "https://habitcosmetics.com",
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=500&auto=format&fit=crop"]
  },
  {
    id: "v3",
    title: "River Organics Bronzer",
    description: "Zero-waste bronzing balm",
    price: "$32",
    category: "vegan beauty",
    link: "https://riverorganics.com",
    images: ["https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=500&auto=format&fit=crop"]
  }
];
