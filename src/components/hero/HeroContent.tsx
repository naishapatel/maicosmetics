
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
export const HeroContent = () => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.8
  }} className="text-center relative z-10">
      <motion.div initial={{
      opacity: 0,
      scale: 0.9
    }} animate={{
      opacity: 1,
      scale: 1
    }} whileHover={{
      scale: 1.05
    }} transition={{
      duration: 0.2
    }} className="inline-flex items-center gap-2 px-6 py-2 mb-8 glass-card border-mai-sage/30 cursor-pointer">
        <Sparkles className="w-4 h-4 text-mai-mauve" />
        <span className="text-sm font-medium text-mai-brown">
          Discover your perfect makeup match
        </span>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 0.2
    }} className="relative">
        <h1 className="text-6xl sm:text-7xl font-bold text-mai-brown mb-4 tracking-tight leading-tight">
          Beauty that
          <span className="relative inline-block mx-3">
            <span className="relative z-10 text-mai-mauve">Cares</span>
            <motion.span className="absolute inset-0 bg-mai-sage/20 -skew-y-3 rounded-lg" initial={{
            scaleX: 0
          }} animate={{
            scaleX: 1
          }} transition={{
            delay: 0.5,
            duration: 0.8
          }} />
          </span>
        </h1>
      </motion.div>

      <motion.p initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 0.4
    }} className="max-w-2xl mx-auto text-lg text-gray-600 mb-12 leading-relaxed">
        Discover makeup recommendations tailored to your unique skin conditions. 
        Supporting independent ethical brands that align with your values.
      </motion.p>

      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      delay: 0.6
    }} className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link to="/quiz">
          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <Button className="group bg-mai-mauve hover:bg-mai-brown text-white px-8 py-6 rounded-full transition-all duration-300 transform shadow-lg hover:shadow-xl w-full sm:w-auto relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Take the Skin Quiz
              </span>
              <motion.div className="absolute inset-0 bg-gradient-to-r from-mai-mauve to-mai-brown" initial={{
              x: "100%"
            }} whileHover={{
              x: 0
            }} transition={{
              duration: 0.3
            }} />
            </Button>
          </motion.div>
        </Link>
        <Link to="/products">
          <motion.div whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <Button variant="outline" className="border-2 border-mai-mauve text-mai-mauve hover:bg-mai-mauve hover:text-white px-8 py-6 rounded-full transition-all duration-300 w-full sm:w-auto backdrop-blur-sm relative overflow-hidden group">
              <span className="relative z-10">Browse Products</span>
              <motion.div className="absolute inset-0 bg-mai-mauve/10" initial={{
              scale: 0,
              opacity: 0
            }} whileHover={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.2
            }} />
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>;
};
