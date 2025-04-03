
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';
import { QuizSelections, ProductRecommendation } from '@/types/quiz';
import { supabase } from '@/integrations/supabase/client';

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
  makeupType: string,
  isNoPreference: boolean
) => {
  let query = supabase
    .from('product_recommendations')
    .select('*')
    .order('created_at', { ascending: false });

  // If not "No preference", filter by makeup type
  if (!isNoPreference) {
    query = query.eq('makeup_type', makeupType.toLowerCase());
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }

  return data || [];
};

const expandNoPreferenceSelections = (
  category: string[],
  allOptions: string[]
): string[] => {
  if (category.includes('No preference')) {
    return allOptions.filter(option => option !== 'No preference');
  }
  return category;
};

const mapDatabaseToProductRecommendation = (
  dbProduct: Database['public']['Tables']['product_recommendations']['Row']
): ProductRecommendation => {
  const { data: imageUrl } = supabase.storage
    .from('product-images')
    .getPublicUrl(`${dbProduct.id}.jpg`);

  return {
    id: dbProduct.id,
    name: dbProduct.product_name, // Map product_name to name
    brand: dbProduct.brand,
    price: dbProduct.price,
    description: dbProduct.description,
    makeup_type: dbProduct.makeup_type,
    category: dbProduct.category,
    ethical_values: dbProduct.ethical_values,
    imageUrl: imageUrl.publicUrl,
    business_tags: dbProduct.business_tags
  };
};

export const getPersonalizedRecommendations = async (
  supabase: SupabaseClient<Database>,
  selections: QuizSelections
): Promise<ProductRecommendation[]> => {
  try {
    // Define all possible options for each category
    const allMakeupTypes = ["Foundation", "Concealer", "Blush", "Bronzer", "Eyeshadow", "Mascara", "Lipstick"];
    const allSkinTypes = ["Normal", "Dry", "Oily", "Combination", "Sensitive", "Scaly", "Not sure"];
    const allFinishTypes = ["Matte", "Dewy", "Natural"];
    const allCoverageLevels = ["Minimal", "Light", "Medium", "Maximum"];
    const allPreferences = ["Fragrance-free", "Oil-free", "Non-comedogenic", "Natural ingredients", "Cruelty-free"];

    // Expand selections if "No preference" is selected
    const expandedSelections = {
      makeupType: expandNoPreferenceSelections(selections.makeupType, allMakeupTypes),
      skinType: expandNoPreferenceSelections(selections.skinType, allSkinTypes),
      concerns: selections.concerns.includes('No concerns') ? [] : selections.concerns,
      preferences: expandNoPreferenceSelections(selections.preferences, allPreferences),
      finish: expandNoPreferenceSelections(selections.finish, allFinishTypes),
      coverage: expandNoPreferenceSelections(selections.coverage, allCoverageLevels)
    };

    console.log('Expanded selections:', expandedSelections);

    const hasNoPreferenceMakeup = selections.makeupType.includes('No preference');
    const productsPromises = expandedSelections.makeupType.map(type => 
      getRecommendationsByType(supabase, type, hasNoPreferenceMakeup)
    );
    
    const productsByType = await Promise.all(productsPromises);
    const allProducts = productsByType.flat();

    console.log('Found products:', allProducts.length);

    const scoredProducts = allProducts.map(product => ({
      ...product,
      score: calculateProductScore(product, expandedSelections.preferences, [])
    })).sort((a, b) => b.score - a.score);

    // Ensure at least one recommendation per makeup type
    const recommendations: typeof scoredProducts = [];
    const usedBrands = new Set<string>();
    
    // First, get one top product for each makeup type
    for (const type of expandedSelections.makeupType) {
      const typeLower = type.toLowerCase();
      const bestProductForType = scoredProducts.find(p => 
        p.makeup_type === typeLower && !recommendations.some(r => r.id === p.id)
      );
      
      if (bestProductForType) {
        recommendations.push(bestProductForType);
        usedBrands.add(bestProductForType.brand);
      }
    }
    
    // Then fill up to a reasonable number with highest scored products
    // ensuring brand diversity
    const maxRecommendations = Math.max(4, expandedSelections.makeupType.length);
    
    for (const product of scoredProducts) {
      if (recommendations.length >= maxRecommendations) break;
      
      if (!recommendations.some(r => r.id === product.id) && !usedBrands.has(product.brand)) {
        recommendations.push(product);
        usedBrands.add(product.brand);
      }
    }

    // If we still have space, add more top products regardless of brand
    if (recommendations.length < maxRecommendations) {
      const remainingProducts = scoredProducts
        .filter(p => !recommendations.some(r => r.id === p.id))
        .slice(0, maxRecommendations - recommendations.length);
      
      recommendations.push(...remainingProducts);
    }

    console.log('Final recommendations:', recommendations.length);

    return recommendations.map(mapDatabaseToProductRecommendation);
  } catch (error) {
    console.error('Error getting personalized recommendations:', error);
    throw error;
  }
};

