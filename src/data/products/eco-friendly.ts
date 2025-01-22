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
    title: "RMS Beauty Lip2Cheek",
    description: "Multi-use color in glass packaging",
    price: "$36",
    category: "eco-friendly beauty",
    link: "https://www.rmsbeauty.com/products/lip2cheek"
  },
  {
    id: "e2",
    title: "Aether Beauty Eyeshadow",
    description: "Zero-waste eyeshadow palette",
    price: "$42",
    category: "eco-friendly beauty",
    link: "https://aetherbeautyco.com/collections/palettes"
  },
  {
    id: "nb6",
    title: "Clean Faced Cosmetics Mascara",
    description: "Zero waste mascara in glass tube",
    price: "$26",
    category: "eco-friendly beauty",
    link: "https://cleanfacedcosmetics.com/collections/eye-makeup/products/zero-waste-mascara"
  }
];