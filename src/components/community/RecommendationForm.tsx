import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/auth-helpers-react";
import { Label } from "@/components/ui/label";

interface RecommendationFormProps {
  user: User;
  onRecommendationSubmitted: () => void;
}

const ETHICAL_VALUES = [
  { id: "vegan", label: "Vegan" },
  { id: "natural", label: "Natural" },
  { id: "sustainable", label: "Sustainable" },
  { id: "eco-friendly", label: "Eco-Friendly" },
  { id: "cruelty-free", label: "Cruelty-Free" },
  { id: "organic", label: "Organic" },
  { id: "fair-trade", label: "Fair Trade" },
];

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
      console.log("Submitting recommendation:", {
        user_id: user.id,
        ...recommendation,
      });

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
        required
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
      <Select
        value={recommendation.makeup_type}
        onValueChange={(value) =>
          setRecommendation({ ...recommendation, makeup_type: value })
        }
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Makeup Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="foundation">Foundation</SelectItem>
          <SelectItem value="concealer">Concealer</SelectItem>
          <SelectItem value="blush">Blush</SelectItem>
          <SelectItem value="bronzer">Bronzer</SelectItem>
          <SelectItem value="eyeshadow">Eyeshadow</SelectItem>
          <SelectItem value="mascara">Mascara</SelectItem>
          <SelectItem value="lipstick">Lipstick</SelectItem>
          <SelectItem value="none">None</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Price"
        type="text"
        value={recommendation.price}
        onChange={(e) =>
          setRecommendation({ ...recommendation, price: e.target.value })
        }
        required
      />
      <Textarea
        placeholder="Why do you recommend this product?"
        value={recommendation.description}
        onChange={(e) =>
          setRecommendation({ ...recommendation, description: e.target.value })
        }
        required
      />
      <div className="space-y-4">
        <Label>Ethical Values</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ETHICAL_VALUES.map((value) => (
            <div key={value.id} className="flex items-center space-x-2">
              <Checkbox
                id={value.id}
                checked={recommendation.ethical_values.includes(value.id)}
                onCheckedChange={(checked) => 
                  handleEthicalValueChange(value.id, checked as boolean)
                }
              />
              <Label htmlFor={value.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {value.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Button type="submit">Submit Recommendation</Button>
    </form>
  );
}