import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-mai-cream to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')] bg-cover bg-center opacity-5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block px-6 py-2 mb-8 text-sm font-medium bg-mai-rose/80 text-mai-brown rounded-full backdrop-blur-sm shadow-sm"
          >
            Discover your perfect makeup match
          </motion.span>
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
            Discover vegan makeup recommendations tailored to your unique skin condition. We curate products from small businesses that understand and care for sensitive skin.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/quiz">
              <Button className="bg-mai-coral hover:bg-mai-brown text-white px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto">
                Take the Skin Quiz
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="border-2 border-mai-coral text-mai-coral hover:bg-mai-coral hover:text-white px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};