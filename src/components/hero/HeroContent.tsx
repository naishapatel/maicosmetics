import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-6 py-2 mb-8 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-mai-sage"
      >
        <Sparkles className="w-4 h-4 text-mai-coral" />
        <span className="text-sm font-medium text-mai-brown">
          Discover your perfect makeup match
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl sm:text-7xl font-bold text-mai-brown mb-8 tracking-tight"
      >
        Beauty that cares
        <span className="block text-mai-coral">for your skin</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-2xl mx-auto text-lg text-gray-600 mb-12 leading-relaxed"
      >
        Discover makeup recommendations tailored to your unique skin conditions. 
        Supporting small businesses that align with your ethical preferences.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
      >
        <Link to="/quiz">
          <Button className="group bg-mai-coral hover:bg-mai-brown text-white px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto">
            Take the Skin Quiz
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link to="/products">
          <Button variant="outline" className="border-2 border-mai-coral text-mai-coral hover:bg-mai-coral hover:text-white px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
            Browse Products
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};