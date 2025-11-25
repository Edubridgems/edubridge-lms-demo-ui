"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  BookOpen,
  ClipboardList,
  Activity,
  AlertTriangle,
  Server,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import type { PlatformStats } from "@/types/dashboard"

interface PlatformOverviewStatsProps {
  stats: PlatformStats
}

const PlatformOverviewStats = ({ stats }: PlatformOverviewStatsProps) => {
  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      description: `${stats.activeUsers} active today`,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: "up",
      trendValue: "+12%",
    },
    {
      title: "Active Courses",
      value: stats.totalCourses.toString(),
      description: "Across all departments",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
      trend: "up",
      trendValue: "+3%",
    },
    {
      title: "Assessments",
      value: stats.assessmentsThisWeek.toString(),
      description: "This week",
      icon: ClipboardList,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      trend: "stable",
      trendValue: "0%",
    },
    {
      title: "Daily Logins",
      value: stats.loginsToday.toString(),
      description: "Today's activity",
      icon: Activity,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      trend: "up",
      trendValue: "+8%",
    },
    {
      title: "Flagged Exams",
      value: stats.flaggedExams.toString(),
      description: "Require attention",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      trend: "down",
      trendValue: "-15%",
    },
    {
      title: "System Uptime",
      value: `${stats.serverUptime}%`,
      description: "Last 30 days",
      icon: Server,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
      trend: "stable",
      trendValue: "99.8%",
    },
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-600" />
      default:
        return <Minus className="h-3 w-3 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon

        return (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <div className={`flex items-center gap-1 ${getTrendColor(stat.trend)}`}>
                    {getTrendIcon(stat.trend)}
                    <span className="text-xs font-medium">{stat.trendValue}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default PlatformOverviewStats
