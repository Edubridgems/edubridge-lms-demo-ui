import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Plus, UserPlus, AlertTriangle, UserCheck, BookOpen, Clock } from "lucide-react"

interface ActivityItem {
  id: string
  type:
    | "assessment_created"
    | "user_registered"
    | "ai_flagged"
    | "lecturer_assigned"
    | "course_updated"
    | "system_alert"
  title: string
  description: string
  timestamp: Date
  severity: "info" | "warning" | "success" | "error"
  unitCode?: string
  userName?: string
}

interface SystemActivityFeedProps {
  activities: ActivityItem[]
}

const SystemActivityFeed = ({ activities }: SystemActivityFeedProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "assessment_created":
        return <Plus className="h-4 w-4 text-blue-600" />
      case "user_registered":
        return <UserPlus className="h-4 w-4 text-green-600" />
      case "ai_flagged":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "lecturer_assigned":
        return <UserCheck className="h-4 w-4 text-purple-600" />
      case "course_updated":
        return <BookOpen className="h-4 w-4 text-indigo-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
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
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          System Activity Feed
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                  <Badge variant="outline" className={`text-xs ${getSeverityColor(activity.severity)}`}>
                    {activity.severity}
                  </Badge>
                  {activity.unitCode && (
                    <Badge variant="outline" className="text-xs">
                      {activity.unitCode}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimeAgo(activity.timestamp)}</span>
                  {activity.userName && <span>• by {activity.userName}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SystemActivityFeed
