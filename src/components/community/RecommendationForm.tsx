
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/auth-helpers-react";
import { EthicalValuesSelect } from "./EthicalValuesSelect";

interface RecommendationFormProps {
  user: User | null;
  onRecommendationSubmitted: () => void;
}

export function RecommendationForm({
  user,
  onRecommendationSubmitted,
}: RecommendationFormProps) {
  const { toast } = useToast();
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [sustainabilityFeatures, setSustainabilityFeatures] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        variant: "destructive",
        title: "Not authenticated",
        description: "You must be signed in to submit a recommendation.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert into product_recommendations table instead of community_reviews
      const { data, error } = await supabase
        .from("product_recommendations")
        .insert({
          user_id: user.id,
          product_name: productName,
          brand: brandName,
          description: reviewText,
          category: categories.length > 0 ? categories[0] : "Other", // Use first category as main category
          ethical_values: sustainabilityFeatures,
          price: "Not specified", // Required field in the schema
          makeup_type: "Not specified", // Required field in the schema
          // Add any other required fields for the product_recommendations table
        })
        .select();

      if (error) {
        console.error("Error submitting recommendation:", error);
        toast({
          variant: "destructive",
          title: "Error submitting recommendation",
          description: error.message,
        });
        return;
      }

      setProductName("");
      setBrandName("");
      setReviewText("");
      setCategories([]);
      setSustainabilityFeatures([]);

      toast({
        title: "Recommendation submitted",
        description: "Your recommendation has been successfully submitted.",
      });

      onRecommendationSubmitted();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast({
        variant: "destructive",
        title: "Error submitting recommendation",
        description: "Failed to submit recommendation",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="brandName">Brand Name</Label>
        <Input
          id="brandName"
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reviewText">Review</Label>
        <Textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="categories">Categories</Label>
        <Input
          id="categories"
          type="text"
          value={categories.join(", ")}
          onChange={(e) => setCategories(e.target.value.split(",").map((s) => s.trim()))}
          placeholder="e.g., Skincare, Cruelty-free"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="sustainabilityFeatures">Sustainability & Ethical Values</Label>
        <EthicalValuesSelect 
          selected={sustainabilityFeatures}
          onChange={setSustainabilityFeatures}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Recommendation"}
      </Button>
    </form>
  );
}
