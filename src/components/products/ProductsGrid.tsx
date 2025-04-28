
import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

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
          key={product.id || Math.random().toString()}
          id={product.id}
          title={product.title}
          name={product.name}
          product_name={product.product_name}
          description={product.description || ""}
          price={product.price}
          link={product.link}
          url={product.url}
          link_status={product.link_status}
          alternative_product_id={product.alternative_product_id}
        />
      ))}
    </motion.div>
  );
};
