import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Lock, Shield, X, CheckCircle } from "lucide-react"

interface SystemNotification {
  id: string
  type: "overdue_grading" | "locked_users" | "ai_flagged" | "system_error" | "maintenance" | "security_alert"
  title: string
  message: string
  severity: "critical" | "warning" | "info"
  count?: number
  timestamp: Date
  isRead: boolean
  actionRequired: boolean
}

interface SystemNotificationsProps {
  notifications: SystemNotification[]
}

const SystemNotifications = ({ notifications }: SystemNotificationsProps) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "overdue_grading":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "locked_users":
        return <Lock className="h-5 w-5 text-red-600" />
      case "ai_flagged":
        return <Shield className="h-5 w-5 text-orange-600" />
      case "system_error":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "security_alert":
        return <Shield className="h-5 w-5 text-red-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
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

  const criticalNotifications = notifications.filter((n) => n.severity === "critical")
  const warningNotifications = notifications.filter((n) => n.severity === "warning")
  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            System Notifications & Flags
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Critical Alerts */}
          {criticalNotifications.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Critical Alerts ({criticalNotifications.length})
              </h3>
              <div className="space-y-2">
                {criticalNotifications.map((notification) => (
                  <div key={notification.id} className="bg-white rounded p-3 border border-red-200">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div>
                          <h4 className="font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <span className="text-xs text-gray-500">{formatTimeAgo(notification.timestamp)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {notification.actionRequired && (
                          <Button size="sm" variant="destructive">
                            Take Action
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Notifications */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg ${
                  !notification.isRead ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{notification.title}</h4>
                        <Badge variant="outline" className={`text-xs ${getSeverityColor(notification.severity)}`}>
                          {notification.severity}
                        </Badge>
                        {notification.count && (
                          <Badge variant="outline" className="text-xs">
                            {notification.count}
                          </Badge>
                        )}
                        {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <span className="text-xs text-gray-500">{formatTimeAgo(notification.timestamp)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {notification.actionRequired && (
                      <Button size="sm" variant="outline">
                        Resolve
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SystemNotifications
