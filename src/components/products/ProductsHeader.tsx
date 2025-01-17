import { motion } from "framer-motion";

export const ProductsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 bg-gradient-to-b from-mai-cream to-white"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-mai-brown mb-4">
        Discover Ethical Beauty
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto px-4">
        Explore our curated collection of sustainable and cruelty-free beauty products
        that care for your skin and the planet.
      </p>
    </motion.div>
  );
};