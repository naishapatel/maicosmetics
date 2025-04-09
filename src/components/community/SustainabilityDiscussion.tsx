
import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Newspaper } from "lucide-react";
import { BlogPostSubmissionForm } from "./BlogPostForm";
import { BlogPostDisplay } from "./BlogPostDisplay";
import { PendingPostsList } from "./PendingPostsList";

interface PendingPost {
  id: string;
  content: string;
  image_url: string | null;
}

const SustainabilityDiscussion = () => {
  const session = useSession();
  const { toast } = useToast();
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([]);

  useEffect(() => {
    if (session) {
      fetchPendingPosts();
    }
  }, [session]);

  const fetchPendingPosts = async () => {
    if (!session) return;

    try {
      const { data, error } = await supabase
        .from("blog_post_approvals")
        .select("*")
        .eq("user_id", session.user.id)
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

  return (
    <div className="space-y-6">
      <div className="bg-mai-sage/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Newspaper className="text-mai-mauve mr-2 h-6 w-6" />
          <h2 className="text-2xl font-semibold text-mai-brown">Blog Posts</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Share your thoughts, ideas, and experiences related to beauty practices and ethical consumption.
          Your posts will be visible after approval.
        </p>
        
        <BlogPostSubmissionForm />
      </div>

      {session && <PendingPostsList posts={pendingPosts} />}

      <BlogPostDisplay />
    </div>
  );
};

export default SustainabilityDiscussion;
