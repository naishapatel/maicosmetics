
import { motion } from "framer-motion";

const AboutHero = () => {
  return (
    <motion.section 
      className="relative overflow-hidden mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-mai-brown mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Redefining Beauty Discovery
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          We created mai. to bridge the gap between conscious consumers and ethical beauty brands. 
          Our platform makes it simple to discover products that align with both your beauty needs and values.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default AboutHero;
