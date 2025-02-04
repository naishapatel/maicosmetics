interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
}

export const ecoFriendlyProducts: Product[] = [
  {
    id: "e1",
    title: "Aether Beauty Eyeshadow",
    description: "Zero-waste crystal-inspired palette",
    price: "$58",
    category: "eco-friendly beauty",
    link: "https://aetherbeautyco.com"
  },
  {
    id: "e2",
    title: "Axiology Balmies",
    description: "Zero-waste multi-use color crayon",
    price: "$14",
    category: "eco-friendly beauty",
    link: "https://axiologybeauty.com"
  },
  {
    id: "e3",
    title: "Meow Meow Tweet Powder",
    description: "Plastic-free setting powder",
    price: "$25",
    category: "eco-friendly beauty",
    link: "https://meowmeowtweet.com"
  }
];