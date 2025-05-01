
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ExternalLink, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/data/products";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

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
  link_status,
  alternative_product_id,
  brand,
  business_tags,
  certifications,
  category
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [linkTested, setLinkTested] = useState(false);
  
  // Prioritize URL if available, otherwise fallback to link
  const productUrl = url || link;
  const isValidUrl = productUrl ? true : false;
  
  // Extract company homepage from URL or link if available
  const getCompanyHomepage = () => {
    if (!productUrl) return null;
    
    try {
      const url = new URL(productUrl);
      return `${url.protocol}//${url.hostname}`;
    } catch (e) {
      // If URL parsing fails, return the original URL
      return productUrl;
    }
  };
  
  const companyHomepage = getCompanyHomepage();
  
  // Determine which name property to use, with fallbacks
  const displayName = title || name || product_name || "";
  
  const handleCardClick = (e: React.MouseEvent) => {
    // If we have an internal ID, navigate to product detail
    if (id) {
      navigate(`/products/${id}`);
      return;
    }
    
    // Otherwise try to open external URL if available
    if (productUrl && isValidUrl) {
      e.preventDefault();
      
      let urlToOpen = productUrl;
      
      // If this link is known to be broken or redirected
      if (link_status === 'broken' || link_status === 'redirected' || link_status === 'discontinued') {
        toast({
          title: link_status === 'discontinued' ? "Product discontinued" : "Link may be outdated",
          description: link_status === 'discontinued' 
            ? "This product appears to be discontinued. Redirecting to the company's homepage."
            : "We're redirecting you to the company's homepage instead.",
          variant: "destructive"
        });
        
        // If the link is broken or discontinued, use the company homepage
        if (companyHomepage) {
          urlToOpen = companyHomepage;
        }
        
        // Redirect to alternative product if it's discontinued and we have an alternative
        if (link_status === 'discontinued' && alternative_product_id) {
          navigate(`/products/${alternative_product_id}`);
          return;
        }
      }
      
      window.open(urlToOpen, '_blank', 'noopener,noreferrer');
      
      // Record link click for analytics
      setLinkTested(true);
    }
  };
  
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from triggering
    
    if (productUrl && isValidUrl) {
      let urlToOpen = productUrl;
      
      // If this link is known to be broken or redirected
      if (link_status === 'broken' || link_status === 'redirected' || link_status === 'discontinued') {
        toast({
          title: link_status === 'discontinued' ? "Product discontinued" : "Link may be outdated",
          description: link_status === 'discontinued' 
            ? "This product appears to be discontinued. Redirecting to the company's homepage."
            : "We're redirecting you to the company's homepage instead.",
          variant: "destructive"
        });
        
        // If the link is broken or discontinued, use the company homepage
        if (companyHomepage) {
          urlToOpen = companyHomepage;
        }
        
        // Redirect to alternative product if it's discontinued and we have an alternative
        if (link_status === 'discontinued' && alternative_product_id) {
          navigate(`/products/${alternative_product_id}`);
          return;
        }
      }
      
      window.open(urlToOpen, '_blank', 'noopener,noreferrer');
      
      // Record link click for analytics
      setLinkTested(true);
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
          <p className="text-lg font-medium text-mai-coral">{price}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{description}</p>
          
          {productUrl && isValidUrl && (
            <div 
              className="flex items-center mt-4 text-mai-mauve cursor-pointer hover:text-mai-mauveDark transition-colors"
              onClick={handleLinkClick}
            >
              {link_status === 'broken' || link_status === 'discontinued' || link_status === 'redirected' ? (
                <>
                  <AlertCircle className="w-4 h-4 mr-1 text-amber-500" />
                  <span className="text-sm">
                    {link_status === 'discontinued' ? 'View company website' : 'Visit company website'}
                  </span>
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  <span className="text-sm">View product</span>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
