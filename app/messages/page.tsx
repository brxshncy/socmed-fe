"use client";

import { useMemo, useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  mockFriends,
  mockConversations,
  mockMessages,
  type Conversation,
} from "@/lib/mock-chat";
import { formatTimeAgo, generateAvatarInitials, cn } from "@/lib/utils";
import { Send, Circle } from "lucide-react";

export default function MessagesPage() {
  const [activeConversationId, setActiveConversationId] = useState<string>(
    mockConversations[0]?.id ?? ""
  );
  const [draft, setDraft] = useState("");

  const activeConversation = useMemo<Conversation | undefined>(
    () => mockConversations.find((c) => c.id === activeConversationId),
    [activeConversationId]
  );

  const messages = useMemo(
    () => mockMessages.filter((m) => m.conversationId === activeConversationId),
    [activeConversationId]
  );

  const handleSend = () => {
    if (!draft.trim()) return;
    // In a real app you'd post to an API. Here we just clear the input.
    setDraft("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6">
          {/* Friends online (left) */}
          <aside className="hidden lg:block w-64 pt-6">
            <Card className="p-3">
              <p className="px-2 pb-2 text-sm font-medium">Friends online</p>
              <div className="space-y-2">
                {mockFriends.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-hover cursor-pointer"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={f.avatar} alt={f.name} />
                        <AvatarFallback>
                          {generateAvatarInitials(f.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={cn(
                          "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-card flex items-center justify-center",
                          f.isOnline ? "bg-green-500" : "bg-muted"
                        )}
                        title={f.isOnline ? "Online" : "Offline"}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{f.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        @{f.username}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </aside>

          {/* Conversations list (middle on desktop, full-width on mobile) */}
          <section className="w-full lg:w-80 xl:w-96 pt-6">
            <Card className="divide-y">
              <div className="p-3">
                <Input placeholder="Search conversations" />
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                {mockConversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveConversationId(c.id)}
                    className={cn(
                      "w-full text-left flex items-center gap-3 p-3 hover:bg-hover",
                      activeConversationId === c.id && "bg-secondary/60"
                    )}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={c.participant.avatar}
                          alt={c.participant.name}
                        />
                        <AvatarFallback>
                          {generateAvatarInitials(c.participant.name)}
                        </AvatarFallback>
                      </Avatar>
                      {c.unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium truncate">
                          {c.participant.name}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTimeAgo(c.lastTimestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {c.lastMessage}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </section>

          {/* Chat box (right) */}
          <main className="hidden md:flex flex-1 pt-6">
            <Card className="flex flex-col w-full">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b">
                {activeConversation && (
                  <>
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={activeConversation.participant.avatar}
                        alt={activeConversation.participant.name}
                      />
                      <AvatarFallback>
                        {generateAvatarInitials(
                          activeConversation.participant.name
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium leading-tight">
                        {activeConversation.participant.name}
                      </p>
                      <p className="text-xs text-muted-foreground leading-tight">
                        @{activeConversation.participant.username}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => {
                  const isMe = m.senderId === "me";
                  return (
                    <div
                      key={m.id}
                      className={cn(
                        "flex",
                        isMe ? "justify-end" : "justify-start"
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[70%] rounded-xl px-3 py-2 text-sm shadow-sm",
                          isMe
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-card border rounded-bl-sm"
                        )}
                      >
                        {m.text}
                        <div
                          className={cn(
                            "mt-1 text-[10px] opacity-80",
                            isMe ? "text-white" : "text-muted-foreground"
                          )}
                        >
                          {formatTimeAgo(m.timestamp)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Composer */}
              <div className="p-3 border-t flex items-center gap-2">
                <Input
                  placeholder="Type a message..."
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <Button
                  onClick={handleSend}
                  disabled={!draft.trim()}
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send
                </Button>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

