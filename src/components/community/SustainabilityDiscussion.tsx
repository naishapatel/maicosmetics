
import { useState, useEffect } from "react";
import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/auth-helpers-react";
import { format } from "date-fns";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

interface SustainabilityPost {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profiles?: {
    username: string | null;
    avatar_url: string | null;
  } | null;
}

interface SustainabilityDiscussionProps {
  user: User | null;
  onAuthRedirect: () => void;
}

export function SustainabilityDiscussion({ user, onAuthRedirect }: SustainabilityDiscussionProps) {
  const { toast } = useToast();
  const [posts, setPosts] = useState<SustainabilityPost[]>([]);
  const [newPost, setNewPost] = useState("");
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("sustainability_posts")
        .select("*, profiles(username, avatar_url)")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
        toast({
          variant: "destructive",
          title: "Error fetching discussions",
          description: error.message,
        });
        return;
      }

      if (data) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error in fetchPosts:", error);
      toast({
        variant: "destructive",
        title: "Error fetching discussions",
        description: "Failed to fetch sustainability discussions",
      });
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

    try {
      const { error } = await supabase.from("sustainability_posts").insert([
        {
          user_id: user.id,
          content: newPost,
        },
      ]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error submitting post",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Your post has been shared with the community.",
      });

      setNewPost("");
      fetchPosts();
    } catch (error) {
      console.error("Error in handleSubmitPost:", error);
      toast({
        variant: "destructive",
        title: "Error submitting post",
        description: "Failed to submit post",
      });
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("sustainability_posts")
        .delete()
        .eq("id", postId)
        .eq("user_id", user.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error deleting post",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Post deleted",
        description: "Your post has been removed.",
      });

      fetchPosts();
    } catch (error) {
      console.error("Error in handleDeletePost:", error);
      toast({
        variant: "destructive",
        title: "Error deleting post",
        description: "Failed to delete post",
      });
    }
  };

  const isCurrentUserPost = (postUserId: string) => {
    return user && user.id === postUserId;
  };

  return (
    <div className="space-y-8">
      <div className="bg-mai-sage/20 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <Leaf className="text-mai-mauve mr-2 h-6 w-6" />
          <h2 className="text-2xl font-semibold text-mai-brown">Sustainability Discussion</h2>
        </div>
        <p className="text-gray-600 mb-6">
          Share your thoughts, ideas, and experiences related to sustainable beauty practices and ethical consumption. 
          Learn from others and contribute to a more environmentally conscious community.
        </p>
        
        <form onSubmit={handleSubmitPost} className="space-y-4">
          <Textarea
            placeholder={user ? "Share your thoughts on sustainability in beauty..." : "Please sign in to participate in the discussion"}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            disabled={!user}
            className="min-h-[120px]"
            required
          />
          {user ? (
            <Button type="submit">Share with Community</Button>
          ) : (
            <Button type="button" onClick={onAuthRedirect}>Sign In to Participate</Button>
          )}
        </form>
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <p className="text-gray-500">Be the first to start a discussion about sustainability!</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="bg-white">
              <CardHeader className="flex flex-row items-start justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.profiles?.avatar_url || undefined} />
                    <AvatarFallback>{post.profiles?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base text-mai-brown">
                      {post.profiles?.username || "Anonymous"}
                    </CardTitle>
                    <p className="text-xs text-gray-500">
                      {format(new Date(post.created_at), "MMM d, yyyy • h:mm a")}
                    </p>
                  </div>
                </div>
                {isCurrentUserPost(post.user_id) && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPostToDelete(post.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete your post from the community discussion.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-600" 
                          onClick={() => handleDeletePost(post.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Leaf className="h-4 w-4 mr-1 text-mai-mauve" />
                  <span>Sustainability Discussion</span>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
