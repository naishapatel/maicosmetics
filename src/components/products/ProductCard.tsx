
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  images?: string[];
  link?: string;
  url?: string;
}

export const ProductCard = ({ title, description, price, images, link, url }: ProductCardProps) => {
  const [imageSource, setImageSource] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use URL if available, otherwise fallback to link
  const productUrl = url || link;
  
  useEffect(() => {
    const fetchProductImage = async () => {
      setIsLoading(true);
      
      // First try using provided images
      if (images && images.length > 0) {
        setImageSource(images[0]);
        setIsLoading(false);
        return;
      }
      
      // If no images provided, generate a brand-focused placeholder
      if (!productUrl) {
        generatePlaceholder();
        return;
      }
      
      // Extract brand name from URL for better placeholder if needed
      const brandName = extractBrandName(productUrl);
      const productType = title.toLowerCase().includes("serum") ? "serum" : 
                         title.toLowerCase().includes("balm") ? "balm" :
                         title.toLowerCase().includes("powder") ? "powder" :
                         title.toLowerCase().includes("spray") ? "spray" :
                         "beauty product";
      
      // Generate Unsplash-based placeholder with brand and product type
      const placeholderUrl = `https://source.unsplash.com/random/800x600/?${brandName},${productType}`;
      setImageSource(placeholderUrl);
      setIsLoading(false);
    };
    
    fetchProductImage();
  }, [images, productUrl, title]);
  
  const extractBrandName = (url: string): string => {
    try {
      // Extract domain name without TLD
      const hostname = new URL(url).hostname;
      const domainParts = hostname.split('.');
      // Remove www. if present and take the main domain name
      return domainParts[0] === 'www' ? domainParts[1] : domainParts[0];
    } catch (e) {
      // If URL parsing fails, extract from product title
      const words = title.split(' ');
      return words[0].toLowerCase();
    }
  };
  
  const generatePlaceholder = () => {
    // Extract potential brand name from title
    const words = title.split(' ');
    const brand = words[0].toLowerCase();
    const productType = title.toLowerCase().includes("serum") ? "serum" : 
                       title.toLowerCase().includes("balm") ? "balm" :
                       title.toLowerCase().includes("powder") ? "powder" :
                       title.toLowerCase().includes("spray") ? "spray" :
                       "beauty product";
    
    const placeholderUrl = `https://source.unsplash.com/random/800x600/?${brand},${productType}`;
    setImageSource(placeholderUrl);
    setIsLoading(false);
  };
  
  const handleImageError = () => {
    console.log(`Image failed to load for ${title}, using placeholder`);
    generatePlaceholder();
  };
  
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
        <div className="w-full h-48 overflow-hidden relative">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="animate-pulse rounded-full h-12 w-12 bg-mai-coral"></div>
            </div>
          ) : (
            <img 
              src={imageSource || ''}
              alt={title} 
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          )}
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
