import { motion } from "framer-motion";

export const HeroImages = () => {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute top-32 right-[5%] w-[400px] glass-card p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-xl z-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80"
          alt="Organic Makeup Palette"
          className="w-full h-auto rounded-xl shadow-md"
        />
        <h3 className="text-2xl font-serif mt-4 text-mai-brown">Organic & Natural Makeup Brands</h3>
        <p className="text-gray-600 mt-2">Discover clean beauty products that care for your skin and the environment</p>
      </motion.div>

      <motion.img
        src="https://images.unsplash.com/photo-1630133362137-1a5c1b44f8a0?auto=format&fit=crop&w=300"
        alt="Natural skincare"
        className="absolute bottom-40 left-[12%] w-48 h-64 object-cover rounded-2xl shadow-2xl opacity-85 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <motion.img
        src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=300"
        alt="Clean beauty"
        className="absolute top-48 left-[28%] w-40 h-56 object-cover rounded-2xl shadow-2xl opacity-80 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </div>
  );
};