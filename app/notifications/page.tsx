"use client";

import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { generateAvatarInitials } from "@/lib/utils";
import { Heart, MessageCircle, UserPlus, Sparkles } from "lucide-react";

type NotificationItem = {
  id: string;
  type: "like" | "comment" | "follow" | "insight";
  user?: { name: string; avatar: string };
  text: string;
  timestamp: string;
};

const items: NotificationItem[] = [
  {
    id: "n1",
    type: "like",
    user: { name: "Sarah Johnson", avatar: "/avatars/sarah.jpg" },
    text: "liked your post",
    timestamp: "2h",
  },
  {
    id: "n2",
    type: "comment",
    user: { name: "Alex Chen", avatar: "/avatars/alex.jpg" },
    text: "commented on your photo: 'Looks awesome!'",
    timestamp: "3h",
  },
  {
    id: "n3",
    type: "follow",
    user: { name: "Maya Patel", avatar: "/avatars/maya.jpg" },
    text: "started following you",
    timestamp: "6h",
  },
  {
    id: "n4",
    type: "insight",
    text: "Your post reached 2x more users than usual",
    timestamp: "1d",
  },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {items.map((n) => (
                <div key={n.id} className="flex items-center gap-3 py-3">
                  {n.type === "insight" ? (
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                  ) : (
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={n.user!.avatar} alt={n.user!.name} />
                      <AvatarFallback>
                        {generateAvatarInitials(n.user!.name)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      {n.type !== "insight" && (
                        <span className="font-medium">{n.user!.name}</span>
                      )}{" "}
                      {n.text}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {n.timestamp}
                    </p>
                  </div>
                  {n.type === "follow" && (
                    <Button size="sm">Follow back</Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

