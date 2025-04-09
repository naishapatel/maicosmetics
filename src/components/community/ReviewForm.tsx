
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@/components/ui/rating";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/auth-helpers-react";

const CATEGORIES = [
  "Skincare",
  "Makeup",
  "Foundation",
  "Concealer", 
  "Lipstick",
  "Cleanser",
  "Moisturizer"
];

interface ReviewFormProps {
  user: User;
  onReviewSubmitted: () => void;
}

export function ReviewForm({ user, onReviewSubmitted }: ReviewFormProps) {
  const { toast } = useToast();
  const [newReview, setNewReview] = useState({
    product_name: "",
    review_text: "",
    rating: 0,
    categories: [] as string[],
  });

  const handleCategoryChange = (category: string) => {
    setNewReview(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("community_reviews").insert([
        {
          user_id: user.id,
          ...newReview,
        },
      ]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error submitting review",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Review submitted successfully",
        description: "Thank you for your review!",
      });

      setNewReview({
        product_name: "",
        review_text: "",
        rating: 0,
        categories: [],
      });
      
      onReviewSubmitted();
    } catch (error) {
      console.error("Error in handleSubmitReview:", error);
      toast({
        variant: "destructive",
        title: "Error submitting review",
        description: "Failed to submit review",
      });
    }
  };

  return (
    <form onSubmit={handleSubmitReview} className="space-y-4">
      <Input
        placeholder="Product Name"
        value={newReview.product_name}
        onChange={(e) =>
          setNewReview({ ...newReview, product_name: e.target.value })
        }
        required
      />
      <Textarea
        placeholder="Your Review"
        value={newReview.review_text}
        onChange={(e) =>
          setNewReview({ ...newReview, review_text: e.target.value })
        }
        required
      />
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Rating:</span>
        <Rating
          value={newReview.rating}
          onChange={(value) => setNewReview({ ...newReview, rating: value })}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm text-gray-600">Categories:</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              type="button"
              variant={newReview.categories.includes(category) ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      <Button type="submit">Submit Review</Button>
    </form>
  );
}
