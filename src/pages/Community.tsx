
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "@supabase/auth-helpers-react";
import { ReviewForm } from "@/components/community/ReviewForm";
import { RecommendationForm } from "@/components/community/RecommendationForm";
import { ReviewList } from "@/components/community/ReviewList";
import { ProfileCard } from "@/components/community/ProfileCard";
import { SustainabilityDiscussion } from "@/components/community/SustainabilityDiscussion";

const Community = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const session = useSession();
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  // Get the tab from URL or default to "reviews"
  const defaultTab = searchParams.get("tab") || "reviews";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    // Update URL when tab changes
    if (activeTab) {
      searchParams.set("tab", activeTab);
      setSearchParams(searchParams);
    }
  }, [activeTab, searchParams, setSearchParams]);

  useEffect(() => {
    fetchReviews();
    if (session?.user) {
      fetchUserProfile();
    }
  }, [session]);

  const handleAuthRedirect = () => {
    navigate("/auth");
  };

  const fetchUserProfile = async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
    }
  };

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

  useEffect(() => {
    fetchReviews();
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reviews">Community Reviews</TabsTrigger>
            <TabsTrigger value="recommendations">Recommend a Product</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          </TabsList>

          {session && userProfile && (
            <div className="my-8">
              <h2 className="text-2xl font-semibold text-mai-brown mb-4">Your Profile</h2>
              <ProfileCard
                username={userProfile.username}
                avatarUrl={userProfile.avatar_url}
                bio={userProfile.bio}
                reviewCount={userProfile.review_count}
                recommendationCount={userProfile.recommendation_count}
              />
            </div>
          )}

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
              {["Skincare", "Makeup", "Haircare", "Body Care", "Fragrance", "Tools", "Other"].map(
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

          <TabsContent value="sustainability">
            <div className="mt-6">
              <SustainabilityDiscussion 
                user={session?.user || null} 
                onAuthRedirect={handleAuthRedirect}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
