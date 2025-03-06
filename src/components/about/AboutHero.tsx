
import { motion } from "framer-motion";

const AboutHero = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <motion.section 
      className="relative overflow-hidden mb-16"
      {...fadeIn}
    >
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-bold text-mai-brown mb-6 leading-tight">
          Redefining Beauty Discovery
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
          We created mai. to bridge the gap between conscious consumers and ethical beauty brands. 
          Our platform makes it simple to discover products that align with both your beauty needs and values.
        </p>
      </div>
    </motion.section>
  );
};

export default AboutHero;
