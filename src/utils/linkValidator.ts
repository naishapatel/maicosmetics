
import { Product } from "@/data/products";
import { toast } from "sonner";

/**
 * Validates a product URL by making a HEAD request to check if it's accessible
 * @param product The product to validate
 * @returns Promise resolving to the updated product with link status
 */
export const validateProductLink = async (product: Product): Promise<Product> => {
  const productUrl = product.url || product.link;
  
  if (!productUrl) {
    return {
      ...product,
      link_status: 'broken'
    };
  }
  
  try {
    // Create an AbortController to timeout the request if it takes too long
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    // Make a HEAD request to check if the URL is valid
    const response = await fetch(productUrl, {
      method: 'HEAD',
      mode: 'no-cors', // We can only use no-cors for cross-origin requests without a proxy
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Since we're using no-cors, we can't actually check the status
    // We assume the link is working if the request didn't throw
    return {
      ...product,
      link_status: 'active',
      last_verified: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to validate link for ${product.title}:`, error);
    
    // If we get a network error, mark the link as broken
    return {
      ...product,
      link_status: 'broken',
      last_verified: new Date().toISOString()
    };
  }
};

/**
 * Validates a batch of product links
 * @param products Array of products to validate
 * @param onProgress Optional callback for progress updates
 * @returns Promise resolving to updated products with link statuses
 */
export const validateProductLinks = async (
  products: Product[],
  onProgress?: (completed: number, total: number) => void
): Promise<Product[]> => {
  const productsWithLinks = products.filter(p => p.url || p.link);
  const total = productsWithLinks.length;
  let completed = 0;
  
  const validatedProducts = await Promise.all(
    productsWithLinks.map(async (product) => {
      const validatedProduct = await validateProductLink(product);
      
      completed++;
      if (onProgress) {
        onProgress(completed, total);
      }
      
      return validatedProduct;
    })
  );
  
  // Merge the validated products back with the products without links
  const productsWithoutLinks = products.filter(p => !p.url && !p.link);
  
  return [...validatedProducts, ...productsWithoutLinks];
};

/**
 * Finds alternative products when a product is discontinued
 * @param discontinuedProduct The discontinued product
 * @param allProducts All available products to search for alternatives
 * @returns The best alternative product ID, if found
 */
export const findAlternativeProduct = (
  discontinuedProduct: Product,
  allProducts: Product[]
): string | undefined => {
  // First try to find a product from the same brand
  if (discontinuedProduct.brand) {
    const sameBrandProducts = allProducts.filter(
      p => p.id !== discontinuedProduct.id && 
           p.brand === discontinuedProduct.brand && 
           p.category === discontinuedProduct.category
    );
    
    if (sameBrandProducts.length > 0) {
      return sameBrandProducts[0].id;
    }
  }
  
  // If no brand match, look for products in the same category
  const sameCategoryProducts = allProducts.filter(
    p => p.id !== discontinuedProduct.id && p.category === discontinuedProduct.category
  );
  
  if (sameCategoryProducts.length > 0) {
    return sameCategoryProducts[0].id;
  }
  
  // No alternative found
  return undefined;
};