// New function to get all relevant recommendations
export const getAllRecommendations = async (
  supabase: SupabaseClient<Database>,
  selections: QuizSelections
): Promise<ProductRecommendation[]> => {
  try {
    // Use the same setup as the personalized recommendations
    const allMakeupTypes = ["Foundation", "Concealer", "Blush", "Bronzer", "Eyeshadow", "Mascara", "Lipstick"];
    const allSkinTypes = ["Normal", "Dry", "Oily", "Combination", "Sensitive", "Scaly", "Not sure"];
    const allFinishTypes = ["Matte", "Dewy", "Natural"];
    const allCoverageLevels = ["Minimal", "Light", "Medium", "Maximum"];
    const allPreferences = ["Fragrance-free", "Oil-free", "Non-comedogenic", "Natural ingredients", "Cruelty-free"];

    // Expand selections if "No preference" is selected
    const expandedSelections = {
      makeupType: expandNoPreferenceSelections(selections.makeupType, allMakeupTypes),
      skinType: expandNoPreferenceSelections(selections.skinType, allSkinTypes),
      concerns: selections.concerns.includes('No concerns') ? [] : selections.concerns,
      preferences: expandNoPreferenceSelections(selections.preferences, allPreferences),
      finish: expandNoPreferenceSelections(selections.finish, allFinishTypes),
      coverage: expandNoPreferenceSelections(selections.coverage, allCoverageLevels)
    };

    console.log('Expanded selections for all results:', expandedSelections);

    const hasNoPreferenceMakeup = selections.makeupType.includes('No preference');
    const productsPromises = expandedSelections.makeupType.map(type => 
      getRecommendationsByType(supabase, type, hasNoPreferenceMakeup)
    );
    
    const productsByType = await Promise.all(productsPromises);
    const allProducts = productsByType.flat();

    console.log('Found all products:', allProducts.length);

    // Score all products but don't limit the results
    const scoredProducts = allProducts.map(product => ({
      ...product,
      score: calculateProductScore(product, expandedSelections.preferences, [])
    })).filter(product => product.score >= 0) // Only include products with a positive score
      .sort((a, b) => b.score - a.score);
    
    // Make sure we have at least one product per makeup type
    const recommendationsByType: Record<string, typeof scoredProducts> = {};
    
    for (const type of expandedSelections.makeupType) {
      const typeLower = type.toLowerCase();
      recommendationsByType[typeLower] = scoredProducts.filter(p => p.makeup_type === typeLower);
    }
    
    // Create a final list ensuring each makeup type has representation
    const finalRecommendations: typeof scoredProducts = [];
    
    // First add at least one product per makeup type if available
    for (const type of Object.keys(recommendationsByType)) {
      const productsOfType = recommendationsByType[type];
      if (productsOfType.length > 0) {
        finalRecommendations.push(productsOfType[0]);
      }
    }
    
    // Then add all remaining products that aren't already included
    for (const product of scoredProducts) {
      if (!finalRecommendations.some(p => p.id === product.id)) {
        finalRecommendations.push(product);
      }
    }

    console.log('Final all recommendations:', finalRecommendations.length);

    return finalRecommendations.map(mapDatabaseToProductRecommendation);
  } catch (error) {
    console.error('Error getting all recommendations:', error);
    throw error;
  }
};
