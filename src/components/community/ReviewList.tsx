
import { useSession } from "@supabase/auth-helpers-react";
import { useMemo } from "react";
import { ReviewItem } from "./ReviewItem";

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
  
  // Memoize the review list to prevent unnecessary re-renders
  const memoizedReviews = useMemo(() => {
    return reviews.map((review) => (
      <ReviewItem 
        key={review.id} 
        review={review} 
        session={session} 
      />
    ));
  }, [reviews, session]);

  return (
    <div className="space-y-6">
      {memoizedReviews}
    </div>
  );
}
