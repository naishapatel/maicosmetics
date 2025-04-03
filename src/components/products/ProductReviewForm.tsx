
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Session } from "@supabase/auth-helpers-react";

interface ProductReviewFormProps {
  session: Session | null;
  userReview: string;
  isSubmittingReview: boolean;
  onReviewChange: (review: string) => void;
  onSubmitReview: () => void;
}

export const ProductReviewForm = ({ 
  session, 
  userReview, 
  isSubmittingReview, 
  onReviewChange, 
  onSubmitReview 
}: ProductReviewFormProps) => {
  if (!session) return null;
  
  return (
    <Card>
      <CardContent className="border-t pt-6 mt-6">
        <h3 className="font-medium mb-3">Leave a Review</h3>
        <Textarea
          value={userReview}
          onChange={(e) => onReviewChange(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={4}
          className="mb-4"
        />
        <Button 
          onClick={onSubmitReview} 
          disabled={isSubmittingReview}
          className="bg-mai-mauve hover:bg-mai-mauveDark"
        >
          {isSubmittingReview ? "Submitting..." : "Submit Review"}
        </Button>
      </CardContent>
    </Card>
  );
};
