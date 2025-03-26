
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  link?: string;
  url?: string;
}

export const ProductCard = ({ title, description, price, link, url }: ProductCardProps) => {
  // Prioritize URL if available, otherwise fallback to link
  const productUrl = url || link;
  const isValidUrl = productUrl ? true : false;
  
  const handleCardClick = () => {
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
        className={`h-full hover:shadow-lg transition-all duration-300 ${productUrl && isValidUrl ? 'cursor-pointer' : ''}`}
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
