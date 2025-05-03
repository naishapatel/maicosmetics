
import { HeroBackground } from "./hero/HeroBackground";
import { HeroContent } from "./hero/HeroContent";
import { HeroAboutSection } from "./hero/HeroAboutSection";
import { EcoFriendlySpotlight } from "./home/EcoFriendlySpotlight";
import { useIsMobile } from "@/hooks/use-mobile";

export const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative">
      {/* Main hero section */}
      <section className="bg-gradient-to-b from-white via-mai-mauve/10 to-mai-mauve/15 min-h-screen overflow-hidden">
        <HeroBackground />
        
        <div className={`relative max-w-7xl mx-auto ${isMobile ? 'px-4 pt-16 pb-12' : 'px-4 sm:px-6 lg:px-8 pt-20 pb-16'}`}>
          <HeroContent />
          <HeroAboutSection />
        </div>
      </section>
      
      {/* Additional showcase sections - rendered as separate sections to prevent layout issues */}
      <section className="relative z-10 bg-gradient-to-b from-white to-mai-cream/20">
        <EcoFriendlySpotlight />
      </section>
    </div>
  );
};
