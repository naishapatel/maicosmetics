import { Link } from "react-router-dom";
import { Copyright, Github, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
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
                <Link to="/quiz" className="text-mai-cream/80 hover:text-mai-coral transition-colors text-sm">
                  Skin Quiz
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-mai-cream/80 hover:text-mai-coral transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/businesses" className="text-mai-cream/80 hover:text-mai-coral transition-colors text-sm">
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
                <Link to="/community" className="text-mai-cream/80 hover:text-mai-coral transition-colors text-sm">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-mai-cream/80 hover:text-mai-coral transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-mai-cream">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mai-cream/80 hover:text-mai-coral transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mai-cream/80 hover:text-mai-coral transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-mai-cream/80 hover:text-mai-coral transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-mai-cream/20 flex items-center justify-between text-sm text-mai-cream/60">
          <div className="flex items-center space-x-2">
            <Copyright className="w-4 h-4" />
            <span>{new Date().getFullYear()} mai. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};