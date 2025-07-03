import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Eye, MessageSquare, Clock, AlertTriangle, CheckCircle } from "lucide-react"

interface Submission {
  id: string
  studentName: string
  studentAvatar?: string
  assessmentTitle: string
  unitCode: string
  submittedAt: Date
  status: "needs_grading" | "flagged" | "late" | "graded"
  aiFlag?: boolean
  grade?: number
}

interface RecentSubmissionsProps {
  submissions: Submission[]
}

const RecentSubmissions = ({ submissions }: RecentSubmissionsProps) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "Just now"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "needs_grading":
        return "bg-yellow-100 text-yellow-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      case "late":
        return "bg-orange-100 text-orange-800"
      case "graded":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "needs_grading":
        return <Clock className="h-4 w-4" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4" />
      case "late":
        return <Clock className="h-4 w-4" />
      case "graded":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const filterSubmissions = (filter: string) => {
    switch (filter) {
      case "needs_grading":
        return submissions.filter((s) => s.status === "needs_grading")
      case "flagged":
        return submissions.filter((s) => s.status === "flagged" || s.aiFlag)
      case "late":
        return submissions.filter((s) => s.status === "late")
      default:
        return submissions
    }
  }

  const SubmissionList = ({ submissions }: { submissions: Submission[] }) => (
    <div className="space-y-3">
      {submissions.map((submission) => (
        <Card key={submission.id} className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={submission.studentAvatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {submission.studentName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{submission.studentName}</h4>
                    <Badge variant="outline" className={getStatusColor(submission.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(submission.status)}
                        <span className="capitalize">{submission.status.replace("_", " ")}</span>
                      </div>
                    </Badge>
                    {submission.aiFlag && (
                      <Badge variant="destructive" className="text-xs">
                        AI Flagged
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{submission.assessmentTitle}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{submission.unitCode}</span>
                    <span>Submitted {formatTimeAgo(submission.submittedAt)}</span>
                    {submission.grade && <span>Grade: {submission.grade}%</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                {submission.status === "needs_grading" && <Button size="sm">Grade</Button>}
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Recent Submissions & Grading Queue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({submissions.length})</TabsTrigger>
            <TabsTrigger value="needs_grading">Needs Grading ({filterSubmissions("needs_grading").length})</TabsTrigger>
            <TabsTrigger value="flagged">Flagged ({filterSubmissions("flagged").length})</TabsTrigger>
            <TabsTrigger value="late">Late ({filterSubmissions("late").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <SubmissionList submissions={submissions} />
          </TabsContent>

          <TabsContent value="needs_grading" className="mt-4">
            <SubmissionList submissions={filterSubmissions("needs_grading")} />
          </TabsContent>

          <TabsContent value="flagged" className="mt-4">
            <SubmissionList submissions={filterSubmissions("flagged")} />
          </TabsContent>

          <TabsContent value="late" className="mt-4">
            <SubmissionList submissions={filterSubmissions("late")} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default RecentSubmissions
