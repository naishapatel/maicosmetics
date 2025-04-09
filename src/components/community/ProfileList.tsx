
import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { ProfileCard } from "@/components/community/ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  review_count: number | null;
  recommendation_count: number | null;
  ethical_interests: string[] | null;
  follower_count?: number;
  following_count?: number;
  is_following?: boolean;
}

export function ProfileList() {
  const { toast } = useToast();
  const session = useSession();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterByInterests, setFilterByInterests] = useState(false);
  const [currentUserInterests, setCurrentUserInterests] = useState<string[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetchCurrentUserInterests();
    }
  }, [session]);

  useEffect(() => {
    fetchProfiles();
  }, [session, searchQuery, filterByInterests, currentUserInterests]);

  const fetchCurrentUserInterests = async () => {
    if (!session?.user) return;
    
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("ethical_interests")
        .eq("id", session.user.id)
        .single();
        
      if (error) {
        console.error("Error fetching user interests:", error);
        return;
      }
      
      if (data?.ethical_interests) {
        setCurrentUserInterests(data.ethical_interests);
      }
    } catch (error) {
      console.error("Error in fetchCurrentUserInterests:", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from("profiles")
        .select("*, review_count, recommendation_count");
      
      // Add search functionality
      if (searchQuery) {
        query = query.or(`username.ilike.%${searchQuery}%,bio.ilike.%${searchQuery}%`);
      }
      
      // Filter by similar interests if requested
      if (filterByInterests && currentUserInterests.length > 0) {
        // Find profiles with at least one matching interest using overlap operator
        query = query.overlaps("ethical_interests", currentUserInterests);
      }
      
      // Exclude current user from results
      if (session?.user) {
        query = query.neq("id", session.user.id);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // If user is logged in, get follower and following counts plus follow status
        if (session?.user) {
          const enhancedProfiles = await Promise.all(
            data.map(async (profile) => {
              // Get follower count
              const { count: followerCount } = await supabase
                .from("user_follows")
                .select("*", { count: "exact", head: true })
                .eq("following_id", profile.id);
              
              // Get following count
              const { count: followingCount } = await supabase
                .from("user_follows")
                .select("*", { count: "exact", head: true })
                .eq("follower_id", profile.id);
              
              // Check if current user is following this profile
              const { data: followData } = await supabase
                .from("user_follows")
                .select("*")
                .eq("follower_id", session.user.id)
                .eq("following_id", profile.id)
                .single();
              
              const isFollowing = !!followData;
              
              return {
                ...profile,
                follower_count: followerCount || 0,
                following_count: followingCount || 0,
                is_following: isFollowing
              };
            })
          );
          
          setProfiles(enhancedProfiles);
        } else {
          setProfiles(data);
        }
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
      toast({
        variant: "destructive",
        title: "Error fetching profiles",
        description: "Failed to load community members. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFollowToggle = async (profileId: string, isCurrentlyFollowing: boolean) => {
    if (!session?.user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to follow other users.",
      });
      return;
    }
    
    try {
      if (isCurrentlyFollowing) {
        // Unfollow
        const { error } = await supabase
          .from("user_follows")
          .delete()
          .eq("follower_id", session.user.id)
          .eq("following_id", profileId);
          
        if (error) throw error;
        
        toast({
          title: "Unfollowed",
          description: "You are no longer following this user.",
        });
      } else {
        // Follow
        const { error } = await supabase
          .from("user_follows")
          .insert({ 
            follower_id: session.user.id, 
            following_id: profileId 
          });
          
        if (error) throw error;
        
        toast({
          title: "Following",
          description: "You are now following this user.",
        });
      }
      
      // Update profiles list to reflect changes
      setProfiles(profiles.map(profile => {
        if (profile.id === profileId) {
          return {
            ...profile,
            follower_count: isCurrentlyFollowing 
              ? (profile.follower_count || 1) - 1 
              : (profile.follower_count || 0) + 1,
            is_following: !isCurrentlyFollowing
          };
        }
        return profile;
      }));
      
    } catch (error) {
      console.error("Error updating follow status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update follow status. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-semibold text-mai-brown">Community Members</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search by name or bio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {session?.user && (
            <Button 
              variant={filterByInterests ? "default" : "outline"}
              onClick={() => setFilterByInterests(!filterByInterests)}
              className="w-full sm:w-auto"
            >
              <Users className="h-4 w-4 mr-2" />
              {filterByInterests ? "All Profiles" : "Similar Interests"}
            </Button>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg p-4 border">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          {searchQuery || filterByInterests ? 
            "No profiles match your search criteria." : 
            "No community members found."}
        </div>
      ) : (
        <div className="space-y-4">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              username={profile.username}
              avatarUrl={profile.avatar_url}
              bio={profile.bio}
              reviewCount={profile.review_count || 0}
              recommendationCount={profile.recommendation_count || 0}
              currentUser={session?.user}
              userId={profile.id}
              ethicalInterests={profile.ethical_interests}
              followerCount={profile.follower_count}
              followingCount={profile.following_count}
              isFollowing={profile.is_following}
              onFollowToggle={handleFollowToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
