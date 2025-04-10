
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroContent = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col items-center text-center relative z-10 py-8 md:py-16">
      <div className="w-full max-w-2xl mx-auto space-y-6 md:space-y-8 mb-8 md:mb-0">
        <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl md:text-7xl'} font-serif text-mai-brown leading-tight`}>
          Beauty that 
          <span className="relative inline-block ml-3">
            <span className="relative z-10 text-mai-darkRed">Cares</span>
            <span className="absolute inset-0 bg-mai-mauve/30 -skew-y-3 rounded-lg" />
          </span>
        </h1>
        
        <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 leading-relaxed max-w-xl mx-auto`}>
          Discover makeup recommendations tailored to your unique skin conditions.
          Supporting independent ethical brands that align with your values.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/quiz">
            <Button className={`bg-mai-darkRed hover:bg-mai-darkRed/90 text-white ${isMobile ? 'px-6 py-4 w-full' : 'px-8 py-6'} rounded-full`}>
              Take the Skin Quiz
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" className={`border-2 border-mai-mauve text-mai-mauve hover:bg-mai-mauve hover:text-white ${isMobile ? 'px-6 py-4 w-full' : 'px-8 py-6'} rounded-full`}>
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
