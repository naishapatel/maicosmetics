
import { sustainableProducts } from './sustainable';
import { ecoFriendlyProducts } from './eco-friendly';
import { veganProducts } from './vegan';
import { acneProducts } from './acne';
import { collegeProducts } from './college';
import { smallBusinessProducts } from './small-business';

export const categorizedProducts = [
  ...sustainableProducts,
  ...ecoFriendlyProducts,
  ...veganProducts,
  ...acneProducts,
  ...collegeProducts,
  ...smallBusinessProducts,
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
  brand?: string;
  business_tags?: string[];
  key_ingredients?: string[];
  certifications?: string[];
  name?: string;
  product_name?: string;
};
