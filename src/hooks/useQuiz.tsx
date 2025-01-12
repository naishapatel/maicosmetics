import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProductRecommendation, QuizSelections } from "@/types/quiz";
import { makeupProducts } from "@/data/makeupProducts";

export const useQuiz = () => {
  const { toast } = useToast();
  const [selections, setSelections] = useState<QuizSelections>({
    skinType: [],
    concerns: [],
    preferences: [],
    makeupType: [],
  });
  const [showResults, setShowResults] = useState(false);
  const [currentTab, setCurrentTab] = useState("type");
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);

  const handleSelection = (category: keyof QuizSelections, item: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const getRecommendations = () => {
    if (!selections.skinType.length || !selections.makeupType.length) {
      toast({
        title: "Please complete the quiz",
        description: "Make sure to select at least one skin type and makeup type.",
        variant: "destructive",
      });
      return;
    }

    let newRecommendations: ProductRecommendation[] = [];
    
    // Match products based on makeup type
    selections.makeupType.forEach(type => {
      if (makeupProducts[type.toLowerCase()]) {
        newRecommendations.push(...makeupProducts[type.toLowerCase()]);
      }
    });

    // Match products based on skin type
    selections.skinType.forEach(type => {
      if (makeupProducts[type.toLowerCase()]) {
        newRecommendations.push(...makeupProducts[type.toLowerCase()]);
      }
    });

    // Limit to maximum 4 recommendations
    newRecommendations = newRecommendations.slice(0, 4);

    setRecommendations(newRecommendations);
    setShowResults(true);
    toast({
      title: "Quiz completed!",
      description: "Here are your personalized makeup recommendations from small businesses.",
    });
  };

  const resetQuiz = () => {
    setShowResults(false);
    setSelections({
      skinType: [],
      concerns: [],
      preferences: [],
      makeupType: [],
    });
    setRecommendations([]);
  };

  return {
    selections,
    showResults,
    currentTab,
    recommendations,
    setCurrentTab,
    handleSelection,
    getRecommendations,
    resetQuiz,
  };
};