
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  images?: string[];
}

export const acneProducts: Product[] = [
  {
    id: "a1",
    title: "Tower 28 SOS Daily Rescue Spray",
    description: "Hypochlorous acid spray for acne-prone skin",
    price: "$28",
    category: "products for acne",
    link: "https://tower28beauty.com",
    images: ["https://cdn.shopify.com/s/files/1/0034/9483/0049/products/tower-28-sos-daily-rescue-facial-spray-1oz-B_800x.jpg"]
  },
  {
    id: "a3",
    title: "Common Heir Vitamin C Serum",
    description: "Plastic-free vitamin C serum",
    price: "$38",
    category: "products for acne",
    link: "https://commonheir.com",
    images: ["https://cdn.shopify.com/s/files/1/0366/0633/8377/products/IMG_9367_1024x1024@2x.jpg"]
  }
];
