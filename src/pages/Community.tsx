
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
import { BlogPost } from "@/components/community/BlogPost";
import { ProfileList } from "@/components/community/ProfileList";
import { UserPlus, Pencil } from "lucide-react";

const Community = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const session = useSession();
  const [searchParams, setSearchParams] = useSearchParams();
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [editProfileMode, setEditProfileMode] = useState(false);
  
  const defaultTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Your Profile</TabsTrigger>
            <TabsTrigger value="reviews">Review a Product</TabsTrigger>
            <TabsTrigger value="recommendations">Recommend a Product</TabsTrigger>
            <TabsTrigger value="blogs">Awareness</TabsTrigger>
            <TabsTrigger value="profiles">Find Friends</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            {session && userProfile ? (
              <div className="my-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-mai-brown">Your Profile</h2>
                  <Button 
                    onClick={() => setEditProfileMode(!editProfileMode)}
                    variant={editProfileMode ? "default" : "outline"}
                    className="flex items-center"
                  >
                    {editProfileMode ? (
                      "Cancel"
                    ) : (
                      <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>

                {editProfileMode ? (
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="text-lg font-medium">Edit Your Profile</h3>
                      <p className="text-gray-500 text-sm">
                        Update your profile information to connect with other community members
                      </p>
                    </div>
                    <div className="p-4">
                      <ProfileCard
                        username={userProfile.username}
                        avatarUrl={userProfile.avatar_url}
                        bio={userProfile.bio}
                        reviewCount={userProfile.review_count || 0}
                        recommendationCount={userProfile.recommendation_count || 0}
                        currentUser={session.user}
                        userId={userProfile.id}
                        ethicalInterests={userProfile.ethical_interests}
                        onProfileUpdated={() => {
                          fetchUserProfile();
                          setEditProfileMode(false);
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <ProfileCard
                    username={userProfile.username}
                    avatarUrl={userProfile.avatar_url}
                    bio={userProfile.bio}
                    reviewCount={userProfile.review_count || 0}
                    recommendationCount={userProfile.recommendation_count || 0}
                    currentUser={session.user}
                    userId={userProfile.id}
                    ethicalInterests={userProfile.ethical_interests}
                    onProfileUpdated={fetchUserProfile}
                  />
                )}

                {!editProfileMode && userProfile.username.includes('@') && (
                  <div className="mt-4 bg-mai-sage/20 p-4 rounded-lg">
                    <div className="flex items-center">
                      <UserPlus className="h-5 w-5 text-mai-brown mr-2" />
                      <p className="text-mai-brown">
                        Your email is currently visible as your username. We recommend setting a custom username for privacy.
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="mt-3"
                      onClick={() => setEditProfileMode(true)}
                    >
                      Set Username
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="my-8 text-center p-8 bg-mai-sage/20 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Sign In to Access Your Profile</h3>
                <p className="text-gray-600 mb-6">
                  Create an account or sign in to view and edit your profile.
                </p>
                <Button onClick={handleAuthRedirect}>Sign In</Button>
              </div>
            )}
          </TabsContent>

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

          <TabsContent value="blogs">
            <div className="mt-6">
              <BlogPost 
                user={session?.user || null} 
                onAuthRedirect={handleAuthRedirect}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="profiles">
            <div className="mt-6">
              {session ? (
                <ProfileList />
              ) : (
                <div className="text-center p-8 bg-mai-sage/20 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Connect with Community Members</h3>
                  <p className="text-gray-600 mb-6">
                    Sign in to discover and follow other members with similar ethical interests.
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
