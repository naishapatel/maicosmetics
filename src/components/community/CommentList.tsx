import { format } from "date-fns";

interface Comment {
  id: string;
  comment_text: string;
  created_at: string;
  profiles: {
    username: string | null;
  } | null;
}

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-50 rounded-lg p-4 space-y-2"
        >
          <div className="flex justify-between items-start">
            <p className="text-sm text-gray-500">
              {comment.profiles?.username || "Anonymous"} •{" "}
              {format(new Date(comment.created_at), "MMM d, yyyy")}
            </p>
          </div>
          <p className="text-gray-700">{comment.comment_text}</p>
        </div>
      ))}
    </div>
  );
}