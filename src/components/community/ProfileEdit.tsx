
import { useState } from "react";
import { User } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EthicalValuesSelect } from "@/components/community/EthicalValuesSelect";
import { ImagePlus, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

interface ProfileEditProps {
  user: User;
  profile: {
    id: string;
    username: string | null;
    avatar_url: string | null;
    bio: string | null;
    ethical_interests: string[] | null;
  };
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileEdit({ user, profile, onSave, onCancel }: ProfileEditProps) {
  const { toast } = useToast();
  const [username, setUsername] = useState(profile.username || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [selectedEthicalValues, setSelectedEthicalValues] = useState<string[]>(
    profile.ethical_interests || []
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size validation (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Avatar must be less than 2MB",
      });
      return;
    }

    // Preview the image
    const objectUrl = URL.createObjectURL(file);
    setAvatarUrl(objectUrl);
    setAvatarFile(file);
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return avatarUrl;
    
    setIsUploading(true);
    
    try {
      // Create a unique filename using UUID
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error uploading your avatar",
      });
      return avatarUrl;
    } finally {
      setIsUploading(false);
    }
  };

  const handleEthicalValueChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedEthicalValues([...selectedEthicalValues, value]);
    } else {
      setSelectedEthicalValues(selectedEthicalValues.filter(v => v !== value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Upload avatar if a new one was selected
      const finalAvatarUrl = avatarFile ? await uploadAvatar() : avatarUrl;
      
      // Update profile in the database
      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          bio,
          avatar_url: finalAvatarUrl,
          ethical_interests: selectedEthicalValues
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      
      onSave();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "There was an error updating your profile",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="avatar">Profile Picture</Label>
            <div className="flex items-center space-x-4">
              <div className="relative h-24 w-24 rounded-full overflow-hidden border border-gray-200">
                {avatarUrl ? (
                  <img 
                    src={avatarUrl} 
                    alt="Avatar preview" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                    <span className="text-2xl font-semibold text-gray-400">
                      {username?.[0]?.toUpperCase() || "?"}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  disabled={isUploading}
                  className="relative"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <ImagePlus className="h-4 w-4 mr-2" />
                      <span>Change Picture</span>
                    </>
                  )}
                </Button>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG or GIF. 2MB max.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your display name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell the community about yourself..."
              className="min-h-[100px]"
            />
          </div>

          <EthicalValuesSelect
            selectedValues={selectedEthicalValues}
            onValueChange={handleEthicalValueChange}
          />
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                <span>Saving...</span>
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
