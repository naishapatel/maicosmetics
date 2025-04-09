
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const HeroAboutSection = () => {
  return (
    <section className="mt-36 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src="/lovable-uploads/572c87d3-5522-43eb-88f4-4c688083b6fa.png"
            alt="Elegant makeup product"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="space-y-6 bg-white/60 p-8 rounded-lg backdrop-blur-sm">
          <h2 className="text-4xl md:text-5xl font-serif text-mai-brown">
            About <br/><span className="text-mai-darkRed">our company</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Discover the science of beauty at the intersection of expertise and innovation.
            Our team is dedicated to offering high-quality makeup and cosmetics 
            that not only enhance but also nourish your natural allure.
          </p>
          <Link to="/about">
            <Button 
              className="bg-mai-mauve hover:bg-mai-mauveDark text-white px-8 py-6 rounded-full mt-4"
            >
              Learn more
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
