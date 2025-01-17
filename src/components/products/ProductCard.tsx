import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
}

export const ProductCard = ({ title, description, price, image }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full glass-card hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-xl" />
          <CardTitle className="text-xl font-semibold text-mai-brown">{title}</CardTitle>
          <CardDescription className="text-gray-600">{price}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{description}</p>
          <Button className="w-full bg-mai-coral hover:bg-mai-brown text-white">
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};