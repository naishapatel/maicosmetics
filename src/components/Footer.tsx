
import { Link } from "react-router-dom";
import { Copyright, Github, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;

      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Subscription failed",
        description: error.message === "duplicate key value violates unique constraint \"newsletter_subscribers_email_key\""
          ? "This email is already subscribed!"
          : "There was an error subscribing to the newsletter.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-mai-brown text-white mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">mai.</h3>
            <p className="text-mai-cream/80 text-sm">
              Empowering beauty choices through personalized recommendations and community insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-mai-cream">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/quiz" className="text-mai-cream/80 hover:text-mai-mauve transition-colors text-sm">
                  Skin Quiz
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-mai-cream/80 hover:text-mai-mauve transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="text-mai-cream/80 hover:text-mai-mauve transition-colors text-sm">
                  Small Businesses
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h4 className="font-semibold text-mai-cream">Community</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/community" className="text-mai-cream/80 hover:text-mai-mauve transition-colors text-sm">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-mai-cream/80 hover:text-mai-mauve transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="font-semibold text-mai-cream">Stay Updated</h4>
            <p className="text-mai-cream/80 text-sm">
              Join our newsletter for the latest trends, sustainable products, and community highlights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-mai-cream/20 text-mai-cream placeholder:text-mai-cream/50"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-mai-mauve hover:bg-mai-mauve/90 text-white"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 pt-8 border-t border-mai-cream/20 flex flex-col md:flex-row items-center justify-between">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mai-cream/80 hover:text-mai-mauve transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mai-cream/80 hover:text-mai-mauve transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mai-cream/80 hover:text-mai-mauve transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center space-x-2 text-sm text-mai-cream/60">
            <Copyright className="w-4 h-4" />
            <span>{new Date().getFullYear()} mai. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
