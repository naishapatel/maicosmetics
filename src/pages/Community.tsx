import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Community = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    productName: "",
    reviewText: "",
    rating: 5
  });
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setSession(session);
        fetchReviews();
      }
    });
  }, [navigate]);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from("community_reviews")
      .select(`
        *,
        profiles:profiles(username)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error fetching reviews",
        description: error.message
      });
    } else {
      setReviews(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    const { error } = await supabase.from("community_reviews").insert({
      user_id: session.user.id,
      product_name: newReview.productName,
      review_text: newReview.reviewText,
      rating: newReview.rating
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error submitting review",
        description: error.message
      });
    } else {
      toast({
        title: "Review submitted successfully!",
        description: "Your review has been added to the community."
      });
      setNewReview({ productName: "", reviewText: "", rating: 5 });
      fetchReviews();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <h1 className="text-3xl font-bold text-mai-brown mb-8">Community Reviews</h1>
        
        <form onSubmit={handleSubmit} className="mb-12 bg-mai-sand p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-mai-brown mb-4">Share Your Review</h2>
          <div className="space-y-4">
            <Input
              placeholder="Product Name"
              value={newReview.productName}
              onChange={(e) => setNewReview(prev => ({ ...prev, productName: e.target.value }))}
              required
            />
            <Textarea
              placeholder="Write your review..."
              value={newReview.reviewText}
              onChange={(e) => setNewReview(prev => ({ ...prev, reviewText: e.target.value }))}
              required
              className="min-h-[100px]"
            />
            <div className="flex items-center gap-2">
              <span className="text-mai-brown">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                  className={`focus:outline-none ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <Star className="w-6 h-6 fill-current" />
                </button>
              ))}
            </div>
            <Button type="submit" className="w-full bg-mai-coral hover:bg-mai-brown">
              Submit Review
            </Button>
          </div>
        </form>

        <div className="grid gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="text-mai-brown">{review.product_name}</span>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardTitle>
                <p className="text-sm text-gray-500">
                  by {review.profiles?.username || 'Anonymous'}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{review.review_text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;