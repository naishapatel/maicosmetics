import { TabsContent } from "@/components/ui/tabs";
import { QuizSelections } from "@/types/quiz";
import QuizOptionsGrid from "./QuizOptionsGrid";

interface QuizTabContentProps {
  value: string;
  options: string[];
  category: keyof QuizSelections;
  selections: QuizSelections;
  handleSelection: (category: keyof QuizSelections, item: string) => void;
}

const QuizTabContent = ({
  value,
  options,
  category,
  selections,
  handleSelection,
}: QuizTabContentProps) => {
  return (
    <TabsContent value={value} className="space-y-4">
      <QuizOptionsGrid
        options={options}
        category={category}
        selections={selections}
        handleSelection={handleSelection}
      />
    </TabsContent>
  );
};

export default QuizTabContent;