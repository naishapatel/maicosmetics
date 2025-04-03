
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface QuizOptionProps {
  option: string;
  isSelected: boolean;
  onClick: () => void;
  isMobile?: boolean;
}

const QuizOption = ({ option, isSelected, onClick, isMobile = false }: QuizOptionProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
        isSelected
          ? "border-mai-mauve bg-mai-mauve/10"
          : "border-gray-200 hover:border-mai-mauve/50"
      } ${isMobile ? 'p-2' : 'p-4'}`}
    >
      <div className="flex flex-col items-center text-center">
        {isSelected && (
          <div className="absolute top-2 right-2 w-5 h-5 bg-mai-mauve rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
        <span className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
          {option}
        </span>
      </div>
    </motion.div>
  );
};

export default QuizOption;
