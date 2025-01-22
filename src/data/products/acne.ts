interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
}

export const acneProducts: Product[] = [
  {
    id: "a1",
    title: "Tower 28 SOS Spray",
    description: "Acne-safe setting spray with hypochlorous acid",
    price: "$28",
    category: "products for acne",
    link: "https://tower28beauty.com/products/sos-daily-rescue-facial-spray"
  },
  {
    id: "psc4",
    title: "Dr. Jart+ BB Cream",
    description: "BB cream with centella asiatica",
    price: "$32",
    category: "products for acne",
    link: "https://www.drjart.com/product/29719/92640/bb-cream/premium-beauty-balm-spf-45"
  },
  {
    id: "psc5",
    title: "Innisfree No Sebum Powder",
    description: "Non-comedogenic mineral powder",
    price: "$24",
    category: "products for acne",
    link: "https://us.innisfree.com/products/no-sebum-mineral-powder"
  }
];