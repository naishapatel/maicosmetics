
import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Loader2, Pencil, Upload } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url: string | null;
  user_profile?: {
    username: string | null;
    avatar_url: string | null;
  } | null;
}

const SustainabilityDiscussion = () => {
  const session = useSession();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Updated to use blog_posts table instead of sustainability_posts
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`*, user_profile:profiles(username, avatar_url)`)
        .eq("approved", true) // Only show approved posts
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      const postsWithProfiles = data.map((post: any) => ({
        id: post.id,
        content: post.content,
        created_at: post.created_at,
        user_id: post.user_id,
        image_url: post.image_url,
        user_profile: post.user_profile,
      }));
      
      setPosts(postsWithProfiles);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        variant: "destructive",
        title: "Error fetching posts",
        description: "Could not load blog posts. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to post to the blog.",
      });
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
      
      // Submit to the blog_post_approvals table instead of directly to blog_posts
      const { error } = await supabase
        .from("blog_post_approvals")
        .insert({
          user_id: session.user.id,
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
    <div className="space-y-6">
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
            
            {/* Image preview */}
            {imagePreview && (
              <div className="relative mt-2">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-[200px] rounded-md object-contain" 
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }}
                >
                  Remove
                </Button>
              </div>
            )}
            
            {/* Image upload button */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Image
              </Button>
              <span className="text-xs text-gray-500">
                Supported formats: JPEG, PNG, GIF (max 5MB)
              </span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="ml-auto"
              disabled={posting || !newPost.trim()}
            >
              {posting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Submit for Review
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : posts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No blog posts yet. Be the first to share!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage 
                      src={post.user_profile?.avatar_url || undefined} 
                      alt={post.user_profile?.username || "User"} 
                    />
                    <AvatarFallback>
                      {(post.user_profile?.username?.[0] || "U").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.user_profile?.username || "Anonymous"}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(post.created_at), "MMMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4 pt-0">
                <div className="whitespace-pre-line">{post.content}</div>
                
                {post.image_url && (
                  <div className="mt-4">
                    <img 
                      src={post.image_url} 
                      alt="Post image" 
                      className="max-h-[400px] w-auto rounded-md object-contain" 
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SustainabilityDiscussion;
