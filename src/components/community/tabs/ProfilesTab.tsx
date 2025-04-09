
import { ProfileList } from "@/components/community/ProfileList";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/auth-helpers-react";

interface ProfilesTabProps {
  session: Session | null;
  onAuthRedirect: () => void;
}

export function ProfilesTab({ session, onAuthRedirect }: ProfilesTabProps) {
  return (
    <div className="mt-6">
      {session ? (
        <ProfileList />
      ) : (
        <div className="text-center p-8 bg-mai-sage/20 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Connect with Community Members</h3>
          <p className="text-gray-600 mb-6">
            Sign in to discover and follow other members with similar ethical interests.
          </p>
          <Button onClick={onAuthRedirect}>Sign In</Button>
        </div>
      )}
    </div>
  );
}
