
import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bookmark, Star, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ProductRecommendation } from "@/types/quiz";
import { useNavigate } from "react-router-dom";

export function UserDashboard() {
  const session = useSession();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("recommendations");
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [savedItems, setSavedItems] = useState<ProductRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, [session]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // Fetch recommendations
      const { data: recsData, error: recsError } = await supabase
        .from("product_recommendations")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (recsError) throw recsError;
      
      // Map database results to match ProductRecommendation type
      const mappedRecommendations = recsData?.map(item => ({
        id: item.id,
        name: item.product_name, // Map product_name to name
        brand: item.brand,
        price: item.price,
        description: item.description,
        makeup_type: item.makeup_type,
        category: item.category,
        ethical_values: item.ethical_values,
        business_tags: item.business_tags,
        imageUrl: item.images?.[0] // Use first image as imageUrl if available
      })) || [];
      
      setRecommendations(mappedRecommendations);
      setSavedItems(mappedRecommendations.slice(0, 2)); // For now, just use first few items as saved
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast({
        variant: "destructive",
        title: "Error loading data",
        description: "Could not load your personalized content.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuizClick = () => {
    navigate("/quiz");
  };

  if (!session) {
    return (
      <Card className="w-full bg-white/60 backdrop-blur-sm border border-mai-mauve/20 shadow-md">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <AlertCircle className="mx-auto h-12 w-12 text-mai-coral" />
            <p className="text-lg font-serif text-mai-brown">Sign in to see your personalized recommendations</p>
            <Button onClick={() => navigate("/auth")} className="bg-mai-mauve hover:bg-mai-mauveDark text-white px-6 py-2 rounded-full">
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="w-full bg-white/60 backdrop-blur-sm border border-mai-mauve/20 shadow-md">
        <CardContent className="pt-6">
          <p className="text-center font-serif text-mai-brown">Loading your personalized content...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white/60 backdrop-blur-sm border border-mai-mauve/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-mai-brown">Your Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-mai-mauve/10 rounded-full p-1">
            <TabsTrigger 
              value="recommendations" 
              className="rounded-full data-[state=active]:bg-mai-mauve data-[state=active]:text-white"
            >
              Recommendations
            </TabsTrigger>
            <TabsTrigger 
              value="saved" 
              className="rounded-full data-[state=active]:bg-mai-mauve data-[state=active]:text-white"
            >
              Saved Items
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommendations" className="space-y-4 mt-6">
            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow bg-white/80 border-mai-mauve/10">
                    <CardContent className="p-4">
                      <h3 className="font-serif font-semibold text-mai-brown">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                      <p className="text-mai-mauve mt-1">{item.price}</p>
                      <div className="flex mt-2 gap-1 flex-wrap">
                        {item.ethical_values.slice(0, 3).map((value, i) => (
                          <span key={i} className="text-xs bg-mai-mauve/10 text-mai-mauve px-2 py-1 rounded-full">
                            {value}
                          </span>
                        ))}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-mai-mauve hover:text-mai-mauveDark"
                      >
                        <Bookmark className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 space-y-4 bg-white/40 rounded-lg p-6">
                <p className="font-serif text-mai-brown">No recommendations yet. Take our quiz to get started!</p>
                <Button 
                  onClick={handleQuizClick} 
                  className="bg-mai-mauve hover:bg-mai-mauveDark text-white px-6 py-2 rounded-full"
                >
                  Take Skin Quiz
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved" className="space-y-4 mt-6">
            {savedItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow bg-white/80 border-mai-mauve/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-serif font-semibold text-mai-brown">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                          <p className="text-mai-mauve mt-1">{item.price}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-mai-coral hover:text-mai-coral/80"
                        >
                          <Star className="h-4 w-4 fill-mai-coral" />
                        </Button>
                      </div>
                      <div className="flex mt-2 gap-1 flex-wrap">
                        {item.ethical_values.slice(0, 3).map((value, i) => (
                          <span key={i} className="text-xs bg-mai-mauve/10 text-mai-mauve px-2 py-1 rounded-full">
                            {value}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-white/40 rounded-lg p-6">
                <p className="font-serif text-mai-brown">You haven't saved any items yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
