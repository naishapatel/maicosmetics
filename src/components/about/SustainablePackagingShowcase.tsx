
import { motion } from "framer-motion";

const SustainablePackagingShowcase = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.2,
        duration: 0.5
      } 
    })
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-mai-brown mb-4">Sustainable Packaging</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We carefully select brands that prioritize environmentally friendly packaging options,
            reducing waste and our collective impact on the planet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          <motion.div 
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="flex flex-col h-full"
          >
            <div className="bg-mai-sand/30 p-6 rounded-2xl mb-6 flex-1">
              <img 
                src="/lovable-uploads/64fa5670-83b6-457f-979d-9214d323b5f5.png" 
                alt="Sustainable wooden makeup palette" 
                className="w-full h-64 object-cover rounded-xl mb-6" 
              />
              <h3 className="text-xl font-semibold text-mai-brown mb-2">Bamboo Palettes</h3>
              <p className="text-gray-600">
                Bamboo is a rapidly renewable resource that grows quickly without pesticides or 
                fertilizers, making it an ideal sustainable material for makeup packaging.
              </p>
            </div>
            <div className="mt-auto">
              <span className="text-sm font-medium text-mai-mauve">
                Biodegradable • Renewable • Durable
              </span>
            </div>
          </motion.div>

          <motion.div 
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="flex flex-col h-full"
          >
            <div className="bg-mai-blushPink/30 p-6 rounded-2xl mb-6 flex-1">
              <img 
                src="/lovable-uploads/97be402a-167d-4058-ba45-6b24eb68121b.png" 
                alt="Natural lip tints in paper packaging" 
                className="w-full h-64 object-cover rounded-xl mb-6" 
              />
              <h3 className="text-xl font-semibold text-mai-brown mb-2">Plant-Based Packaging</h3>
              <p className="text-gray-600">
                These innovative lip products use paper tubes and biodegradable components, 
                significantly reducing plastic waste compared to conventional cosmetics.
              </p>
            </div>
            <div className="mt-auto">
              <span className="text-sm font-medium text-mai-mauve">
                Plastic-Free • Compostable • Minimal Waste
              </span>
            </div>
          </motion.div>

          <motion.div 
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="flex flex-col h-full"
          >
            <div className="bg-mai-sage/30 p-6 rounded-2xl mb-6 flex-1">
              <img 
                src="/lovable-uploads/13210a19-4b57-43f1-94fb-1bfb334519d0.png" 
                alt="Refillable powder compacts" 
                className="w-full h-64 object-cover rounded-xl mb-6" 
              />
              <h3 className="text-xl font-semibold text-mai-brown mb-2">Refillable Systems</h3>
              <p className="text-gray-600">
                These innovative powder compacts are designed with refillable pans, allowing 
                customers to replace just the product while keeping the durable bamboo packaging.
              </p>
            </div>
            <div className="mt-auto">
              <span className="text-sm font-medium text-mai-mauve">
                Zero-Waste • Economical • Long-lasting
              </span>
            </div>
          </motion.div>

          <motion.div 
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="flex flex-col h-full"
          >
            <div className="bg-mai-cream p-6 rounded-2xl mb-6 flex-1">
              <img 
                src="/lovable-uploads/b9f55779-4934-471a-acff-f18a7ad69e55.png" 
                alt="Sustainable blush and highlighter duo" 
                className="w-full h-64 object-cover rounded-xl mb-6" 
              />
              <h3 className="text-xl font-semibold text-mai-brown mb-2">Multi-Use Products</h3>
              <p className="text-gray-600">
                This compact duo illustrates how sustainable brands are creating multi-purpose 
                products that reduce the total number of items needed in your beauty routine.
              </p>
            </div>
            <div className="mt-auto">
              <span className="text-sm font-medium text-mai-mauve">
                Space-Saving • Resource-Efficient • Versatile
              </span>
            </div>
          </motion.div>

          <motion.div 
            custom={4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="flex flex-col h-full"
          >
            <div className="bg-white p-6 rounded-2xl shadow-md mb-6 flex-1">
              <img 
                src="/lovable-uploads/8936d617-9458-4384-ad0a-d6c202e51c95.png" 
                alt="Mineral makeup pigments" 
                className="w-full h-64 object-cover rounded-xl mb-6" 
              />
              <h3 className="text-xl font-semibold text-mai-brown mb-2">Minimal Packaging</h3>
              <p className="text-gray-600">
                These loose mineral pigments come in simple, recyclable metal containers that 
                maximize product space while minimizing unnecessary packaging elements.
              </p>
            </div>
            <div className="mt-auto">
              <span className="text-sm font-medium text-mai-mauve">
                Recyclable • Efficient • Lightweight
              </span>
            </div>
          </motion.div>

          <motion.div 
            custom={5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className="flex flex-col h-full"
          >
            <div className="bg-white p-6 rounded-2xl shadow-md mb-6 flex-1">
              <img 
                src="/lovable-uploads/039a22d4-7c4a-40f1-a07b-4b2d92ba15ae.png" 
                alt="Collection of sustainable makeup products" 
                className="w-full h-64 object-cover rounded-xl mb-6" 
              />
              <h3 className="text-xl font-semibold text-mai-brown mb-2">Complete Sustainable Routine</h3>
              <p className="text-gray-600">
                A thoughtfully curated collection of eco-friendly products demonstrates how an 
                entire beauty routine can be both effective and environmentally responsible.
              </p>
            </div>
            <div className="mt-auto">
              <span className="text-sm font-medium text-mai-mauve">
                Holistic Approach • Environmentally Friendly • Ethically Made
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SustainablePackagingShowcase;
