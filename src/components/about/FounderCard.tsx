
import { motion } from "framer-motion";

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
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-16 last:mb-0">
      <div className="w-full md:w-1/3 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`relative w-64 h-64 rounded-full overflow-hidden border-4 border-${borderColor}/20`}
        >
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
      <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
        <h3 className="text-2xl font-bold text-mai-brown">{name}</h3>
        <p className="text-xl text-mai-coral font-medium">{role}</p>
        <p className="text-lg text-gray-600">{university}</p>
        <p className="text-lg text-gray-600 leading-relaxed">
          {bio}
        </p>
      </div>
    </div>
  );
};

export default FounderCard;
