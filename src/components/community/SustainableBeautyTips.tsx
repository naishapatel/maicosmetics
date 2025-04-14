
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, Droplet, Heart, Leaf, ShoppingBag } from "lucide-react";

export const SustainableBeautyTips = () => {
  const tips = [
    {
      icon: <Recycle className="h-5 w-5" />,
      title: "Look for Refillable Products",
      description: "Choose products with refillable packaging to minimize waste.",
      image: "/lovable-uploads/64fa5670-83b6-457f-979d-9214d323b5f5.png"
    },
    {
      icon: <ShoppingBag className="h-5 w-5" />,
      title: "Support Eco-Conscious Brands",
      description: "Research brands committed to sustainable practices and materials.",
      image: "/lovable-uploads/0acda209-03ce-4ba1-9634-e682094a6096.png"
    },
    {
      icon: <Leaf className="h-5 w-5" />,
      title: "Choose Natural Ingredients",
      description: "Opt for products with plant-based, biodegradable formulations.",
      image: "/lovable-uploads/13210a19-4b57-43f1-94fb-1bfb334519d0.png"
    },
    {
      icon: <Droplet className="h-5 w-5" />,
      title: "Water Conservation",
      description: "Choose solid beauty products that require less water to produce.",
      image: "/lovable-uploads/8936d617-9458-4384-ad0a-d6c202e51c95.png"
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Multi-Use Products",
      description: "Invest in versatile products that serve multiple purposes.",
      image: "/lovable-uploads/97be402a-167d-4058-ba45-6b24eb68121b.png"
    }
  ];

  return (
    <Card className="bg-white border-mai-mauve/20">
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-2xl font-serif text-mai-brown mb-2">
            Sustainable Beauty Tips
          </h3>
          <p className="text-gray-600">
            Share these eco-friendly practices with our community to help reduce beauty industry waste
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-mai-cream/30 p-4 rounded-xl shadow-sm"
            >
              <div className="w-full h-32 mb-3 overflow-hidden rounded-lg">
                <img 
                  src={tip.image} 
                  alt={tip.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-mai-mauve">{tip.icon}</div>
                <h4 className="font-medium text-mai-brown text-sm">{tip.title}</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
