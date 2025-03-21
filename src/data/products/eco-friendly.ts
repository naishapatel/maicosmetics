
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

export const ecoFriendlyProducts: Product[] = [
  // Verified: Beauty Bakerie Eyeshadow Palette (replacing Aether Beauty which was acquired)
  {
    id: "e1",
    title: "Beauty Bakerie Breakfast in Bed Eyeshadow Palette",
    description: "Vegan eyeshadow palette with vibrant colors",
    price: "$38",
    category: "eco-friendly beauty",
    link: "https://beautybakerie.com",
    url: "https://beautybakerie.com/products/breakfast-in-bed-eyeshadow-palette",
    images: ["https://images.unsplash.com/photo-1599750760297-fa56e219bb7d?auto=format&fit=crop&w=800"]
  },
  // Verified: Axiology Balmies - URL is valid and working
  {
    id: "e2",
    title: "Axiology Balmies",
    description: "Zero-waste multi-use color crayon",
    price: "$14",
    category: "eco-friendly beauty",
    link: "https://axiologybeauty.com",
    url: "https://axiologybeauty.com/collections/balmies",
    images: ["https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800"]
  },
  // Verified: Elate Cosmetics Pressed Cheek Color - URL is working
  {
    id: "e3",
    title: "Elate Cosmetics Pressed Cheek Color",
    description: "Refillable powder blush",
    price: "$22",
    category: "eco-friendly beauty",
    link: "https://elatebeauty.com",
    url: "https://elatebeauty.com/collections/face-makeup/products/pressed-cheek-colour",
    images: ["https://images.unsplash.com/photo-1560910615-9eaa2e704e63?auto=format&fit=crop&w=800"]
  }
];
