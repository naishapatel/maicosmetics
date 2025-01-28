import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizSelections } from "@/types/quiz";
import QuizTabContent from "./QuizTabContent";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const makeupTypes = ["Foundation", "Concealer", "Blush", "Bronzer", "Eyeshadow", "Mascara", "Lipstick", "No preference"];
  const skinTypes = ["Normal", "Dry", "Oily", "Combination", "Sensitive", "Scaly", "Not sure", "No preference"];
  const skinConcerns = ["Acne", "Redness", "Dark spots", "Fine lines", "Uneven texture", "No concerns"];
  const preferences = ["Fragrance-free", "Oil-free", "Non-comedogenic", "Natural ingredients", "Cruelty-free", "No preference"];
  const finishTypes = ["Matte", "Dewy", "Natural", "No preference"];
  const coverageLevels = ["Minimal", "Light", "Medium", "Maximum", "No preference"];

  const validateSelections = () => {
    const categories = [
      { name: 'makeupType', label: 'Makeup Type' },
      { name: 'skinType', label: 'Skin Type' },
      { name: 'concerns', label: 'Skin Concerns' },
      { name: 'finish', label: 'Finish' },
      { name: 'coverage', label: 'Coverage' },
      { name: 'preferences', label: 'Preferences' }
    ];

    for (const category of categories) {
      if (selections[category.name as keyof QuizSelections].length === 0) {
        toast({
          variant: "destructive",
          title: "Missing Selection",
          description: `Please select at least one option for ${category.label}`,
        });
        setCurrentTab(category.name === 'makeupType' ? 'makeup' : category.name);
        return false;
      }
    }
    return true;
  };

  const handleGetRecommendations = () => {
    if (validateSelections()) {
      getRecommendations();
    }
  };

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
      <TabsList className="w-full mb-8">
        <TabsTrigger value="makeup" className="flex-1">Makeup Type</TabsTrigger>
        <TabsTrigger value="type" className="flex-1">Skin Type</TabsTrigger>
        <TabsTrigger value="concerns" className="flex-1">Skin Concerns</TabsTrigger>
        <TabsTrigger value="finish" className="flex-1">Finish</TabsTrigger>
        <TabsTrigger value="coverage" className="flex-1">Coverage</TabsTrigger>
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
        value="finish"
        options={finishTypes}
        category="finish"
        selections={selections}
        handleSelection={handleSelection}
      />

      <QuizTabContent
        value="coverage"
        options={coverageLevels}
        category="coverage"
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
          onClick={handleGetRecommendations}
          className="bg-mai-coral hover:bg-mai-brown text-white transition-colors"
        >
          Get Recommendations
        </Button>
      </div>
    </Tabs>
  );
};

export default QuizQuestions;