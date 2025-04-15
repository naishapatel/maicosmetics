import { useState, useEffect } from "react";
import { Newspaper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPostError } from "../community/BlogPostError";
import { PendingPostsTable } from "./blog/PendingPostsTable";
import { ApprovedPostsTable } from "./blog/ApprovedPostsTable";
import { PostReviewDialog } from "./blog/PostReviewDialog";
import { ImagePreviewDialog } from "./blog/ImagePreviewDialog";

interface PendingPost {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url: string | null;
  user_profile?: {
    username: string | null;
  } | null;
}

export default function BlogPostAdmin() {
  const { toast } = useToast();
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([]);
  const [approvedPosts, setApprovedPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<PendingPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fetchAttempts, setFetchAttempts] = useState(0);

  // Check auth status when component loads
  useEffect(() => {
    async function checkAuthStatus() {
      const { data: authData } = await supabase.auth.getSession();
      console.log("Auth session exists:", !!authData.session);
      if (authData.session) {
        console.log("User email:", authData.session.user.email);
        console.log("User ID:", authData.session.user.id);
      }
    }
    
    checkAuthStatus();
  }, []);

  useEffect(() => {
    console.log(`Fetch attempt #${fetchAttempts + 1} for pending posts`);
    fetchPendingPosts();
    fetchApprovedPosts();
  }, [fetchAttempts]);

  const fetchPendingPosts = async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      
      console.log("Fetching pending posts...");
      
      // Fetch blog post approvals directly without trying to join with profiles
      const { data, error } = await supabase
        .from("blog_post_approvals")
        .select("*");

      if (error) {
        console.error("Error fetching pending posts:", error);
        console.error("Error details:", JSON.stringify(error));
        setFetchError(`Error fetching pending posts: ${error.message}`);
        toast({
          variant: "destructive", 
          title: "Error fetching pending posts",
          description: error.message
        });
        return;
      }

      console.log("Pending posts data:", data);
      console.log("Number of pending posts:", data ? data.length : 0);

      // No profile data - just use the posts as they are
      setPendingPosts(data || []);
      
    } catch (error) {
      console.error("Error in fetchPendingPosts:", error);
      setFetchError(error instanceof Error ? error.message : "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApprovedPosts = async () => {
    try {
      console.log("Fetching approved posts...");
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching approved posts:", error);
        console.error("Error details:", JSON.stringify(error));
        return;
      }

      console.log("Approved posts data:", data);

      if (data) {
        // Skip profile fetching since it's causing permission errors
        setApprovedPosts(data);
      }
    } catch (error) {
      console.error("Error in fetchApprovedPosts:", error);
    }
  };

  const handleApprove = async (post: PendingPost) => {
    try {
      console.log("Approving post:", post);
      // Insert into blog_posts table
      const { error: insertError } = await supabase
        .from("blog_posts")
        .insert({
          user_id: post.user_id,
          content: post.content,
          image_url: post.image_url,
          approved: true
        });

      if (insertError) {
        console.error("Error inserting approved post:", insertError);
        toast({
          variant: "destructive",
          title: "Error approving post",
          description: insertError.message
        });
        return;
      }

      // Delete from approvals table
      const { error: deleteError } = await supabase
        .from("blog_post_approvals")
        .delete()
        .eq("id", post.id);

      if (deleteError) {
        console.error("Error deleting approved post:", deleteError);
      }

      toast({
        title: "Post approved",
        description: "The blog post has been approved and published"
      });

      // Refresh data
      fetchPendingPosts();
      fetchApprovedPosts();
      setSelectedPost(null);
    } catch (error) {
      console.error("Error in handleApprove:", error);
      toast({
        variant: "destructive",
        title: "Error approving post",
        description: "An unexpected error occurred"
      });
    }
  };

  const handleReject = async (postId: string) => {
    try {
      console.log("Rejecting post:", postId);
      const { error } = await supabase
        .from("blog_post_approvals")
        .delete()
        .eq("id", postId);

      if (error) {
        console.error("Error rejecting post:", error);
        toast({
          variant: "destructive",
          title: "Error rejecting post",
          description: error.message
        });
        return;
      }

      toast({
        title: "Post rejected",
        description: "The blog post has been rejected"
      });

      fetchPendingPosts();
      setSelectedPost(null);
    } catch (error) {
      console.error("Error in handleReject:", error);
      toast({
        variant: "destructive",
        title: "Error rejecting post",
        description: "An unexpected error occurred"
      });
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      console.log("Deleting post:", postId);
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postId);

      if (error) {
        console.error("Error deleting post:", error);
        toast({
          variant: "destructive",
          title: "Error deleting post",
          description: error.message
        });
        return;
      }

      toast({
        title: "Post deleted",
        description: "The blog post has been deleted"
      });

      fetchApprovedPosts();
    } catch (error) {
      console.error("Error in handleDelete:", error);
      toast({
        variant: "destructive",
        title: "Error deleting post",
        description: "An unexpected error occurred"
      });
    }
  };

  const handleRetry = () => {
    setFetchAttempts(prevAttempts => prevAttempts + 1);
    setFetchError(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Newspaper className="h-6 w-6 text-mai-mauve mr-2" />
        <h2 className="text-2xl font-bold text-mai-brown">Blog Post Management</h2>
      </div>

      <Button 
        onClick={() => setFetchAttempts(prev => prev + 1)}
        className="bg-mai-mauve hover:bg-mai-mauveDark mb-4"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh Posts
      </Button>

      {fetchError && (
        <BlogPostError error={fetchError} onRetry={handleRetry}>
          <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded text-sm">
            <p className="font-semibold">Debug Information:</p>
            <p className="font-semibold">Current Issue:</p>
            <p>This error is due to the application not having the correct permissions to query the users table in Supabase. The admin panel needs Row Level Security (RLS) policies to be configured for the blog_post_approvals table.</p>
            <p className="mt-2 font-semibold">Please check:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>That you are logged in as an admin user</li>
              <li>That RLS policies are correctly set up for the blog_post_approvals table</li>
              <li>That your admin email matches exactly what's in Admin.tsx</li>
            </ul>
          </div>
        </BlogPostError>
      )}

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending Approval
            {pendingPosts.length > 0 && (
              <span className="ml-2 bg-mai-mauve text-white text-xs rounded-full px-2 py-0.5">
                {pendingPosts.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <PendingPostsTable 
            posts={pendingPosts} 
            isLoading={isLoading} 
            onReview={setSelectedPost}
            onPreviewImage={setPreviewImage}
          />
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <ApprovedPostsTable 
            posts={approvedPosts} 
            onPreviewImage={setPreviewImage}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>

      {selectedPost && (
        <PostReviewDialog 
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      <ImagePreviewDialog 
        imageUrl={previewImage} 
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
}
