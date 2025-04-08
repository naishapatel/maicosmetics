
import { Button } from "@/components/ui/button";

interface BlogPostErrorProps {
  error: string;
  onRetry: () => void;
  children?: React.ReactNode;
}

export function BlogPostError({ error, onRetry, children }: BlogPostErrorProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <h3 className="text-red-800 font-medium">Error fetching blog posts</h3>
      <p className="text-red-600 mt-1">{error}</p>
      <Button 
        onClick={onRetry} 
        variant="outline" 
        className="mt-2"
      >
        Try Again
      </Button>
      {children}
    </div>
  );
}
