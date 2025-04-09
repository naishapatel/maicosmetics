
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroContent = () => {
  return (
    <div className="flex flex-col md:flex-row items-center relative z-10 py-16">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-6xl md:text-7xl font-serif text-mai-brown mb-6 leading-tight">
          Beauty that 
          <span className="relative inline-block ml-3">
            <span className="relative z-10 text-mai-darkRed">Cares</span>
            <span className="absolute inset-0 bg-mai-mauve/30 -skew-y-3 rounded-lg" />
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Discover makeup recommendations tailored to your unique skin conditions.
          Supporting independent ethical brands that align with your values.
        </p>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/quiz">
            <Button 
              className="bg-mai-darkRed hover:bg-mai-darkRed/90 text-white px-8 py-6 rounded-full"
            >
              Take the Skin Quiz
            </Button>
          </Link>
          <Link to="/products">
            <Button 
              variant="outline" 
              className="border-2 border-mai-mauve text-mai-mauve hover:bg-mai-mauve hover:text-white px-8 py-6 rounded-full"
            >
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="md:w-1/2 mt-12 md:mt-0">
        <img 
          src="/lovable-uploads/59d5171e-b0d4-44a0-a369-a7d8a4f4d167.png" 
          alt="Lipstick color swatches in coral, pink, and deep red" 
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};
