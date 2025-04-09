
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "./tabs/ProfileTab";
import { ReviewsTab } from "./tabs/ReviewsTab";
import { RecommendationsTab } from "./tabs/RecommendationsTab";
import { AwarenessTab } from "./tabs/AwarenessTab";
import { ProfilesTab } from "./tabs/ProfilesTab";
import { useSession } from "@supabase/auth-helpers-react";

export function CommunityTabs() {
  const navigate = useNavigate();
  const session = useSession();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const defaultTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    if (activeTab) {
      searchParams.set("tab", activeTab);
      setSearchParams(searchParams);
    }
  }, [activeTab, searchParams, setSearchParams]);

  const handleAuthRedirect = () => {
    navigate("/auth");
  };

  return (
    <Tabs defaultValue={defaultTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="profile">Your Profile</TabsTrigger>
        <TabsTrigger value="reviews">Review a Product</TabsTrigger>
        <TabsTrigger value="recommendations">Recommend a Product</TabsTrigger>
        <TabsTrigger value="blogs">Awareness</TabsTrigger>
        <TabsTrigger value="profiles">Find Friends</TabsTrigger>
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
  );
}
