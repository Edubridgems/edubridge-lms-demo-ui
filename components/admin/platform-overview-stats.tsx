import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, ClipboardList, Activity, UserCheck, AlertTriangle, TrendingUp, Server } from "lucide-react"

interface PlatformStatsProps {
  stats: {
    totalUsers: number
    totalCourses: number
    assessmentsThisWeek: number
    loginsToday: number
    flaggedExams: number
    systemLoad: number
    activeUsers: number
    serverUptime: number
  }
}

const PlatformOverviewStats = ({ stats }: PlatformStatsProps) => {
  const getSystemLoadColor = (load: number) => {
    if (load >= 80) return "text-red-600 bg-red-50 border-red-200"
    if (load >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-green-600 bg-green-50 border-green-200"
  }

  const getUptimeColor = (uptime: number) => {
    if (uptime >= 99) return "text-green-600"
    if (uptime >= 95) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4 text-center">
          <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-blue-700">{stats.totalUsers.toLocaleString()}</div>
          <div className="text-xs text-blue-600">Total Users</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4 text-center">
          <BookOpen className="h-6 w-6 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold text-green-700">{stats.totalCourses}</div>
          <div className="text-xs text-green-600">Active Courses</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4 text-center">
          <ClipboardList className="h-6 w-6 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold text-purple-700">{stats.assessmentsThisWeek}</div>
          <div className="text-xs text-purple-600">Assessments This Week</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
        <CardContent className="p-4 text-center">
          <Activity className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
          <div className="text-2xl font-bold text-indigo-700">{stats.loginsToday}</div>
          <div className="text-xs text-indigo-600">Logins Today</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="p-4 text-center">
          <UserCheck className="h-6 w-6 mx-auto mb-2 text-amber-600" />
          <div className="text-2xl font-bold text-amber-700">{stats.activeUsers}</div>
          <div className="text-xs text-amber-600">Active Now</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <CardContent className="p-4 text-center">
          <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-600" />
          <div className="text-2xl font-bold text-red-700">{stats.flaggedExams}</div>
          <div className="text-xs text-red-600">Flagged Exams</div>
        </CardContent>
      </Card>

      <Card className={`border ${getSystemLoadColor(stats.systemLoad)}`}>
        <CardContent className="p-4 text-center">
          <Server className="h-6 w-6 mx-auto mb-2 opacity-70" />
          <div className="text-2xl font-bold">{stats.systemLoad}%</div>
          <div className="text-xs opacity-80">System Load</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
        <CardContent className="p-4 text-center">
          <TrendingUp className="h-6 w-6 mx-auto mb-2 text-teal-600" />
          <div className={`text-2xl font-bold ${getUptimeColor(stats.serverUptime)}`}>{stats.serverUptime}%</div>
          <div className="text-xs text-teal-600">Uptime</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PlatformOverviewStats
