interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
}

export const sustainableProducts: Product[] = [
  {
    id: "s1",
    title: "Kjaer Weis Foundation",
    description: "Certified organic cream foundation in refillable case",
    price: "$32",
    category: "sustainable beauty",
    link: "https://kjaerweis.com/products/cream-foundation"
  },
  {
    id: "s2",
    title: "Elate Mascara",
    description: "Bamboo packaged natural mascara",
    price: "$24",
    category: "sustainable beauty",
    link: "https://elatebeauty.com/collections/eyes/products/essential-mascara"
  },
  {
    id: "s3",
    title: "La Bouche Rouge Lipstick",
    description: "Luxury refillable leather case lipstick",
    price: "$28",
    category: "sustainable beauty",
    link: "https://www.laboucherougeparis.com/en-us/products/le-rouge-refill"
  }
];