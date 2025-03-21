
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
  {
    id: "c3",
    title: "Fat and the Moon Eye Coal",
    description: "Natural cream eyeshadow",
    price: "$20",
    category: "products for college kids",
    link: "https://www.fatandthemoon.com",
    url: "https://www.fatandthemoon.com/products/eye-coal",
    images: ["https://images.unsplash.com/photo-1631730359585-950f8c3f933d?auto=format&fit=crop&w=800"]
  }
];
