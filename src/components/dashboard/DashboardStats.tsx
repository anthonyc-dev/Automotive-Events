"use client";

import { motion } from "framer-motion";
import { Calendar, Users, Eye, TrendingUp } from "lucide-react";

// Mock data - in a real app, this would come from your API
const stats = [
  {
    title: "Total Events",
    value: "12",
    change: "+2 from last month",
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Total Attendees",
    value: "1,247",
    change: "+15% from last month",
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    title: "Views",
    value: "8,324",
    change: "+22% from last month",
    icon: Eye,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Revenue",
    value: "$12,450",
    change: "+8% from last month",
    icon: TrendingUp,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-background border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
