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
    title: "Clean Faced Cosmetics Mascara",
    description: "Zero waste mascara in glass packaging",
    price: "$24",
    category: "sustainable beauty",
    link: "https://cleanfacedcosmetics.com/collections/eye-makeup/products/zero-waste-mascara"
  },
  {
    id: "s2",
    title: "Dew Mighty Bloom Jelly",
    description: "Waterless, plastic-free serum bar",
    price: "$48",
    category: "sustainable beauty",
    link: "https://dewmighty.com/products/bloom-jelly-serum-bar"
  },
  {
    id: "s3",
    title: "River Organics Lip Butter",
    description: "Plastic-free vegan lip color",
    price: "$18",
    category: "sustainable beauty",
    link: "https://riverorganics.com"
  }
];