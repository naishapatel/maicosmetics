
import { format } from "date-fns";
import { Image, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PendingPost } from "./useBlogAdminState";

interface PendingPostsTableProps {
  posts: PendingPost[];
  isLoading: boolean;
  onReview: (post: PendingPost) => void;
  onPreviewImage: (imageUrl: string) => void;
}

export function PendingPostsTable({ posts, isLoading, onReview, onPreviewImage }: PendingPostsTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <RefreshCw className="h-6 w-6 animate-spin text-mai-mauve mr-2" />
        <span>Loading pending posts...</span>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No pending posts to review</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="overflow-x-auto">
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
                {post.user_profile?.username || `${post.user_id.substring(0, 8)}...`}
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
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onReview(post)}
                  >
                    Review
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
