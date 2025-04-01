
import { useState } from "react";
import { User } from "@supabase/auth-helpers-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
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
  onProfileUpdated
}: ProfileCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const isOwnProfile = currentUser?.id === userId;
  
  const handleEditComplete = () => {
    setIsEditing(false);
    if (onProfileUpdated) {
      onProfileUpdated();
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
          <AvatarFallback>{username?.[0]?.toUpperCase() || '?'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-mai-brown">{username || 'Anonymous'}</h3>
            {isOwnProfile && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                className="h-8 px-2"
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            )}
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
