import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/auth-helpers-react";

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

  const handleSubmitRecommendation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("product_recommendations").insert([
        {
          user_id: user.id,
          ...recommendation,
        },
      ]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error submitting recommendation",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Recommendation submitted successfully",
        description: "Thank you for your recommendation!",
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
        description: "Failed to submit recommendation",
      });
    }
  };

  return (
    <form onSubmit={handleSubmitRecommendation} className="space-y-4">
      <Input
        placeholder="Product Name"
        value={recommendation.product_name}
        onChange={(e) =>
          setRecommendation({ ...recommendation, product_name: e.target.value })
        }
        required
      />
      <Input
        placeholder="Brand"
        value={recommendation.brand}
        onChange={(e) =>
          setRecommendation({ ...recommendation, brand: e.target.value })
        }
        required
      />
      <Select
        value={recommendation.category}
        onValueChange={(value) =>
          setRecommendation({ ...recommendation, category: value })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="skincare">Skincare</SelectItem>
          <SelectItem value="makeup">Makeup</SelectItem>
          <SelectItem value="haircare">Haircare</SelectItem>
          <SelectItem value="bodycare">Bodycare</SelectItem>
          <SelectItem value="fragrance">Fragrance</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        placeholder="Why do you recommend this product?"
        value={recommendation.description}
        onChange={(e) =>
          setRecommendation({ ...recommendation, description: e.target.value })
        }
        required
      />
      <Button type="submit">Submit Recommendation</Button>
    </form>
  );
}