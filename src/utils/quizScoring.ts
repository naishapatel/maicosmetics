import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { QuizSelections, ProductRecommendation } from '@/types/quiz';

export const calculateProductScore = (
  product: Database['public']['Tables']['product_recommendations']['Row'],
  preferences: string[],
  existingRecommendations: any[]
): number => {
  let score = 0;

  // Avoid recommending products already selected
  if (existingRecommendations.some(rec => rec.id === product.id)) {
    return -1;
  }

  // Match ethical values preferences
  preferences.forEach(pref => {
    if (product.ethical_values.includes(pref.toLowerCase())) {
      score += 2;
    }
  });

  // Boost score for products in relevant categories
  if (product.category === 'products for acne' && preferences.includes('Non-comedogenic')) {
    score += 3;
  }

  if (product.category === 'eco-friendly beauty' && 
      (preferences.includes('Natural ingredients') || preferences.includes('Cruelty-free'))) {
    score += 2;
  }

  if (product.category === 'vegan beauty' && preferences.includes('Cruelty-free')) {
    score += 2;
  }

  return score;
};

export const getRecommendationsByType = async (
  supabase: SupabaseClient<Database>,
  makeupType: string
) => {
  const { data, error } = await supabase
    .from('product_recommendations')
    .select('*')
    .eq('makeup_type', makeupType.toLowerCase())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }

  return data || [];
};

const mapDatabaseToProductRecommendation = (
  dbProduct: Database['public']['Tables']['product_recommendations']['Row']
): ProductRecommendation => ({
  id: dbProduct.id,
  name: dbProduct.product_name, // Map product_name to name
  brand: dbProduct.brand,
  price: dbProduct.price,
  description: dbProduct.description,
  makeup_type: dbProduct.makeup_type,
  category: dbProduct.category,
  ethical_values: dbProduct.ethical_values
});

export const getPersonalizedRecommendations = async (
  supabase: SupabaseClient<Database>,
  selections: QuizSelections
): Promise<ProductRecommendation[]> => {
  try {
    const makeupTypes = selections.makeupType.map(type => type.toLowerCase());
    const productsPromises = makeupTypes.map(type => getRecommendationsByType(supabase, type));
    const productsByType = await Promise.all(productsPromises);
    const allProducts = productsByType.flat();

    const scoredProducts = allProducts.map(product => ({
      ...product,
      score: calculateProductScore(product, selections.preferences, [])
    })).sort((a, b) => b.score - a.score);

    const recommendations: typeof scoredProducts = [];
    const usedBrands = new Set<string>();
    const maxRecommendations = Math.max(4, makeupTypes.length);

    for (const product of scoredProducts) {
      if (recommendations.length >= maxRecommendations) break;
      
      if (!usedBrands.has(product.brand)) {
        recommendations.push(product);
        usedBrands.add(product.brand);
      }
    }

    if (recommendations.length < maxRecommendations) {
      const remainingProducts = scoredProducts
        .filter(p => !recommendations.some(r => r.id === p.id))
        .slice(0, maxRecommendations - recommendations.length);
      
      recommendations.push(...remainingProducts);
    }

    // Map the database results to match our frontend type
    return recommendations.map(mapDatabaseToProductRecommendation);
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    throw error;
  }
};