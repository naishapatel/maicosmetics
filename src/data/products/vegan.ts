interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
}

export const veganProducts: Product[] = [
  {
    id: "v1",
    title: "Fat and the Moon Stain",
    description: "All-natural lip and cheek tint",
    price: "$20",
    category: "vegan beauty",
    link: "https://www.fatandthemoon.com/products/lip-cheek-stain"
  },
  {
    id: "v2",
    title: "HABIT Cream Blush",
    description: "Clean, vegan cream blush",
    price: "$24",
    category: "vegan beauty",
    link: "https://habitcosmetics.com"
  },
  {
    id: "nb1",
    title: "River Organics Bronzer",
    description: "Zero-waste bronzing balm",
    price: "$32",
    category: "vegan beauty",
    link: "https://riverorganics.com"
  }
];