import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
}

export const ProductCard = ({ title, description, price, image }: ProductCardProps) => {
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);

  const handleLearnMore = () => {
    toast({
      title: "Product Details",
      description: `Learn more about ${title}. Coming soon!`,
      duration: 3000,
    });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full glass-card hover:shadow-2xl transition-all duration-300">
        <CardHeader>
          <div className="relative w-full h-48 overflow-hidden rounded-t-xl bg-mai-sage/20">
            <img
              src={imageError ? "/placeholder.svg" : image}
              alt={title}
              onError={handleImageError}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardTitle className="text-xl font-semibold text-mai-brown mt-2">{title}</CardTitle>
          <CardDescription className="text-lg font-medium text-mai-coral">{price}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{description}</p>
          <Button 
            onClick={handleLearnMore}
            className="w-full bg-mai-coral hover:bg-mai-brown text-white transition-colors duration-300"
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};