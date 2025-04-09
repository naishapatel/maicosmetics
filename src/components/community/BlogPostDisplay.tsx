
import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { BlogPostError } from "./BlogPostError";

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

export function BlogPostDisplay() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Updated to use blog_posts table
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
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to fetch blog posts");
      }
    } finally {
      setLoading(false);
    }
  };

  const retryFetch = () => {
    fetchPosts();
  };

  if (error) {
    return <BlogPostError error={error} onRetry={retryFetch} />;
  }

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No blog posts yet. Be the first to share!</p>
        </CardContent>
      </Card>
    );
  }

  return (
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
  );
}
