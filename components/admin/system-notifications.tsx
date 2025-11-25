"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Users,
  Shield,
  HardDrive,
  Settings,
  X,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { SystemNotification } from "@/types/dashboard"

interface SystemNotificationsProps {
  notifications: SystemNotification[]
}

const SystemNotifications = ({ notifications }: SystemNotificationsProps) => {
  const [dismissedNotifications, setDismissedNotifications] = useState<string[]>([])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "overdue_grading":
        return <Clock className="h-4 w-4" />
      case "locked_users":
        return <Users className="h-4 w-4" />
      case "ai_flagged":
        return <AlertTriangle className="h-4 w-4" />
      case "system_maintenance":
        return <Settings className="h-4 w-4" />
      case "storage_warning":
        return <HardDrive className="h-4 w-4" />
      case "security_alert":
        return <Shield className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
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
      case "info":
        return <Info className="h-3 w-3" />
      default:
        return <Bell className="h-3 w-3" />
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

  const handleDismiss = (notificationId: string) => {
    setDismissedNotifications((prev) => [...prev, notificationId])
  }

  const visibleNotifications = notifications.filter((notification) => !dismissedNotifications.includes(notification.id))

  const unreadCount = visibleNotifications.filter((n) => !n.isRead).length
  const criticalCount = visibleNotifications.filter((n) => n.severity === "critical").length
  const actionRequiredCount = visibleNotifications.filter((n) => n.actionRequired).length

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              System Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <CardDescription>Important system alerts and notifications</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 pt-2 text-sm">
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3 text-red-600" />
            <span className="text-red-600 font-medium">{criticalCount} Critical</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-orange-600" />
            <span className="text-orange-600 font-medium">{actionRequiredCount} Action Required</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {visibleNotifications.length > 0 ? (
            visibleNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border rounded-lg transition-colors ${
                  !notification.isRead ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${getSeverityColor(notification.severity)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm text-gray-900 truncate">{notification.title}</h4>
                        {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getSeverityColor(notification.severity)}>
                            {getSeverityIcon(notification.severity)}
                            <span className="ml-1 capitalize">{notification.severity}</span>
                          </Badge>

                          {notification.count && notification.count > 1 && (
                            <Badge variant="secondary" className="text-xs">
                              {notification.count} items
                            </Badge>
                          )}

                          {notification.actionRequired && (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              Action Required
                            </Badge>
                          )}
                        </div>

                        <span className="text-xs text-gray-500">{formatTimeAgo(notification.timestamp)}</span>
                      </div>

                      {/* Action Buttons */}
                      {notification.actionRequired && notification.actionUrl && (
                        <div className="mt-2 flex items-center gap-2">
                          <Link href={notification.actionUrl}>
                            <Button size="sm" variant="outline" className="text-xs bg-transparent">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Take Action
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismiss(notification.id)}
                    className="ml-2 h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto h-12 w-12 text-green-400" />
              <h3 className="mt-4 text-sm font-medium text-gray-900">All caught up!</h3>
              <p className="mt-2 text-sm text-gray-500">No new notifications at this time.</p>
            </div>
          )}
        </div>

        {visibleNotifications.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">Showing {visibleNotifications.length} notifications</div>
              <Link href="/admin/notifications">
                <Button variant="outline" size="sm">
                  View All Notifications
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SystemNotifications
