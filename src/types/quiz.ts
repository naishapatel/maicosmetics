export interface QuizSelections {
  skinType: string[];
  concerns: string[];
  preferences: string[];
  makeupType: string[];
  finish: string[];
  coverage: string[];
}

export interface ProductRecommendation {
  id: string;
  name: string;
  brand: string;
  price: string;
  description: string;
  makeup_type: string;
  category: string;
  ethical_values: string[];
  imageUrl?: string;
}