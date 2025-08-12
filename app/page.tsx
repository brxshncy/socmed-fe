"use client";

import { Navigation } from "@/components/navigation";
import { Stories } from "@/components/stories";
import { Post } from "@/components/post";
import { Sidebar } from "@/components/sidebar";
import { FriendsRail } from "@/components/friends-rail";
import { ChatBox } from "@/components/chatbox";
import { PostComposer } from "@/components/post-composer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Video, Smile, MapPin } from "lucide-react";
import { mockPosts, mockStories, mockSuggestedFriends } from "@/lib/mock-data";
import { mockFriends, mockMessages, mockConversations } from "@/lib/mock-chat";
import type { Friend } from "@/lib/mock-chat";
import { generateAvatarInitials } from "@/lib/utils";
import { useMemo, useState } from "react";

export default function Home() {
  const [openChats, setOpenChats] = useState<Friend[]>([]);

  const handleCreatePost = () => {
    console.log("Create new post");
  };

  const handleOpenChat = (friend: Friend) => {
    setOpenChats((prev) =>
      prev.find((f) => f.id === friend.id) ? prev : [...prev, friend]
    );
  };

  const handleCloseChat = (friendId: string) => {
    setOpenChats((prev) => prev.filter((f) => f.id !== friendId));
  };

  const getMessagesForFriend = (friendId: string) => {
    const convo = mockConversations.find((c) => c.participant.id === friendId);
    if (!convo) return [] as typeof mockMessages;
    return mockMessages.filter((m) => m.conversationId === convo.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
          {/* Main Content */}
          <main className="flex-1 lg:ml-64 max-w-2xl mx-auto lg:mx-0">
            <div className="py-6 space-y-6">
              {/* Stories */}
              <Card className="p-4">
                <Stories stories={mockStories} />
              </Card>

              {/* Create Post */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/user.jpg" alt="John Doe" />
                      <AvatarFallback>
                        {generateAvatarInitials("John Doe")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <PostComposer
                        trigger={
                          <div className="w-full">
                            <div className="rounded-full bg-input hover:bg-accent px-4 py-3 cursor-pointer text-muted-foreground transition-colors">
                              What's on your mind?
                            </div>
                          </div>
                        }
                      />
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <div className="flex items-center gap-3">
                          <PostComposer
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-muted-foreground"
                              >
                                <Image className="h-4 w-4" />
                                Photo
                              </Button>
                            }
                          />
                          <PostComposer
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-muted-foreground"
                              >
                                <Video className="h-4 w-4" />
                                Video
                              </Button>
                            }
                          />
                          <PostComposer
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-muted-foreground"
                              >
                                <Smile className="h-4 w-4" />
                                Feeling
                              </Button>
                            }
                          />
                          <PostComposer
                            trigger={
                              <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2 text-muted-foreground"
                              >
                                <MapPin className="h-4 w-4" />
                                Location
                              </Button>
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts Feed */}
              <div className="space-y-6">
                {mockPosts.map((post) => (
                  <Post
                    key={post.id}
                    id={post.id}
                    user={post.user}
                    content={post.content}
                    images={post.images}
                    timestamp={post.timestamp}
                    likes={post.likes}
                    comments={post.comments}
                    shares={post.shares}
                    isLiked={post.isLiked}
                    isBookmarked={post.isBookmarked}
                  />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center py-6">
                <Button variant="outline">Load more posts</Button>
              </div>
            </div>
          </main>

          {/* Right rail with Friends (click to chat) */}
          <div className="hidden xl:block w-72">
            <FriendsRail friends={mockFriends} onOpenChat={handleOpenChat} />
          </div>
        </div>
      </div>

      {/* Floating chatboxes */}
      {openChats.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 flex gap-3">
          {openChats.map((friend) => (
            <div key={friend.id} className="relative" style={{ right: 0 }}>
              <ChatBox
                friend={friend}
                messages={getMessagesForFriend(friend.id)}
                onClose={() => handleCloseChat(friend.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
