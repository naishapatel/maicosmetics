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
      icon: <Users className="w-8 h-8 text-mai-coral" />,
      title: "Community",
      description: "Building a supportive community where beauty enthusiasts can share experiences and recommendations."
    },
    {
      icon: <Building2 className="w-8 h-8 text-mai-coral" />,
      title: "Small Business Support",
      description: "Championing independent beauty brands and helping them connect with conscious consumers."
    },
    {
      icon: <Handshake className="w-8 h-8 text-mai-coral" />,
      title: "Ethical Beauty",
      description: "Promoting sustainable and ethical beauty practices through careful product curation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-mai-cream">
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <motion.section 
          className="max-w-6xl mx-auto px-4 mb-16 text-center"
          {...fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-mai-brown mb-6">
            Redefining Beauty Discovery
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            At mai., we're revolutionizing how people discover and connect with beauty products 
            that align with their values and enhance their natural beauty.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section 
          className="max-w-6xl mx-auto px-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-mai-brown mb-6">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  We're on a mission to transform the beauty industry by connecting conscious consumers 
                  with ethical, small-business beauty brands. Through our innovative quiz system and 
                  community-driven platform, we make it easier than ever to find products that work for 
                  you while supporting businesses that share your values.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our platform goes beyond simple product recommendations – we're building a community 
                  where beauty enthusiasts can share experiences, discover new brands, and make informed 
                  decisions about their beauty purchases.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-mai-rose/20 to-mai-sage/20 rounded-2xl transform rotate-3"></div>
                <Card className="relative bg-white p-6 rounded-2xl">
                  <div className="grid gap-4">
                    <div className="bg-mai-cream p-4 rounded-lg">
                      <h4 className="text-mai-brown font-semibold">Personalized Matching</h4>
                      <p className="text-sm text-gray-600">Find your perfect products</p>
                    </div>
                    <div className="bg-mai-rose p-4 rounded-lg">
                      <h4 className="text-mai-brown font-semibold">Community Reviews</h4>
                      <p className="text-sm text-gray-600">Real experiences from real people</p>
                    </div>
                    <div className="bg-mai-sage p-4 rounded-lg">
                      <h4 className="text-mai-brown font-semibold">Small Business Focus</h4>
                      <p className="text-sm text-gray-600">Support independent brands</p>
                    </div>
                  </div>
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
          <h2 className="text-3xl font-bold text-mai-brown mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-mai-brown mb-2">{value.title}</h3>
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
          <div className="bg-mai-sage/30 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-mai-brown mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Be part of a movement that's reshaping the beauty industry. Share your experiences, 
              discover new products, and connect with like-minded beauty enthusiasts.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/auth" 
                className="inline-block bg-mai-coral text-white px-8 py-3 rounded-full font-medium hover:bg-mai-brown transition-colors"
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