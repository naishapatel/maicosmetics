
import { SustainabilityDiscussion } from "@/components/community/SustainabilityDiscussion";
import { Session } from "@supabase/auth-helpers-react";

interface AwarenessTabProps {
  session: Session | null;
  onAuthRedirect: () => void;
}

export function AwarenessTab({ session, onAuthRedirect }: AwarenessTabProps) {
  return (
    <div className="mt-6">
      <SustainabilityDiscussion />
    </div>
  );
}
