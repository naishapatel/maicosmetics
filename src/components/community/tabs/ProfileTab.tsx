
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/components/community/ProfileCard";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/auth-helpers-react";
import { Pencil, UserPlus } from "lucide-react";

interface ProfileTabProps {
  session: Session | null;
  onAuthRedirect: () => void;
}

export function ProfileTab({ session, onAuthRedirect }: ProfileTabProps) {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [editProfileMode, setEditProfileMode] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetchUserProfile();
    }
  }, [session]);

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

  if (!session) {
    return (
      <div className="my-8 text-center p-8 bg-mai-sage/20 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Sign In to Access Your Profile</h3>
        <p className="text-gray-600 mb-6">
          Create an account or sign in to view and edit your profile.
        </p>
        <Button onClick={onAuthRedirect}>Sign In</Button>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="my-8 text-center p-8">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
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
  );
}
