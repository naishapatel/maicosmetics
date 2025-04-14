
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export const SustainableProductsShowcase = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-mai-sand/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-serif text-mai-brown mb-3`}
          >
            Sustainable Beauty
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover makeup products with eco-friendly packaging that respect both your skin and our planet
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-2xl"
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/039a22d4-7c4a-40f1-a07b-4b2d92ba15ae.png" 
                alt="Sustainable makeup products" 
                className="w-full h-[400px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 rounded-2xl">
                <h3 className="text-2xl font-serif text-white mb-2">5 must-have products</h3>
                <p className="text-white/90 mb-4">For a complete makeup routine</p>
                <Button 
                  onClick={() => navigate('/products')}
                  className="bg-white text-mai-darkRed hover:bg-white/90 w-fit"
                >
                  Discover Now
                </Button>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img 
                src="/lovable-uploads/64fa5670-83b6-457f-979d-9214d323b5f5.png" 
                alt="Sustainable eyeshadow palette" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <h4 className="font-medium text-mai-brown">Sustainable Eyeshadow</h4>
              <p className="text-sm text-gray-600">Bamboo packaging, natural pigments</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img 
                src="/lovable-uploads/0acda209-03ce-4ba1-9634-e682094a6096.png" 
                alt="Eco-friendly makeup compact" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <h4 className="font-medium text-mai-brown">Eco-Friendly Compact</h4>
              <p className="text-sm text-gray-600">Zero waste, refillable design</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img 
                src="/lovable-uploads/b9f55779-4934-471a-acff-f18a7ad69e55.png" 
                alt="Sustainable blush and bronzer" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <h4 className="font-medium text-mai-brown">Sustainable Duo</h4>
              <p className="text-sm text-gray-600">Blush and highlighter combo</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img 
                src="/lovable-uploads/13210a19-4b57-43f1-94fb-1bfb334519d0.png" 
                alt="Eco-friendly makeup powders" 
                className="w-full h-auto rounded-lg mb-4"
              />
              <h4 className="font-medium text-mai-brown">Natural Powders</h4>
              <p className="text-sm text-gray-600">Plastic-free mineral colors</p>
            </motion.div>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            onClick={() => navigate('/products')}
            className="bg-mai-mauve hover:bg-mai-mauveDark text-white px-8 py-6 rounded-full"
          >
            View All Sustainable Products
          </Button>
        </div>
      </div>
    </section>
  );
};
