
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bookmark, BookmarkCheck, ChevronLeft, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ProductRecommendation } from "@/types/quiz";

export function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const session = useSession();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<ProductRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<ProductRecommendation[]>([]);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = async () => {
    setIsLoading(true);
    try {
      // Fetch product details
      const { data, error } = await supabase
        .from("product_recommendations")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw error;
      
      if (data) {
        // Map database result to match ProductRecommendation type
        const mappedProduct: ProductRecommendation = {
          id: data.id,
          name: data.product_name, // Use product_name as name
          brand: data.brand,
          price: data.price,
          description: data.description,
          makeup_type: data.makeup_type,
          category: data.category,
          ethical_values: data.ethical_values || [],
          business_tags: data.business_tags,
          imageUrl: data.images?.[0], // Use first image as imageUrl if available
          product_name: data.product_name, // Include both fields
          skin_benefits: data.skin_benefits,
          user_id: data.user_id,
          images: data.images
        };
        
        setProduct(mappedProduct);
        
        // Fetch similar products (same category or brand)
        const { data: similarData, error: similarError } = await supabase
          .from("product_recommendations")
          .select("*")
          .or(`category.eq.${data.category},brand.eq.${data.brand}`)
          .neq("id", productId)
          .limit(3);
          
        if (!similarError && similarData) {
          // Map similar products to match ProductRecommendation type
          const mappedSimilarProducts = similarData.map(item => ({
            id: item.id,
            name: item.product_name, // Use product_name as name
            brand: item.brand,
            price: item.price,
            description: item.description,
            makeup_type: item.makeup_type,
            category: item.category,
            ethical_values: item.ethical_values || [],
            business_tags: item.business_tags,
            imageUrl: item.images?.[0],
            product_name: item.product_name,
            skin_benefits: item.skin_benefits,
            user_id: item.user_id,
            images: item.images
          }));
          
          setSimilarProducts(mappedSimilarProducts);
        }
        
        // Check if user has saved this product (in a real implementation)
        // For now, we'll just simulate this
        setIsSaved(false);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast({
        variant: "destructive",
        title: "Error loading product",
        description: "Could not load the product details.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save products",
      });
      return;
    }
    
    // In a real implementation, you would save to a user_saved_items table
    // For now, we'll just toggle the state
    setIsSaved(!isSaved);
    
    toast({
      title: isSaved ? "Product removed" : "Product saved",
      description: isSaved 
        ? "Product removed from your saved items" 
        : "Product added to your saved items",
    });
  };

  const handleSubmitReview = async () => {
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to leave a review",
      });
      return;
    }
    
    if (!userReview.trim()) {
      toast({
        variant: "destructive",
        title: "Empty review",
        description: "Please write something in your review",
      });
      return;
    }
    
    setIsSubmittingReview(true);
    
    try {
      // In a real implementation, you would save to a reviews table
      // For now, we'll just show a success message
      
      setTimeout(() => {
        setUserReview("");
        toast({
          title: "Review submitted",
          description: "Your review has been successfully submitted",
        });
      }, 1000);
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not submit your review",
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-center">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-center">Product not found</p>
        <Button 
          onClick={() => navigate(-1)} 
          variant="outline" 
          className="mx-auto mt-4 block"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-2" /> Back
      </Button>
      
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold text-mai-brown">{product.name}</CardTitle>
              <p className="text-gray-500">{product.brand}</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSaveProduct}
              className="flex items-center gap-2"
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-4 w-4 text-mai-mauve" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xl font-medium text-mai-mauve">{product.price}</p>
            <p className="mt-4 text-gray-700">{product.description}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Category</h3>
            <p className="inline-block px-3 py-1 bg-mai-sand rounded-full text-sm">
              {product.category}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Ethical Values</h3>
            <div className="flex flex-wrap gap-2">
              {product.ethical_values && product.ethical_values.map((value, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-mai-mauve/10 text-mai-mauve rounded-full text-sm"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
          
          {session && (
            <div className="border-t pt-6 mt-6">
              <h3 className="font-medium mb-3">Leave a Review</h3>
              <Textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                placeholder="Share your experience with this product..."
                rows={4}
                className="mb-4"
              />
              <Button 
                onClick={handleSubmitReview} 
                disabled={isSubmittingReview}
                className="bg-mai-mauve hover:bg-mai-mauveDark"
              >
                {isSubmittingReview ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {similarProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-mai-brown mb-4">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {similarProducts.map((item) => (
              <Card 
                key={item.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/products/${item.id}`)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold text-mai-brown">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <p className="text-mai-mauve mt-1">{item.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
