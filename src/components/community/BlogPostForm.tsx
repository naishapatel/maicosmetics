
import { useState } from "react";
import { User } from "@supabase/auth-helpers-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ImagePlus, Send } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface BlogPostFormProps {
  user: User | null;
  onAuthRedirect: () => void;
  onPostSubmitted: () => void;
}

export function BlogPostForm({ user, onAuthRedirect, onPostSubmitted }: BlogPostFormProps) {
  const { toast } = useToast();
  const [newPost, setNewPost] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File size validation (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Image must be less than 5MB",
      });
      return;
    }

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog_images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('blog_images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to post in the community",
      });
      onAuthRedirect();
      return;
    }

    if (!newPost.trim()) {
      toast({
        variant: "destructive",
        title: "Blog post cannot be empty",
        description: "Please write some content for your blog post",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;
      
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // Submit to the approvals table
      const { error } = await supabase.from("blog_post_approvals").insert({
        user_id: user.id,
        content: newPost,
        image_url: imageUrl,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error submitting blog post",
          description: error.message,
        });
        setIsSubmitting(false);
        return;
      }

      toast({
        title: "Blog post submitted for review",
        description: "Your post will be visible after approval",
      });

      setNewPost("");
      setImageFile(null);
      setImagePreview(null);
      onPostSubmitted();
    } catch (error) {
      console.error("Error in handleSubmitPost:", error);
      toast({
        variant: "destructive",
        title: "Error submitting blog post",
        description: "Failed to submit blog post",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmitPost} className="space-y-4">
      <Textarea
        placeholder={user ? "Share your thoughts on beauty and sustainability..." : "Please sign in to create a blog post"}
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        disabled={!user || isSubmitting}
        className="min-h-[120px]"
        required
      />
      
      {user && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => document.getElementById('image-upload')?.click()}
              disabled={isSubmitting}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Add Image
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {imageFile && (
              <span className="text-sm text-gray-600">
                {imageFile.name} ({Math.round(imageFile.size / 1024)}KB)
              </span>
            )}
          </div>
          
          {imagePreview && (
            <div className="relative mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-40 rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2 h-6 w-6 p-0"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview(null);
                }}
              >
                &times;
              </Button>
            </div>
          )}
          
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full md:w-auto"
          >
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </Button>
        </div>
      )}
      
      {!user && (
        <Button type="button" onClick={onAuthRedirect}>Sign In to Create a Blog Post</Button>
      )}
    </form>
  );
}
