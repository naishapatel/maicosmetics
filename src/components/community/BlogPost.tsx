import { useState, useEffect } from "react";
import { Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/auth-helpers-react";
import { BlogPostSubmissionForm } from "./BlogPostForm";
import { PendingPostsList } from "./PendingPostsList";
import { PublishedPostsList } from "./PublishedPostsList";
import { BlogPostError } from "./BlogPostError";

interface BlogPostItem {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  approved: boolean;
  image_url: string | null;
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
  const [pendingPosts, setPendingPosts] = useState<Array<{ id: string; content: string; image_url: string | null }>>([]);
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

  const handlePostSubmitted = () => {
    fetchPendingPosts();
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
        <BlogPostError error={error} onRetry={retryFetch}>
          {/* Still show the post form even if fetching posts failed */}
          <div className="bg-mai-sage/20 rounded-lg p-6 mt-4">
            <div className="flex items-center mb-4">
              <Newspaper className="text-mai-mauve mr-2 h-6 w-6" />
              <h2 className="text-2xl font-semibold text-mai-brown">Blog Posts</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Share your thoughts, ideas, and experiences related to beauty practices and ethical consumption.
              Your posts will be visible after approval.
            </p>
            
            <BlogPostSubmissionForm 
              user={user} 
              onAuthRedirect={onAuthRedirect} 
              onPostSubmitted={handlePostSubmitted} 
            />
          </div>
        </BlogPostError>
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
        
        <BlogPostSubmissionForm 
          user={user} 
          onAuthRedirect={onAuthRedirect}
          onPostSubmitted={handlePostSubmitted} 
        />
      </div>

      {user && <PendingPostsList posts={pendingPosts} />}

      <PublishedPostsList posts={posts} isLoading={isLoading} />
    </div>
  );
}
