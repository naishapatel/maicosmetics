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
  const [isValidUrl, setIsValidUrl] = useState(true);
  
  // Prioritize URL if available, otherwise fallback to link
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
      
      // If no product URL, generate a placeholder
      if (!productUrl) {
        generatePlaceholder();
        return;
      }
      
      try {
        // Validate the URL by creating a URL object
        try {
          new URL(productUrl);
          setIsValidUrl(true);
        } catch (e) {
          console.error(`Invalid URL format for ${title}: ${productUrl}`);
          setIsValidUrl(false);
        }
        
        // Only attempt to use targeted placeholder if URL is valid
        if (isValidUrl && productUrl) {
          console.log(`Fetching image for product: ${title} from URL: ${productUrl}`);
          
          // Extract brand name and details for better placeholder
          const brandName = extractBrandName(productUrl);
          const productType = extractProductType(title);
          
          // Create a more targeted placeholder based on brand and product type
          const placeholderUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(brandName)},${encodeURIComponent(productType)},cosmetics`;
          console.log(`Using targeted placeholder: ${placeholderUrl}`);
          setImageSource(placeholderUrl);
        } else {
          generatePlaceholder();
        }
      } catch (error) {
        console.error(`Error fetching image for ${title}:`, error);
        generatePlaceholder();
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProductImage();
  }, [images, productUrl, title, isValidUrl]);
  
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
  
  const extractProductType = (productTitle: string): string => {
    const lowercaseTitle = productTitle.toLowerCase();
    
    if (lowercaseTitle.includes("serum")) return "serum";
    if (lowercaseTitle.includes("balm") || lowercaseTitle.includes("butter")) return "balm";
    if (lowercaseTitle.includes("powder")) return "powder";
    if (lowercaseTitle.includes("spray")) return "spray";
    if (lowercaseTitle.includes("oil")) return "oil";
    if (lowercaseTitle.includes("cream")) return "cream";
    if (lowercaseTitle.includes("palette")) return "palette";
    if (lowercaseTitle.includes("stain")) return "stain";
    if (lowercaseTitle.includes("tint")) return "tint";
    if (lowercaseTitle.includes("eyeshadow")) return "eyeshadow";
    if (lowercaseTitle.includes("lipstick") || lowercaseTitle.includes("lip")) return "lipstick";
    if (lowercaseTitle.includes("blush")) return "blush";
    
    // Default to a more generic term
    return "beauty product";
  };
  
  const generatePlaceholder = () => {
    // Extract potential brand name from title
    const words = title.split(' ');
    const brand = words[0].toLowerCase();
    const productType = extractProductType(title);
    
    const placeholderUrl = `https://source.unsplash.com/featured/?${encodeURIComponent(brand)},${encodeURIComponent(productType)},cosmetics`;
    setImageSource(placeholderUrl);
    setIsLoading(false);
  };
  
  const handleImageError = () => {
    console.log(`Image failed to load for ${title}, using placeholder`);
    generatePlaceholder();
  };
  
  const handleCardClick = () => {
    if (productUrl && isValidUrl) {
      window.open(productUrl, '_blank', 'noopener,noreferrer');
    } else if (productUrl) {
      console.error(`Cannot open invalid URL for ${title}: ${productUrl}`);
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
          {productUrl && isValidUrl && (
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
          {productUrl && !isValidUrl && (
            <p className="text-red-500 text-sm mt-2">Product link unavailable</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
