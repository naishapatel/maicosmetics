import { QuizSelections } from "@/types/quiz";
import QuizOption from "./QuizOption";

interface QuizOptionsGridProps {
  options: string[];
  category: keyof QuizSelections;
  selections: QuizSelections;
  handleSelection: (category: keyof QuizSelections, item: string) => void;
}

const QuizOptionsGrid = ({ options, category, selections, handleSelection }: QuizOptionsGridProps) => {
  const isSelected = (item: string) => selections[category].includes(item);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((item) => (
        <QuizOption
          key={item}
          item={item}
          isSelected={isSelected(item)}
          onClick={() => handleSelection(category, item)}
        />
      ))}
    </div>
  );
};

export default QuizOptionsGrid;