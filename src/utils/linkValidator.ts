
import { Product } from "@/data/products";

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
        
        if (!product.link && !product.url) {
          // No link to validate
          return;
        }
        
        try {
          // For now, simulate validation (in a real app, we would make actual HTTP requests)
          const linkStatus = await simulateLinkCheck(product.url || product.link || '');
          
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
  
  // Randomly assign statuses for demonstration
  const rand = Math.random();
  if (rand < 0.7) {
    return 'active'; // 70% active
  } else if (rand < 0.85) {
    return 'redirected'; // 15% redirected
  } else if (rand < 0.95) {
    return 'broken'; // 10% broken
  } else {
    return 'discontinued'; // 5% discontinued
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
