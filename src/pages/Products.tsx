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
    <h2 className="text-2xl font-semibold text-mai-brown mb-6">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {items.map((product) => (
        <motion.div
          key={product.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-mai-brown">{product.name}</CardTitle>
              <p className="text-sm text-gray-500">{product.brand}</p>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-mai-coral mb-2">{product.price}</p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <span className="inline-block bg-mai-sage px-3 py-1 rounded-full text-sm text-mai-brown">
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
    <div className="min-h-screen bg-mai-cream">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-mai-brown mb-4">Curated Product Spotlight</h1>
          <p className="text-gray-600">Supporting small businesses with ethical, sustainable beauty products</p>
        </motion.div>

        <ProductSection title="Vegan Beauty" items={products.vegan} />
        <ProductSection title="Cruelty-Free Products" items={products.crueltyFree} />
        <ProductSection title="Sustainable & Eco-Friendly" items={products.sustainable} />
      </div>
    </div>
  );
};

export default Products;