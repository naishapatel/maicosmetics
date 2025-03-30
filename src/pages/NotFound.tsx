
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-mai-blushPink to-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card max-w-md w-full p-8 text-center space-y-6"
      >
        <div className="relative mx-auto w-32 h-32 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute inset-0 rounded-full bg-mai-mauve/20 animate-ping"
            style={{ animationDuration: "3s" }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-7xl font-bold text-mai-darkRed">404</span>
          </motion.div>
        </div>
        
        <h1 className="text-3xl font-bold text-mai-darkRed">Page Not Found</h1>
        
        <p className="text-gray-600">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-mai-mauve text-mai-darkRed hover:bg-mai-mauve/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            className="bg-mai-mauve hover:bg-mai-mauveDark text-white"
          >
            <Search className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
