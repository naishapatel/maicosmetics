
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/auth-helpers-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EthicalValuesSelect } from "@/components/community/EthicalValuesSelect";

interface ProfileSetupModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function ProfileSetupModal({
  user,
  isOpen,
  onClose,
  onComplete,
}: ProfileSetupModalProps) {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [ethicalInterests, setEthicalInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      toast({
        variant: "destructive",
        title: "Username required",
        description: "Please enter a username to continue.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          bio: bio || null,
          ethical_interests: ethicalInterests
        })
        .eq("id", user.id);
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been set up successfully!",
      });
      
      onComplete();
    } catch (error) {
      console.error("Error setting up profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to set up your profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSkip = () => {
    toast({
      title: "Profile setup skipped",
      description: "You can complete your profile anytime from the Community page.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Mai!</DialogTitle>
          <DialogDescription>
            Set up your profile to connect with our community. You can always update this information later.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio (optional)</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              className="resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Ethical Interests (optional)</Label>
            <EthicalValuesSelect
              selected={ethicalInterests}
              onChange={setEthicalInterests}
            />
          </div>
          
          <DialogFooter className="sm:justify-between mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleSkip}
              disabled={isLoading}
            >
              Skip for now
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save profile"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
