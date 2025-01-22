import { motion } from "framer-motion";

export const HeroImages = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <motion.div
        className="w-[500px] glass-card p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl z-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="/lovable-uploads/7d980285-cf83-4072-a86d-49b25cbdcd90.png"
          alt="Organic Makeup Palette with 'We believe in better' text"
          className="w-full h-auto rounded-xl shadow-md"
        />
        <h3 className="text-2xl font-serif mt-4 text-mai-brown">Organic & Natural Makeup Brands</h3>
        <p className="text-gray-600 mt-2">Discover clean beauty products that care for your skin and the environment</p>
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-[12%] w-48 glass-card p-4 rounded-2xl shadow-xl z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img
          src="https://images.unsplash.com/photo-1630133362137-1a5c1b44f8a0?auto=format&fit=crop&w=300"
          alt="Natural skincare"
          className="w-full h-auto rounded-xl"
        />
      </motion.div>

      <motion.div
        className="absolute top-48 left-[28%] w-40 glass-card p-4 rounded-2xl shadow-xl z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <img
          src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=300"
          alt="Clean beauty"
          className="w-full h-auto rounded-xl"
        />
      </motion.div>
    </div>
  );
};