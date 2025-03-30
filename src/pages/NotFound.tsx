
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-mai-blushPink via-white to-mai-mauveLight/30">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-mai-mauve/10 animate-pulse" 
          style={{ animationDuration: "6s" }} />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-mai-mauveLight/20 animate-pulse"
          style={{ animationDuration: "8s" }} />
        <div className="absolute top-2/3 left-1/2 w-32 h-32 rounded-full bg-mai-blushPink/20 animate-pulse"
          style={{ animationDuration: "4s" }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="glass-card max-w-md w-full p-8 text-center space-y-6 relative z-10 border-mai-mauve/20 shadow-xl"
      >
        <div className="relative mx-auto w-36 h-36">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-mai-mauve/50 to-mai-darkRed/20 backdrop-blur-sm animate-pulse"
            style={{ animationDuration: "3s" }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-mai-darkRed to-mai-mauve">404</span>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-mai-darkRed mb-2">Page Not Found</h1>
          
          <p className="text-gray-600">
            We couldn't find the page you're looking for.<br />
            It may have been moved or doesn't exist.
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-mai-mauve/30 to-transparent mx-auto my-6 max-w-xs"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="pt-2 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-mai-mauve text-mai-darkRed hover:bg-mai-mauve/10 group transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-mai-mauve to-mai-mauveDark hover:opacity-90 text-white group transition-all"
          >
            <Sparkles className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            Return Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
