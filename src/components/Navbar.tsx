
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { ShieldCheck } from "lucide-react";

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

// List of admin email addresses
const ADMIN_EMAILS = ["naisha.r.patel@gmail.com", "naishapatelofficial@gmail.com"];

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();

  // Check if the current user is an admin
  const isAdmin = session?.user?.email && ADMIN_EMAILS.includes(session.user.email);

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
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-white shadow-sm"
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
            <NavLink to="/sustainability">Sustainability</NavLink>
            <NavLink to="/community">Community</NavLink>
            <NavLink to="/about">About Us</NavLink>
            {isAdmin && (
              <NavLink to="/admin" className="text-mai-mauveDark font-medium">
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Admin
                </span>
              </NavLink>
            )}
          </div>
          <Button
            variant="ghost"
            className={`rounded-full px-6 transition-all duration-300 ${
              session 
                ? "text-mai-brown hover:text-mai-mauveDark" 
                : "bg-mai-darkRed text-white hover:bg-mai-darkRed/80"
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
