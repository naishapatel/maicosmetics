
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

interface ImagePreviewDialogProps {
  imageUrl: string | null;
  onClose: () => void;
}

export function ImagePreviewDialog({ imageUrl, onClose }: ImagePreviewDialogProps) {
  if (!imageUrl) return null;

  return (
    <AlertDialog open={!!imageUrl} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-3xl p-2">
        <div className="flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full h-8 w-8 p-0"
            onClick={onClose}
          >
            ✕
          </Button>
        </div>
        <div className="flex justify-center">
          <img 
            src={imageUrl} 
            alt="Preview" 
            className="max-w-full max-h-[80vh]" 
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
