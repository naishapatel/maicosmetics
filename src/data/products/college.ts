interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
}

export const collegeProducts: Product[] = [
  {
    id: "c1",
    title: "e.l.f. Camo Concealer",
    description: "Full coverage concealer for all-nighters",
    price: "$7",
    category: "products for college kids",
    link: "https://www.elfcosmetics.com/camo-concealer/85881.html"
  },
  {
    id: "c4",
    title: "Essence Lash Princess",
    description: "Affordable cult-favorite mascara",
    price: "$5",
    category: "products for college kids",
    link: "https://essencemakeup.com/products/lash-princess-false-lash-effect-mascara"
  },
  {
    id: "eg3",
    title: "ColourPop Student Kit",
    description: "Essential makeup basics for students",
    price: "$45",
    category: "products for college kids",
    link: "https://colourpop.com/products/bare-necessities"
  }
];