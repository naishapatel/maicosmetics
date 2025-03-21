
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  images?: string[];
  link?: string;
  url?: string;
}

export const ProductCard = ({ title, description, price, images, link, url }: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  
  // Default placeholder images with reliable sources
  const placeholderImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800"
  ];
  
  // Generate a consistent placeholder based on product title
  const getPlaceholderIndex = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % placeholderImages.length;
  };
  
  // Use URL if available, otherwise fallback to link
  const productUrl = url || link;
  
  const handleCardClick = () => {
    if (productUrl) {
      window.open(productUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  const handleImageError = () => {
    console.log(`Image failed to load for ${title}, using placeholder`);
    setImageError(true);
  };
  
  // Select image source: original product image or fallback to placeholder
  const imageSource = !imageError && images && images.length > 0 
    ? images[0] 
    : placeholderImages[getPlaceholderIndex(title)];
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card 
        className={`h-full hover:shadow-lg transition-all duration-300 ${productUrl ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
      >
        <div className="w-full h-48 overflow-hidden relative">
          <img 
            src={imageSource} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          {productUrl && (
            <div className="absolute top-2 right-2 bg-mai-coral p-1 rounded-full">
              <ExternalLink className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
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
