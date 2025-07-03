import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Plus, Edit, UserCheck, BookOpen, Eye } from "lucide-react"

interface Change {
  id: string
  type: "course_created" | "unit_created" | "curriculum_updated" | "lecturer_assigned" | "course_updated"
  title: string
  description: string
  changedBy: string
  timestamp: Date
  entityName: string
  entityCode?: string
  status: "completed" | "pending" | "in_progress"
}

interface RecentChangesProps {
  changes: Change[]
}

const RecentChanges = ({ changes }: RecentChangesProps) => {
  const getChangeIcon = (type: string) => {
    switch (type) {
      case "course_created":
      case "unit_created":
        return <Plus className="h-4 w-4 text-green-600" />
      case "curriculum_updated":
      case "course_updated":
        return <Edit className="h-4 w-4 text-blue-600" />
      case "lecturer_assigned":
        return <UserCheck className="h-4 w-4 text-purple-600" />
      default:
        return <BookOpen className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Recent Course and Unit Changes
          </div>
          <Button variant="outline" size="sm">
            <Eye className="h-3 w-3 mr-1" />
            View All Changes
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Change</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Entity</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Changed By</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {changes.map((change) => (
                  <tr key={change.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        {getChangeIcon(change.type)}
                        <div>
                          <div className="font-medium text-sm text-gray-900">{change.title}</div>
                          <div className="text-xs text-gray-600">{change.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div>
                        <div className="font-medium text-sm text-gray-900">{change.entityName}</div>
                        {change.entityCode && <div className="text-xs text-gray-600">{change.entityCode}</div>}
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-700">{change.changedBy}</td>
                    <td className="py-3 text-sm text-gray-600">{formatDate(change.timestamp)}</td>
                    <td className="py-3">
                      <Badge variant="outline" className={getStatusColor(change.status)}>
                        {change.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentChanges
