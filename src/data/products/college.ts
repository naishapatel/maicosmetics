
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  url?: string;
}

export const collegeProducts: Product[] = [
  // Fixed: Axiology Balmies Set - URL now points to specific product
  {
    id: "c1",
    title: "Axiology Balmies Set",
    description: "Multi-use color sticks for quick application",
    price: "$32",
    category: "products for college kids",
    link: "https://axiologybeauty.com",
    url: "https://axiologybeauty.com/collections/sets/products/naked-neutrals"
  },
  // Removed: Tower 28 BeachPlease Blush
  // Verified: Kinship Supermelt Oil Cleanser - URL is valid and points to specific product
  {
    id: "c3",
    title: "Kinship Supermelt Oil Cleanser",
    description: "Gentle makeup-removing cleanser",
    price: "$26",
    category: "products for college kids",
    link: "https://www.lovekinship.com",
    url: "https://www.lovekinship.com/products/supermelt-vegan-jelly-oil-cleanser"
  }
];
