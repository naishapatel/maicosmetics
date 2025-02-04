interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
}

export const collegeProducts: Product[] = [
  {
    id: "c1",
    title: "Axiology Balmies Set",
    description: "Multi-use color sticks for quick application",
    price: "$32",
    category: "products for college kids",
    link: "https://axiologybeauty.com"
  },
  {
    id: "c2",
    title: "Tower 28 BeachPlease",
    description: "Easy-to-use cream blush",
    price: "$22",
    category: "products for college kids",
    link: "https://tower28beauty.com"
  },
  {
    id: "c3",
    title: "Fat and the Moon Eye Coal",
    description: "Natural cream eyeshadow",
    price: "$20",
    category: "products for college kids",
    link: "https://www.fatandthemoon.com"
  }
];