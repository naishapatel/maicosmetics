
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProductRecommendation, QuizSelections } from "@/types/quiz";
import { getPersonalizedRecommendations, getAllRecommendations } from "@/utils/quizScoring";

export const useQuiz = () => {
  const [currentTab, setCurrentTab] = useState("makeup");
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const { toast } = useToast();
  
  const [selections, setSelections] = useState<QuizSelections>({
    skinType: [],
    concerns: [],
    preferences: [],
    makeupType: [],
    finish: [],
    coverage: []
  });

  const handleSelection = (
    category: keyof QuizSelections,
    item: string
  ) => {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item],
    }));
  };

  const resetQuiz = () => {
    setCurrentTab("makeup");
    setShowResults(false);
    setRecommendations([]);
    setSelections({
      skinType: [],
      concerns: [],
      preferences: [],
      makeupType: [],
      finish: [],
      coverage: []
    });
  };

  const getRecommendations = async (showAll: boolean = false) => {
    if (!selections.makeupType.length) {
      toast({
        variant: "destructive",
        title: "Please select at least one makeup type",
        description: "This helps us provide relevant recommendations.",
      });
      return;
    }

    try {
      let personalizedRecommendations;
      
      if (showAll) {
        personalizedRecommendations = await getAllRecommendations(supabase, selections);
        toast({
          title: "All Results",
          description: "Showing all products that match your preferences.",
        });
      } else {
        personalizedRecommendations = await getPersonalizedRecommendations(supabase, selections);
        toast({
          title: "Quiz completed!",
          description: "Here are your personalized recommendations based on your preferences.",
        });
      }
      
      setRecommendations(personalizedRecommendations);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
      });
    }
  };

  return {
    currentTab,
    setCurrentTab,
    showResults,
    recommendations,
    selections,
    handleSelection,
    getRecommendations,
    resetQuiz,
  };
};
