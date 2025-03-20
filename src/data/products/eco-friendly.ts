
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
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
    images: ["https://cdn.shopify.com/s/files/1/0346/1304/8976/products/AETHER_AmethystCrystalGemmPalette_Closed_1024x1024.jpg"]
  },
  {
    id: "e2",
    title: "Axiology Balmies",
    description: "Zero-waste multi-use color crayon",
    price: "$14",
    category: "eco-friendly beauty",
    link: "https://axiologybeauty.com",
    images: ["https://cdn.shopify.com/s/files/1/0075/3195/0959/products/Balmies-Image-HeroHPSlider-Desktop-3000x2250-02_1024x1024.jpg"]
  },
  {
    id: "e3",
    title: "Meow Meow Tweet Powder",
    description: "Plastic-free setting powder",
    price: "$25",
    category: "eco-friendly beauty",
    link: "https://meowmeowtweet.com",
    images: ["https://cdn.shopify.com/s/files/1/0214/5422/4550/products/SettingPowder_Lifestyle-1_3000x.jpg"]
  }
];
