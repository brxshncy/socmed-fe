"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, generateAvatarInitials } from "@/lib/utils";
import type { Friend, Message } from "@/lib/mock-chat";

type FriendsRailProps = {
  friends: Friend[];
  onOpenChat: (friend: Friend) => void;
};

export function FriendsRail({ friends, onOpenChat }: FriendsRailProps) {
  return (
    <aside className="hidden xl:block w-72">
      <div className="sticky top-20 py-6">
        <Card className="p-3">
          <div className="flex items-center justify-between px-2 pb-2">
            <p className="text-sm font-medium">Friends</p>
          </div>

          <div className="space-y-1">
            {friends.map((f) => (
              <button
                key={f.id}
                onClick={() => onOpenChat(f)}
                className="w-full text-left flex items-center gap-3 px-2 py-2 rounded-md hover:bg-hover"
              >
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={f.avatar} alt={f.name} />
                    <AvatarFallback>
                      {generateAvatarInitials(f.name)}
                    </AvatarFallback>
                  </Avatar>
                  {f.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border border-card" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    @{f.username}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </aside>
  );
}

