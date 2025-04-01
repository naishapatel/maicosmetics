
import { useState } from "react";
import { User } from "@supabase/auth-helpers-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { EthicalValuesSelect } from "./EthicalValuesSelect";
import { v4 as uuidv4 } from "uuid";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
  ethical_interests?: string[] | null;
}

interface ProfileEditProps {
  user: User;
  profile: Profile;
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileEdit({ user, profile, onSave, onCancel }: ProfileEditProps) {
  const { toast } = useToast();
  const [username, setUsername] = useState(profile.username || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [ethicalInterests, setEthicalInterests] = useState<string[]>(
    profile.ethical_interests || []
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    profile.avatar_url || null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file",
        });
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Image must be less than 2MB",
        });
        return;
      }
      
      setAvatarFile(file);
      
      // Preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEthicalInterestsChange = (values: string[]) => {
    setEthicalInterests(values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let avatarUrl = profile.avatar_url;

      // Upload new avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const filePath = `${user.id}/${uuidv4()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile);

        if (uploadError) {
          throw uploadError;
        }

        // Get public URL for the avatar
        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        avatarUrl = urlData.publicUrl;
      }

      // Update profile in Supabase
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          bio,
          avatar_url: avatarUrl,
          ethical_interests: ethicalInterests,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
      
      onSave();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: "Failed to update your profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <h3 className="text-lg font-medium">Edit Your Profile</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarPreview || undefined} />
              <AvatarFallback>{username?.[0]?.toUpperCase() || "?"}</AvatarFallback>
            </Avatar>
            
            <div className="flex items-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("avatar-upload")?.click()}
                className="flex items-center"
              >
                <Upload className="h-4 w-4 mr-2" /> Upload Photo
              </Button>
              <Input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              
              {avatarPreview && avatarPreview !== profile.avatar_url && (
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-500 ml-2"
                  onClick={() => {
                    setAvatarFile(null);
                    setAvatarPreview(profile.avatar_url);
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>Ethical Interests</Label>
            <EthicalValuesSelect 
              selected={ethicalInterests} 
              onChange={handleEthicalInterestsChange} 
            />
            <p className="text-xs text-gray-500 mt-1">
              Select your ethical interests to help us show you relevant content
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
