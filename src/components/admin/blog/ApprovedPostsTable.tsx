
import { format } from "date-fns";
import { Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ApprovedPost {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url: string | null;
  user_profile?: {
    username: string | null;
  } | null;
}

interface ApprovedPostsTableProps {
  posts: ApprovedPost[];
  onPreviewImage: (imageUrl: string) => void;
  onDelete: (postId: string) => void;
}

export function ApprovedPostsTable({ posts, onPreviewImage, onDelete }: ApprovedPostsTableProps) {
  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No approved posts yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Content Preview</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">
              {post.user_profile?.username || "Anonymous"}
            </TableCell>
            <TableCell>
              {format(new Date(post.created_at), "MMM d, yyyy")}
            </TableCell>
            <TableCell>
              {post.content.length > 100
                ? `${post.content.substring(0, 100)}...`
                : post.content}
            </TableCell>
            <TableCell>
              {post.image_url ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPreviewImage(post.image_url!)}
                >
                  <Image className="h-4 w-4 mr-1" /> View
                </Button>
              ) : (
                "No image"
              )}
            </TableCell>
            <TableCell>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Post</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this post? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(post.id)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
