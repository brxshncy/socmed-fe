export const mockPosts = [
  {
    id: "1",
    user: {
      id: "user1",
      name: "Sarah Johnson",
      username: "sarah_j",
      avatar: "/avatars/sarah.jpg",
      isVerified: true,
    },
    content: "Just finished an amazing hiking trail! The views were absolutely breathtaking. Nature always finds a way to surprise me 🏔️ #hiking #nature",
    images: ["/posts/hiking1.jpg"],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 247,
    comments: 23,
    shares: 5,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: "2",
    user: {
      id: "user2",
      name: "Alex Chen",
      username: "alexc_dev",
      avatar: "/avatars/alex.jpg",
      isVerified: false,
    },
    content: "Working on a new React project and loving the new features in Next.js 14! The developer experience keeps getting better. What's your favorite new feature?",
    images: [],
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    likes: 189,
    comments: 34,
    shares: 12,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "3",
    user: {
      id: "user3",
      name: "Maya Patel",
      username: "maya_designs",
      avatar: "/avatars/maya.jpg",
      isVerified: true,
    },
    content: "Excited to share my latest UI design for a travel app! Clean, minimal, and user-friendly. What do you think?",
    images: ["/posts/design1.jpg", "/posts/design2.jpg"],
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    likes: 412,
    comments: 67,
    shares: 23,
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: "4",
    user: {
      id: "user4",
      name: "David Rodriguez",
      username: "david_photo",
      avatar: "/avatars/david.jpg",
      isVerified: false,
    },
    content: "Golden hour magic in the city. Sometimes the best moments happen when you least expect them ✨",
    images: ["/posts/city1.jpg"],
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 156,
    comments: 18,
    shares: 7,
    isLiked: false,
    isBookmarked: false,
  },
]

export const mockStories = [
  {
    id: "story1",
    user: {
      id: "user1",
      name: "Your Story",
      avatar: "/avatars/user.jpg",
    },
    hasUnseenStory: false,
    isOwn: true,
  },
  {
    id: "story2",
    user: {
      id: "user2",
      name: "Sarah",
      avatar: "/avatars/sarah.jpg",
    },
    hasUnseenStory: true,
    isOwn: false,
  },
  {
    id: "story3",
    user: {
      id: "user3",
      name: "Alex",
      avatar: "/avatars/alex.jpg",
    },
    hasUnseenStory: true,
    isOwn: false,
  },
  {
    id: "story4",
    user: {
      id: "user4",
      name: "Maya",
      avatar: "/avatars/maya.jpg",
    },
    hasUnseenStory: false,
    isOwn: false,
  },
  {
    id: "story5",
    user: {
      id: "user5",
      name: "David",
      avatar: "/avatars/david.jpg",
    },
    hasUnseenStory: true,
    isOwn: false,
  },
]

export const mockSuggestedFriends = [
  {
    id: "friend1",
    name: "Emma Wilson",
    username: "emma_w",
    avatar: "/avatars/emma.jpg",
    mutualFriends: 12,
    isFollowing: false,
  },
  {
    id: "friend2",
    name: "James Miller",
    username: "james_m",
    avatar: "/avatars/james.jpg",
    mutualFriends: 8,
    isFollowing: false,
  },
  {
    id: "friend3",
    name: "Lisa Zhang",
    username: "lisa_z",
    avatar: "/avatars/lisa.jpg",
    mutualFriends: 15,
    isFollowing: false,
  },
]
