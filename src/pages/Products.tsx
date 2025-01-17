import { Navbar } from "@/components/Navbar";
import { ProductsHeader } from "@/components/products/ProductsHeader";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { useToast } from "@/components/ui/use-toast";

const Products = () => {
  const products = [
    {
      id: "1",
      title: "Natural Face Cream",
      description: "A gentle, nourishing cream made with organic ingredients.",
      price: "$29.99",
      image: "/placeholder.svg",
    },
    {
      id: "2",
      title: "Organic Lip Balm",
      description: "Moisturizing lip balm made with natural oils.",
      price: "$9.99",
      image: "/placeholder.svg",
    },
    {
      id: "3",
      title: "Herbal Face Mask",
      description: "Revitalizing face mask with herbal extracts.",
      price: "$19.99",
      image: "/placeholder.svg",
    },
    {
      id: "4",
      title: "Sustainable Makeup Brush Set",
      description: "Eco-friendly makeup brushes for a flawless application.",
      price: "$39.99",
      image: "/placeholder.svg",
    },
    {
      id: "5",
      title: "Natural Shampoo Bar",
      description: "Plastic-free shampoo bar for healthy hair.",
      price: "$14.99",
      image: "/placeholder.svg",
    },
    {
      id: "6",
      title: "Vegan Nail Polish",
      description: "Cruelty-free nail polish in vibrant colors.",
      price: "$12.99",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-mai-cream to-white">
      <Navbar />
      <ProductsHeader />
      <ProductsGrid products={products} />
    </div>
  );
};

export default Products;