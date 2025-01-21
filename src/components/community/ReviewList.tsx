import { format } from "date-fns";
import { Star } from "lucide-react";

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
                {format(new Date(review.created_at), "MMM d, yyyy")}
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
        </div>
      ))}
    </div>
  );
}