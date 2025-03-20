
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
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
    images: ["https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=500&auto=format&fit=crop"]
  },
  {
    id: "c2",
    title: "Tower 28 BeachPlease",
    description: "Easy-to-use cream blush",
    price: "$22",
    category: "products for college kids",
    link: "https://tower28beauty.com",
    images: ["https://images.unsplash.com/photo-1596704017254-9a02606a858d?q=80&w=500&auto=format&fit=crop"]
  },
  {
    id: "c3",
    title: "Fat and the Moon Eye Coal",
    description: "Natural cream eyeshadow",
    price: "$20",
    category: "products for college kids",
    link: "https://www.fatandthemoon.com",
    images: ["https://images.unsplash.com/photo-1512207519167-96672a42ce85?q=80&w=500&auto=format&fit=crop"]
  }
];
