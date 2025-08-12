"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Minus, Send } from "lucide-react";
import { cn, formatTimeAgo, generateAvatarInitials } from "@/lib/utils";
import type { Friend, Message } from "@/lib/mock-chat";

type ChatBoxProps = {
  friend: Friend;
  messages: Message[];
  onClose: () => void;
};

export function ChatBox({ friend, messages, onClose }: ChatBoxProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    if (!draft.trim()) return;
    setDraft("");
  };

  return (
    <Card
      className={cn(
        "w-80 bg-card border shadow-lg rounded-lg overflow-hidden",
        collapsed ? "h-12" : "h-96"
      )}
    >
      {/* Header */}
      <div className="h-12 px-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar className="h-7 w-7">
            <AvatarImage src={friend.avatar} alt={friend.name} />
            <AvatarFallback>
              {generateAvatarInitials(friend.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{friend.name}</p>
            <p className="text-[11px] text-muted-foreground">
              @{friend.username}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!collapsed && (
        <div className="flex flex-col h-[calc(100%-3rem)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m) => {
              const isMe = m.senderId === "me";
              return (
                <div
                  key={m.id}
                  className={cn("flex", isMe ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-xl px-3 py-2 text-sm shadow-sm",
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
          <div className="p-2 border-t flex items-center gap-2">
            <Input
              placeholder={`Message ${friend.name}...`}
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
              size="icon"
              className="h-9 w-9"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

