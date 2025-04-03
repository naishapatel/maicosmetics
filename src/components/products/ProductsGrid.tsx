
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  url?: string;
}

interface ProductsGridProps {
  products: Product[];
}

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          link={product.link}
          url={product.url}
        />
      ))}
    </motion.div>
  );
};
