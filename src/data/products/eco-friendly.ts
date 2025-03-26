
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  url?: string;
}

export const ecoFriendlyProducts: Product[] = [
  // Verified: Beauty Bakerie Eyeshadow Palette - URL points to specific product
  {
    id: "e1",
    title: "Beauty Bakerie Breakfast in Bed Eyeshadow Palette",
    description: "Vegan eyeshadow palette with vibrant colors",
    price: "$38",
    category: "eco-friendly beauty",
    link: "https://beautybakerie.com",
    url: "https://beautybakerie.com/products/breakfast-in-bed-eyeshadow-palette"
  },
  // Fixed: Axiology Balmies - URL now points to specific product
  {
    id: "e2",
    title: "Axiology Balmies",
    description: "Zero-waste multi-use color crayon",
    price: "$14",
    category: "eco-friendly beauty",
    link: "https://axiologybeauty.com",
    url: "https://axiologybeauty.com/collections/balmies/products/sangiovese"
  },
  // Fixed: Elate Cosmetics Pressed Cheek Color - URL now points to specific shade
  {
    id: "e3",
    title: "Elate Cosmetics Pressed Cheek Color",
    description: "Refillable powder blush",
    price: "$22",
    category: "eco-friendly beauty",
    link: "https://elatebeauty.com",
    url: "https://elatebeauty.com/collections/face-makeup/products/pressed-cheek-colour-brave"
  }
];
