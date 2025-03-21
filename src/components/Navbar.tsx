
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ to, children, className }: NavLinkProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={to}
      className={`px-4 py-2 rounded-full text-gray-600 relative overflow-hidden group ${className || ''}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-mai-mauve/20 to-mai-mauveLight/20 rounded-full -z-0"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  </motion.div>
);

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthClick = async () => {
    try {
      if (session) {
        await supabase.auth.signOut();
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
        navigate("/");
      } else {
        navigate("/auth");
      }
    } catch (error) {
      console.error("Auth error:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: errorMessage,
      });
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
          <Link to="/" className="text-2xl font-bold text-mai-brown hover:text-mai-mauveDark transition-colors">
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
                ? "text-mai-brown hover:text-mai-mauveDark" 
                : "bg-mai-mauveDark text-white hover:bg-mai-mauveDark/80"
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

export default Navbar;
