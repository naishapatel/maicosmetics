
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
    images: ["https://images.squarespace-cdn.com/content/v1/55af7414e4b0936e656dd473/1628021532159-78I0RVNVZ7GUOP34BFHH/94343E9A-C0A5-40FA-9A2E-9BE2B91AC6F0.jpeg"]
  },
  {
    id: "v3",
    title: "River Organics Bronzing Balm",
    description: "Zero-waste vegan bronzing balm",
    price: "$32",
    category: "vegan beauty",
    link: "https://riverorganics.com",
    url: "https://riverorganics.com/collections/bronzing-balm",
    images: ["https://cdn.shopify.com/s/files/1/0274/1751/2657/products/BronzerBalm_1_1800x1800.jpg"]
  }
];
