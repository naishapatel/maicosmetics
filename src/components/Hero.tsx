import { HeroBackground } from "./hero/HeroBackground";
import { HeroImages } from "./hero/HeroImages";
import { HeroContent } from "./hero/HeroContent";
import { HeroFeatures } from "./hero/HeroFeatures";

export const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <HeroBackground />
      <HeroImages />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <HeroContent />
        <HeroFeatures />
      </div>
    </div>
  );
};