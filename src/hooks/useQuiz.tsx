import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ProductRecommendation, QuizSelections } from "@/types/quiz";
import { calculateProductScore, getRecommendationsByType } from "@/utils/quizScoring";

export const useQuiz = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const { toast } = useToast();
  
  const [selections, setSelections] = useState<QuizSelections>({
    skinType: [],
    concerns: [],
    preferences: [],
    makeupType: [],
  });

  const handleSelection = (
    category: keyof QuizSelections,
    value: string,
    isSelected: boolean
  ) => {
    setSelections((prev) => ({
      ...prev,
      [category]: isSelected
        ? [...prev[category], value]
        : prev[category].filter((item) => item !== value),
    }));
  };

  const resetQuiz = () => {
    setCurrentTab(0);
    setShowResults(false);
    setRecommendations([]);
    setSelections({
      skinType: [],
      concerns: [],
      preferences: [],
      makeupType: [],
    });
  };

  const getRecommendations = async () => {
    if (!selections.makeupType.length) {
      toast({
        variant: "destructive",
        title: "Please select at least one makeup type",
        description: "This helps us provide relevant recommendations.",
      });
      return;
    }

    try {
      // Get products for each selected makeup type
      const makeupTypes = selections.makeupType.map(type => type.toLowerCase());
      const productsPromises = makeupTypes.map(type => 
        getRecommendationsByType(supabase, type)
      );

      const productsByType = await Promise.all(productsPromises);
      const allProducts = productsByType.flat();

      // Score and sort products
      const scoredProducts = allProducts.map(product => ({
        ...product,
        score: calculateProductScore(product, selections.preferences, recommendations)
      }));

      // Ensure at least one product per selected makeup type
      const finalRecommendations: ProductRecommendation[] = [];
      makeupTypes.forEach(type => {
        const typeProducts = scoredProducts.filter(p => 
          p.makeup_type.toLowerCase() === type
        );
        if (typeProducts.length > 0) {
          const bestMatch = typeProducts.reduce((prev, current) => 
            current.score > prev.score ? current : prev
          );
          finalRecommendations.push(bestMatch);
        }
      });

      // Fill remaining slots with highest scored products
      const minRecommendations = Math.max(4, makeupTypes.length);
      const remainingSlots = minRecommendations - finalRecommendations.length;
      
      if (remainingSlots > 0) {
        const remainingProducts = scoredProducts
          .filter(p => !finalRecommendations.some(r => r.id === p.id))
          .sort((a, b) => b.score - a.score)
          .slice(0, remainingSlots);
        
        finalRecommendations.push(...remainingProducts);
      }

      setRecommendations(finalRecommendations);
      setShowResults(true);
      toast({
        title: "Quiz completed!",
        description: "Here are your personalized recommendations.",
      });
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