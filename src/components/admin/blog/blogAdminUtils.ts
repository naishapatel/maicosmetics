
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Function to fetch user profile data
export const fetchUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .maybeSingle();
      
    if (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error in fetchUserProfile:", error);
    return null;
  }
};

// Function to fetch pending posts with user data
export const fetchPendingPostsWithUserData = async () => {
  try {
    console.log("Fetching pending posts using RLS policies...");
    
    // Check authentication
    const { data: adminData } = await supabase.auth.getSession();
    console.log("Admin auth check:", !!adminData.session);
    
    // Fetch pending posts
    const { data, error } = await supabase
      .from("blog_post_approvals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching pending posts:", error);
      console.error("Error details:", JSON.stringify(error));
      throw error;
    }

    console.log("Pending posts data:", data);
    console.log("Number of pending posts:", data ? data.length : 0);
    
    // Early return if no data
    if (!data || data.length === 0) {
      return [];
    }
    
    // Fetch user profiles for each post
    const postsWithUsernames = await Promise.all(
      data.map(async (post) => {
        const profileData = await fetchUserProfile(post.user_id);
        return {
          ...post,
          user_profile: profileData
        };
      })
    );
    
    return postsWithUsernames;
  } catch (error) {
    console.error("Error in fetchPendingPostsWithUserData:", error);
    throw error;
  }
};

// Function to fetch approved posts
export const fetchApprovedPosts = async () => {
  try {
    console.log("Fetching approved posts...");
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching approved posts:", error);
      console.error("Error details:", JSON.stringify(error));
      throw error;
    }

    console.log("Approved posts data:", data);
    return data || [];
  } catch (error) {
    console.error("Error in fetchApprovedPosts:", error);
    throw error;
  }
};

// Function to approve a post
export const approvePost = async (post: {
  id: string;
  user_id: string;
  content: string;
  image_url: string | null;
}) => {
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
      throw insertError;
    }

    // Delete from approvals table
    const { error: deleteError } = await supabase
      .from("blog_post_approvals")
      .delete()
      .eq("id", post.id);

    if (deleteError) {
      console.error("Error deleting approved post:", deleteError);
      throw deleteError;
    }

    toast({
      title: "Post approved",
      description: "The blog post has been approved and published"
    });
    
    return true;
  } catch (error) {
    console.error("Error in approvePost:", error);
    throw error;
  }
};

// Function to reject a post
export const rejectPost = async (postId: string) => {
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
      throw error;
    }

    toast({
      title: "Post rejected",
      description: "The blog post has been rejected"
    });
    
    return true;
  } catch (error) {
    console.error("Error in rejectPost:", error);
    throw error;
  }
};

// Function to delete a post
export const deletePost = async (postId: string) => {
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
      throw error;
    }

    toast({
      title: "Post deleted",
      description: "The blog post has been deleted"
    });
    
    return true;
  } catch (error) {
    console.error("Error in deletePost:", error);
    throw error;
  }
};
