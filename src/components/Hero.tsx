
import { HeroBackground } from "./hero/HeroBackground";
import { HeroContent } from "./hero/HeroContent";
import { HeroAboutSection } from "./hero/HeroAboutSection";
import { FeaturedProducts } from "./hero/FeaturedProducts";

export const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-mai-mauve/10 to-mai-mauve/15">
      <HeroBackground />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <HeroContent />
        <HeroAboutSection />
        <FeaturedProducts />
      </div>
    </div>
  );
};
