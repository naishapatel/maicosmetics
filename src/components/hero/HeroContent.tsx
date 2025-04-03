
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroContent = () => {
  return (
    <div className="text-center relative z-10">
      <div className="inline-flex items-center gap-2 px-6 py-2 mb-8 glass-card border-mai-blushPink/30 cursor-pointer">
        <Sparkles className="w-4 h-4 text-mai-darkRed" />
        <span className="text-sm font-medium text-mai-darkRed">
          Discover your perfect makeup match
        </span>
      </div>

      <div className="relative">
        <h1 className="text-6xl sm:text-7xl font-bold text-mai-mauve mb-4 tracking-tight leading-tight">
          Beauty that
          <span className="relative inline-block mx-3">
            <span className="relative z-10 text-mai-darkRed">Cares</span>
            <span className="absolute inset-0 bg-mai-mauve/40 -skew-y-3 rounded-lg" />
          </span>
        </h1>
      </div>

      <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-12 leading-relaxed">
        Discover makeup recommendations tailored to your unique skin conditions. 
        Supporting independent ethical brands that align with your values.
      </p>

      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link to="/quiz">
          <div>
            <Button className="bg-mai-darkRed hover:bg-mai-darkRed/90 text-white px-8 py-6 rounded-full transition-all duration-300 transform shadow-lg hover:shadow-xl w-full sm:w-auto">
              Take the Skin Quiz
            </Button>
          </div>
        </Link>
        <Link to="/products">
          <div>
            <Button variant="outline" className="border-2 border-mai-mauve text-mai-mauve hover:bg-mai-mauve hover:text-white px-8 py-6 rounded-full transition-all duration-300 w-full sm:w-auto backdrop-blur-sm relative overflow-hidden group">
              <span className="relative z-10">Browse Products</span>
              <div className="absolute inset-0 bg-mai-mauve/10" />
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
};
