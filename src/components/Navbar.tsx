
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavLink = ({ to, children, className, onClick }: NavLinkProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={to}
      className={`px-3 py-2 rounded-full text-gray-600 relative overflow-hidden group ${className || ''}`}
      onClick={onClick}
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
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const renderNavLinks = (onClick?: () => void) => (
    <>
      <NavLink to="/quiz" onClick={onClick}>Skin Quiz</NavLink>
      <NavLink to="/products" onClick={onClick}>Products</NavLink>
      <NavLink to="/businesses" onClick={onClick}>Small Businesses</NavLink>
      <NavLink to="/sustainability" onClick={onClick}>Sustainability</NavLink>
      <NavLink to="/community" onClick={onClick}>Community</NavLink>
      <NavLink to="/about" onClick={onClick}>About Us</NavLink>
      {isAdmin && (
        <NavLink to="/admin" className="text-mai-mauveDark font-medium" onClick={onClick}>
          <span className="flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1" />
            Admin
          </span>
        </NavLink>
      )}
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="text-2xl font-bold text-mai-brown hover:text-mai-mauveDark transition-colors">
            mai.
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-2">
            {renderNavLinks()}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              className={`rounded-full px-4 transition-all duration-300 ${
                session 
                  ? "text-mai-brown hover:text-mai-mauveDark" 
                  : "bg-mai-darkRed text-white hover:bg-mai-darkRed/80"
              }`}
              onClick={handleAuthClick}
            >
              {session ? "Sign Out" : "Sign In"}
            </Button>
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="ml-1"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="flex flex-col pt-16">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-4"
                    onClick={closeMenu}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                  <div className="flex flex-col space-y-4 mt-4">
                    {renderNavLinks(closeMenu)}
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
