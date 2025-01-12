import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-screen bg-mai-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-mai-rose text-mai-brown rounded-full"
          >
            Personalized makeup recommendations for your unique skin
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-bold text-mai-brown mb-8"
          >
            Beauty that cares for your skin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg text-gray-600 mb-12"
          >
            Discover vegan makeup recommendations tailored to your skin condition. We curate products from small businesses that understand and care for sensitive skin.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center space-x-4"
          >
            <Link to="/quiz">
              <Button className="bg-mai-coral hover:bg-mai-brown text-white px-8 py-6 rounded-full transition-colors">
                Take the Skin Quiz
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="border-mai-coral text-mai-coral hover:bg-mai-coral hover:text-white px-8 py-6 rounded-full transition-colors">
                Browse Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};