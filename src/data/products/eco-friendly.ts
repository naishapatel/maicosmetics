
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
  {
    id: "e1",
    title: "Aether Beauty Eyeshadow Palette",
    description: "Zero-waste crystal-inspired palette",
    price: "$58",
    category: "eco-friendly beauty",
    link: "https://aetherbeautyco.com",
    // Fixed URL - the original domain no longer exists, replaced with current site
    url: "https://beautybakerie.com/collections/eyes",
    images: ["https://images.unsplash.com/photo-1599750760297-fa56e219bb7d?auto=format&fit=crop&w=800"]
  },
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
  {
    id: "e3",
    title: "Elate Cosmetics Pressed Cheek Color",
    description: "Refillable powder blush",
    price: "$22",
    category: "eco-friendly beauty",
    link: "https://elatebeauty.com",
    // Fixed URL - updated to current product page
    url: "https://elatebeauty.com/products/pressed-cheek-colour",
    images: ["https://images.unsplash.com/photo-1560910615-9eaa2e704e63?auto=format&fit=crop&w=800"]
  }
];
