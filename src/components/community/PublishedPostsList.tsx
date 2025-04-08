
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Newspaper, Loader2 } from "lucide-react";

interface BlogPostItem {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  approved: boolean;
  image_url: string | null;
  user_profile?: {
    username: string | null;
    avatar_url: string | null;
  } | null;
}

interface PublishedPostsListProps {
  posts: BlogPostItem[];
  isLoading: boolean;
}

export function PublishedPostsList({ posts, isLoading }: PublishedPostsListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="bg-white">
        <CardContent className="pt-6 text-center">
          <p className="text-gray-500">Be the first to create a blog post!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="bg-white">
          <CardHeader className="flex flex-row items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={post.user_profile?.avatar_url || undefined} />
                <AvatarFallback>{post.user_profile?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base text-mai-brown">
                  {post.user_profile?.username || "Anonymous"}
                </CardTitle>
                <p className="text-xs text-gray-500">
                  {format(new Date(post.created_at), "MMM d, yyyy • h:mm a")}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            {post.image_url && (
              <img 
                src={post.image_url} 
                alt="Post image" 
                className="mt-4 max-w-full rounded-md"
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex items-center text-sm text-gray-500">
              <Newspaper className="h-4 w-4 mr-1 text-mai-mauve" />
              <span>Blog Post</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
