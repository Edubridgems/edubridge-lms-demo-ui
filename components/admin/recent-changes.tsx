"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, BookOpen, User, Settings, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import type { RecentChange } from "@/types/dashboard"

interface RecentChangesProps {
  changes: RecentChange[]
}

const RecentChanges = ({ changes }: RecentChangesProps) => {
  const getChangeIcon = (type: string) => {
    switch (type) {
      case "course_created":
        return <BookOpen className="h-4 w-4" />
      case "lecturer_assigned":
        return <User className="h-4 w-4" />
      case "curriculum_updated":
        return <FileText className="h-4 w-4" />
      case "system_update":
        return <Settings className="h-4 w-4" />
      case "user_added":
        return <User className="h-4 w-4" />
      case "assessment_modified":
        return <FileText className="h-4 w-4" />
      default:
        return <History className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3" />
      case "pending":
        return <Clock className="h-3 w-3" />
      case "failed":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  const getChangeTypeLabel = (type: string) => {
    switch (type) {
      case "course_created":
        return "Course Created"
      case "lecturer_assigned":
        return "Lecturer Assigned"
      case "curriculum_updated":
        return "Curriculum Updated"
      case "system_update":
        return "System Update"
      case "user_added":
        return "User Added"
      case "assessment_modified":
        return "Assessment Modified"
      default:
        return "Change"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Changes
            </CardTitle>
            <CardDescription>Latest system modifications and updates</CardDescription>
          </div>
          <Link href="/admin/audit-log">
            <Button variant="outline" size="sm">
              View Full Log
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {changes.length > 0 ? (
            changes.map((change) => (
              <div
                key={change.id}
                className="flex items-start space-x-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-gray-100 rounded-lg">{getChangeIcon(change.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{change.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(change.status)}>
                        {getStatusIcon(change.status)}
                        <span className="ml-1 capitalize">{change.status}</span>
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{change.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {change.changedBy}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {change.entityCode}
                      </Badge>
                      <Badge variant="outline" className={getImpactColor(change.impact)}>
                        {change.impact} impact
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">{formatTimeAgo(change.timestamp)}</span>
                  </div>

                  {/* Entity Details */}
                  <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                    <span className="font-medium">Entity:</span> {change.entityName}
                    <span className="ml-3 font-medium">Type:</span> {getChangeTypeLabel(change.type)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <History className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-sm font-medium text-gray-900">No recent changes</h3>
              <p className="mt-2 text-sm text-gray-500">No system changes have been recorded recently.</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {changes.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-green-600">
                  {changes.filter((c) => c.status === "completed").length}
                </div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div>
                <div className="text-lg font-bold text-yellow-600">
                  {changes.filter((c) => c.status === "pending").length}
                </div>
                <div className="text-xs text-muted-foreground">Pending</div>
              </div>
              <div>
                <div className="text-lg font-bold text-red-600">
                  {changes.filter((c) => c.status === "failed").length}
                </div>
                <div className="text-xs text-muted-foreground">Failed</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RecentChanges
