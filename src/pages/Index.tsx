
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";
import { Sparkles, Leaf, Store } from "lucide-react";

const features = [
  {
    title: "Vegan Products",
    description: "All recommended products are 100% vegan and cruelty-free, ensuring ethical beauty choices.",
    icon: <Leaf className="w-8 h-8" />,
  },
  {
    title: "Small Business Focus",
    description: "Support independent brands that prioritize quality ingredients and personalized care.",
    icon: <Store className="w-8 h-8" />,
  },
  {
    title: "Personalized Care",
    description: "Get tailored recommendations based on your unique skin condition and preferences.",
    icon: <Sparkles className="w-8 h-8" />,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="py-32 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Why Choose <span className="text-mai-coral">mai.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              We understand that every skin is unique. Our recommendations are carefully curated to match your specific needs and preferences.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-mai-coral mb-6 bg-gray-50 p-4 rounded-2xl inline-block">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
