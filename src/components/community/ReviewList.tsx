
import { format } from "date-fns";
import { Star } from "lucide-react";
import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  product_name: string;
  review_text: string;
  rating: number;
  created_at: string;
  profiles: {
    username: string | null;
  } | null;
}

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  const session = useSession();
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, any[]>>({});

  const fetchComments = async (reviewId: string) => {
    const { data } = await supabase
      .from("review_comments")
      .select("*, profiles(username)")
      .eq("review_id", reviewId)
      .order("created_at", { ascending: true });
    
    if (data) {
      setComments(prev => ({
        ...prev,
        [reviewId]: data
      }));
    }
  };

  const handleExpandReview = async (reviewId: string) => {
    if (expandedReview === reviewId) {
      setExpandedReview(null);
    } else {
      setExpandedReview(reviewId);
      await fetchComments(reviewId);
    }
  };

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white shadow rounded-lg p-6 space-y-4"
        >
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
              onClick={() => handleExpandReview(review.id)}
            >
              {expandedReview === review.id ? "Hide Comments" : "Show Comments"}
            </Button>
            
            {expandedReview === review.id && (
              <div className="mt-4 space-y-4">
                {comments[review.id] && comments[review.id].length > 0 && (
                  <CommentList comments={comments[review.id]} />
                )}
                
                {session ? (
                  <CommentForm
                    user={session.user}
                    reviewId={review.id}
                    onCommentSubmitted={() => fetchComments(review.id)}
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
      ))}
    </div>
  );
}
