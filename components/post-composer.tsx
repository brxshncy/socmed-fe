"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import {
  Image,
  Video,
  Smile,
  MapPin,
  X,
  Upload,
  Sparkles,
  Globe,
  Users,
  Lock,
} from "lucide-react";
import { generateAvatarInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PostComposerProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const aiCaptionSuggestions = [
  "✨ Embracing the beauty of everyday moments! What's bringing you joy today?",
  "🌟 Sometimes the simplest pleasures make the biggest impact. Grateful for this moment!",
  "💫 Life is full of unexpected beautiful surprises. Here's to finding magic in the ordinary!",
  "🎯 Every day is a new opportunity to create something amazing. What are you working on?",
  "🌈 Spreading positive vibes and good energy. Hope your day is as wonderful as you are!",
];

export function PostComposer({
  trigger,
  open,
  onOpenChange,
}: PostComposerProps) {
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [feeling, setFeeling] = useState("");
  const [location, setLocation] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "friends" | "private">(
    "public"
  );
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages((prev) => [...prev, ...files].slice(0, 4)); // Max 4 images
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      setSelectedImages([]); // Clear images when video is selected
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setSelectedVideo(null);
  };

  const generateAICaption = async () => {
    setIsGeneratingCaption(true);

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const randomCaption =
      aiCaptionSuggestions[
        Math.floor(Math.random() * aiCaptionSuggestions.length)
      ];
    setPostContent(randomCaption);
    setIsGeneratingCaption(false);
  };

  const handlePost = () => {
    console.log("Creating post:", {
      content: postContent,
      images: selectedImages,
      video: selectedVideo,
      feeling,
      location,
      privacy,
    });

    // Reset form
    setPostContent("");
    setSelectedImages([]);
    setSelectedVideo(null);
    setFeeling("");
    setLocation("");
    setPrivacy("public");
    onOpenChange?.(false);
  };

  const privacyOptions = [
    {
      value: "public",
      icon: Globe,
      label: "Public",
      description: "Anyone can see this post",
    },
    {
      value: "friends",
      icon: Users,
      label: "Friends",
      description: "Only your friends can see this post",
    },
    {
      value: "private",
      icon: Lock,
      label: "Only me",
      description: "Only you can see this post",
    },
  ];

  const currentPrivacy = privacyOptions.find(
    (option) => option.value === privacy
  );

  const defaultTrigger = (
    <Button
      variant="ghost"
      className="w-full justify-start text-muted-foreground"
    >
      What's on your mind?
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/user.jpg" alt="John Doe" />
              <AvatarFallback>
                {generateAvatarInitials("John Doe")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() => {
                  const nextIndex = privacyOptions.findIndex(
                    (option) => option.value === privacy
                  );
                  const next =
                    privacyOptions[(nextIndex + 1) % privacyOptions.length];
                  setPrivacy(next.value as any);
                }}
              >
                <currentPrivacy.icon className="h-3 w-3 mr-1" />
                {currentPrivacy?.label}
              </Button>
            </div>
          </div>

          {/* Post Content */}
          <Textarea
            placeholder="What's on your mind?"
            className="resize-none border-none bg-transparent p-0 focus-visible:ring-0 text-lg min-h-[120px]"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />

          {/* AI Caption Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={generateAICaption}
            disabled={isGeneratingCaption}
            className="gap-2"
          >
            <Sparkles className="h-4 w-4" />
            {isGeneratingCaption ? "Generating..." : "Generate AI Caption"}
          </Button>

          {/* Media Preview */}
          {selectedImages.length > 0 && (
            <div
              className={cn(
                "grid gap-2 rounded-lg border p-2",
                selectedImages.length === 1 ? "grid-cols-1" : "grid-cols-2"
              )}
            >
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <Image className="h-8 w-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground ml-2">
                      {image.name}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {selectedVideo && (
            <div className="relative group border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Video className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm">{selectedVideo.name}</span>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={removeVideo}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          {/* Feeling and Location */}
          {(feeling || location) && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {feeling && (
                <span className="flex items-center gap-1">
                  <Smile className="h-4 w-4" />
                  {feeling}
                </span>
              )}
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {location}
                </span>
              )}
            </div>
          )}

          {/* Add to Post */}
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Add to your post</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="ghost" size="sm" className="gap-2" asChild>
                    <span className="cursor-pointer">
                      <Image className="h-4 w-4 text-green-600" />
                      Photo
                    </span>
                  </Button>
                </label>

                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload">
                  <Button variant="ghost" size="sm" className="gap-2" asChild>
                    <span className="cursor-pointer">
                      <Video className="h-4 w-4 text-red-600" />
                      Video
                    </span>
                  </Button>
                </label>

                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => setFeeling(feeling ? "" : "happy")}
                >
                  <Smile className="h-4 w-4 text-yellow-600" />
                  Feeling
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => setLocation(location ? "" : "Your Location")}
                >
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Location
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Post Button */}
          <Button
            className="w-full"
            onClick={handlePost}
            disabled={
              !postContent.trim() &&
              selectedImages.length === 0 &&
              !selectedVideo
            }
          >
            Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
