
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  images?: string[];
  link?: string;
  url?: string;
}

export const ProductCard = ({ title, description, price, images, link, url }: ProductCardProps) => {
  // Default placeholder image if no images are provided
  const placeholderImage = "/placeholder.svg";
  
  // Use URL if available, otherwise fallback to link
  const productUrl = url || link;
  
  const handleCardClick = () => {
    if (productUrl) {
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
        className={`h-full hover:shadow-lg transition-all duration-300 ${productUrl ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
      >
        {images && images.length > 0 ? (
          <div className="w-full h-48 overflow-hidden relative">
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
            {productUrl && (
              <div className="absolute top-2 right-2 bg-mai-coral p-1 rounded-full">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center relative">
            <img 
              src={placeholderImage} 
              alt="Product placeholder" 
              className="w-20 h-20 opacity-30"
            />
            {productUrl && (
              <div className="absolute top-2 right-2 bg-mai-coral p-1 rounded-full">
                <ExternalLink className="w-4 h-4 text-white" />
              </div>
            )}
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
