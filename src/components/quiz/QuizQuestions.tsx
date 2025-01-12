import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizSelections } from "@/types/quiz";
import QuizTabContent from "./QuizTabContent";

interface QuizQuestionsProps {
  selections: QuizSelections;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  handleSelection: (category: keyof QuizSelections, item: string) => void;
  getRecommendations: () => void;
}

const QuizQuestions = ({
  selections,
  currentTab,
  setCurrentTab,
  handleSelection,
  getRecommendations,
}: QuizQuestionsProps) => {
  const makeupTypes = ["Foundation", "Concealer", "Blush", "Bronzer", "Eyeshadow", "Mascara", "Lipstick"];
  const skinTypes = ["Dry", "Oily", "Combination", "Normal", "Sensitive"];
  const skinConcerns = ["Acne", "Redness", "Dark spots", "Fine lines", "Uneven texture"];
  const preferences = ["Fragrance-free", "Oil-free", "Non-comedogenic", "Natural ingredients", "Cruelty-free"];

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
      <TabsList className="w-full mb-8">
        <TabsTrigger value="makeup" className="flex-1">Makeup Type</TabsTrigger>
        <TabsTrigger value="type" className="flex-1">Skin Type</TabsTrigger>
        <TabsTrigger value="concerns" className="flex-1">Skin Concerns</TabsTrigger>
        <TabsTrigger value="preferences" className="flex-1">Preferences</TabsTrigger>
      </TabsList>

      <QuizTabContent
        value="makeup"
        options={makeupTypes}
        category="makeupType"
        selections={selections}
        handleSelection={handleSelection}
      />

      <QuizTabContent
        value="type"
        options={skinTypes}
        category="skinType"
        selections={selections}
        handleSelection={handleSelection}
      />

      <QuizTabContent
        value="concerns"
        options={skinConcerns}
        category="concerns"
        selections={selections}
        handleSelection={handleSelection}
      />

      <QuizTabContent
        value="preferences"
        options={preferences}
        category="preferences"
        selections={selections}
        handleSelection={handleSelection}
      />

      <div className="mt-8 flex justify-end">
        <Button
          onClick={getRecommendations}
          className="bg-mai-coral hover:bg-mai-brown text-white transition-colors"
        >
          Get Recommendations
        </Button>
      </div>
    </Tabs>
  );
};

export default QuizQuestions;