
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

export const veganProducts: Product[] = [
  {
    id: "v1",
    title: "Fat and the Moon Lip & Cheek Stain",
    description: "All-natural lip and cheek tint",
    price: "$20",
    category: "vegan beauty",
    link: "https://www.fatandthemoon.com",
    url: "https://www.fatandthemoon.com/products/lip-cheek-stain",
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800"]
  },
  {
    id: "v3",
    title: "River Organics Bronzing Balm",
    description: "Zero-waste vegan bronzing balm",
    price: "$32",
    category: "vegan beauty",
    link: "https://riverorganics.com",
    url: "https://riverorganics.com/collections/bronzing-balm",
    images: ["https://images.unsplash.com/photo-1571646034647-67f0e4a64299?auto=format&fit=crop&w=800"]
  }
];
