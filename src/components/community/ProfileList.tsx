
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ProfileCard } from "@/components/community/ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileList() {
  // Component kept for future use but not actively displayed
  // The logic for fetching profiles is maintained in Supabase
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-mai-brown mb-4">Community Members</h2>
      <p className="text-gray-600">Community members information is stored privately.</p>
    </div>
  );
}
