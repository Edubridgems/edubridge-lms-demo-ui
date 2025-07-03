import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, ClipboardList, AlertTriangle, TrendingUp, Calendar } from "lucide-react"

interface TeachingSummaryProps {
  stats: {
    totalUnits: number
    totalStudents: number
    pendingSubmissions: number
    upcomingDeadlines: number
    averageGrade: number
    attendanceRate: number
  }
}

const TeachingSummaryPanel = ({ stats }: TeachingSummaryProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4 text-center">
          <BookOpen className="h-6 w-6 mx-auto mb-2 text-blue-600" />
          <div className="text-2xl font-bold text-blue-700">{stats.totalUnits}</div>
          <div className="text-xs text-blue-600">Active Units</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4 text-center">
          <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
          <div className="text-2xl font-bold text-green-700">{stats.totalStudents}</div>
          <div className="text-xs text-green-600">Total Students</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="p-4 text-center">
          <ClipboardList className="h-6 w-6 mx-auto mb-2 text-amber-600" />
          <div className="text-2xl font-bold text-amber-700">{stats.pendingSubmissions}</div>
          <div className="text-xs text-amber-600">Pending Submissions</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <CardContent className="p-4 text-center">
          <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-600" />
          <div className="text-2xl font-bold text-red-700">{stats.upcomingDeadlines}</div>
          <div className="text-xs text-red-600">Due This Week</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4 text-center">
          <TrendingUp className="h-6 w-6 mx-auto mb-2 text-purple-600" />
          <div className="text-2xl font-bold text-purple-700">{stats.averageGrade}%</div>
          <div className="text-xs text-purple-600">Average Grade</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
        <CardContent className="p-4 text-center">
          <Calendar className="h-6 w-6 mx-auto mb-2 text-indigo-600" />
          <div className="text-2xl font-bold text-indigo-700">{stats.attendanceRate}%</div>
          <div className="text-xs text-indigo-600">Attendance Rate</div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TeachingSummaryPanel
