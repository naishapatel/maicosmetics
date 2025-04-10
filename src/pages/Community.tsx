
import { CommunityTabs } from "@/components/community/CommunityTabs";
import { useIsMobile } from "@/hooks/use-mobile";

const Community = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-white">
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-4 pt-20 pb-10' : 'px-4 sm:px-6 lg:px-8 pt-24 pb-12'}`}>
        <CommunityTabs />
      </div>
    </div>
  );
};

export default Community;
