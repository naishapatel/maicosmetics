
import { RecommendationForm } from "@/components/community/RecommendationForm";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/auth-helpers-react";

interface RecommendationsTabProps {
  session: Session | null;
  onAuthRedirect: () => void;
}

export function RecommendationsTab({ session, onAuthRedirect }: RecommendationsTabProps) {
  const handleRecommendationSubmitted = () => {
    // This could be expanded to refresh a list of recommendations if needed
    console.log("Recommendation submitted");
  };

  return (
    <div className="bg-mai-sage/20 rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-semibold text-mai-brown mb-4">
        Recommend a Product
      </h2>
      {session ? (
        <RecommendationForm
          user={session.user}
          onRecommendationSubmitted={handleRecommendationSubmitted}
        />
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Please sign in to recommend a product
          </p>
          <Button onClick={onAuthRedirect}>Sign In</Button>
        </div>
      )}
    </div>
  );
}
