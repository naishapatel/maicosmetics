import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ProductRecommendation, QuizSelections } from "@/types/quiz";
import { supabase } from "@/integrations/supabase/client";

export const useQuiz = () => {
  const { toast } = useToast();
  const [selections, setSelections] = useState<QuizSelections>({
    skinType: [],
    concerns: [],
    preferences: [],
    makeupType: [],
    finish: [],
    coverage: []
  });
  const [showResults, setShowResults] = useState(false);
  const [currentTab, setCurrentTab] = useState("makeup");
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);

  const handleSelection = (category: keyof QuizSelections, item: string) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const getRecommendations = async () => {
    if (!selections.skinType.length || !selections.makeupType.length) {
      toast({
        title: "Please complete the quiz",
        description: "Make sure to select at least one skin type and makeup type.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Get products for each selected makeup type
      const makeupTypes = selections.makeupType.map(type => type.toLowerCase());
      const productsPromises = makeupTypes.map(type =>
        supabase
          .from('product_recommendations')
          .select('*')
          .eq('makeup_type', type)
      );

      const results = await Promise.all(productsPromises);
      
      // Collect all products and organize by makeup type
      const productsByType: { [key: string]: ProductRecommendation[] } = {};
      results.forEach((result, index) => {
        if (result.data) {
          productsByType[makeupTypes[index]] = result.data.map(product => ({
            id: product.id,
            name: product.product_name,
            brand: product.brand,
            price: product.price,
            description: product.description,
            makeup_type: product.makeup_type,
            category: product.category,
            ethical_values: product.ethical_values
          }));
        }
      });

      // Calculate match score for each product based on preferences and concerns
      const scoredProducts = Object.values(productsByType)
        .flat()
        .map(product => {
          let score = 0;
          
          // Match with ethical values preferences
          selections.preferences.forEach(pref => {
            if (product.ethical_values.some(value => 
              value.toLowerCase().includes(pref.toLowerCase())
            )) {
              score += 2;
            }
          });

          // Additional score for matching brand variety
          if (recommendations.every(rec => rec.brand !== product.brand)) {
            score += 1;
          }

          return { ...product, score };
        });

      // Ensure at least one product per selected makeup type
      const finalRecommendations: ProductRecommendation[] = [];
      makeupTypes.forEach(type => {
        const typeProducts = scoredProducts.filter(p => 
          p.makeup_type.toLowerCase() === type
        );
        if (typeProducts.length > 0) {
          // Get the highest scored product for this type
          const bestMatch = typeProducts.reduce((prev, current) => 
            current.score > prev.score ? current : prev
          );
          finalRecommendations.push(bestMatch);
        }
      });

      // Fill remaining slots with highest scored products not already included
      const remainingSlots = Math.max(4, makeupTypes.length) - finalRecommendations.length;
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
        description: "Here are your personalized makeup recommendations from small businesses.",
      });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch recommendations. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetQuiz = () => {
    setShowResults(false);
    setSelections({
      skinType: [],
      concerns: [],
      preferences: [],
      makeupType: [],
      finish: [],
      coverage: []
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