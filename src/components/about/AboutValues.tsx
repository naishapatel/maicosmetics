
import { motion } from "framer-motion";
import { Heart, Users, Building2, Handshake } from "lucide-react";

const AboutValues = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-mai-coral" />,
      title: "Authenticity",
      description: "We believe in celebrating natural beauty and empowering individuals to feel confident in their own skin."
    },
    {
      icon: <Users className="w-8 h-8 text-mai-brown" />,
      title: "Community",
      description: "Building a supportive community where beauty enthusiasts can share experiences and recommendations."
    },
    {
      icon: <Building2 className="w-8 h-8 text-mai-coral" />,
      title: "Small Business Support",
      description: "Championing independent beauty brands and helping them connect with conscious consumers."
    },
    {
      icon: <Handshake className="w-8 h-8 text-mai-brown" />,
      title: "Ethical Beauty",
      description: "Promoting sustainable and ethical beauty practices through careful product curation."
    }
  ];

  return (
    <motion.section 
      className="max-w-6xl mx-auto px-4 mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-mai-brown mb-12 text-center">Our Values</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            className="bg-white rounded-2xl p-8 shadow-sm border border-mai-sage/20 hover:border-mai-coral/20 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
          >
            <div className="mb-6">{value.icon}</div>
            <h3 className="text-xl font-semibold text-mai-brown mb-3">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AboutValues;
