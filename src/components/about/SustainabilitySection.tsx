
import { motion } from "framer-motion";
import { ExternalLink, Leaf, GlobeIcon, Heart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const SustainabilitySection = () => {
  const nonprofits = [
    {
      name: "Environmental Defense Fund",
      description: "Working to solve the most critical environmental problems facing our planet.",
      url: "https://www.edf.org/",
      icon: <GlobeIcon className="w-8 h-8 text-mai-darkRed" />,
      category: "Climate Action"
    },
    {
      name: "The Nature Conservancy",
      description: "Protecting the lands and waters on which all life depends.",
      url: "https://www.nature.org/",
      icon: <Leaf className="w-8 h-8 text-mai-darkRed" />,
      category: "Conservation"
    },
    {
      name: "Ethical Consumer",
      description: "Research and information on ethical products and companies.",
      url: "https://www.ethicalconsumer.org/",
      icon: <Heart className="w-8 h-8 text-mai-darkRed" />,
      category: "Ethical Shopping"
    }
  ];

  return (
    <motion.section 
      className="max-w-6xl mx-auto px-4 py-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-mai-brown mb-4">Sustainability & Ethical Practices</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We're committed to supporting organizations that promote sustainability, ethical practices, 
          and positive change in the beauty industry and beyond.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {nonprofits.map((nonprofit, index) => (
          <motion.div
            key={nonprofit.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full bg-mai-blushPink/20 border-mai-mauve/10 hover:border-mai-mauve/30 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="mb-3">{nonprofit.icon}</div>
                <CardTitle className="text-mai-brown">{nonprofit.name}</CardTitle>
                <span className="text-xs font-medium bg-mai-blushPink text-mai-darkRed px-2 py-1 rounded-full inline-block mt-1">
                  {nonprofit.category}
                </span>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-gray-600">{nonprofit.description}</p>
              </CardContent>
              <CardFooter>
                <motion.a
                  href={nonprofit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-mai-mauve hover:text-mai-darkRed font-medium transition-colors"
                  whileHover={{ 
                    scale: 1.05,
                    color: "var(--mai-darkRed)"
                  }}
                >
                  Visit website <ExternalLink className="h-4 w-4" />
                </motion.a>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-12 bg-mai-blushPink p-8 rounded-2xl border border-mai-mauve/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-mai-darkRed mb-4">Stay Informed</h3>
        <p className="text-gray-700 mb-4">
          The beauty industry is evolving towards more sustainable and ethical practices. 
          We regularly update our platform with the latest news, developments, and ways you can contribute.
        </p>
        <Link to="/community?tab=blogs">
          <motion.button 
            className="inline-flex items-center gap-2 bg-mai-mauve text-white px-6 py-3 rounded-full font-medium hover:bg-mai-darkRed transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "var(--mai-darkRed)",
              boxShadow: "0 10px 25px -5px rgba(86, 12, 12, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Blog Community
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default SustainabilitySection;
