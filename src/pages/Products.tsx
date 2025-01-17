import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const products = {
  vegan: [
    {
      name: "Gentle Cleansing Balm",
      brand: "Pure Skin Co",
      price: "$24.99",
      description: "100% vegan cleansing balm with natural ingredients",
      category: "Cleanser",
    },
    {
      name: "Plant-Based Face Cream",
      brand: "Eco Glow",
      price: "$32.99",
      description: "Vegan moisturizer made with organic botanicals",
      category: "Moisturizer",
    },
  ],
  crueltyFree: [
    {
      name: "Hydrating Face Cream",
      brand: "Natural Beauty",
      price: "$29.99",
      description: "Never tested on animals, perfect for dry skin",
      category: "Moisturizer",
    },
    {
      name: "Rose Water Toner",
      brand: "Beauty Ethics",
      price: "$19.99",
      description: "Cruelty-free toner with organic rose water",
      category: "Toner",
    },
  ],
  sustainable: [
    {
      name: "Zero Waste Face Wash",
      brand: "Earth First Beauty",
      price: "$23.99",
      description: "Plastic-free packaging, biodegradable formula",
      category: "Cleanser",
    },
    {
      name: "Refillable Serum",
      brand: "Eco Glow",
      price: "$39.99",
      description: "Sustainable packaging with refill options",
      category: "Serum",
    },
  ],
};

const ProductSection = ({ title, items }: { title: string; items: typeof products.vegan }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="mb-12"
  >
    <h2 className="text-2xl font-semibold text-mai-brown mb-6 relative inline-block">
      <span className="relative z-10">{title}</span>
      <motion.div
        className="absolute -bottom-1 left-0 w-full h-1 bg-mai-coral/30"
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {items.map((product, index) => (
        <motion.div
          key={product.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Card className="h-full bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border border-mai-sage/20">
            <CardHeader>
              <CardTitle className="text-mai-brown">{product.name}</CardTitle>
              <p className="text-sm text-gray-500">{product.brand}</p>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-mai-coral mb-2">{product.price}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <span className="inline-block bg-mai-sage/30 px-4 py-1.5 rounded-full text-sm text-mai-brown font-medium transition-colors duration-300 hover:bg-mai-sage/50">
                {product.category}
              </span>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mai-cream to-mai-rose/20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-mai-brown mb-4 relative inline-block">
            Curated Product Spotlight
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-mai-coral/30"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Supporting small businesses with ethical, sustainable beauty products that align with your values
          </p>
        </motion.div>

        <ProductSection title="Vegan Beauty" items={products.vegan} />
        <ProductSection title="Cruelty-Free Products" items={products.crueltyFree} />
        <ProductSection title="Sustainable & Eco-Friendly" items={products.sustainable} />
      </div>
    </div>
  );
};

export default Products;