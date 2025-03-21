
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";

const Auth = () => {
  const navigate = useNavigate();
  const session = useSession();

  useEffect(() => {
    if (session) {
      navigate("/", { replace: true });
    }
  }, [session, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mai-cream via-mai-rose to-mai-sage">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-16 relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-md mx-auto"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 text-mai-mauve" />
            </motion.div>
            <h1 className="text-4xl font-serif font-light text-mai-brown mb-3">
              Welcome to mai
            </h1>
            <p className="text-mai-brown/80 text-lg">
              Join our community of conscious beauty enthusiasts
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/40"
          >
            <SupabaseAuth 
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#4A3F35',
                      brandAccent: '#9D7A8C',
                      defaultButtonBackground: '#4A3F35',
                      defaultButtonBackgroundHover: '#9D7A8C',
                      inputBackground: 'white',
                      inputBorder: '#E7F3EF',
                      inputBorderHover: '#9D7A8C',
                      inputBorderFocus: '#4A3F35',
                    },
                    borderWidths: {
                      buttonBorderWidth: '1px',
                      inputBorderWidth: '1px',
                    },
                    radii: {
                      borderRadiusButton: '8px',
                      buttonBorderRadius: '8px',
                      inputBorderRadius: '8px',
                    },
                    space: {
                      inputPadding: '12px',
                      buttonPadding: '12px',
                    },
                    fonts: {
                      bodyFontFamily: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
                      buttonFontFamily: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
                      inputFontFamily: `ui-serif, Georgia, Cambria, "Times New Roman", Times, serif`,
                    },
                  }
                },
                className: {
                  container: 'space-y-4',
                  button: 'w-full transition-all duration-200 hover:transform hover:translate-y-[-2px] active:translate-y-[1px]',
                  input: 'w-full transition-colors duration-200',
                  label: 'text-mai-brown font-serif',
                  loader: 'text-mai-mauve',
                }
              }}
              providers={[]}
            />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-mai-rose/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-mai-sage/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Auth;
