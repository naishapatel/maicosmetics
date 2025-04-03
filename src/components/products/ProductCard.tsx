import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id?: string;
  title: string;
  description: string;
  price: string;
  link?: string;
  url?: string;
}

export const ProductCard = ({ id, title, description, price, link, url }: ProductCardProps) => {
  const navigate = useNavigate();
  // Prioritize URL if available, otherwise fallback to link
  const productUrl = url || link;
  const isValidUrl = productUrl ? true : false;
  
  const handleCardClick = () => {
    // If we have an internal ID, navigate to product detail
    if (id) {
      navigate(`/products/${id}`);
      return;
    }
    
    // Otherwise try to open external URL if available
    if (productUrl && isValidUrl) {
      window.open(productUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card 
        className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={handleCardClick}
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-mai-brown">{title}</CardTitle>
          <p className="text-lg font-medium text-mai-coral">{price}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{description}</p>
          {productUrl && isValidUrl && (
            <div className="flex items-center mt-4 text-mai-mauve">
              <ExternalLink className="w-4 h-4 mr-1" />
              <span className="text-sm">View product</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
