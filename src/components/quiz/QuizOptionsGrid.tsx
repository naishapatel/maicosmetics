
import { QuizSelections } from "@/types/quiz";
import QuizOption from "./QuizOption";
import { motion } from "framer-motion";

interface QuizOptionsGridProps {
  options: string[];
  category: keyof QuizSelections;
  selections: QuizSelections;
  handleSelection: (category: keyof QuizSelections, item: string) => void;
  isMobile?: boolean; 
}

const QuizOptionsGrid = ({
  options,
  category,
  selections,
  handleSelection,
  isMobile = false
}: QuizOptionsGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`grid ${isMobile ? 'grid-cols-2 gap-2' : 'grid-cols-4 gap-4'}`}
    >
      {options.map((option) => (
        <motion.div key={option} variants={item}>
          <QuizOption
            option={option}
            isSelected={selections[category].includes(option)}
            onClick={() => handleSelection(category, option)}
            isMobile={isMobile}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuizOptionsGrid;
