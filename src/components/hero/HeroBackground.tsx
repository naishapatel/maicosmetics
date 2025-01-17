import { motion } from "framer-motion";

export const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-mai-cream via-mai-rose to-mai-sage opacity-40" />
      
      {/* Animated geometric shapes */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute top-20 right-[20%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-mai-coral/10 to-mai-sage/20 blur-3xl"
      />
      
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1.2, 1, 1.2],
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear" 
        }}
        className="absolute bottom-20 left-[10%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-mai-rose/20 to-mai-sage/10 blur-3xl"
      />
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(circle_at_1px_1px,#4A3F35_1px,transparent_0)] [background-size:40px_40px]" />
    </>
  );
};