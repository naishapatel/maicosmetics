
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface FounderCardProps {
  name: string;
  role: string;
  university: string;
  bio: string;
  image: string;
  borderColor: string;
  index: number;
}

const FounderCard = ({ name, role, university, bio, image, borderColor, index }: FounderCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        delay: index * 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.2 + 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.2 + 0.4
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-col md:flex-row items-center gap-10 mb-20 last:mb-0 p-6 rounded-2xl transition-all duration-300 hover:bg-white/50"
      variants={cardVariants}
      whileHover={{ 
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        y: -5,
        transition: { duration: 0.3 }
      }}
    >
      <div className="w-full md:w-1/3 flex justify-center">
        <motion.div
          variants={imageVariants}
          className={`relative w-64 h-64 rounded-full overflow-hidden border-4 border-${borderColor} shadow-lg`}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
            transition: { duration: 0.3 } 
          }}
        >
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <motion.div
            className={`absolute inset-0 bg-gradient-to-t from-${borderColor}/40 to-transparent opacity-0`}
            whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
          />
        </motion.div>
      </div>
      <motion.div 
        className="w-full md:w-2/3 space-y-5 text-center md:text-left"
        variants={textVariants}
      >
        <h3 className="text-2xl font-bold text-mai-brown">{name}</h3>
        <p className="text-xl text-mai-mauve font-medium">{role}</p>
        <p className="text-lg text-gray-600 italic">{university}</p>
        <p className="text-lg text-gray-600 leading-relaxed">
          {bio}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FounderCard;
