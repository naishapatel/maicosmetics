
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface ProfileCardProps {
  username: string | null;
  avatarUrl: string | null;
  bio: string | null;
  reviewCount: number;
  recommendationCount: number;
}

export function ProfileCard({ username, avatarUrl, bio, reviewCount, recommendationCount }: ProfileCardProps) {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl || undefined} />
          <AvatarFallback>{username?.[0]?.toUpperCase() || '?'}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-semibold text-mai-brown">{username || 'Anonymous'}</h3>
          {bio && <p className="text-gray-600">{bio}</p>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold text-mai-brown">{reviewCount}</span> reviews
          </div>
          <div>
            <span className="font-semibold text-mai-brown">{recommendationCount}</span> recommendations
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
