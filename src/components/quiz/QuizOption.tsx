
import { Button } from "@/components/ui/button";

interface QuizOptionProps {
  item: string;
  isSelected: boolean;
  onClick: () => void;
}

const QuizOption = ({ item, isSelected, onClick }: QuizOptionProps) => {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      className={`h-auto p-4 text-left justify-start ${
        isSelected
          ? "bg-mai-mauve text-white hover:bg-mai-darkRed"
          : "hover:bg-mai-blushPink/40"
      }`}
      onClick={onClick}
    >
      {item}
    </Button>
  );
};

export default QuizOption;
