
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const AboutMission = () => {
  return (
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
  );
};

export default AboutMission;
