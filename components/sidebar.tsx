"use client";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users } from "lucide-react";
import { generateAvatarInitials, formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SuggestedFriend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  mutualFriends: number;
  isFollowing: boolean;
}

interface SidebarProps {
  suggestedFriends: SuggestedFriend[];
  className?: string;
}

export function Sidebar({ suggestedFriends, className }: SidebarProps) {
  const handleFollow = (friendId: string) => {
    console.log("Follow user:", friendId);
  };

  const handleDismiss = (friendId: string) => {
    console.log("Dismiss suggestion:", friendId);
  };

  return (
    <aside className={cn("space-y-6", className)}>
      {/* Suggested Friends */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4" />
            People you may know
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedFriends.map((friend) => (
            <div key={friend.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>
                    {generateAvatarInitials(friend.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{friend.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatNumber(friend.mutualFriends)} mutual friends
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => handleFollow(friend.id)}
                  className="text-xs px-3"
                >
                  Follow
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDismiss(friend.id)}
                  className="text-xs px-2"
                >
                  ×
                </Button>
              </div>
            </div>
          ))}
          <Button variant="ghost" className="w-full text-sm text-primary">
            See all suggestions
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-sm">
            🎂 Birthdays
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            📅 Events
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            👥 Groups
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sm">
            📺 Watch
          </Button>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Trending</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <p className="font-medium text-sm">#TechTrends</p>
            <p className="text-xs text-muted-foreground">42.1K posts</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-sm">#Photography</p>
            <p className="text-xs text-muted-foreground">28.5K posts</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-sm">#WebDev</p>
            <p className="text-xs text-muted-foreground">19.8K posts</p>
          </div>
          <Button variant="ghost" className="w-full text-sm text-primary">
            Show more
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
