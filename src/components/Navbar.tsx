import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export const Navbar = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-mai-brown hover:text-mai-coral transition-colors">
            mai.
          </Link>
          <div className="hidden sm:flex space-x-1">
            <NavLink to="/quiz">Skin Quiz</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/businesses">Small Businesses</NavLink>
            <NavLink to="/community">Community</NavLink>
            <NavLink to="/about">About Us</NavLink>
          </div>
          <Button
            variant="ghost"
            className={`rounded-full px-6 transition-all duration-300 ${
              session 
                ? "text-mai-brown hover:text-mai-coral" 
                : "bg-mai-coral text-white hover:bg-mai-brown"
            }`}
            onClick={handleAuthClick}
          >
            {session ? "Sign Out" : "Sign In"}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="px-4 py-2 rounded-full text-gray-600 hover:text-mai-coral hover:bg-mai-sage/20 transition-all duration-300"
  >
    {children}
  </Link>
);

export default Navbar;