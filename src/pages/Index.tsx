
import { Hero } from "@/components/Hero";
import { Sparkles, Leaf, Store } from "lucide-react";
import { UserDashboard } from "@/components/UserDashboard";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const features = [
  {
    title: "Vegan Products",
    description: "All recommended products are 100% vegan and cruelty-free, ensuring ethical beauty choices.",
    icon: <Leaf className="w-8 h-8" />,
  },
  {
    title: "Small Business Focus",
    description: "Support independent brands that prioritize quality ingredients and personalized care.",
    icon: <Store className="w-8 h-8" />,
  },
  {
    title: "Personalized Care",
    description: "Get tailored recommendations based on your unique skin condition and preferences.",
    icon: <Sparkles className="w-8 h-8" />,
  },
];

const Index = () => {
  const session = useSession();
  const isReturningUser = !!session;
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      {isReturningUser && (
        <section className="py-8 md:py-16 bg-gradient-to-b from-white to-mai-sand/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-mai-brown mb-6 md:mb-8 text-center`}>
              Welcome Back
            </h2>
            <UserDashboard />
          </div>
        </section>
      )}
      
      <section className="py-16 md:py-32 bg-gradient-to-b from-mai-sand to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-serif text-mai-brown mb-4 md:mb-6`}>
              Why Choose <span className="text-mai-coral">mai.</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
              We understand that every skin is unique. Our recommendations are carefully curated to match your specific needs and preferences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-white p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 ${isMobile ? 'mb-4' : ''}`}
              >
                <div className="text-mai-coral mb-4 md:mb-6 bg-mai-rose/20 p-4 rounded-2xl inline-block">
                  {feature.icon}
                </div>
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-mai-brown mb-3 md:mb-4`}>{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-mai-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-serif text-mai-brown mb-4 md:mb-6`}>
            Join Our Community
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 px-4">
            Connect with like-minded individuals who share your passion for ethical and sustainable beauty products.
          </p>
          <Link to="/community">
            <Button className={`bg-mai-darkRed hover:bg-mai-darkRed/90 text-white ${isMobile ? 'px-6 py-4' : 'px-8 py-6'} rounded-full`}>
              Visit Community
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
