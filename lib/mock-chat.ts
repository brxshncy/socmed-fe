export type Friend = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isOnline?: boolean;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead?: boolean;
};

export type Conversation = {
  id: string;
  participant: Friend;
  lastMessage: string;
  lastTimestamp: Date;
  unreadCount: number;
};

export const mockFriends: Friend[] = [
  {
    id: "u1",
    name: "Sarah Johnson",
    username: "sarah_j",
    avatar: "/avatars/sarah.jpg",
    isOnline: true,
  },
  {
    id: "u2",
    name: "Alex Chen",
    username: "alexc_dev",
    avatar: "/avatars/alex.jpg",
    isOnline: false,
  },
  {
    id: "u3",
    name: "Maya Patel",
    username: "maya_designs",
    avatar: "/avatars/maya.jpg",
    isOnline: true,
  },
  {
    id: "u4",
    name: "David Rodriguez",
    username: "david_photo",
    avatar: "/avatars/david.jpg",
    isOnline: false,
  },
];

export const mockConversations: Conversation[] = [
  {
    id: "c1",
    participant: mockFriends[0],
    lastMessage: "That trail looked amazing!",
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 15),
    unreadCount: 2,
  },
  {
    id: "c2",
    participant: mockFriends[1],
    lastMessage: "Ship the PR when you can",
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 0,
  },
  {
    id: "c3",
    participant: mockFriends[2],
    lastMessage: "Let's plan for Saturday!",
    lastTimestamp: new Date(Date.now() - 1000 * 60 * 90),
    unreadCount: 1,
  },
];

export const mockMessages: Message[] = [
  {
    id: "m1",
    conversationId: "c1",
    senderId: "me",
    text: "Hey Sarah!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: "m2",
    conversationId: "c1",
    senderId: "u1",
    text: "Hey! Just saw your post.",
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
  },
  {
    id: "m3",
    conversationId: "c1",
    senderId: "u1",
    text: "That place is on my list now.",
    timestamp: new Date(Date.now() - 1000 * 60 * 38),
  },
  {
    id: "m4",
    conversationId: "c1",
    senderId: "me",
    text: "You'd love it!",
    timestamp: new Date(Date.now() - 1000 * 60 * 35),
  },

  {
    id: "m5",
    conversationId: "c2",
    senderId: "u2",
    text: "Did you try the new app dir feature?",
    timestamp: new Date(Date.now() - 1000 * 60 * 70),
  },
  {
    id: "m6",
    conversationId: "c2",
    senderId: "me",
    text: "Yes, it's slick.",
    timestamp: new Date(Date.now() - 1000 * 60 * 65),
  },

  {
    id: "m7",
    conversationId: "c3",
    senderId: "u3",
    text: "Brunch this weekend?",
    timestamp: new Date(Date.now() - 1000 * 60 * 85),
  },
];

