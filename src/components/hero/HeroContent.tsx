
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeroContent = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row items-center relative z-10 py-8 md:py-16">
      <div className={`${isMobile ? 'w-full' : 'md:w-1/2'} space-y-4 md:space-y-6 mb-8 md:mb-0`}>
        <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl md:text-7xl'} font-serif text-mai-brown leading-tight`}>
          Beauty that 
          <span className="relative inline-block ml-3">
            <span className="relative z-10 text-mai-darkRed">Cares</span>
            <span className="absolute inset-0 bg-mai-mauve/30 -skew-y-3 rounded-lg" />
          </span>
        </h1>
        
        <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-gray-600 leading-relaxed`}>
          Discover makeup recommendations tailored to your unique skin conditions.
          Supporting independent ethical brands that align with your values.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
      
      <div className={`${isMobile ? 'w-full' : 'md:w-1/2'} flex justify-center items-center`}>
        <div className={`${isMobile ? 'max-w-[90%]' : 'max-w-[80%]'} p-4 md:p-8 shadow-xl`}>
          <img 
            src="/lovable-uploads/59d5171e-b0d4-44a0-a369-a7d8a4f4d167.png" 
            alt="Lipstick color swatches in coral, pink, and deep red" 
            style={{ mixBlendMode: 'multiply' }} 
            className="w-full h-auto" 
          />
        </div>
      </div>
    </div>
  );
};
