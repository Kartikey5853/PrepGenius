import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Flame, TrendingUp } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { mockLeaderboard } from "@/lib/mockData";

const Leaderboard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-yellow-500/30";
      case 2:
        return "bg-gradient-to-r from-gray-300/10 to-gray-400/10 border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-600/30";
      default:
        return "border-border hover:border-primary/30 hover:bg-muted/50";
    }
  };

  // Top 3 for the podium
  const topThree = mockLeaderboard.slice(0, 3);
  const restOfLeaderboard = mockLeaderboard.slice(3);

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">See how you stack up against other candidates</p>
        </div>

        {/* Top 3 Podium */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <CardHeader className="text-center gradient-hero text-primary-foreground">
              <CardTitle className="text-2xl">Top Performers</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                This week's interview champions
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8 pb-6">
              <div className="flex items-end justify-center gap-4">
                {/* 2nd Place */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <Avatar className="w-16 h-16 border-4 border-gray-400">
                    <AvatarFallback className="text-lg bg-gray-100 text-gray-600">
                      {topThree[1]?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-20 h-24 bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-lg mt-2 flex flex-col items-center justify-end pb-2">
                    <Medal className="w-6 h-6 text-gray-500 mb-1" />
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <p className="text-sm font-medium mt-2">{topThree[1]?.name}</p>
                  <p className="text-xs text-muted-foreground">{topThree[1]?.score} pts</p>
                </motion.div>

                {/* 1st Place */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center -mt-4"
                >
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-4 border-yellow-500">
                      <AvatarFallback className="text-xl bg-yellow-100 text-yellow-700">
                        {topThree[0]?.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -top-3 -right-1 text-2xl">👑</div>
                  </div>
                  <div className="w-24 h-32 bg-gradient-to-t from-yellow-300 to-yellow-200 rounded-t-lg mt-2 flex flex-col items-center justify-end pb-2">
                    <Trophy className="w-8 h-8 text-yellow-600 mb-1" />
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <p className="text-sm font-medium mt-2">{topThree[0]?.name}</p>
                  <p className="text-xs text-muted-foreground">{topThree[0]?.score} pts</p>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <Avatar className="w-14 h-14 border-4 border-amber-600">
                    <AvatarFallback className="bg-amber-100 text-amber-700">
                      {topThree[2]?.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-18 h-20 bg-gradient-to-t from-amber-200 to-amber-100 rounded-t-lg mt-2 flex flex-col items-center justify-end pb-2 px-4">
                    <Award className="w-5 h-5 text-amber-600 mb-1" />
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <p className="text-sm font-medium mt-2">{topThree[2]?.name}</p>
                  <p className="text-xs text-muted-foreground">{topThree[2]?.score} pts</p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Full Leaderboard Table */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Rankings</CardTitle>
                  <CardDescription>Complete leaderboard standings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockLeaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    variants={itemVariants}
                    className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${getRankStyle(user.rank)} ${
                      user.isCurrentUser ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                  >
                    <div className="w-8 flex justify-center">
                      {getRankIcon(user.rank)}
                    </div>
                    
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`${
                        user.rank === 1 ? "bg-yellow-100 text-yellow-700" :
                        user.rank === 2 ? "bg-gray-100 text-gray-600" :
                        user.rank === 3 ? "bg-amber-100 text-amber-700" :
                        "bg-primary/10 text-primary"
                      }`}>
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{user.name}</p>
                        {user.isCurrentUser && (
                          <Badge variant="secondary" className="text-xs">You</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span>{user.streak} day streak</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold">{user.score}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Leaderboard;
