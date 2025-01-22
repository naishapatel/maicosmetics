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
    title: "Cover FX Mascara",
    description: "100% vegan volumizing mascara",
    price: "$24",
    category: "vegan beauty",
    link: "https://www.coverfx.com/products/power-flex-mascara"
  },
  {
    id: "v2",
    title: "Milk Makeup Lip Stain",
    description: "Vegan lip and cheek stain",
    price: "$26",
    category: "vegan beauty",
    link: "https://www.milkmakeup.com/products/bionic-liquid-blush"
  },
  {
    id: "nb1",
    title: "KVD Beauty Liquid Lipstick",
    description: "Long-lasting vegan liquid lip color",
    price: "$24",
    category: "vegan beauty",
    link: "https://kvdveganbeauty.com/products/everlasting-liquid-lipstick"
  }
];