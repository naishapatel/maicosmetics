
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
  // Fixed: Fat and the Moon Lip & Cheek Stain - URL now points to specific product
  {
    id: "v1",
    title: "Fat and the Moon Lip & Cheek Stain",
    description: "All-natural lip and cheek tint",
    price: "$20",
    category: "vegan beauty",
    link: "https://www.fatandthemoon.com",
    url: "https://www.fatandthemoon.com/collections/cosmetics/products/lip-cheek-stain",
    images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800"]
  },
  // Fixed: Fat and the Moon Eye Coal - URL now points to specific product
  {
    id: "v2",
    title: "Fat and the Moon Eye Coal",
    description: "Organic eye liner in sustainable packaging",
    price: "$18",
    category: "vegan beauty",
    link: "https://www.fatandthemoon.com",
    url: "https://www.fatandthemoon.com/collections/cosmetics/products/eye-coal",
    images: ["https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800"]
  }
];
