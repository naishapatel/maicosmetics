import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Heart, Shield } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-mai-cream via-mai-rose to-white opacity-50" />
      
      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-64 h-64 bg-mai-sage rounded-full blur-3xl opacity-20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-mai-coral rounded-full blur-3xl opacity-10"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-8 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-mai-sage"
          >
            <Sparkles className="w-4 h-4 text-mai-coral" />
            <span className="text-sm font-medium text-mai-brown">
              Discover your perfect makeup match
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-7xl font-bold text-mai-brown mb-8 tracking-tight"
          >
            Beauty that cares
            <span className="block text-mai-coral">for your skin</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-lg text-gray-600 mb-12 leading-relaxed"
          >
            Discover makeup recommendations tailored to your unique skin conditions. 
            Supporting small businesses that align with your ethical preferences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link to="/quiz">
              <Button className="group bg-mai-coral hover:bg-mai-brown text-white px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto">
                Take the Skin Quiz
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" className="border-2 border-mai-coral text-mai-coral hover:bg-mai-coral hover:text-white px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                Browse Products
              </Button>
            </Link>
          </motion.div>

          {/* Features section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto"
          >
            {[
              {
                icon: <Heart className="w-6 h-6 text-mai-coral" />,
                title: "Personalized Care",
                description: "Tailored recommendations for your unique skin"
              },
              {
                icon: <Shield className="w-6 h-6 text-mai-coral" />,
                title: "Ethical Choices",
                description: "Cruelty-free and sustainable products"
              },
              {
                icon: <Sparkles className="w-6 h-6 text-mai-coral" />,
                title: "Small Business",
                description: "Support independent ethical brands"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-mai-sage"
              >
                <div className="w-12 h-12 bg-mai-rose/20 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-mai-brown mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};