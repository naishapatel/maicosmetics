import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizSelections } from "@/types/quiz";

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
  const isSelected = (category: keyof QuizSelections, item: string) =>
    selections[category].includes(item);

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
      <TabsList className="w-full mb-8">
        <TabsTrigger value="makeup" className="flex-1">Makeup Type</TabsTrigger>
        <TabsTrigger value="type" className="flex-1">Skin Type</TabsTrigger>
        <TabsTrigger value="concerns" className="flex-1">Skin Concerns</TabsTrigger>
        <TabsTrigger value="preferences" className="flex-1">Preferences</TabsTrigger>
      </TabsList>

      <TabsContent value="makeup" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Foundation", "Concealer", "Blush", "Bronzer", "Eyeshadow", "Mascara", "Lipstick"].map((type) => (
            <Button
              key={type}
              variant={isSelected("makeupType", type) ? "default" : "outline"}
              className={`h-auto p-4 text-left justify-start ${
                isSelected("makeupType", type)
                  ? "bg-mai-coral text-white hover:bg-mai-coral/90"
                  : "hover:bg-mai-rose/20"
              }`}
              onClick={() => handleSelection("makeupType", type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="type" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Dry", "Oily", "Combination", "Normal", "Sensitive"].map((type) => (
            <Button
              key={type}
              variant={isSelected("skinType", type) ? "default" : "outline"}
              className={`h-auto p-4 text-left justify-start ${
                isSelected("skinType", type)
                  ? "bg-mai-coral text-white hover:bg-mai-coral/90"
                  : "hover:bg-mai-rose/20"
              }`}
              onClick={() => handleSelection("skinType", type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="concerns" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Acne", "Redness", "Dark spots", "Fine lines", "Uneven texture"].map((concern) => (
            <Button
              key={concern}
              variant={isSelected("concerns", concern) ? "default" : "outline"}
              className={`h-auto p-4 text-left justify-start ${
                isSelected("concerns", concern)
                  ? "bg-mai-coral text-white hover:bg-mai-coral/90"
                  : "hover:bg-mai-rose/20"
              }`}
              onClick={() => handleSelection("concerns", concern)}
            >
              {concern}
            </Button>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="preferences" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["Fragrance-free", "Oil-free", "Non-comedogenic", "Natural ingredients", "Cruelty-free"].map(
            (pref) => (
              <Button
                key={pref}
                variant={isSelected("preferences", pref) ? "default" : "outline"}
                className={`h-auto p-4 text-left justify-start ${
                  isSelected("preferences", pref)
                    ? "bg-mai-coral text-white hover:bg-mai-coral/90"
                    : "hover:bg-mai-rose/20"
                }`}
                onClick={() => handleSelection("preferences", pref)}
              >
                {pref}
              </Button>
            )
          )}
        </div>
      </TabsContent>

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