
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PendingPost {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url: string | null;
  user_profile?: {
    username: string | null;
  } | null;
}

export interface ApprovedPost {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url: string | null;
}

export function useBlogAdminState() {
  const { toast } = useToast();
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([]);
  const [approvedPosts, setApprovedPosts] = useState<ApprovedPost[]>([]);
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
      
      // Add more detailed logging
      const { data: adminData } = await supabase.auth.getSession();
      console.log("Admin auth check:", !!adminData.session);
      
      // Make sure we have the RLS policy set correctly
      const { data, error } = await supabase
        .from("blog_post_approvals")
        .select("*")
        .order("created_at", { ascending: false });

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

      // Use the data as it is
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

  return {
    pendingPosts,
    approvedPosts,
    selectedPost,
    setSelectedPost,
    isLoading,
    fetchError,
    previewImage,
    setPreviewImage,
    fetchAttempts,
    setFetchAttempts,
    handleApprove,
    handleReject,
    handleDelete,
    handleRetry
  };
}
