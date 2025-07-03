import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, AlertTriangle, Users, BarChart3 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface PerformanceData {
  unitPerformance: {
    unitCode: string
    unitName: string
    averageScore: number
    submissionRate: number
    attendanceRate: number
    trend: "up" | "down" | "stable"
  }[]
  outliers: {
    studentName: string
    unitCode: string
    currentGrade: number
    attendanceRate: number
    risk: "high" | "medium" | "low"
  }[]
  trendData: {
    week: string
    averageScore: number
    submissionRate: number
  }[]
}

interface PerformanceInsightsProps {
  data: PerformanceData
}

const PerformanceInsights = ({ data }: PerformanceInsightsProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Unit Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Unit Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.unitPerformance.map((unit) => (
              <div key={unit.unitCode} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{unit.unitCode}</h3>
                    <p className="text-sm text-gray-600">{unit.unitName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(unit.trend)}
                    <span className="text-2xl font-bold text-gray-900">{unit.averageScore}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Submission Rate</span>
                      <span className="font-medium">{unit.submissionRate}%</span>
                    </div>
                    <Progress value={unit.submissionRate} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Attendance Rate</span>
                      <span className="font-medium">{unit.attendanceRate}%</span>
                    </div>
                    <Progress value={unit.attendanceRate} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="averageScore"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Average Score (%)"
                />
                <Line
                  type="monotone"
                  dataKey="submissionRate"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Submission Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Student Outliers Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Students Requiring Attention
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.outliers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">All students are performing well!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {data.outliers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{student.studentName}</h4>
                      <p className="text-sm text-gray-600">{student.unitCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">Grade: {student.currentGrade}%</div>
                      <div className="text-xs text-gray-600">Attendance: {student.attendanceRate}%</div>
                    </div>
                    <Badge variant="outline" className={getRiskColor(student.risk)}>
                      {student.risk} risk
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PerformanceInsights
