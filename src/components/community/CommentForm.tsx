import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/auth-helpers-react";

interface CommentFormProps {
  user: User;
  reviewId: string;
  onCommentSubmitted: () => void;
}

export function CommentForm({ user, reviewId, onCommentSubmitted }: CommentFormProps) {
  const { toast } = useToast();
  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.from("review_comments").insert([
        {
          user_id: user.id,
          review_id: reviewId,
          comment_text: comment,
        },
      ]);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error submitting comment",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Success!",
        description: "Your comment has been posted.",
      });

      setComment("");
      onCommentSubmitted();
    } catch (error) {
      console.error("Error in handleSubmitComment:", error);
      toast({
        variant: "destructive",
        title: "Error submitting comment",
        description: "Failed to submit comment",
      });
    }
  };

  return (
    <form onSubmit={handleSubmitComment} className="space-y-4">
      <Textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <Button type="submit" size="sm">Post Comment</Button>
    </form>
  );
}