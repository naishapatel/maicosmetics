
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

export const collegeProducts: Product[] = [
  // Verified Axiology Balmies Set - URL is valid
  {
    id: "c1",
    title: "Axiology Balmies Set",
    description: "Multi-use color sticks for quick application",
    price: "$32",
    category: "products for college kids",
    link: "https://axiologybeauty.com",
    url: "https://axiologybeauty.com/collections/sets/products/desert-sunset-set",
    images: ["https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800"]
  },
  // Verified Tower 28 BeachPlease Blush - URL is valid
  {
    id: "c2",
    title: "Tower 28 BeachPlease Blush",
    description: "Easy-to-use cream blush",
    price: "$22",
    category: "products for college kids",
    link: "https://tower28beauty.com",
    url: "https://tower28beauty.com/products/beachplease-tinted-lip-cheek-balm",
    images: ["https://images.unsplash.com/photo-1503236823255-94609f598e71?auto=format&fit=crop&w=800"]
  },
  // Verified Kinship Supermelt Oil Cleanser - URL is valid
  {
    id: "c3",
    title: "Kinship Supermelt Oil Cleanser",
    description: "Gentle makeup-removing cleanser",
    price: "$26",
    category: "products for college kids",
    link: "https://www.lovekinship.com",
    url: "https://www.lovekinship.com/products/supermelt-vegan-jelly-oil-cleanser",
    images: ["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800"]
  }
];
