
interface ProductsFilterResultsProps {
  count: number;
}

export const ProductsFilterResults = ({ count }: ProductsFilterResultsProps) => {
  return (
    <div className="mt-4 text-sm text-gray-500 text-center">
      {count === 0 ? 
        "No products found. Try a different search term." : 
        `Showing ${count} product${count !== 1 ? 's' : ''}`
      }
    </div>
  );
};
