import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, Send, MessageCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockCommunityPosts } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(mockCommunityPosts);
  const { toast } = useToast();

  const handleAddPost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      author: "You",
      avatar: "Y",
      content: newPost,
      timestamp: "Just now",
      upvotes: 0,
      replies: [],
    };

    setPosts([post, ...posts]);
    setNewPost("");
    toast({
      title: "Post published!",
      description: "Your question has been posted to the community.",
    });
  };

  const handleUpvote = (postId: number) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">Connect with fellow interview preppers</p>
        </div>

        {/* Create Post */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>Ask the Community</CardTitle>
                  <CardDescription>Share questions, tips, or experiences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's on your mind? Ask about interviews, share tips, or discuss strategies..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-end">
                <Button onClick={handleAddPost} disabled={!newPost.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Posts Feed */}
        <motion.div variants={itemVariants} className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  {/* Post Header */}
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{post.author}</span>
                        <span className="text-sm text-muted-foreground">• {post.timestamp}</span>
                      </div>
                      <p className="text-foreground">{post.content}</p>

                      {/* Post Actions */}
                      <div className="flex items-center gap-4 mt-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUpvote(post.id)}
                          className="text-muted-foreground hover:text-primary"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.upvotes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.replies.length} replies
                        </Button>
                      </div>

                      {/* Replies */}
                      {post.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-border space-y-4">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-xs bg-muted">
                                  {reply.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium">{reply.author}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {reply.timestamp}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground">{reply.content}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-muted-foreground hover:text-primary text-xs h-7 px-2 mt-1"
                                >
                                  <ThumbsUp className="w-3 h-3 mr-1" />
                                  {reply.upvotes}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Community;
