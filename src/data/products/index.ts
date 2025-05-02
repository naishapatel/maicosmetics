
import { sustainableProducts } from './sustainable';
import { ecoFriendlyProducts } from './eco-friendly';
import { veganProducts } from './vegan';
import { acneProducts } from './acne';
import { collegeProducts } from './college';
import { smallBusinessProducts } from './small-business';
import { mentalHealthProducts } from './mental-health';
import { additionalSmallBusinessProducts } from './additional-small-business';
import { isValidUrl } from '@/utils/linkValidator';

// Filter out any products without valid company websites
const filterInvalidProducts = (products: Product[]): Product[] => {
  return products.filter(product => {
    const url = product.url || product.link;
    if (!url) {
      console.log(`Filtering out product with no URL: ${product.title}`);
      return false;
    }
    
    // Use our enhanced validation
    const valid = isValidUrl(url);
    if (!valid) {
      console.log(`Filtering out product with invalid URL: ${product.title} (${url})`);
    }
    return valid;
  });
};

export const categorizedProducts = [
  ...filterInvalidProducts(sustainableProducts),
  ...filterInvalidProducts(ecoFriendlyProducts),
  ...filterInvalidProducts(veganProducts),
  ...filterInvalidProducts(acneProducts),
  ...filterInvalidProducts(collegeProducts),
  ...filterInvalidProducts(smallBusinessProducts),
  ...filterInvalidProducts(mentalHealthProducts),
  ...filterInvalidProducts(additionalSmallBusinessProducts),
];

export type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  link?: string;
  url?: string;
  images?: string[];
  name?: string;
  product_name?: string;
  brand?: string;
  business_tags?: string[];
  certifications?: string[];
  business_size?: string;
  target_demographic?: string;
  key_ingredients?: string[];
  primary_benefits?: string[];
  skin_benefits?: string[];
  ethical_values?: string[];
  link_status?: 'active' | 'broken' | 'discontinued' | 'redirected';
  alternative_product_id?: string;
  last_verified?: string;
};
