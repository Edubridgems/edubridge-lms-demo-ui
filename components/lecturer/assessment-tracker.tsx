import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ClipboardList, CheckCircle, AlertTriangle, Clock, Eye } from "lucide-react"
import Link from "next/link"

interface Assessment {
  id: string
  title: string
  unitCode: string
  dueDate: Date
  totalStudents: number
  submittedCount: number
  aiCheckStatus: "clean" | "flagged" | "pending"
  status: "upcoming" | "active" | "closed"
  type: "exam" | "assignment" | "cat"
}

interface AssessmentTrackerProps {
  assessments: Assessment[]
}

const AssessmentTracker = ({ assessments }: AssessmentTrackerProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAIStatusIcon = (status: string) => {
    switch (status) {
      case "clean":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800"
      case "assignment":
        return "bg-blue-100 text-blue-800"
      case "cat":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5" />
          Assessment Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments.map((assessment) => {
            const submissionProgress = (assessment.submittedCount / assessment.totalStudents) * 100
            return (
              <Card key={assessment.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{assessment.title}</h3>
                        <Badge variant="outline" className={getTypeColor(assessment.type)}>
                          {assessment.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {assessment.unitCode}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Due: {formatDate(assessment.dueDate)}</span>
                        <Badge variant="outline" className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                      </div>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/lecturer/assessments/${assessment.id}`}>
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Submission Progress</span>
                        <span className="font-medium">
                          {assessment.submittedCount}/{assessment.totalStudents} submitted
                        </span>
                      </div>
                      <Progress value={submissionProgress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getAIStatusIcon(assessment.aiCheckStatus)}
                        <span className="text-sm text-gray-600">
                          AI Check: <span className="font-medium capitalize">{assessment.aiCheckStatus}</span>
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Grade
                        </Button>
                        <Button variant="outline" size="sm">
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default AssessmentTracker
