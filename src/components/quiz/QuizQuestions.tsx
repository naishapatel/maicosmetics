
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizSelections } from "@/types/quiz";
import QuizTabContent from "./QuizTabContent";
import { useToast } from "@/components/ui/use-toast";
import { ChevronRight } from "lucide-react";

interface QuizQuestionsProps {
  selections: QuizSelections;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  handleSelection: (category: keyof QuizSelections, item: string) => void;
  getRecommendations: (showAll?: boolean) => void;
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

  const tabOrder = ["makeup", "type", "concerns", "finish", "coverage", "preferences"];
  
  const validateTabSelection = (category: string): boolean => {
    const categoryMap: Record<string, keyof QuizSelections> = {
      makeup: "makeupType",
      type: "skinType",
      concerns: "concerns",
      finish: "finish",
      coverage: "coverage",
      preferences: "preferences"
    };
    
    const selectionKey = categoryMap[category];
    if (selections[selectionKey].length === 0) {
      toast({
        variant: "destructive",
        title: "Please make a selection",
        description: `Please select at least one option before moving to the next question.`,
      });
      return false;
    }
    return true;
  };

  const handleNextQuestion = () => {
    const currentIndex = tabOrder.indexOf(currentTab);
    if (currentIndex >= 0 && currentIndex < tabOrder.length - 1) {
      if (validateTabSelection(currentTab)) {
        setCurrentTab(tabOrder[currentIndex + 1]);
      }
    } else if (currentIndex === tabOrder.length - 1) {
      validateSelections() && getRecommendations(false);
    }
  };

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
      getRecommendations(false);
    }
  };
  
  const handleGetAllRecommendations = () => {
    if (validateSelections()) {
      getRecommendations(true);
    }
  };

  const isLastTab = currentTab === tabOrder[tabOrder.length - 1];

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

      <div className="mt-8 flex justify-between">
        <div></div> {/* Empty div to push buttons to the right */}
        <div className="flex gap-4">
          <Button
            onClick={handleNextQuestion}
            className="bg-mai-mauve hover:bg-mai-mauveDark text-white transition-colors"
          >
            {isLastTab ? "Get Recommendations" : (
              <>
                Next Question
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
          {isLastTab && (
            <Button
              onClick={handleGetAllRecommendations}
              className="bg-mai-coral hover:bg-mai-darkRed text-white transition-colors"
            >
              See All Results
            </Button>
          )}
        </div>
      </div>
    </Tabs>
  );
};

export default QuizQuestions;
