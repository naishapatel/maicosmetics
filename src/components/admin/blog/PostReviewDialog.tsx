
import { format } from "date-fns";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Post {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url: string | null;
  user_profile?: {
    username: string | null;
  } | null;
}

interface PostReviewDialogProps {
  post: Post;
  onClose: () => void;
  onApprove: (post: Post) => void;
  onReject: (postId: string) => void;
}

export function PostReviewDialog({ post, onClose, onApprove, onReject }: PostReviewDialogProps) {
  return (
    <AlertDialog open onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Review Blog Post</AlertDialogTitle>
        </AlertDialogHeader>
        
        <div className="my-4 max-h-[60vh] overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Posted by</h3>
            <p>{post.user_profile?.username || "Anonymous"}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Date</h3>
            <p>{format(new Date(post.created_at), "MMM d, yyyy • h:mm a")}</p>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Content</h3>
            <div className="mt-2 p-4 bg-gray-50 rounded-md whitespace-pre-line">
              {post.content}
            </div>
          </div>
          
          {post.image_url && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Image</h3>
              <div className="mt-2">
                <img 
                  src={post.image_url} 
                  alt="Post image" 
                  className="max-w-full h-auto rounded-md" 
                />
              </div>
            </div>
          )}
        </div>
        
        <AlertDialogFooter className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => onReject(post.id)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onApprove(post)}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
