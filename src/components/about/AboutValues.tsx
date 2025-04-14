
import { motion } from "framer-motion";
import { Heart, Globe, ThumbsUp } from "lucide-react";
import SustainablePackagingShowcase from "./SustainablePackagingShowcase";

const AboutValues = () => {
  const values = [
    {
      title: "Compassion",
      description: "We believe in kindness towards all beings and our planet.",
      icon: <Heart className="h-6 w-6" />,
    },
    {
      title: "Sustainability",
      description: "We prioritize sustainable practices and eco-friendly options.",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Quality",
      description: "We never compromise on the quality of our recommendations.",
      icon: <ThumbsUp className="h-6 w-6" />,
    },
  ];

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-serif text-mai-brown mb-4"
            >
              Our Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              These core values guide everything we do and every product we recommend.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-mai-sand/20 p-8 rounded-xl"
              >
                <div className="bg-white p-4 rounded-full w-16 h-16 flex items-center justify-center shadow-sm mb-6 text-mai-mauve">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-medium text-mai-brown mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <SustainablePackagingShowcase />
    </>
  );
};

export default AboutValues;
