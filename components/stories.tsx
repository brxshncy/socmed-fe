"use client";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { generateAvatarInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  hasUnseenStory: boolean;
  isOwn: boolean;
}

interface StoriesProps {
  stories: Story[];
  className?: string;
}

export function Stories({ stories, className }: StoriesProps) {
  const handleStoryClick = (storyId: string, isOwn: boolean) => {
    if (isOwn) {
      // Open story creation
      console.log("Create new story");
    } else {
      // View story
      console.log("View story:", storyId);
    }
  };

  return (
    <div className={cn("flex gap-3 overflow-x-auto pb-2", className)}>
      {stories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
          onClick={() => handleStoryClick(story.id, story.isOwn)}
        >
          <div className="relative">
            {/* Story Ring */}
            <div
              className={cn(
                "p-0.5 rounded-full transition-all",
                story.hasUnseenStory
                  ? "bg-gradient-to-tr from-primary via-pink-500 to-yellow-500"
                  : "bg-muted"
              )}
            >
              <div className="p-0.5 bg-background rounded-full">
                <Avatar className="h-12 w-12 transition-transform group-hover:scale-105">
                  <AvatarImage src={story.user.avatar} alt={story.user.name} />
                  <AvatarFallback>
                    {generateAvatarInitials(story.user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Add Story Button for Own Story */}
            {story.isOwn && (
              <div className="absolute -bottom-1 -right-1">
                <Button
                  size="icon"
                  className="h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-lg"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {/* Story Name */}
          <span className="text-xs text-center max-w-[60px] truncate font-medium">
            {story.user.name}
          </span>
        </div>
      ))}
    </div>
  );
}
