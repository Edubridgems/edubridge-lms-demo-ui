import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ClipboardList, Shield, CheckCircle, AlertTriangle, Eye, TrendingUp } from "lucide-react"
import Link from "next/link"

interface AssessmentAISummaryProps {
  stats: {
    assessmentsRunning: number
    flaggedSubmissions: number
    aiReviewsCompleted: number
    totalSubmissions: number
    flaggedPercentage: number
    reviewProgress: number
  }
  flaggedReports: {
    id: string
    assessmentTitle: string
    unitCode: string
    flaggedCount: number
    severity: "high" | "medium" | "low"
    lastUpdated: Date
  }[]
}

const AssessmentAISummary = ({ stats, flaggedReports }: AssessmentAISummaryProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
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

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "Just now"
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <ClipboardList className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-700">{stats.assessmentsRunning}</div>
            <div className="text-xs text-blue-600">Running This Week</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-600" />
            <div className="text-2xl font-bold text-red-700">{stats.flaggedSubmissions}</div>
            <div className="text-xs text-red-600">Flagged Submissions</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-700">{stats.reviewProgress}%</div>
            <div className="text-xs text-green-600">Reviews Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Shield className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-700">{stats.flaggedPercentage}%</div>
            <div className="text-xs text-purple-600">Flagged Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* AI Review Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Review Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Overall Review Progress</span>
                <span className="font-medium">
                  {stats.aiReviewsCompleted}/{stats.totalSubmissions} completed
                </span>
              </div>
              <Progress value={stats.reviewProgress} className="h-3" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">{stats.totalSubmissions}</div>
                <div className="text-xs text-gray-600">Total Submissions</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">{stats.aiReviewsCompleted}</div>
                <div className="text-xs text-gray-600">Reviewed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">{stats.flaggedSubmissions}</div>
                <div className="text-xs text-gray-600">Flagged</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flagged Content Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Flagged Content Reports
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/flagged-reports">
                <Eye className="h-3 w-3 mr-1" />
                View All
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {flaggedReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{report.assessmentTitle}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(report.severity)}`}>
                      {report.severity} risk
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{report.unitCode}</span>
                    <span>{report.flaggedCount} flagged submissions</span>
                    <span>Updated {formatTimeAgo(report.lastUpdated)}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3 mr-1" />
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AssessmentAISummary
