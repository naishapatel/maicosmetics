
import { motion } from "framer-motion";
import { Heart, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-6 h-6 text-mai-mauve" />,
    title: "Personalized Care",
    description: "Tailored recommendations for your unique skin"
  },
  {
    icon: <Shield className="w-6 h-6 text-mai-mauve" />,
    title: "Ethical Choices",
    description: "Cruelty-free and sustainable products"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-mai-mauve" />,
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          whileHover={{ y: -5 }}
          className="relative group cursor-pointer"
        >
          <motion.div
            className="glass-card p-8 transition-all duration-300 border border-white/20 backdrop-blur-md relative z-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-mai-rose/30 to-mai-mauve/20 rounded-xl flex items-center justify-center mb-6 mx-auto transition-transform duration-300"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>
            </motion.div>
            <motion.h3
              className="text-lg font-semibold text-mai-brown mb-3"
              whileHover={{ scale: 1.05 }}
            >
              {feature.title}
            </motion.h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-mai-sage/20 to-mai-mauve/20 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
