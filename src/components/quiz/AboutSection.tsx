import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto px-4 py-16 mb-8"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-mai-brown">
            Find Your Perfect Match
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Discover makeup products from small businesses that are perfectly suited to your unique beauty needs. Our quiz helps you find products that work for your skin type and preferences.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-mai-rose/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-mai-brown mb-2">Personalized</h3>
              <p className="text-gray-600">Tailored recommendations for your unique needs</p>
            </div>
            <div className="bg-mai-sage/30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-mai-brown mb-2">Small Business</h3>
              <p className="text-gray-600">Support independent beauty brands</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-mai-rose/20 to-mai-sage/20 rounded-2xl transform rotate-3"></div>
          <div className="relative bg-white p-8 rounded-2xl shadow-xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-mai-cream p-4 rounded-lg">
                <h4 className="text-mai-brown font-semibold mb-2">Foundation</h4>
                <p className="text-sm text-gray-600">Find your perfect shade match</p>
              </div>
              <div className="bg-mai-sand p-4 rounded-lg">
                <h4 className="text-mai-brown font-semibold mb-2">Lipstick</h4>
                <p className="text-sm text-gray-600">Discover your ideal color</p>
              </div>
              <div className="bg-mai-sage p-4 rounded-lg">
                <h4 className="text-mai-brown font-semibold mb-2">Mascara</h4>
                <p className="text-sm text-gray-600">Enhance your lashes</p>
              </div>
              <div className="bg-mai-rose p-4 rounded-lg">
                <h4 className="text-mai-brown font-semibold mb-2">Blush</h4>
                <p className="text-sm text-gray-600">Add a natural flush</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};