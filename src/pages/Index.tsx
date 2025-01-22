import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.img
          src="/lovable-uploads/7d980285-cf83-4072-a86d-49b25cbdcd90.png"
          alt="Organic makeup palette"
          className="w-full max-w-2xl mx-auto rounded-2xl shadow-xl mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <Hero />
      </motion.div>
    </div>
  );
};

export default Index;