
import { motion } from "framer-motion";
import AwarenessSection from "@/components/about/AwarenessSection";

const Awareness = () => {
  return (
    <div className="min-h-screen bg-mai-sand">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12 pt-24 bg-gradient-to-b from-mai-blushPink to-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-mai-darkRed mb-4 relative inline-block">
            Awareness & Mental Health
            <motion.div
              className="absolute -bottom-2 left-0 w-full h-1 bg-mai-coral/30"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn about our commitment to sustainable practices, mental well-being, and how we're working to make a positive impact
          </p>
        </div>
      </motion.div>

      <main className="py-16">
        <AwarenessSection />
      </main>
    </div>
  );
};

export default Awareness;
