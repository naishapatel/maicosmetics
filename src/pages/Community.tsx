import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@supabase/auth-helpers-react";
import { ReviewForm } from "@/components/community/ReviewForm";
import { RecommendationForm } from "@/components/community/RecommendationForm";
import { ReviewList } from "@/components/community/ReviewList";

const Community = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const session = useSession();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAuthRedirect = () => {
    navigate("/auth");
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("community_reviews")
        .select("*, profiles(username)")
        .order("created_at", { ascending: false });

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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">Community Reviews</TabsTrigger>
            <TabsTrigger value="recommendations">Recommend a Product</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-8">
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
                  <Button onClick={handleAuthRedirect}>Sign In</Button>
                </div>
              )}
            </div>
            <ReviewList reviews={reviews} />
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="bg-mai-sage/20 rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-semibold text-mai-brown mb-4">
                Recommend a Product
              </h2>
              {session ? (
                <RecommendationForm
                  user={session.user}
                  onRecommendationSubmitted={fetchReviews}
                />
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Please sign in to recommend a product
                  </p>
                  <Button onClick={handleAuthRedirect}>Sign In</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;