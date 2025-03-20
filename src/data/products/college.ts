
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
    images: ["https://cdn.shopify.com/s/files/1/0075/3195/0959/products/NUDE_grande.jpg"]
  },
  {
    id: "c2",
    title: "Tower 28 BeachPlease Blush",
    description: "Easy-to-use cream blush",
    price: "$22",
    category: "products for college kids",
    link: "https://tower28beauty.com",
    images: ["https://cdn.shopify.com/s/files/1/0034/9483/0049/products/tower-28-beachplease-lip-cheek-cream-blush-magic-hour-A_800x.jpg"]
  },
  {
    id: "c3",
    title: "Fat and the Moon Eye Coal",
    description: "Natural cream eyeshadow",
    price: "$20",
    category: "products for college kids",
    link: "https://www.fatandthemoon.com",
    images: ["https://images.squarespace-cdn.com/content/v1/55af7414e4b0936e656dd473/1634235772509-YGQZ6Z5O2HFWZVGPWA9P/Eye+Coal.jpg"]
  }
];
