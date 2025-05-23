
import { useState } from "react";
import { User } from "@supabase/auth-helpers-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, UserPlus, UserMinus, Users } from "lucide-react";
import { ProfileEdit } from "./ProfileEdit";

interface ProfileCardProps {
  username: string | null;
  avatarUrl: string | null;
  bio: string | null;
  reviewCount: number;
  recommendationCount: number;
  currentUser?: User | null;
  userId: string;
  ethicalInterests?: string[] | null;
  onProfileUpdated?: () => void;
  followerCount?: number;
  followingCount?: number;
  isFollowing?: boolean;
  onFollowToggle?: (userId: string, isFollowing: boolean) => void;
}

export function ProfileCard({ 
  username, 
  avatarUrl, 
  bio, 
  reviewCount, 
  recommendationCount,
  currentUser,
  userId,
  ethicalInterests = [],
  onProfileUpdated,
  followerCount,
  followingCount,
  isFollowing,
  onFollowToggle
}: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const isOwnProfile = currentUser?.id === userId;
  
  // Safely display username: if it's an email address, extract the username part
  const displayName = username 
    ? (username.includes('@') ? username.split('@')[0] : username)
    : 'User';
  
  // Get first character for avatar fallback
  const avatarFallback = displayName[0]?.toUpperCase() || 'U';
  
  const handleEditComplete = () => {
    setIsEditing(false);
    if (onProfileUpdated) {
      onProfileUpdated();
    }
  };

  const handleFollowClick = () => {
    if (onFollowToggle && !isOwnProfile) {
      onFollowToggle(userId, !!isFollowing);
    }
  };

  if (isEditing && currentUser) {
    return (
      <ProfileEdit 
        user={currentUser}
        profile={{
          id: userId,
          username,
          avatar_url: avatarUrl,
          bio,
          ethical_interests: ethicalInterests
        }}
        onSave={handleEditComplete}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl || undefined} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-mai-brown">{displayName}</h3>
              {followerCount !== undefined && followingCount !== undefined && (
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span>{followerCount} follower{followerCount !== 1 ? 's' : ''}</span>
                  <span>{followingCount} following</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {isOwnProfile ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsEditing(true)}
                  className="h-8 px-2"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit Profile
                </Button>
              ) : currentUser && onFollowToggle ? (
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  size="sm"
                  onClick={handleFollowClick}
                  className="h-8"
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4 mr-1" />
                      Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-1" />
                      Follow
                    </>
                  )}
                </Button>
              ) : null}
            </div>
          </div>
          {bio && <p className="text-gray-600 mt-1">{bio}</p>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 text-sm text-gray-600 mb-4">
          <div>
            <span className="font-semibold text-mai-brown">{reviewCount}</span> reviews
          </div>
          <div>
            <span className="font-semibold text-mai-brown">{recommendationCount}</span> recommendations
          </div>
        </div>
        
        {ethicalInterests && ethicalInterests.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Ethical Interests:</p>
            <div className="flex flex-wrap gap-2">
              {ethicalInterests.map((interest) => (
                <Badge key={interest} variant="outline" className="bg-mai-sage/10">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
