
import { BlogPost } from "@/components/community/BlogPost";
import { SustainableBeautyTips } from "@/components/community/SustainableBeautyTips";
import { Session } from "@supabase/auth-helpers-react";

interface AwarenessTabProps {
  session: Session | null;
  onAuthRedirect: () => void;
}

export function AwarenessTab({ session, onAuthRedirect }: AwarenessTabProps) {
  return (
    <div className="mt-6 space-y-8">
      <SustainableBeautyTips />
      
      <div>
        <h2 className="text-2xl font-serif text-mai-brown mb-4">
          Share Your Sustainable Beauty Journey
        </h2>
        <BlogPost user={session?.user || null} onAuthRedirect={onAuthRedirect} />
      </div>
    </div>
  );
}
