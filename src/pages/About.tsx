import { motion } from "framer-motion";
import { Heart, Users, Building2, Handshake } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

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
    <div className="min-h-screen bg-mai-sand">
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <motion.section 
          className="relative overflow-hidden mb-16"
          {...fadeIn}
        >
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-5xl md:text-6xl font-bold text-mai-brown mb-6 leading-tight">
              Redefining Beauty Discovery
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
              We created mai. to bridge the gap between conscious consumers and ethical beauty brands. 
              Our platform makes it simple to discover products that align with both your beauty needs and values.
            </p>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="max-w-6xl mx-auto px-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-mai-sage/20">
            <h2 className="text-3xl md:text-4xl font-bold text-mai-brown mb-8">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  We believe finding the right beauty products shouldn't be complicated. Through our 
                  personalized quiz system and community insights, we help you discover products that 
                  work for you while supporting small, ethical businesses.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our platform combines expert knowledge with real user experiences, creating a trusted 
                  space where you can make informed decisions about your beauty purchases and connect 
                  with brands that share your values.
                </p>
              </div>
              <div className="grid gap-4">
                <Card className="bg-mai-cream p-6 hover:shadow-sm transition-shadow">
                  <h4 className="text-xl font-semibold text-mai-brown mb-2">Personalized Matching</h4>
                  <p className="text-gray-600">Find your perfect products through our intelligent quiz system</p>
                </Card>
                <Card className="bg-mai-rose p-6 hover:shadow-sm transition-shadow">
                  <h4 className="text-xl font-semibold text-mai-brown mb-2">Community Reviews</h4>
                  <p className="text-gray-600">Real experiences shared by real people in our community</p>
                </Card>
                <Card className="bg-mai-sage p-6 hover:shadow-sm transition-shadow">
                  <h4 className="text-xl font-semibold text-mai-brown mb-2">Small Business Focus</h4>
                  <p className="text-gray-600">Support independent brands making a difference</p>
                </Card>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
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

        {/* Join Us Section */}
        <motion.section 
          className="max-w-6xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-mai-cream rounded-3xl p-12 text-center border border-mai-sage/20">
            <h2 className="text-3xl md:text-4xl font-bold text-mai-brown mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Be part of a movement that's reshaping the beauty industry. Share your experiences, 
              discover new products, and connect with like-minded beauty enthusiasts.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/auth" 
                className="inline-block bg-mai-coral text-white px-8 py-4 rounded-full font-medium hover:shadow-md transition-all duration-300"
              >
                Join mai. Today
              </a>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default About;