
import { motion } from "framer-motion";

export const HeroBackground = () => {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-mai-blushPink via-mai-rose to-mai-sage opacity-70" />
      
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
        className="absolute top-20 right-[20%] w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-mai-mauve/20 to-mai-blushPink/30 blur-3xl"
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
        className="absolute bottom-20 left-[10%] w-[35rem] h-[35rem] rounded-full bg-gradient-to-tr from-mai-mauve/30 to-mai-blushPink/20 blur-3xl"
      />
    </>
  );
};
