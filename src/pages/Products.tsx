import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    name: "Gentle Cleansing Balm",
    brand: "Pure Skin Co",
    price: "$24.99",
    description: "A gentle, vegan cleansing balm perfect for sensitive skin",
    category: "Cleanser",
  },
  {
    name: "Hydrating Face Cream",
    brand: "Natural Beauty",
    price: "$29.99",
    description: "Rich moisturizer with natural ingredients for dry skin",
    category: "Moisturizer",
  },
  {
    name: "Soothing Serum",
    brand: "Eco Glow",
    price: "$34.99",
    description: "Calming serum with plant extracts for sensitive skin",
    category: "Serum",
  },
];

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
          <h1 className="text-3xl font-bold text-mai-brown mb-4">Our Curated Products</h1>
          <p className="text-gray-600">Carefully selected vegan products for your skin needs</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
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
      </div>
    </div>
  );
};

export default Products;