import { motion } from "framer-motion";

export const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-b from-mai-cream to-white opacity-40" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-96 h-96 bg-mai-sage/20 rounded-full blur-3xl opacity-20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-[30rem] h-[30rem] bg-mai-coral/10 rounded-full blur-3xl opacity-20"
      />
    </>
  );
};