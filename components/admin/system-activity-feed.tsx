"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, User, AlertTriangle, BookOpen, Settings, CheckCircle, Clock, Filter, RefreshCw } from "lucide-react"
import { useState } from "react"
import type { SystemActivity } from "@/types/dashboard"

interface SystemActivityFeedProps {
  activities: SystemActivity[]
}

const SystemActivityFeed = ({ activities }: SystemActivityFeedProps) => {
  const [filter, setFilter] = useState<string>("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "assessment_created":
        return <BookOpen className="h-4 w-4" />
      case "user_registered":
        return <User className="h-4 w-4" />
      case "ai_flagged":
        return <AlertTriangle className="h-4 w-4" />
      case "lecturer_assigned":
        return <User className="h-4 w-4" />
      case "system_alert":
        return <Settings className="h-4 w-4" />
      case "course_updated":
        return <BookOpen className="h-4 w-4" />
      case "plagiarism_detected":
        return <AlertTriangle className="h-4 w-4" />
      case "maintenance_scheduled":
        return <Settings className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-3 w-3" />
      case "warning":
        return <AlertTriangle className="h-3 w-3" />
      case "success":
        return <CheckCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const filteredActivities = activities.filter((activity) => {
    if (filter === "all") return true
    return activity.severity === filter
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Activity Feed
            </CardTitle>
            <CardDescription>Real-time system events and user activities</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["all", "critical", "warning", "success", "info"].map((severity) => (
            <Button
              key={severity}
              variant={filter === severity ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(severity)}
              className="capitalize"
            >
              {severity}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{activity.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getSeverityColor(activity.severity)}>
                        {getSeverityIcon(activity.severity)}
                        <span className="ml-1 capitalize">{activity.severity}</span>
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{activity.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      {activity.userName && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {activity.userName}
                        </span>
                      )}
                      {activity.unitCode && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.unitCode}
                        </Badge>
                      )}
                    </div>
                    <span>{formatTimeAgo(activity.timestamp)}</span>
                  </div>

                  {/* Metadata */}
                  {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                      {Object.entries(activity.metadata).map(([key, value]) => (
                        <span key={key} className="inline-block mr-3">
                          <strong>{key}:</strong> {String(value)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <Activity className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-sm font-medium text-gray-900">No activities found</h3>
              <p className="mt-2 text-sm text-gray-500">
                {filter === "all"
                  ? "No system activities to display."
                  : `No ${filter} activities found. Try a different filter.`}
              </p>
            </div>
          )}
        </div>

        {filteredActivities.length > 0 && (
          <div className="mt-4 pt-4 border-t text-center">
            <Button variant="outline" size="sm">
              View All Activities
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SystemActivityFeed
