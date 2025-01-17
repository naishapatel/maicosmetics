import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const businesses = [
  {
    name: "Pure Skin Co",
    location: "Portland, OR",
    description: "Family-owned business specializing in natural skincare products",
    specialty: "Sensitive skin care",
  },
  {
    name: "Natural Beauty",
    location: "Austin, TX",
    description: "Handcrafted vegan beauty products made in small batches",
    specialty: "Organic ingredients",
  },
  {
    name: "Eco Glow",
    location: "Seattle, WA",
    description: "Sustainable beauty brand focusing on environmental consciousness",
    specialty: "Zero-waste packaging",
  },
];

const Businesses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mai-cream to-mai-sage/20">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-mai-brown mb-4 relative inline-block">
            Small Business Partners
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-mai-coral/30"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover and support independent beauty brands that share our commitment to ethical and sustainable practices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business, index) => (
            <motion.div
              key={business.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border border-mai-sage/20">
                <CardHeader>
                  <CardTitle className="text-mai-brown relative inline-block">
                    {business.name}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-mai-coral/30"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                  </CardTitle>
                  <p className="text-sm text-gray-500">{business.location}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">{business.description}</p>
                  <span className="inline-block bg-mai-sage/30 px-4 py-1.5 rounded-full text-sm text-mai-brown font-medium transition-colors duration-300 hover:bg-mai-sage/50">
                    {business.specialty}
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

export default Businesses;