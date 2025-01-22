import { ProductRecommendation, QuizSelections } from "@/types/quiz";

export const calculateProductScore = (
  product: ProductRecommendation,
  preferences: string[],
  existingRecommendations: ProductRecommendation[]
): number => {
  let score = 0;
  
  // Match with ethical values preferences
  preferences.forEach(pref => {
    if (product.ethical_values.some(value => 
      value.toLowerCase().includes(pref.toLowerCase())
    )) {
      score += 2;
    }
  });

  // Additional score for brand variety
  if (existingRecommendations.every(rec => rec.brand !== product.brand)) {
    score += 1;
  }

  return score;
};

export const getRecommendationsByType = async (
  supabase: any,
  makeupType: string
): Promise<ProductRecommendation[]> => {
  const { data, error } = await supabase
    .from('product_recommendations')
    .select('*')
    .eq('makeup_type', makeupType);

  if (error) throw error;

  return data.map((product: any) => ({
    id: product.id,
    name: product.product_name,
    brand: product.brand,
    price: product.price,
    description: product.description,
    makeup_type: product.makeup_type,
    category: product.category,
    ethical_values: product.ethical_values
  }));
};