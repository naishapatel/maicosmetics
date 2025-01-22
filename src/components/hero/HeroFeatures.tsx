import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Leaf, 
  Heart, 
  Sparkles, 
  Users, 
  Recycle,
  Target
} from "lucide-react";

export const HeroFeatures = () => {
  const features = [
    {
      icon: Leaf,
      title: "Natural Ingredients",
      description: "Made with organic and natural ingredients that nourish your skin"
    },
    {
      icon: Heart,
      title: "Cruelty Free",
      description: "Never tested on animals and completely vegan friendly"
    },
    {
      icon: Sparkles,
      title: "Clean Beauty",
      description: "Free from harmful chemicals and synthetic ingredients"
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Get custom product suggestions based on your unique needs"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Developed with input from our beauty community"
    },
    {
      icon: Recycle,
      title: "Sustainable",
      description: "Eco-friendly packaging and responsible production"
    }
  ];

  return (
    <div className="mt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-mai-sage">
              <CardContent className="p-6">
                <feature.icon className="w-12 h-12 text-mai-coral mb-4" />
                <h3 className="text-xl font-semibold text-mai-brown mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};