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
    <div className="min-h-screen bg-mai-cream">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-mai-brown mb-4">Small Business Partners</h1>
          <p className="text-gray-600">Supporting independent beauty brands that share our values</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {businesses.map((business) => (
            <motion.div
              key={business.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-mai-brown">{business.name}</CardTitle>
                  <p className="text-sm text-gray-500">{business.location}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{business.description}</p>
                  <span className="inline-block bg-mai-sage px-3 py-1 rounded-full text-sm text-mai-brown">
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