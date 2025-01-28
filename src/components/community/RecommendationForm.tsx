import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/auth-helpers-react";
import { ProductDetailsFields } from "./ProductDetailsFields";
import { EthicalValuesSelect } from "./EthicalValuesSelect";

interface RecommendationFormProps {
  user: User;
  onRecommendationSubmitted: () => void;
}

export function RecommendationForm({ user, onRecommendationSubmitted }: RecommendationFormProps) {
  const { toast } = useToast();
  const [recommendation, setRecommendation] = useState({
    product_name: "",
    brand: "",
    category: "",
    description: "",
    makeup_type: "none",
    price: "0",
    ethical_values: [] as string[],
  });

  const handleFieldChange = (field: string, value: string) => {
    setRecommendation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEthicalValueChange = (value: string, checked: boolean) => {
    setRecommendation(prev => ({
      ...prev,
      ethical_values: checked
        ? [...prev.ethical_values, value]
        : prev.ethical_values.filter(v => v !== value)
    }));
  };

  const handleSubmitRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to submit a recommendation.",
      });
      return;
    }

    try {
      const { error } = await supabase.from("product_recommendations").insert([
        {
          user_id: user.id,
          ...recommendation,
        },
      ]);

      if (error) {
        console.error("Error details:", error);
        toast({
          variant: "destructive",
          title: "Error submitting recommendation",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Your recommendation has been submitted successfully.",
      });

      setRecommendation({
        product_name: "",
        brand: "",
        category: "",
        description: "",
        makeup_type: "none",
        price: "0",
        ethical_values: [],
      });
      
      onRecommendationSubmitted();
    } catch (error) {
      console.error("Error in handleSubmitRecommendation:", error);
      toast({
        variant: "destructive",
        title: "Error submitting recommendation",
        description: "Failed to submit recommendation. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmitRecommendation} className="space-y-4">
      <ProductDetailsFields 
        values={recommendation}
        onChange={handleFieldChange}
      />
      <EthicalValuesSelect
        selectedValues={recommendation.ethical_values}
        onValueChange={handleEthicalValueChange}
      />
      <Button type="submit">Submit Recommendation</Button>
    </form>
  );
}