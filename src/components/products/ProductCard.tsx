import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, Leaf, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";

type ProductCardProps = Partial<Product> & {
  description: string;
  price: string;
};

export const ProductCard = ({ 
  id, 
  title, 
  name, 
  product_name, 
  description, 
  price, 
  link, 
  url,
  brand,
  business_tags,
  certifications
}: ProductCardProps) => {
  const navigate = useNavigate();
  // Prioritize URL if available, otherwise fallback to link
  const productUrl = url || link;
  const isValidUrl = productUrl ? true : false;
  
  // Determine which name property to use, with fallbacks
  const displayName = title || name || product_name || "";
  
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
          <CardTitle className="text-xl font-semibold text-mai-brown">{displayName}</CardTitle>
          {brand && (
            <p className="text-sm font-medium text-gray-600">{brand}</p>
          )}
          <p className="text-lg font-medium text-mai-coral">{price}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{description}</p>
          
          {business_tags && business_tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {business_tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-mai-coral/10 text-mai-coral border-mai-coral/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {certifications && certifications.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {certifications.map((cert, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs bg-mai-mauve/10 text-mai-mauve border-mai-mauve/30 flex items-center"
                >
                  <Award className="w-3 h-3 mr-1" />
                  {cert}
                </Badge>
              ))}
            </div>
          )}
          
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
