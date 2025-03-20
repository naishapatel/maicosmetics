
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  images?: string[];
  link?: string;
}

export const ProductCard = ({ title, description, price, images, link }: ProductCardProps) => {
  // Default placeholder image if no images are provided
  const placeholderImage = "/placeholder.svg";
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300">
        {images && images.length > 0 ? (
          <div className="w-full h-48 overflow-hidden">
            <img 
              src={images[0]} 
              alt={title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = placeholderImage;
                console.log(`Image failed to load for ${title}, using placeholder`);
              }}
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <img 
              src={placeholderImage} 
              alt="Product placeholder" 
              className="w-20 h-20 opacity-30"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-mai-brown">{title}</CardTitle>
          <p className="text-lg font-medium text-mai-coral">{price}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
