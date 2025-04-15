
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface BlogPostErrorProps {
  error: string;
  onRetry: () => void;
  children?: React.ReactNode;
}

export function BlogPostError({ error, onRetry, children }: BlogPostErrorProps) {
  // Make the error message more user-friendly based on the error text
  const getErrorMessage = (errorText: string) => {
    if (errorText.includes("permission denied for table users")) {
      return "Supabase permission error: The application doesn't have access to the required tables. This usually happens when RLS policies aren't configured properly.";
    }
    return errorText;
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className="h-5 w-5 text-red-600" />
        <h3 className="text-red-800 font-medium">Error fetching blog posts</h3>
      </div>
      <p className="text-red-600 mt-1">{getErrorMessage(error)}</p>
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
