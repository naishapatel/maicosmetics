import { motion } from "framer-motion";

export const HeroImages = () => {
  return (
    <>
      <motion.img
        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300"
        alt="Ethical beauty products"
        className="absolute top-32 right-[10%] w-64 h-80 object-cover rounded-2xl shadow-2xl opacity-90"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      />
      
      <motion.img
        src="https://images.unsplash.com/photo-1630133362137-1a5c1b44f8a0?auto=format&fit=crop&w=300"
        alt="Natural skincare"
        className="absolute bottom-40 left-[12%] w-48 h-64 object-cover rounded-2xl shadow-2xl opacity-85"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      
      <motion.img
        src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=300"
        alt="Clean beauty"
        className="absolute top-48 left-[28%] w-40 h-56 object-cover rounded-2xl shadow-2xl opacity-80"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </>
  );
};