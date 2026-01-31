import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Target, Calendar, CalendarDays } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockImprovementPlan } from "@/lib/mockData";
import { useState } from "react";

const Improvement = () => {
  const [dailyTasks, setDailyTasks] = useState(mockImprovementPlan.daily_tasks);
  const [weeklyTasks, setWeeklyTasks] = useState(mockImprovementPlan.weekly_tasks);

  const toggleDailyTask = (id: number) => {
    setDailyTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleWeeklyTask = (id: number) => {
    setWeeklyTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const calculateProgress = () => {
    const allTasks = [...dailyTasks, ...weeklyTasks];
    const completed = allTasks.filter(t => t.completed).length;
    return Math.round((completed / allTasks.length) * 100);
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
          <h1 className="text-3xl font-bold">Improvement Plan</h1>
          <p className="text-muted-foreground">Track your progress and areas for improvement</p>
        </div>

        {/* Progress Overview */}
        <motion.div variants={itemVariants}>
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle>Overall Progress</CardTitle>
                    <CardDescription>Your improvement journey this week</CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">{calculateProgress()}%</p>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={calculateProgress()} className="h-3" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Mistakes Summary */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <CardTitle>Areas to Improve</CardTitle>
                  <CardDescription>Key points identified from your practice sessions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {mockImprovementPlan.mistakes.map((mistake, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20"
                  >
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-destructive">{index + 1}</span>
                    </div>
                    <p className="text-sm">{mistake}</p>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Daily Tasks */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Daily Tasks</CardTitle>
                    <CardDescription>Complete these every day</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {dailyTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      task.completed
                        ? "bg-accent/10 border-accent/30"
                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                    }`}
                    onClick={() => toggleDailyTask(task.id)}
                  >
                    <Checkbox
                      checked={task.completed}
                      className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <span className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                      {task.task}
                    </span>
                    {task.completed && (
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Tasks */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <CalendarDays className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Weekly Goals</CardTitle>
                    <CardDescription>Complete these by end of week</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {weeklyTasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      task.completed
                        ? "bg-accent/10 border-accent/30"
                        : "border-border hover:border-accent/30 hover:bg-muted/50"
                    }`}
                    onClick={() => toggleWeeklyTask(task.id)}
                  >
                    <Checkbox
                      checked={task.completed}
                      className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <span className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                      {task.task}
                    </span>
                    {task.completed && (
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>💡 Pro Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Consistency is Key</h4>
                  <p className="text-sm text-muted-foreground">
                    Completing daily tasks builds momentum and reinforces learning.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Track Your Progress</h4>
                  <p className="text-sm text-muted-foreground">
                    Check off tasks as you complete them to visualize your improvement.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2">Focus on Weaknesses</h4>
                  <p className="text-sm text-muted-foreground">
                    Spend extra time on areas marked for improvement above.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Improvement;
