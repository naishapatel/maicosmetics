import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-lg max-w-none"
          >
            <h1 className="text-4xl font-bold text-mai-brown mb-8">About Us</h1>
            <p className="text-gray-600 mb-6">
              We are passionate about connecting people with makeup products that work for their unique skin conditions while supporting small businesses that share our values.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is to make it easier for everyone to find makeup products that not only enhance their natural beauty but also align with their ethical preferences and skin needs.
            </p>
            <p className="text-gray-600">
              Through our carefully curated recommendations and partnerships with small businesses, we're building a community that celebrates individuality and conscious beauty choices.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default About;