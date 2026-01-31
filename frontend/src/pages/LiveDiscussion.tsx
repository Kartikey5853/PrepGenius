import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, VideoOff, Mic, MicOff, Send, Users, MessageSquare, Phone, PhoneOff } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const LiveDiscussion = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, author: "Sarah", content: "Hey! Ready for the mock interview?", time: "2:30 PM" },
    { id: 2, author: "You", content: "Yes, let's start with behavioral questions", time: "2:31 PM" },
    { id: 3, author: "Sarah", content: "Sounds good! Tell me about a challenging project you worked on.", time: "2:32 PM" },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, author: "You", content: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setMessage("");
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
          <h1 className="text-3xl font-bold">Live Discussion</h1>
          <p className="text-muted-foreground">Practice interviews with peers in real-time</p>
        </div>

        {!isInCall ? (
          /* Join Call View */
          <motion.div variants={itemVariants}>
            <Card className="max-w-2xl mx-auto">
              <CardHeader className="text-center">
                <div className="mx-auto w-20 h-20 rounded-full gradient-primary flex items-center justify-center mb-4">
                  <Video className="w-10 h-10 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Start a Live Discussion</CardTitle>
                <CardDescription>
                  Connect with a peer for real-time interview practice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-medium">12 Users Online</p>
                    <p className="text-sm text-muted-foreground">Ready to practice</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 text-center">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 text-accent" />
                    <p className="font-medium">5 Active Sessions</p>
                    <p className="text-sm text-muted-foreground">In progress now</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    className="w-full gradient-primary"
                    onClick={() => setIsInCall(true)}
                  >
                    <Video className="w-5 h-5 mr-2" />
                    Start Video Discussion
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsInCall(true)}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Start Chat Only
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  You'll be matched with another user preparing for similar roles
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* In Call View */
          <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-3">
            {/* Video Section */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-1 bg-muted">
                    {/* Peer Video */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                      <Avatar className="w-24 h-24">
                        <AvatarFallback className="text-3xl bg-primary/20 text-primary">
                          SC
                        </AvatarFallback>
                      </Avatar>
                      <Badge className="absolute bottom-4 left-4">Sarah Chen</Badge>
                    </div>
                    
                    {/* Your Video */}
                    <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center relative">
                      {isVideoOn ? (
                        <Avatar className="w-24 h-24">
                          <AvatarFallback className="text-3xl bg-accent/20 text-accent">
                            You
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="flex flex-col items-center">
                          <VideoOff className="w-12 h-12 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground mt-2">Camera Off</p>
                        </div>
                      )}
                      <Badge className="absolute bottom-4 left-4" variant="secondary">You</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Controls */}
              <Card>
                <CardContent className="py-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant={isMuted ? "destructive" : "secondary"}
                      size="lg"
                      className="rounded-full w-14 h-14"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </Button>
                    <Button
                      variant={isVideoOn ? "secondary" : "destructive"}
                      size="lg"
                      className="rounded-full w-14 h-14"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                    </Button>
                    <Button
                      variant="destructive"
                      size="lg"
                      className="rounded-full w-14 h-14"
                      onClick={() => setIsInCall(false)}
                    >
                      <PhoneOff className="w-6 h-6" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Section */}
            <Card className="flex flex-col h-[500px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Live Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4 pb-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.author === "You" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.author === "You"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${
                            msg.author === "You" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default LiveDiscussion;
