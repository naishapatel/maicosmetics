
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Leaf, RefreshCw, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const EcoFriendlySpotlight = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-mai-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-block text-mai-mauve font-medium px-4 py-2 bg-mai-mauve/10 rounded-full">
              Sustainable Beauty
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-mai-brown leading-tight">
              Beauty that respects your skin <span className="text-mai-darkRed">and</span> our planet
            </h2>
            <p className="text-gray-600">
              We carefully curate products that use eco-friendly packaging and sustainable ingredients,
              so you can look good while doing good for the environment.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-mai-mauve/20 p-2 rounded-full">
                  <Leaf className="h-4 w-4 text-mai-mauve" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-mai-brown">Sustainable Materials</h3>
                  <p className="text-sm text-gray-600">
                    Products made with bamboo, recycled materials, and other eco-friendly alternatives
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-mai-mauve/20 p-2 rounded-full">
                  <RefreshCw className="h-4 w-4 text-mai-mauve" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-mai-brown">Refillable Options</h3>
                  <p className="text-sm text-gray-600">
                    Reduce waste with products designed to be refilled and reused
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="mt-1 bg-mai-mauve/20 p-2 rounded-full">
                  <ShieldCheck className="h-4 w-4 text-mai-mauve" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-mai-brown">Clean Formulations</h3>
                  <p className="text-sm text-gray-600">
                    Free from harmful chemicals, sustainably sourced, and cruelty-free ingredients
                  </p>
                </div>
              </div>
            </div>
            
            <Link to="/products">
              <Button className="bg-mai-darkRed hover:bg-mai-darkRed/90 text-white px-8 py-6 rounded-full mt-4">
                Shop Eco-Friendly Products
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden h-64">
                  <img 
                    src="/lovable-uploads/0acda209-03ce-4ba1-9634-e682094a6096.png" 
                    alt="Eco-friendly makeup palette" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden h-40">
                  <img 
                    src="/lovable-uploads/8936d617-9458-4384-ad0a-d6c202e51c95.png" 
                    alt="Sustainable mineral powders" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden h-40">
                  <img 
                    src="/lovable-uploads/b9f55779-4934-471a-acff-f18a7ad69e55.png" 
                    alt="Eco-friendly compact" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white rounded-2xl shadow-md overflow-hidden h-64">
                  <img 
                    src="/lovable-uploads/97be402a-167d-4058-ba45-6b24eb68121b.png" 
                    alt="Sustainable lip products" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-mai-blushPink/30 rounded-full -z-10"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-mai-mauve/20 rounded-full -z-10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
