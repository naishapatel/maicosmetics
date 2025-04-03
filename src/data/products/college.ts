interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  url?: string;
}

export const collegeProducts: Product[] = [
  {
    id: "c3",
    title: "Kinship Supermelt Oil Cleanser",
    description: "Gentle makeup-removing cleanser",
    price: "$26",
    category: "products for college kids",
    link: "https://www.lovekinship.com",
    url: "https://www.lovekinship.com/products/supermelt-vegan-jelly-oil-cleanser"
  }
];
