
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  images?: string[];
}

export const sustainableProducts: Product[] = [
  {
    id: "s2",
    title: "Dew Mighty Bloom Jelly Bar",
    description: "Waterless, plastic-free serum bar",
    price: "$48",
    category: "sustainable beauty",
    link: "https://dewmighty.com",
    images: ["https://cdn.shopify.com/s/files/1/0554/7265/4785/products/blue-packaging_0b9cf1d4-cb79-4f78-b17d-3d11f1c1bb96_1024x1024.jpg"]
  },
  {
    id: "s3",
    title: "River Organics Lip Butter",
    description: "Plastic-free vegan lip color",
    price: "$18",
    category: "sustainable beauty",
    link: "https://riverorganics.com",
    images: ["https://cdn.shopify.com/s/files/1/0274/1751/2657/products/LipButtersNew-AllShades_5000x.jpg"]
  }
];
