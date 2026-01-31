import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Target,
  BookOpen,
  Briefcase,
  Video,
  Mic,
  MessageCircle,
  Linkedin,
  ExternalLink,
  Play,
  ArrowRight,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  mockScrapedData,
  mockJobs,
  mockLectures,
  mockInterviewScores,
  interestOptions,
} from "@/lib/mockData";

const Dashboard = () => {
  const [selectedInterest, setSelectedInterest] = useState("");
  const [hasStartedPrep, setHasStartedPrep] = useState(false);

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

  const CircularProgress = ({ value, label, color }: { value: number; label: string; color: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${value * 2.51} 251`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">{value}%</span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground mt-2">{label}</span>
    </div>
  );

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Your personalized interview preparation hub</p>
        </div>

        {/* Interest Selection Section */}
        <motion.div variants={itemVariants}>
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>Choose Your Path</CardTitle>
                  <CardDescription>Select your target role to get personalized preparation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={selectedInterest} onValueChange={setSelectedInterest}>
                  <SelectTrigger className="w-full sm:w-[280px]">
                    <SelectValue placeholder="Select your target role" />
                  </SelectTrigger>
                  <SelectContent>
                    {interestOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => setHasStartedPrep(true)}
                  disabled={!selectedInterest}
                  className="gradient-primary"
                >
                  Start Preparation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              {hasStartedPrep && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-sm text-accent"
                >
                  ✓ Great! Your preparation for {selectedInterest} has begun.
                </motion.p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Scraped Data Section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Interview Resources</CardTitle>
                  <CardDescription>Curated content from across the web</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="questions">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="reddit">Reddit</TabsTrigger>
                  <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                </TabsList>

                <TabsContent value="questions" className="space-y-3">
                  {mockScrapedData.questions.map((q, index) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-medium">{q.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">Source: {q.source}</p>
                        </div>
                        <Badge
                          variant={
                            q.difficulty === "Easy" ? "secondary" :
                            q.difficulty === "Medium" ? "default" : "destructive"
                          }
                        >
                          {q.difficulty}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="reddit" className="space-y-3">
                  {mockScrapedData.reddit_posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-muted-foreground">r/{post.subreddit}</span>
                      </div>
                      <p className="font-medium">{post.title}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span>⬆️ {post.upvotes}</span>
                        <span>💬 {post.comments} comments</span>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="linkedin" className="space-y-3">
                  {mockScrapedData.linkedin_posts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{post.author}</span>
                        <span className="text-sm text-muted-foreground">• {post.role}</span>
                      </div>
                      <p className="text-muted-foreground">{post.content}</p>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Job Openings Section */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Job Openings</CardTitle>
                    <CardDescription>Latest opportunities matching your profile</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockJobs.slice(0, 4).map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-accent/30 hover:bg-muted/50 transition-all"
                  >
                    <div>
                      <p className="font-medium">{job.role}</p>
                      <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Free Lectures Section */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Free Lectures</CardTitle>
                    <CardDescription>Learn from the best content creators</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {mockLectures.map((lecture, index) => (
                    <motion.div
                      key={lecture.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mb-2">
                        <img
                          src={lecture.thumbnail}
                          alt={lecture.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                        <Badge className="absolute bottom-2 right-2 bg-black/60">{lecture.duration}</Badge>
                      </div>
                      <p className="text-sm font-medium line-clamp-2">{lecture.title}</p>
                      <p className="text-xs text-muted-foreground">{lecture.platform}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Mock Interview Section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
                  <Mic className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle>Mock Interview</CardTitle>
                  <CardDescription>Practice with AI-powered interview simulation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <Button size="lg" className="gradient-primary px-8">
                  <Mic className="w-5 h-5 mr-2" />
                  Start Mock Interview
                </Button>
                
                <div className="flex-1 w-full lg:w-auto">
                  <p className="text-sm text-muted-foreground mb-4 text-center lg:text-left">
                    Your last mock interview scores:
                  </p>
                  <div className="flex justify-center lg:justify-start gap-8">
                    <CircularProgress
                      value={mockInterviewScores.body_language}
                      label="Body Language"
                      color="hsl(var(--primary))"
                    />
                    <CircularProgress
                      value={mockInterviewScores.answering}
                      label="Answering"
                      color="hsl(var(--accent))"
                    />
                    <CircularProgress
                      value={mockInterviewScores.overall}
                      label="Overall"
                      color="hsl(var(--warning))"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
