import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const NavLink = ({ to, children, className, onClick, isActive }: NavLinkProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Link
      to={to}
      className={`px-3 py-2 rounded-full ${isActive ? 'bg-mai-mauve/20 text-mai-mauveDark font-medium' : 'text-gray-600'} relative overflow-hidden group ${className || ''}`}
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
  const location = useLocation();
  const { toast } = useToast();
  const session = useSession();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if the current user is an admin
  const isAdmin = session?.user?.email && ADMIN_EMAILS.includes(session.user.email);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        // Save current path before redirecting to auth
        localStorage.setItem('returnPath', window.location.pathname);
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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderNavLinks = (onClick?: () => void) => (
    <>
      <NavLink to="/quiz" onClick={onClick} isActive={isActive('/quiz')}>Skin Quiz</NavLink>
      <NavLink to="/products" onClick={onClick} isActive={isActive('/products')}>Products</NavLink>
      <NavLink to="/businesses" onClick={onClick} isActive={isActive('/businesses')}>Small Businesses</NavLink>
      <NavLink to="/awareness" onClick={onClick} isActive={isActive('/awareness')}>Awareness</NavLink>
      <NavLink to="/community" onClick={onClick} isActive={isActive('/community')}>Community</NavLink>
      <NavLink to="/about" onClick={onClick} isActive={isActive('/about')}>About Us</NavLink>
      {isAdmin && (
        <NavLink to="/admin" className="text-mai-mauveDark font-medium" onClick={onClick} isActive={isActive('/admin')}>
          <span className="flex items-center">
            <ShieldCheck className="w-4 h-4 mr-1" />
            Admin
          </span>
        </NavLink>
      )}
    </>
  );

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 bg-white ${isScrolled ? 'shadow-md' : 'shadow-sm'} transition-shadow duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center ${isMobile ? 'h-16' : 'h-20'}`}>
          <Link to="/" className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-mai-brown hover:text-mai-mauveDark transition-colors`}>
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
                <SheetContent side="right" className="flex flex-col pt-16 w-[85vw] sm:w-[350px] bg-white">
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-4"
                      onClick={closeMenu}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </SheetClose>
                  <div className="flex flex-col space-y-6 mt-4">
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
