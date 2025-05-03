
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { fetchPendingPostsWithUserData, fetchApprovedPosts, approvePost, rejectPost, deletePost } from "./blogAdminUtils";

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

  // Fetch data when fetchAttempts changes
  useEffect(() => {
    console.log(`Fetch attempt #${fetchAttempts + 1} for pending posts`);
    fetchPendingPosts();
    fetchApprovedPostsData();
  }, [fetchAttempts]);

  // Fetch pending posts
  const fetchPendingPosts = async () => {
    try {
      setIsLoading(true);
      setFetchError(null);
      
      const pendingPostsData = await fetchPendingPostsWithUserData();
      setPendingPosts(pendingPostsData);
    } catch (error) {
      console.error("Error in fetchPendingPosts:", error);
      setFetchError(error instanceof Error ? error.message : "Unknown error occurred");
      toast({
        variant: "destructive", 
        title: "Error fetching pending posts",
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch approved posts
  const fetchApprovedPostsData = async () => {
    try {
      const approvedPostsData = await fetchApprovedPosts();
      setApprovedPosts(approvedPostsData);
    } catch (error) {
      console.error("Error in fetchApprovedPostsData:", error);
      toast({
        variant: "destructive",
        title: "Error fetching approved posts",
        description: error instanceof Error ? error.message : "Unknown error occurred"
      });
    }
  };

  // Handle post approval
  const handleApprove = async (post: PendingPost) => {
    try {
      await approvePost(post);
      fetchPendingPosts();
      fetchApprovedPostsData();
      setSelectedPost(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error approving post",
        description: "An unexpected error occurred"
      });
    }
  };

  // Handle post rejection
  const handleReject = async (postId: string) => {
    try {
      await rejectPost(postId);
      fetchPendingPosts();
      setSelectedPost(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error rejecting post",
        description: "An unexpected error occurred"
      });
    }
  };

  // Handle post deletion
  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      fetchApprovedPostsData();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error deleting post",
        description: "An unexpected error occurred"
      });
    }
  };

  // Handle retry of data fetch
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
