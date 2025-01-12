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
          ? "bg-mai-coral text-white hover:bg-mai-coral/90"
          : "hover:bg-mai-rose/20"
      }`}
      onClick={onClick}
    >
      {item}
    </Button>
  );
};

export default QuizOption;