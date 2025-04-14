
import { BlogPost } from "@/components/community/BlogPost";
import { Session } from "@supabase/auth-helpers-react";

interface AwarenessTabProps {
  session: Session | null;
  onAuthRedirect: () => void;
}

export function AwarenessTab({ session, onAuthRedirect }: AwarenessTabProps) {
  return (
    <div className="mt-6">
      <BlogPost user={session?.user || null} onAuthRedirect={onAuthRedirect} />
    </div>
  );
}
