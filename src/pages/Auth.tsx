import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Heart, Leaf } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-mai-cream to-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-16">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-4"
          >
            <Heart className="text-mai-coral w-8 h-8" />
            <Leaf className="text-mai-coral w-8 h-8" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-mai-sage/20"
          >
            <h1 className="text-3xl font-bold text-mai-brown mb-2 text-center">Welcome to mai.</h1>
            <p className="text-gray-600 text-center mb-8">Join our community of conscious beauty enthusiasts</p>
            <SupabaseAuth 
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#FF9494',
                      brandAccent: '#4A3F35',
                      defaultButtonBackground: '#FF9494',
                      defaultButtonBackgroundHover: '#4A3F35',
                      inputBackground: 'white',
                      inputBorder: '#E7F3EF',
                      inputBorderHover: '#FF9494',
                      inputBorderFocus: '#4A3F35',
                    },
                    borderWidths: {
                      buttonBorderWidth: '0px',
                      inputBorderWidth: '2px',
                    },
                    radii: {
                      borderRadiusButton: '9999px',
                      buttonBorderRadius: '9999px',
                      inputBorderRadius: '12px',
                    },
                  }
                },
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                  input: 'auth-input',
                }
              }}
              providers={[]}
            />
          </motion.div>
        </div>
      </div>
      <div className="fixed inset-0 -z-10 bg-[url('/pattern.svg')] bg-repeat opacity-5" />
    </div>
  );
};

export default Auth;