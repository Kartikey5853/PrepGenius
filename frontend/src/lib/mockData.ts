// Mock data for the interview prep platform

export const mockUser = {
  user_id: "john_doe_123",
  name: "John Doe",
  whatsapp: "+1234567890",
  resume_score: 85,
  suggested_companies: ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
};

export const mockScrapedData = {
  questions: [
    { id: 1, title: "What is the difference between REST and GraphQL?", source: "LeetCode", difficulty: "Medium" },
    { id: 2, title: "Explain the concept of microservices architecture", source: "Glassdoor", difficulty: "Hard" },
    { id: 3, title: "How do you handle state management in React?", source: "Indeed", difficulty: "Medium" },
    { id: 4, title: "Describe your experience with CI/CD pipelines", source: "LinkedIn", difficulty: "Medium" },
    { id: 5, title: "What are SOLID principles?", source: "HackerRank", difficulty: "Easy" },
  ],
  reddit_posts: [
    { id: 1, title: "My Google L5 Interview Experience", subreddit: "cscareerquestions", upvotes: 342, comments: 89 },
    { id: 2, title: "How I prepared for FAANG in 3 months", subreddit: "leetcode", upvotes: 567, comments: 156 },
    { id: 3, title: "System Design tips that got me into Meta", subreddit: "ExperiencedDevs", upvotes: 234, comments: 67 },
  ],
  linkedin_posts: [
    { id: 1, author: "Sarah Chen", role: "Senior SWE at Google", content: "Just finished 6 rounds of interviews..." },
    { id: 2, author: "Mike Johnson", role: "Tech Lead at Amazon", content: "Top 5 behavioral questions to prepare..." },
    { id: 3, author: "Emily Davis", role: "Engineering Manager at Meta", content: "What I look for when interviewing candidates..." },
  ],
};

export const mockJobs = [
  { id: 1, company: "Google", role: "Software Engineer L4", location: "Mountain View, CA", link: "#", posted: "2 days ago" },
  { id: 2, company: "Microsoft", role: "Senior SDE", location: "Seattle, WA", link: "#", posted: "1 day ago" },
  { id: 3, company: "Amazon", role: "SDE II", location: "New York, NY", link: "#", posted: "3 days ago" },
  { id: 4, company: "Meta", role: "Frontend Engineer", location: "Menlo Park, CA", link: "#", posted: "5 days ago" },
  { id: 5, company: "Apple", role: "iOS Developer", location: "Cupertino, CA", link: "#", posted: "1 week ago" },
];

export const mockLectures = [
  { id: 1, title: "Data Structures & Algorithms Masterclass", platform: "YouTube", thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400", duration: "4h 30m" },
  { id: 2, title: "System Design Interview Prep", platform: "YouTube", thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400", duration: "3h 15m" },
  { id: 3, title: "Behavioral Interview Questions", platform: "Udemy", thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400", duration: "2h 45m" },
  { id: 4, title: "Dynamic Programming Patterns", platform: "YouTube", thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400", duration: "5h 00m" },
];

export const mockInterviewScores = {
  body_language: 78,
  answering: 85,
  overall: 82,
};

export const mockImprovementPlan = {
  mistakes: [
    "Need to improve eye contact during video interviews",
    "Speak more slowly when explaining complex topics",
    "Practice more dynamic programming problems",
    "Work on system design scalability concepts",
  ],
  daily_tasks: [
    { id: 1, task: "Solve 2 LeetCode medium problems", completed: true },
    { id: 2, task: "Review one system design concept", completed: true },
    { id: 3, task: "Practice mock interview for 30 mins", completed: false },
    { id: 4, task: "Read one tech blog post", completed: false },
  ],
  weekly_tasks: [
    { id: 1, task: "Complete one full mock interview", completed: true },
    { id: 2, task: "Review and update resume", completed: false },
    { id: 3, task: "Network with 2 industry professionals", completed: false },
  ],
  progress: 65,
};

export const mockLeaderboard = [
  { rank: 1, name: "Alex Turner", score: 98, avatar: "AT", streak: 45 },
  { rank: 2, name: "Sarah Williams", score: 95, avatar: "SW", streak: 32 },
  { rank: 3, name: "Michael Chen", score: 92, avatar: "MC", streak: 28 },
  { rank: 4, name: "Emily Johnson", score: 89, avatar: "EJ", streak: 21 },
  { rank: 5, name: "David Kim", score: 87, avatar: "DK", streak: 19 },
  { rank: 6, name: "Jessica Brown", score: 85, avatar: "JB", streak: 15 },
  { rank: 7, name: "John Doe", score: 82, avatar: "JD", streak: 12, isCurrentUser: true },
  { rank: 8, name: "Amanda Lee", score: 80, avatar: "AL", streak: 10 },
  { rank: 9, name: "Chris Martinez", score: 78, avatar: "CM", streak: 8 },
  { rank: 10, name: "Lisa Wang", score: 75, avatar: "LW", streak: 5 },
];

export const mockCommunityPosts = [
  {
    id: 1,
    author: "TechEnthusiast",
    avatar: "TE",
    content: "Has anyone interviewed at Google recently? What was the process like?",
    timestamp: "2 hours ago",
    upvotes: 24,
    replies: [
      { id: 1, author: "SWE_Master", avatar: "SM", content: "Yes! I had 5 rounds - 2 coding, 1 system design, 2 behavioral.", timestamp: "1 hour ago", upvotes: 12 },
      { id: 2, author: "CodeNinja", avatar: "CN", content: "Same here. Focus on medium-hard LC problems.", timestamp: "45 mins ago", upvotes: 8 },
    ],
  },
  {
    id: 2,
    author: "NewGrad2024",
    avatar: "NG",
    content: "Best resources for learning system design as a new grad?",
    timestamp: "5 hours ago",
    upvotes: 45,
    replies: [
      { id: 1, author: "SeniorDev", avatar: "SD", content: "Check out 'Designing Data-Intensive Applications' book", timestamp: "4 hours ago", upvotes: 23 },
    ],
  },
  {
    id: 3,
    author: "InterviewPrepper",
    avatar: "IP",
    content: "Just got an offer from Amazon! Happy to answer questions about the process.",
    timestamp: "1 day ago",
    upvotes: 89,
    replies: [],
  },
];

export const interestOptions = [
  "Software Engineer",
  "Data Analyst",
  "ML Engineer",
  "Web Developer",
  "DevOps Engineer",
  "Mobile Developer",
  "Cloud Architect",
  "Product Manager",
];
