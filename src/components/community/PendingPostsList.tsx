
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface PendingPost {
  id: string;
  content: string;
  image_url: string | null;
}

interface PendingPostsListProps {
  posts: PendingPost[];
}

export function PendingPostsList({ posts }: PendingPostsListProps) {
  if (posts.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-mai-brown flex items-center">
        <Clock className="h-5 w-5 mr-2" />
        Your Pending Posts
      </h3>
      {posts.map((post) => (
        <Card key={post.id} className="bg-white border-l-4 border-l-amber-400">
          <CardHeader>
            <CardTitle className="text-base text-mai-brown flex items-center">
              <Clock className="h-4 w-4 mr-2 text-amber-500" />
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            {post.image_url && (
              <img 
                src={post.image_url} 
                alt="Post image" 
                className="mt-4 max-h-60 rounded-md"
              />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
