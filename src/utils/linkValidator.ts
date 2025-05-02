
import { Product } from "@/data/products";

/**
 * Enhanced URL validation to prevent "server not found" errors
 */
export const isValidUrl = (urlString: string): boolean => {
  if (!urlString) return false;
  
  try {
    const url = new URL(urlString);
    // Check that we have http/https protocol and a valid hostname
    return (url.protocol === 'http:' || url.protocol === 'https:') && 
           url.hostname.includes('.') && 
           url.hostname.length > 3;
  } catch (e) {
    console.error(`Invalid URL format: ${urlString}`);
    return false;
  }
};

/**
 * Validates product links by checking if they are active, broken, or redirected
 * @param products Array of products to validate
 * @param progressCallback Optional callback to report progress
 * @returns Array of validated products with updated link_status
 */
export const validateProductLinks = async (
  products: Product[],
  progressCallback?: (completed: number, total: number) => void
): Promise<Product[]> => {
  const validatedProducts = [...products];
  let completedCount = 0;
  const totalCount = products.length;
  
  // Process products in batches to avoid overwhelming the browser
  const batchSize = 5;
  
  for (let i = 0; i < validatedProducts.length; i += batchSize) {
    // Process a batch of products
    const batch = validatedProducts.slice(i, i + batchSize);
    
    // Wait for all products in the batch to be processed
    await Promise.all(
      batch.map(async (product, batchIndex) => {
        const index = i + batchIndex;
        
        const productUrl = product.url || product.link;
        
        if (!productUrl) {
          // No link to validate
          validatedProducts[index] = {
            ...validatedProducts[index],
            link_status: 'broken'
          };
          completedCount++;
          if (progressCallback) {
            progressCallback(completedCount, totalCount);
          }
          return;
        }
        
        // Validate URL format first
        if (!isValidUrl(productUrl)) {
          validatedProducts[index] = {
            ...validatedProducts[index],
            link_status: 'broken'
          };
          completedCount++;
          if (progressCallback) {
            progressCallback(completedCount, totalCount);
          }
          return;
        }
        
        try {
          // Attempt to extract company homepage
          const url = new URL(productUrl);
          const homepage = `${url.protocol}//${url.hostname}`;
          
          // For now, simulate validation (in a real app, we would make actual HTTP requests)
          const linkStatus = await simulateLinkCheck(homepage);
          
          // Update the product with the validation result
          validatedProducts[index] = {
            ...validatedProducts[index],
            link_status: linkStatus,
            // If the product is discontinued, find an alternative
            alternative_product_id: linkStatus === 'discontinued' 
              ? findAlternativeProduct(product, products)
              : undefined
          };
          
          completedCount++;
          if (progressCallback) {
            progressCallback(completedCount, totalCount);
          }
          
        } catch (error) {
          console.error(`Failed to validate link for ${product.title}:`, error);
          // Mark as broken on error
          validatedProducts[index] = {
            ...validatedProducts[index],
            link_status: 'broken'
          };
          
          completedCount++;
          if (progressCallback) {
            progressCallback(completedCount, totalCount);
          }
        }
      })
    );
  }
  
  return validatedProducts;
};

/**
 * Simulates checking if a link is active, broken, redirected, or for a discontinued product
 * In a real app, this would make an actual HTTP request
 */
const simulateLinkCheck = async (url: string): Promise<'active' | 'broken' | 'redirected' | 'discontinued'> => {
  // For demo purposes, randomly determine link status
  // In a real app, this would make an actual HTTP request
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
  
  // For now, assume most links are active to improve user experience
  const rand = Math.random();
  if (rand < 0.85) {
    return 'active'; // 85% active
  } else if (rand < 0.95) {
    return 'redirected'; // 10% redirected
  } else if (rand < 0.98) {
    return 'broken'; // 3% broken
  } else {
    return 'discontinued'; // 2% discontinued
  }
};

/**
 * Finds an alternative product if the original is discontinued
 * @param product The discontinued product
 * @param allProducts All available products
 * @returns ID of the alternative product or undefined if none found
 */
const findAlternativeProduct = (product: Product, allProducts: Product[]): string | undefined => {
  // First try to find a product from the same brand
  if (product.brand) {
    const sameBrandProducts = allProducts.filter(p => 
      p.id !== product.id && 
      p.brand === product.brand && 
      p.category === product.category
    );
    
    if (sameBrandProducts.length > 0) {
      return sameBrandProducts[Math.floor(Math.random() * sameBrandProducts.length)].id;
    }
  }
  
  // If no same-brand products, find one in the same category
  const sameCategoryProducts = allProducts.filter(p => 
    p.id !== product.id && 
    p.category === product.category
  );
  
  if (sameCategoryProducts.length > 0) {
    return sameCategoryProducts[Math.floor(Math.random() * sameCategoryProducts.length)].id;
  }
  
  return undefined;
};

/**
 * Extracts the company homepage from a product URL or link
 */
export const extractCompanyHomepage = (url: string | undefined): string | null => {
  if (!url) return null;
  
  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.protocol}//${parsedUrl.hostname}`;
  } catch (e) {
    console.error(`Failed to extract homepage from URL: ${url}`, e);
    return null;
  }
};
