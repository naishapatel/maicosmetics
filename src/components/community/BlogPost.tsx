
import { useState, useEffect } from "react";
import { Newspaper, ImagePlus, Send, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/auth-helpers-react";
import { format } from "date-fns";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { v4 as uuidv4 } from 'uuid';

interface BlogPostItem {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  approved: boolean;
  image_url: string | null;
  // Make profiles optional since we'll fetch it separately
  user_profile?: {
    username: string | null;
    avatar_url: string | null;
  } | null;
}

interface BlogPostProps {
  user: User | null;
  onAuthRedirect: () => void;
}

export function BlogPost({ user, onAuthRedirect }: BlogPostProps) {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [newPost, setNewPost] = useState("");
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pendingPosts, setPendingPosts] = useState<Array<{ id: string; content: string; image_url: string | null }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
    if (user) {
      fetchPendingPosts();
    }
  }, [user]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get all approved blog posts
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("approved", true)
        .order("created_at", { ascending: false });

      if (postsError) {
        console.error("Error fetching posts:", postsError);
        setError(postsError.message);
        toast({
          variant: "destructive",
          title: "Error fetching blog posts",
          description: postsError.message,
        });
        return;
      }

      if (postsData) {
        // Fetch profiles for each user_id
        const postsWithProfiles = await Promise.all(
          postsData.map(async (post) => {
            try {
              const { data: profileData } = await supabase
                .from("profiles")
                .select("username, avatar_url")
                .eq("id", post.user_id)
                .single();
              
              return {
                ...post,
                user_profile: profileData
              } as BlogPostItem;
            } catch (err) {
              console.error("Error fetching profile for post:", err);
              return {
                ...post,
                user_profile: null
              } as BlogPostItem;
            }
          })
        );
        
        setPosts(postsWithProfiles);
      }
    } catch (error) {
      console.error("Error in fetchPosts:", error);
      if (error instanceof Error) {
        setError(error.message);
        toast({
          variant: "destructive",
          title: "Error fetching blog posts",
          description: error.message || "Failed to fetch blog posts",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingPosts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("blog_post_approvals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching pending posts:", error);
        return;
      }

      setPendingPosts(data || []);
    } catch (error) {
      console.error("Error in fetchPendingPosts:", error);
    }
  };

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
      fetchPendingPosts();
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

  const retryFetch = () => {
    fetchPosts();
    if (user) {
      fetchPendingPosts();
    }
  };

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error fetching blog posts</h3>
          <p className="text-red-600 mt-1">{error}</p>
          <Button 
            onClick={retryFetch} 
            variant="outline" 
            className="mt-2"
          >
            Try Again
          </Button>
        </div>
        
        {/* Still show the post form even if fetching posts failed */}
        <div className="bg-mai-sage/20 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Newspaper className="text-mai-mauve mr-2 h-6 w-6" />
            <h2 className="text-2xl font-semibold text-mai-brown">Blog Posts</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Share your thoughts, ideas, and experiences related to beauty practices and ethical consumption.
            Your posts will be visible after approval.
          </p>
          
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
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-mai-sage/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Newspaper className="text-mai-mauve mr-2 h-6 w-6" />
          <h2 className="text-2xl font-semibold text-mai-brown">Blog Posts</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Share your thoughts, ideas, and experiences related to beauty practices and ethical consumption.
          Your posts will be visible after approval.
        </p>
        
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
      </div>

      {user && pendingPosts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-mai-brown flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Your Pending Posts
          </h3>
          {pendingPosts.map((post) => (
            <Card key={post.id} className="bg-white border-l-4 border-l-amber-400">
              <CardHeader>
                <CardTitle className="text-base text-mai-brown flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-amber-500" />
                  Pending Approval
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
                {post.image_url && (
                  <img 
                    src={post.image_url} 
                    alt="Post image" 
                    className="mt-4 max-h-60 rounded-md"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mai-mauve"></div>
          </div>
        ) : posts.length === 0 ? (
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500">Be the first to create a blog post!</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="bg-white">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.user_profile?.avatar_url || undefined} />
                    <AvatarFallback>{post.user_profile?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base text-mai-brown">
                      {post.user_profile?.username || "Anonymous"}
                    </CardTitle>
                    <p className="text-xs text-gray-500">
                      {format(new Date(post.created_at), "MMM d, yyyy • h:mm a")}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
                {post.image_url && (
                  <img 
                    src={post.image_url} 
                    alt="Post image" 
                    className="mt-4 max-w-full rounded-md"
                  />
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Newspaper className="h-4 w-4 mr-1 text-mai-mauve" />
                  <span>Blog Post</span>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
