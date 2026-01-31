import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, FileText, Briefcase, Upload, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axios";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // States
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [resumeScore, setResumeScore] = useState<number | null>(null);
  const [suggestedCompanies, setSuggestedCompanies] = useState<string[]>([]);

  // Load profile data on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/profile");
        setName(res.data.name);
        setResumeScore(res.data.resume_score || 0);
        setSuggestedCompanies(res.data.suggested_companies || []);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    loadProfile();
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await api.put("/profile", {
        name,
        password: password || null,
      });

      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      });
      setPassword("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUploadResume = async () => {
    setIsUploading(true);
    try {
      // Note: In a real scenario, you'd trigger a file input click
      // This follows your logic of using a Blob for the API connection test
      const formData = new FormData();
      formData.append("file", new Blob()); 

      const res = await api.post("/profile/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResumeScore(res.data.resume_score);
      setSuggestedCompanies(res.data.suggested_companies);

      toast({
        title: "Resume uploaded",
        description: "Your resume has been analyzed successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Could not process resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
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
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Info Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={user?.user_id || "Loading..."}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Leave blank to keep current"
                  />
                </div>
                <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full">
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Resume Upload Card */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Resume Analysis</CardTitle>
                    <CardDescription>Upload your resume for AI-powered feedback</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop your resume or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
                
                <Button 
                  onClick={handleUploadResume} 
                  disabled={isUploading} 
                  className="w-full"
                  variant="outline"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resume
                    </>
                  )}
                </Button>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Resume Score</span>
                    <span className="text-sm font-bold text-accent">{resumeScore ?? 0}/100</span>
                  </div>
                  <Progress value={resumeScore || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Job Suggestions Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Recommended Companies</CardTitle>
                    <CardDescription>Based on your resume and interests</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {suggestedCompanies.length > 0 ? (
                    suggestedCompanies.map((company, index) => (
                      <motion.div
                        key={company}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge variant="secondary" className="text-sm py-1.5 px-3">
                          {company}
                        </Badge>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Upload your resume to see recommendations.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Profile;