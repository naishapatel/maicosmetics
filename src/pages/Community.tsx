import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [newRecommendation, setNewRecommendation] = useState({
    productName: "",
    brand: "",
    description: "",
    price: "",
    makeupType: "",
    category: "",
    ethicalValues: []
  });
  const [session, setSession] = useState(null);

  const makeupTypes = [
    "Foundation", "Concealer", "Blush", "Bronzer", "Highlighter",
    "Eyeshadow", "Eyeliner", "Mascara", "Lipstick", "Lip Gloss"
  ];

  const categories = [
    "Sustainable Beauty", "Eco-Friendly Beauty", "Vegan Beauty",
    "Products for Acne", "Products for College Kids"
  ];

  const ethicalValues = [
    "Cruelty-Free", "Vegan", "Sustainable Packaging",
    "Natural Ingredients", "Fair Trade", "Organic"
  ];

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
    try {
      const { data, error } = await supabase
        .from("community_reviews")
        .select(`
          id,
          product_name,
          review_text,
          rating,
          created_at,
          profiles (
            username
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
        toast({
          variant: "destructive",
          title: "Error fetching reviews",
          description: error.message
        });
      } else {
        setReviews(data || []);
      }
    } catch (error) {
      console.error("Error in fetchReviews:", error);
      toast({
        variant: "destructive",
        title: "Error fetching reviews",
        description: "Failed to fetch reviews"
      });
    }
  };

  const handleReviewSubmit = async (e) => {
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

  const handleRecommendationSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    const { error } = await supabase.from("product_recommendations").insert({
      user_id: session.user.id,
      product_name: newRecommendation.productName,
      brand: newRecommendation.brand,
      description: newRecommendation.description,
      price: newRecommendation.price,
      makeup_type: newRecommendation.makeupType,
      category: newRecommendation.category,
      ethical_values: newRecommendation.ethicalValues
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error submitting recommendation",
        description: error.message
      });
    } else {
      toast({
        title: "Recommendation submitted successfully!",
        description: "Your product recommendation has been added."
      });
      setNewRecommendation({
        productName: "",
        brand: "",
        description: "",
        price: "",
        makeupType: "",
        category: "",
        ethicalValues: []
      });
    }
  };

  // ... keep existing code (JSX for the component UI)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <h1 className="text-3xl font-bold text-mai-brown mb-8">Community</h1>
        
        <Tabs defaultValue="reviews" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="recommend">Recommend a Product</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews">
            <form onSubmit={handleReviewSubmit} className="mb-12 bg-mai-sand p-6 rounded-lg">
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
          </TabsContent>

          <TabsContent value="recommend">
            <form onSubmit={handleRecommendationSubmit} className="bg-mai-sand p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-semibold text-mai-brown mb-4">Recommend a Product</h2>
              
              <Input
                placeholder="Product Name"
                value={newRecommendation.productName}
                onChange={(e) => setNewRecommendation(prev => ({ ...prev, productName: e.target.value }))}
                required
              />

              <Input
                placeholder="Brand"
                value={newRecommendation.brand}
                onChange={(e) => setNewRecommendation(prev => ({ ...prev, brand: e.target.value }))}
                required
              />

              <Textarea
                placeholder="Description"
                value={newRecommendation.description}
                onChange={(e) => setNewRecommendation(prev => ({ ...prev, description: e.target.value }))}
                required
                className="min-h-[100px]"
              />

              <Input
                placeholder="Price"
                value={newRecommendation.price}
                onChange={(e) => setNewRecommendation(prev => ({ ...prev, price: e.target.value }))}
                required
              />

              <Select
                value={newRecommendation.makeupType}
                onValueChange={(value) => setNewRecommendation(prev => ({ ...prev, makeupType: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Makeup Type" />
                </SelectTrigger>
                <SelectContent>
                  {makeupTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={newRecommendation.category}
                onValueChange={(value) => setNewRecommendation(prev => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <label className="text-sm font-medium text-mai-brown">Ethical Values (Select multiple)</label>
                <div className="grid grid-cols-2 gap-2">
                  {ethicalValues.map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant={newRecommendation.ethicalValues.includes(value.toLowerCase()) ? "default" : "outline"}
                      className={`text-sm ${
                        newRecommendation.ethicalValues.includes(value.toLowerCase())
                          ? "bg-mai-coral hover:bg-mai-brown"
                          : "hover:bg-mai-sage/20"
                      }`}
                      onClick={() => {
                        const lowerValue = value.toLowerCase();
                        setNewRecommendation(prev => ({
                          ...prev,
                          ethicalValues: prev.ethicalValues.includes(lowerValue)
                            ? prev.ethicalValues.filter(v => v !== lowerValue)
                            : [...prev.ethicalValues, lowerValue]
                        }));
                      }}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full bg-mai-coral hover:bg-mai-brown">
                Submit Recommendation
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
