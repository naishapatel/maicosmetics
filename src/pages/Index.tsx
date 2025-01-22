import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mai-cream to-white">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-serif text-mai-brown leading-tight">
              Discover Clean Beauty That Cares
            </h1>
            <p className="text-xl text-gray-600">
              Explore our curated collection of organic and natural makeup products that are good for you and the environment.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-mai-rose/20 to-mai-sage/20 rounded-3xl transform rotate-2"></div>
            <img
              src="/lovable-uploads/7d980285-cf83-4072-a86d-49b25cbdcd90.png"
              alt="We believe in better - Organic makeup palette"
              className="relative z-10 w-full rounded-3xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
            />
          </motion.div>
        </div>
        
        <Hero />
      </div>
    </div>
  );
};

export default Index;