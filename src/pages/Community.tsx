import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Rating } from "@/components/ui/rating";
import { format } from "date-fns";
import { useSession } from "@supabase/auth-helpers-react";
import { Star } from "lucide-react";

const Community = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const session = useSession();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    product_name: "",
    review_text: "",
    rating: 0,
  });
  const [recommendation, setRecommendation] = useState({
    product_name: "",
    brand: "",
    category: "",
    description: "",
  });

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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!session) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to submit a review",
      });
      return;
    }

    try {
      const { error } = await supabase.from("community_reviews").insert([
        {
          user_id: session.user.id,
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
      });

      fetchReviews();
    } catch (error) {
      console.error("Error in handleSubmitReview:", error);
      toast({
        variant: "destructive",
        title: "Error submitting review",
        description: "Failed to submit review",
      });
    }
  };

  const handleSubmitRecommendation = async (e) => {
    e.preventDefault();
    if (!session) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to submit a recommendation",
      });
      return;
    }

    try {
      const { error } = await supabase.from("product_recommendations").insert([
        {
          user_id: session.user.id,
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
      });
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
                      onChange={(value) =>
                        setNewReview({ ...newReview, rating: value })
                      }
                    />
                  </div>
                  <Button type="submit">Submit Review</Button>
                </form>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Please sign in to write a review
                  </p>
                  <Button onClick={handleAuthRedirect}>Sign In</Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white shadow rounded-lg p-6 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-mai-brown">
                        {review.product_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        by {review.profiles?.username || "Anonymous"} •{" "}
                        {format(new Date(review.created_at), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.review_text}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="bg-mai-sage/20 rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-semibold text-mai-brown mb-4">
                Recommend a Product
              </h2>
              {session ? (
                <form onSubmit={handleSubmitRecommendation} className="space-y-4">
                  <Input
                    placeholder="Product Name"
                    value={recommendation.product_name}
                    onChange={(e) =>
                      setRecommendation({
                        ...recommendation,
                        product_name: e.target.value,
                      })
                    }
                    required
                  />
                  <Input
                    placeholder="Brand"
                    value={recommendation.brand}
                    onChange={(e) =>
                      setRecommendation({
                        ...recommendation,
                        brand: e.target.value,
                      })
                    }
                    required
                  />
                  <Select
                    value={recommendation.category}
                    onValueChange={(value) =>
                      setRecommendation({
                        ...recommendation,
                        category: value,
                      })
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
                      setRecommendation({
                        ...recommendation,
                        description: e.target.value,
                      })
                    }
                    required
                  />
                  <Button type="submit">Submit Recommendation</Button>
                </form>
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