
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Product } from "@/data/products";
import { useState } from "react";
import { toast } from "sonner";

type ProductCardProps = Partial<Product> & {
  description: string;
  price: string;
};

export const ProductCard = ({ 
  title, 
  name, 
  product_name, 
  description, 
  price, 
  link, 
  url,
  link_status,
  alternative_product_id,
  brand,
  business_tags,
  certifications,
  category
}: ProductCardProps) => {
  const [linkClicked, setLinkClicked] = useState(false);
  
  // Prioritize URL if available, otherwise fallback to link
  const productUrl = url || link;
  
  // Extract company homepage from URL or link if available
  const getCompanyHomepage = () => {
    if (!productUrl) return null;
    
    try {
      const url = new URL(productUrl);
      return `${url.protocol}//${url.hostname}`;
    } catch (e) {
      // If URL parsing fails, return null
      console.error(`Failed to parse URL: ${productUrl}`, e);
      return null;
    }
  };
  
  const companyHomepage = getCompanyHomepage();
  
  // Determine which name property to use, with fallbacks
  const displayName = title || name || product_name || "";
  
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from triggering
    
    if (!linkClicked) {
      setLinkClicked(true);
    }
    
    if (companyHomepage) {
      window.open(companyHomepage, '_blank', 'noopener,noreferrer');
      toast.success("Visiting company website");
    } else {
      toast.error("Company website unavailable");
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card 
        className="h-full hover:shadow-lg transition-all duration-300"
      >
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-mai-brown">{displayName}</CardTitle>
          <p className="text-lg font-medium text-mai-coral">{price}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{description}</p>
          
          {companyHomepage && (
            <div 
              className="flex items-center mt-4 text-mai-mauve cursor-pointer hover:text-mai-mauveDark transition-colors"
              onClick={handleLinkClick}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              <span className="text-sm">View company website</span>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
