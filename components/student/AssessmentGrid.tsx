import { Assessment, assessments } from "@/constants/constants"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, BookOpen, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentAssessmentCard from "./AssessmentCard"
import SectionHeader from "../shared/SectionHeader"

const AssessmentGrid = () => {
  const now = new Date()

  // Filter assessments by status
  const getAssessmentsByStatus = (status: string) => {
    return assessments.filter((assessment) => {
      const startTime = new Date(assessment.startTime)
      const endTime = new Date(assessment.endTime)

      switch (status) {
        case "active":
          return now >= startTime && now <= endTime && assessment.isPublished
        case "upcoming":
          return now < startTime && assessment.isPublished
        case "completed":
          return assessment.attemptsUsed === assessment.maxAttempts
        case "expired":
          return now > endTime
        default:
          return false
      }
    })
  }

  const activeAssessments = getAssessmentsByStatus("active")
  const upcomingAssessments = getAssessmentsByStatus("upcoming")
  const completedAssessments = getAssessmentsByStatus("completed")
  const expiredAssessments = getAssessmentsByStatus("expired")

  // Get urgent assessments (due within 24 hours)
  const urgentAssessments = activeAssessments.filter((assessment) => {
    const diff = new Date(assessment.endTime).getTime() - now.getTime()
    const hoursLeft = diff / (1000 * 60 * 60)
    return hoursLeft <= 24
  })

  const EmptyState = ({ type }: { type: string }) => {
    const getEmptyStateContent = () => {
      switch (type) {
        case "active":
          return {
            icon: <BookOpen className="h-8 w-8 text-gray-400" />,
            title: "No Active Assessments",
            description: "You don't have any assessments available to take right now.",
          }
        case "upcoming":
          return {
            icon: <Calendar className="h-8 w-8 text-gray-400" />,
            title: "No Upcoming Assessments",
            description: "No assessments are scheduled to open soon.",
          }
        case "completed":
          return {
            icon: <CheckCircle className="h-8 w-8 text-gray-400" />,
            title: "No Completed Assessments",
            description: "You haven't completed any assessments yet.",
          }
        default:
          return {
            icon: <BookOpen className="h-8 w-8 text-gray-400" />,
            title: "No Assessments",
            description: "No assessments found.",
          }
      }
    }

    const content = getEmptyStateContent()

    return (
      <Card className="border-dashed border-2 border-gray-200">
        <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="rounded-full bg-gray-100 p-3 mb-4">{content.icon}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
          <p className="text-gray-600 max-w-sm">{content.description}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="space-y-6">
      <SectionHeader
        name="My Assessments"
        description="Manage your active assessments and track your academic progress"
        hasShowMore={false}
      />

      {/* Urgent Assessments Alert */}
      {urgentAssessments.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-1">Urgent Assessments</h3>
                <p className="text-sm text-red-800 mb-3">
                  You have {urgentAssessments.length} assessment{urgentAssessments.length > 1 ? "s" : ""} due within 24
                  hours!
                </p>
                <div className="flex flex-wrap gap-2">
                  {urgentAssessments.map((assessment) => (
                    <Button key={assessment.id} asChild size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
                      <a href={`/assessments/${assessment.id}/attempt`}>Start {assessment.name}</a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{activeAssessments.length}</div>
            <div className="text-sm text-green-600">Available</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{upcomingAssessments.length}</div>
            <div className="text-sm text-blue-600">Upcoming</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">{completedAssessments.length}</div>
            <div className="text-sm text-purple-600">Completed</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-700">{urgentAssessments.length}</div>
            <div className="text-sm text-red-600">Urgent</div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Available ({activeAssessments.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming ({upcomingAssessments.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Completed ({completedAssessments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-4">
            {activeAssessments.length > 0 ? (
              activeAssessments.map((assessment, index) => (
                <StudentAssessmentCard key={index} assessment={assessment as Assessment } />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState type="active" />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-4">
            {upcomingAssessments.length > 0 ? (
              upcomingAssessments.map((assessment) => (
                <StudentAssessmentCard key={assessment.id} assessment={assessment as Assessment} />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState type="upcoming" />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-4">
            {completedAssessments.length > 0 ? (
              completedAssessments.map((assessment) => (
                <StudentAssessmentCard key={assessment.id} assessment={assessment as Assessment} />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState type="completed" />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default AssessmentGrid
