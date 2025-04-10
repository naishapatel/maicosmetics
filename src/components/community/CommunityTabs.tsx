
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "./tabs/ProfileTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { RecommendationsTab } from "./tabs/RecommendationsTab";
import { AwarenessTab } from "./tabs/AwarenessTab";
import { ProfilesTab } from "./tabs/ProfilesTab";
import { useSession } from "@supabase/auth-helpers-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Star, Heart, Newspaper, UserRound } from "lucide-react";

export function CommunityTabs() {
  const navigate = useNavigate();
  const session = useSession();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useIsMobile();
  
  const defaultTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (activeTab) {
      searchParams.set("tab", activeTab);
      setSearchParams(searchParams);
    }
  }, [activeTab, searchParams, setSearchParams]);

  const handleAuthRedirect = () => {
    navigate("/auth");
  };

  const tabGuides = [
    { id: "profile", title: "Your Profile", icon: <UserRound className="h-5 w-5" />, description: "View and edit your personal profile" },
    { id: "reviews", title: "Review a Product", icon: <Star className="h-5 w-5" />, description: "Share your experiences with products" },
    { id: "recommendations", title: "Recommend a Product", icon: <Heart className="h-5 w-5" />, description: "Suggest products to the community" },
    { id: "blogs", title: "Awareness", icon: <Newspaper className="h-5 w-5" />, description: "Share knowledge about ethical beauty" },
    { id: "profiles", title: "Find Friends", icon: <UserPlus className="h-5 w-5" />, description: "Connect with like-minded people" },
  ];

  return (
    <div className="space-y-6">
      {showWelcome && (
        <Card className="bg-mai-mauve/10 border-mai-mauve/20 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <h2 className="font-serif text-mai-brown text-2xl md:text-3xl mb-2">Welcome to the Community!</h2>
                <p className="text-gray-600 max-w-3xl">
                  Connect with like-minded individuals who share your passion for ethical and sustainable beauty products.
                  Share reviews, recommendations, and knowledge with our growing community.
                </p>
              </div>
              <button 
                onClick={() => setShowWelcome(false)} 
                className="text-sm text-mai-mauve hover:text-mai-brown mt-4 md:mt-0"
              >
                Hide this
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {tabGuides.map((tab) => (
                <div 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    activeTab === tab.id 
                      ? 'bg-mai-mauve/20 border border-mai-mauve/30' 
                      : 'bg-white border border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <div className={`${activeTab === tab.id ? 'text-mai-mauve' : 'text-gray-500'} mr-2`}>
                      {tab.icon}
                    </div>
                    <h3 className="font-medium">{tab.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{tab.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`${isMobile ? 'grid grid-cols-2 gap-2' : 'grid grid-cols-5'} w-full mb-6`}>
          <TabsTrigger value="profile" className="flex items-center justify-center">
            <UserRound className="h-4 w-4 mr-2 hidden md:inline" />
            <span className={isMobile ? "text-xs" : ""}>Your Profile</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center justify-center">
            <Star className="h-4 w-4 mr-2 hidden md:inline" />
            <span className={isMobile ? "text-xs" : ""}>Review Products</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center justify-center">
            <Heart className="h-4 w-4 mr-2 hidden md:inline" />
            <span className={isMobile ? "text-xs" : ""}>Recommendations</span>
          </TabsTrigger>
          <TabsTrigger value="blogs" className="flex items-center justify-center">
            <Newspaper className="h-4 w-4 mr-2 hidden md:inline" />
            <span className={isMobile ? "text-xs" : ""}>Awareness</span>
          </TabsTrigger>
          <TabsTrigger value="profiles" className="flex items-center justify-center">
            <UserPlus className="h-4 w-4 mr-2 hidden md:inline" />
            <span className={isMobile ? "text-xs" : ""}>Find Friends</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab 
            session={session} 
            onAuthRedirect={handleAuthRedirect} 
          />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsTab session={session} onAuthRedirect={handleAuthRedirect} />
        </TabsContent>

        <TabsContent value="recommendations">
          <RecommendationsTab session={session} onAuthRedirect={handleAuthRedirect} />
        </TabsContent>

        <TabsContent value="blogs">
          <AwarenessTab session={session} onAuthRedirect={handleAuthRedirect} />
        </TabsContent>
        
        <TabsContent value="profiles">
          <ProfilesTab session={session} onAuthRedirect={handleAuthRedirect} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
