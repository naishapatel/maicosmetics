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
    if (!selections.skinType.length || !selections.concerns.length) {
      toast({
        title: "Please complete the quiz",
        description: "Make sure to select at least one skin type and concern.",
        variant: "destructive",
      });
      return;
    }

    let newRecommendations: ProductRecommendation[] = [];
    
    // Match products based on skin type
    selections.skinType.forEach(type => {
      if (type.toLowerCase() === "dry") {
        newRecommendations.push(...makeupProducts.dry);
      }
      if (type.toLowerCase() === "oily") {
        newRecommendations.push(...makeupProducts.oily);
      }
    });

    // Match products based on concerns
    if (selections.concerns.includes("Coverage")) {
      newRecommendations.push(...makeupProducts.coverage);
    }

    // Match products based on preferences
    if (selections.preferences.includes("Natural ingredients")) {
      newRecommendations.push(...makeupProducts.natural);
    }

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