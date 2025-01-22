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
      // Query products based on makeup type
      const { data: makeupTypeProducts, error: makeupTypeError } = await supabase
        .from('product_recommendations')
        .select('*')
        .in('makeup_type', selections.makeupType.map(type => type.toLowerCase()));

      if (makeupTypeError) throw makeupTypeError;

      // Transform the data to match our ProductRecommendation interface
      const transformedProducts: ProductRecommendation[] = makeupTypeProducts.map(product => ({
        id: product.id,
        name: product.product_name,
        brand: product.brand,
        price: product.price,
        description: product.description,
        makeup_type: product.makeup_type,
        category: product.category,
        ethical_values: product.ethical_values
      }));

      // Limit to maximum 4 recommendations
      const limitedRecommendations = transformedProducts.slice(0, 4);

      setRecommendations(limitedRecommendations);
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