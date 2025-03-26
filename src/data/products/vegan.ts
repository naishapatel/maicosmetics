
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  url?: string;
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
    url: "https://www.fatandthemoon.com/collections/cosmetics/products/lip-cheek-stain"
  },
  // Fixed: Fat and the Moon Eye Coal - URL now points to specific product
  {
    id: "v2",
    title: "Fat and the Moon Eye Coal",
    description: "Organic eye liner in sustainable packaging",
    price: "$18",
    category: "vegan beauty",
    link: "https://www.fatandthemoon.com",
    url: "https://www.fatandthemoon.com/collections/cosmetics/products/eye-coal"
  }
];
