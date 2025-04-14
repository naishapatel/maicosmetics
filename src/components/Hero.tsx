
import { HeroBackground } from "./hero/HeroBackground";
import { HeroContent } from "./hero/HeroContent";
import { HeroAboutSection } from "./hero/HeroAboutSection";
import { SustainableProductsShowcase } from "./home/SustainableProductsShowcase";
import { EcoFriendlySpotlight } from "./home/EcoFriendlySpotlight";
import { useIsMobile } from "@/hooks/use-mobile";

export const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative overflow-hidden">
      <div className="bg-gradient-to-b from-white via-mai-mauve/10 to-mai-mauve/15 min-h-screen">
        <HeroBackground />
        
        <div className={`relative max-w-7xl mx-auto ${isMobile ? 'px-4 pt-16 pb-12' : 'px-4 sm:px-6 lg:px-8 pt-20 pb-16'}`}>
          <HeroContent />
          <HeroAboutSection />
        </div>
      </div>
      
      <SustainableProductsShowcase />
      <EcoFriendlySpotlight />
    </div>
  );
};
