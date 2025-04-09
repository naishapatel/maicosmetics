
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Pencil } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { BlogPostUpload } from "./BlogPostUpload";
import { User } from "@supabase/auth-helpers-react";

interface BlogPostSubmissionFormProps {
  user: User | null;
  onAuthRedirect: () => void;
  onPostSubmitted: () => void;
}

export function BlogPostSubmissionForm({ user, onAuthRedirect, onPostSubmitted }: BlogPostSubmissionFormProps) {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to post to the blog.",
      });
      onAuthRedirect();
      return;
    }
    
    if (!newPost.trim()) {
      toast({
        variant: "destructive",
        title: "Empty post",
        description: "Please write something before posting.",
      });
      return;
    }
    
    try {
      setPosting(true);
      
      let imageUrl = null;
      
      // Upload image if selected
      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const filePath = `${uuidv4()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('blog_images')
          .upload(filePath, selectedImage);
        
        if (uploadError) {
          throw uploadError;
        }
        
        const { data: urlData } = supabase.storage
          .from('blog_images')
          .getPublicUrl(filePath);
        
        imageUrl = urlData.publicUrl;
      }
      
      // Submit to the blog_post_approvals table
      const { error } = await supabase
        .from("blog_post_approvals")
        .insert({
          user_id: user.id,
          content: newPost,
          image_url: imageUrl,
        });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Post submitted for approval",
        description: "Your blog post has been submitted and will be visible after approval.",
      });
      
      // Reset form
      setNewPost("");
      setSelectedImage(null);
      setImagePreview(null);
      
      // Call the callback
      onPostSubmitted();
      
    } catch (error) {
      console.error("Error posting:", error);
      toast({
        variant: "destructive",
        title: "Error posting",
        description: "Failed to submit your post. Please try again.",
      });
    } finally {
      setPosting(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmitPost}>
        <CardHeader>
          <h3 className="text-lg font-medium">Share your thoughts</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Write your blog post here..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="min-h-[120px]"
          />
          
          <BlogPostUpload 
            onImageChange={handleImageChange}
            imagePreview={imagePreview}
          />
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="ml-auto"
            disabled={posting || (!user || !newPost.trim())}
          >
            {posting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Pencil className="mr-2 h-4 w-4" />
                {user ? "Submit for Review" : "Sign In to Submit"}
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
