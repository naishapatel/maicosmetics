import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
}

export const ProductCard = ({ title, description, price }: ProductCardProps) => {
  const { toast } = useToast();

  const handleLearnMore = () => {
    toast({
      title: "Product Details",
      description: `${title} - ${description}. Price: ${price}`,
      duration: 3000,
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-mai-brown">{title}</CardTitle>
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