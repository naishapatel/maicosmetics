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
      icon: <Heart className="w-8 h-8 text-purple-500" />,
      title: "Authenticity",
      description: "We believe in celebrating natural beauty and empowering individuals to feel confident in their own skin."
    },
    {
      icon: <Users className="w-8 h-8 text-pink-500" />,
      title: "Community",
      description: "Building a supportive community where beauty enthusiasts can share experiences and recommendations."
    },
    {
      icon: <Building2 className="w-8 h-8 text-orange-500" />,
      title: "Small Business Support",
      description: "Championing independent beauty brands and helping them connect with conscious consumers."
    },
    {
      icon: <Handshake className="w-8 h-8 text-blue-500" />,
      title: "Ethical Beauty",
      description: "Promoting sustainable and ethical beauty practices through careful product curation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2FCE2] via-[#FEF7CD] to-[#E5DEFF]">
      <main className="pt-24 pb-16">
        {/* Hero Section with Diagonal Design */}
        <motion.section 
          className="relative overflow-hidden mb-16"
          {...fadeIn}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 transform -skew-y-6" />
          <div className="relative max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Redefining<br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Beauty Discovery
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
              At mai., we're revolutionizing how people discover and connect with beauty products 
              that align with their values and enhance their natural beauty.
            </p>
          </div>
        </motion.section>

        {/* Mission Section with Card Design */}
        <motion.section 
          className="max-w-6xl mx-auto px-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                  We're on a mission to transform the beauty industry by connecting conscious consumers 
                  with ethical, small-business beauty brands. Through our innovative quiz system and 
                  community-driven platform, we make it easier than ever to find products that work for 
                  you while supporting businesses that share your values.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our platform goes beyond simple product recommendations – we're building a community 
                  where beauty enthusiasts can share experiences, discover new brands, and make informed 
                  decisions about their beauty purchases.
                </p>
              </div>
              <div className="grid gap-4">
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold text-purple-700 mb-2">Personalized Matching</h4>
                  <p className="text-gray-600">Find your perfect products through our intelligent quiz system</p>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold text-orange-700 mb-2">Community Reviews</h4>
                  <p className="text-gray-600">Real experiences shared by real people in our community</p>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold text-blue-700 mb-2">Small Business Focus</h4>
                  <p className="text-gray-600">Support independent brands making a difference</p>
                </Card>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Values Section with Gradient Cards */}
        <motion.section 
          className="max-w-6xl mx-auto px-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 hover:transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Join Us Section with Gradient Background */}
        <motion.section 
          className="max-w-6xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-3xl p-12 text-center backdrop-blur-md border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Join Our Community</h2>
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
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300"
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