"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  MoreHorizontal,
  Verified,
  Sparkles,
} from "lucide-react";
import {
  formatTimeAgo,
  formatNumber,
  generateAvatarInitials,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PostProps {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  images?: string[];
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  className?: string;
}

export function Post({
  id,
  user,
  content,
  images = [],
  timestamp,
  likes,
  comments,
  shares,
  isLiked: initialIsLiked,
  isBookmarked: initialIsBookmarked,
  className,
}: PostProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [likesCount, setLikesCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log("Share post:", id);
  };

  const handleComment = () => {
    // Implement comment functionality
    console.log("Comment on post:", id);
  };

  const handleAICaption = () => {
    // Implement AI caption functionality
    console.log("Generate AI caption for post:", id);
  };

  return (
    <Card className={cn("hover-lift", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                {generateAvatarInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <h4 className="font-semibold text-sm">{user.name}</h4>
                {user.isVerified && (
                  <Verified className="h-4 w-4 text-primary fill-current" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>@{user.username}</span>
                <span>•</span>
                <span>{formatTimeAgo(timestamp)}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Content */}
        <div className="text-sm leading-relaxed">{content}</div>

        {/* Images */}
        {images.length > 0 && (
          <div
            className={cn(
              "grid gap-2 rounded-lg overflow-hidden",
              images.length === 1 ? "grid-cols-1" : "grid-cols-2"
            )}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative bg-muted aspect-square overflow-hidden rounded-lg cursor-pointer",
                  images.length === 3 && index === 0 ? "row-span-2" : "",
                  images.length > 2 && "aspect-square"
                )}
              >
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">
                    Image {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* AI Caption Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleAICaption}
          className="gap-2 text-xs"
        >
          <Sparkles className="h-3 w-3" />
          AI Caption
        </Button>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <div className="flex items-center gap-4">
            <span>{formatNumber(likesCount)} likes</span>
            <span>{formatNumber(comments)} comments</span>
            <span>{formatNumber(shares)} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "gap-2 text-xs",
                isLiked && "text-red-500 hover:text-red-600"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              Like
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleComment}
              className="gap-2 text-xs"
            >
              <MessageCircle className="h-4 w-4" />
              Comment
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="gap-2 text-xs"
            >
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleBookmark}
            className={cn("h-8 w-8", isBookmarked && "text-primary")}
          >
            <Bookmark
              className={cn("h-4 w-4", isBookmarked && "fill-current")}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
