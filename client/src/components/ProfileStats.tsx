import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Heart, Calendar } from "lucide-react";

interface ProfileStatsProps {
  username: string;
  memberSince: string;
  tripsCount: number;
  placesVisited: number;
  savedCount: number;
}

export function ProfileStats({
  username,
  memberSince,
  tripsCount,
  placesVisited,
  savedCount,
}: ProfileStatsProps) {
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const stats = [
    { label: "Saved Trips", value: tripsCount, icon: Calendar },
    { label: "Places Visited", value: placesVisited, icon: MapPin },
    { label: "Favorites", value: savedCount, icon: Heart },
  ];

  return (
    <Card className="p-6 space-y-6 sticky top-24">
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="w-24 h-24 border-2 border-primary/20">
          <AvatarImage src="" alt={username} />
          <AvatarFallback className="text-2xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold" data-testid="text-username">
            {username}
          </h3>
          <p className="text-sm text-muted-foreground">Member since {memberSince}</p>
        </div>
      </div>

      <div className="space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              data-testid={`stat-${index}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{stat.label}</span>
              </div>
              <span className="text-lg font-semibold">{stat.value}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
