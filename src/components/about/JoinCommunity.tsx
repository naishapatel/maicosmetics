
import { motion } from "framer-motion";

const JoinCommunity = () => {
  return (
    <motion.section 
      className="max-w-6xl mx-auto px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="bg-mai-blushPink rounded-3xl p-12 text-center border border-mai-mauve/20"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        whileHover={{ 
          boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.3 }
        }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-mai-darkRed mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Join Our Community
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Be part of a movement that's reshaping the beauty industry. Share your experiences, 
          discover new products, and connect with like-minded beauty enthusiasts.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.a 
            href="/auth" 
            className="inline-block bg-mai-mauve text-white px-8 py-4 rounded-full font-medium hover:bg-mai-darkRed transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(86, 12, 12, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join mai. Today
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default JoinCommunity;
