
import { Heart, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-6 h-6 text-mai-darkRed" />,
    title: "Personalized Care",
    description: "Tailored recommendations for your unique skin"
  },
  {
    icon: <Shield className="w-6 h-6 text-mai-darkRed" />,
    title: "Ethical Choices",
    description: "Cruelty-free and sustainable products"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-mai-darkRed" />,
    title: "Small Business",
    description: "Support independent ethical brands"
  }
];

export const HeroFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
      {features.map((feature, index) => (
        <div
          key={index}
          className="relative group cursor-pointer"
        >
          <div
            className="glass-card p-8 transition-all duration-300 border border-white/20 backdrop-blur-md relative z-10"
          >
            <div
              className="w-12 h-12 bg-gradient-to-br from-mai-blushPink/60 to-mai-mauve/40 rounded-xl flex items-center justify-center mb-6 mx-auto transition-transform duration-300"
            >
              <div>
                {feature.icon}
              </div>
            </div>
            <h3
              className="text-lg font-semibold text-mai-darkRed mb-3"
            >
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-mai-blushPink/30 to-mai-mauve/30 blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"
          />
        </div>
      ))}
    </div>
  );
};
