
import { format } from "date-fns";
import { Star } from "lucide-react";
import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/auth-helpers-react";
import { memo } from "react";

interface ReviewItemProps {
  review: {
    id: string;
    product_name: string;
    review_text: string;
    rating: number;
    created_at: string;
    profiles: {
      username: string | null;
    } | null;
  };
  session: Session | null;
}

export const ReviewItem = memo(({ review, session }: ReviewItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState<any[]>([]);

  const fetchComments = async () => {
    const { data } = await supabase
      .from("review_comments")
      .select("*, profiles(username)")
      .eq("review_id", review.id)
      .order("created_at", { ascending: true });
    
    if (data) {
      setComments(data);
    }
  };

  const handleToggleExpand = async () => {
    if (!expanded) {
      await fetchComments();
    }
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-mai-brown">
            {review.product_name}
          </h3>
          <p className="text-sm text-gray-500">
            by {review.profiles?.username || "Anonymous"} •{" "}
            {format(new Date(review.created_at), "MMMM yyyy")}
          </p>
        </div>
        <div className="flex items-center">
          {[...Array(review.rating)].map((_, i) => (
            <Star
              key={i}
              className="w-5 h-5 text-yellow-400 fill-current"
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700">{review.review_text}</p>
      
      <div className="pt-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleExpand}
        >
          {expanded ? "Hide Comments" : "Show Comments"}
        </Button>
        
        {expanded && (
          <div className="mt-4 space-y-4">
            {comments.length > 0 && <CommentList comments={comments} />}
            
            {session?.user ? (
              <CommentForm
                user={session.user}
                reviewId={review.id}
                onCommentSubmitted={fetchComments}
              />
            ) : (
              <p className="text-sm text-gray-500">
                Please sign in to leave a comment
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

ReviewItem.displayName = "ReviewItem";
