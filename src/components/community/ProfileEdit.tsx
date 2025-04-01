import { useState } from "react";
import { User } from "@supabase/auth-helpers-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EthicalValuesSelect } from "./EthicalValuesSelect";

interface ProfileEditProps {
  user: User;
  profile: {
    id: string;
    username: string | null;
    avatar_url: string | null;
    bio: string | null;
    ethical_interests?: string[] | null;
  };
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileEdit({
  user,
  profile,
  onSave,
  onCancel,
}: ProfileEditProps) {
  const { toast } = useToast();
  const [username, setUsername] = useState(profile.username || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");
  const [uploading, setUploading] = useState(false);
  const [ethicalInterests, setEthicalInterests] = useState<string[]>(profile.ethical_interests || []);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${profile.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Error uploading avatar:", error);
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Failed to upload avatar. Please try again.",
        });
      } else {
        const publicURL = supabase.storage.from("avatars").getPublicUrl(filePath).data.publicUrl;
        setAvatarUrl(publicURL);
        toast({
          title: "Upload successful",
          description: "Your avatar has been updated.",
        });
      }
    } catch (error) {
      console.error("Unexpected error uploading avatar:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          bio,
          avatar_url: avatarUrl,
          ethical_interests: ethicalInterests
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile:", error);
        toast({
          variant: "destructive",
          title: "Update failed",
          description: "Failed to update profile. Please try again.",
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully.",
        });
        onSave();
      }
    } catch (error) {
      console.error("Unexpected error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <Label htmlFor="avatar" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Avatar
        </Label>
        <div className="flex items-center mt-2 space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback>{username?.[0]?.toUpperCase() || '?'}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <Input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={uploading}
              className="hidden"
            />
            <Label htmlFor="avatar" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-mai-mauve text-white hover:bg-mai-mauveDark px-4 py-2">
              {uploading ? "Uploading..." : "Change Avatar"}
            </Label>
            <p className="text-sm text-gray-500">
              Upload a new avatar image.
            </p>
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="username" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Username
        </Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="bio" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Bio
        </Label>
        <Input
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-2"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ethicalInterests">Ethical Interests</Label>
        <p className="text-sm text-gray-500">
          Select the ethical values that are important to you
        </p>
        <EthicalValuesSelect
          selected={ethicalInterests}
          onChange={setEthicalInterests}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
