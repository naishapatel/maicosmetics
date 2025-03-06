
import { motion } from "framer-motion";

const JoinCommunity = () => {
  return (
    <motion.section 
      className="max-w-6xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="bg-mai-cream rounded-3xl p-12 text-center border border-mai-sage/20">
        <h2 className="text-3xl md:text-4xl font-bold text-mai-brown mb-6">Join Our Community</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Be part of a movement that's reshaping the beauty industry. Share your experiences, 
          discover new products, and connect with like-minded beauty enthusiasts.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="/auth" 
            className="inline-block bg-mai-coral text-white px-8 py-4 rounded-full font-medium hover:shadow-md transition-all duration-300"
          >
            Join mai. Today
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default JoinCommunity;
