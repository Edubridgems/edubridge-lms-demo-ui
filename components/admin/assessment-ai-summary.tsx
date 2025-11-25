"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, AlertTriangle, CheckCircle, Clock, TrendingUp, Eye, FileText, Zap } from "lucide-react"
import Link from "next/link"
import type { AssessmentAIStats, FlaggedReport } from "@/types/dashboard"

interface AssessmentAISummaryProps {
  stats: AssessmentAIStats
  flaggedReports: FlaggedReport[]
}

const AssessmentAISummary = ({ stats, flaggedReports }: AssessmentAISummaryProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "reviewing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "escalated":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "Just now"
  }

  const pendingReports = flaggedReports.filter((r) => r.status === "pending" || r.status === "reviewing")
  const criticalReports = flaggedReports.filter((r) => r.severity === "critical")

  return (
    <div className="space-y-6">
      {/* AI Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Running Assessments</CardTitle>
            <Brain className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assessmentsRunning}</div>
            <p className="text-xs text-muted-foreground">AI actively monitoring</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Submissions</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.flaggedSubmissions}</div>
            <p className="text-xs text-muted-foreground">{stats.flaggedPercentage.toFixed(1)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.aiReviewsCompleted}</div>
            <p className="text-xs text-muted-foreground">{stats.accuracyRate}% accuracy rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProcessingTime}s</div>
            <p className="text-xs text-muted-foreground">Average per submission</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Performance Metrics
          </CardTitle>
          <CardDescription>Real-time AI system performance and accuracy indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Review Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Review Progress</span>
                <span className="text-sm text-muted-foreground">
                  {stats.aiReviewsCompleted} / {stats.totalSubmissions}
                </span>
              </div>
              <Progress value={stats.reviewProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{stats.reviewProgress}% of submissions processed</p>
            </div>

            {/* Accuracy Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">AI Accuracy Rate</span>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {stats.accuracyRate}%
                </Badge>
              </div>
              <Progress value={stats.accuracyRate} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">Based on manual verification of flagged submissions</p>
            </div>

            {/* System Load */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.assessmentsRunning}</div>
                <div className="text-xs text-muted-foreground">Active Scans</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{pendingReports.length}</div>
                <div className="text-xs text-muted-foreground">Pending Review</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{criticalReports.length}</div>
                <div className="text-xs text-muted-foreground">Critical Issues</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flagged Reports */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Flagged Assessment Reports
              </CardTitle>
              <CardDescription>Submissions requiring manual review and attention</CardDescription>
            </div>
            <Link href="/admin/plagiarism">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flaggedReports.length > 0 ? (
              flaggedReports.slice(0, 5).map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FileText className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{report.assessmentTitle}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {report.unitCode}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{report.flaggedCount} submissions flagged</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold">{report.similarityScore.toFixed(1)}%</div>
                      <div className="text-xs text-muted-foreground">similarity</div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <Badge className={getSeverityColor(report.severity)}>{report.severity}</Badge>
                      <Badge variant="outline" className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>

                    <div className="text-xs text-muted-foreground">{formatTimeAgo(report.lastUpdated)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
                <h3 className="mt-4 text-sm font-medium text-gray-900">No flagged reports</h3>
                <p className="mt-2 text-sm text-gray-500">All assessments are currently clean. Great job!</p>
              </div>
            )}
          </div>

          {flaggedReports.length > 5 && (
            <div className="mt-4 pt-4 border-t text-center">
              <Link href="/admin/plagiarism">
                <Button variant="outline" size="sm">
                  View {flaggedReports.length - 5} More Reports
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            AI Insights & Recommendations
          </CardTitle>
          <CardDescription>Automated insights based on assessment patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Pattern Detection</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Detected unusual similarity patterns in CS401 submissions. Consider reviewing assignment
                    instructions for clarity.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Attention Required</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    {pendingReports.length} reports require manual review. Average review time is increasing.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">System Performance</h4>
                  <p className="text-sm text-green-700 mt-1">
                    AI accuracy has improved by 3.2% this week. Processing time reduced by 15%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AssessmentAISummary
