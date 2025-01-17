import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Navbar = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthClick = () => {
    if (session) {
      supabase.auth.signOut();
    } else {
      navigate("/auth");
    }
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-semibold text-mai-brown">
            mai.
          </Link>
          <div className="hidden sm:flex space-x-8">
            <Link to="/quiz" className="text-gray-600 hover:text-mai-coral transition-colors">
              Skin Quiz
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-mai-coral transition-colors">
              Products
            </Link>
            <Link to="/businesses" className="text-gray-600 hover:text-mai-coral transition-colors">
              Small Businesses
            </Link>
            <Link to="/community" className="text-gray-600 hover:text-mai-coral transition-colors">
              Community
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-mai-coral transition-colors">
              About Us
            </Link>
          </div>
          <Button
            variant="ghost"
            className="text-mai-coral hover:text-mai-brown transition-colors"
            onClick={handleAuthClick}
          >
            {session ? "Sign Out" : "Sign In"}
          </Button>
        </div>
      </div>
    </nav>
  );
};