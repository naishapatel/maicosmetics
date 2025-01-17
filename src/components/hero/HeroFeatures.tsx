import { motion } from "framer-motion";
import { Heart, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-6 h-6 text-mai-coral" />,
    title: "Personalized Care",
    description: "Tailored recommendations for your unique skin"
  },
  {
    icon: <Shield className="w-6 h-6 text-mai-coral" />,
    title: "Ethical Choices",
    description: "Cruelty-free and sustainable products"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-mai-coral" />,
    title: "Small Business",
    description: "Support independent ethical brands"
  }
];

export const HeroFeatures = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -5 }}
          className="glass-card p-6 hover:shadow-2xl transition-all duration-300"
        >
          <div className="w-12 h-12 bg-mai-rose/20 rounded-full flex items-center justify-center mb-4 mx-auto">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold text-mai-brown mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600">
            {feature.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};