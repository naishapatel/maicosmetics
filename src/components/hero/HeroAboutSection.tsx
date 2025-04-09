import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
export const HeroAboutSection = () => {
  return <section className="mt-36 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="overflow-hidden shadow-lg flex items-center justify-center p-4 rounded-none bg-transparent px-0 py-0">
          <img src="/lovable-uploads/a9a08235-b454-47d9-8739-e7a081a9a62c.png" alt="Makeup palette with pink and neutral shades" className="w-auto h-auto max-w-full max-h-[400px] object-contain" />
        </div>
        <div className="space-y-6 bg-white/60 p-8 rounded-lg backdrop-blur-sm">
          <h2 className="text-4xl md:text-5xl font-serif text-mai-brown">
            About <br /><span className="text-mai-darkRed">our company</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">Discover makeup products that align with your ethical values without compromising your skin's needs. </p>
          <Link to="/about">
            <Button className="bg-mai-mauve hover:bg-mai-mauveDark text-white px-8 py-6 rounded-full mt-4">
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};