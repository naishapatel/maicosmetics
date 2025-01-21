import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Session } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error fetching session:", error.message);
        setError(error.message);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "There was a problem with the authentication service. Please try again later.",
        });
      } else {
        setSession(session);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate("/");
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleAuthClick = async () => {
    try {
      if (session) {
        await supabase.auth.signOut();
        navigate("/");
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
      } else {
        navigate("/auth");
      }
    } catch (error) {
      console.error("Auth error:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
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