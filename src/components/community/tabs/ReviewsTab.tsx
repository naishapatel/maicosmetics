
import { useState, useEffect } from "react";
import { ReviewForm } from "@/components/community/ReviewForm";
import { ReviewList } from "@/components/community/ReviewList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Session } from "@supabase/auth-helpers-react";

interface ReviewsTabProps {
  session: Session | null;
  onAuthRedirect: () => void;
}

export function ReviewsTab({ session, onAuthRedirect }: ReviewsTabProps) {
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [searchQuery, selectedCategory]);

  const fetchReviews = async () => {
    try {
      let query = supabase
        .from("community_reviews")
        .select("*, profiles(username)")
        .order("created_at", { ascending: false });

      if (searchQuery) {
        query = query.or(`product_name.ilike.%${searchQuery}%,review_text.ilike.%${searchQuery}%`);
      }

      if (selectedCategory) {
        query = query.contains("categories", [selectedCategory]);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching reviews:", error);
        toast({
          variant: "destructive",
          title: "Error fetching reviews",
          description: error.message,
        });
        return;
      }

      if (data) {
        setReviews(data);
      }
    } catch (error) {
      console.error("Error in fetchReviews:", error);
      toast({
        variant: "destructive",
        title: "Error fetching reviews",
        description: "Failed to fetch reviews",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-mai-sage/20 rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold text-mai-brown mb-4">
          Write a Review
        </h2>
        {session ? (
          <ReviewForm user={session.user} onReviewSubmitted={fetchReviews} />
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Please sign in to write a review
            </p>
            <Button onClick={onAuthRedirect}>Sign In</Button>
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <Input
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {["Skincare", "Makeup", "Foundation", "Concealer", "Lipstick", "Cleanser", "Moisturizer"].map(
          (category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          )
        )}
      </div>
      
      <ReviewList reviews={reviews} />
    </div>
  );
}
