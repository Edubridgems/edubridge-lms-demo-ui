import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  User,
  Calendar,
  MapPin,
  Clock,
  GraduationCap,
  FileText,
  AlertCircle,
  CheckCircle,
  Mail,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import type { Unit, UnitProgress } from "@/types/units"

interface StudentUnitCardProps {
  unit: Unit
  progress?: UnitProgress
}

const StudentUnitCard = ({ unit, progress }: StudentUnitCardProps) => {
  const getGradeColor = (grade?: string) => {
    if (!grade) return "text-gray-500"

    switch (grade.charAt(0).toUpperCase()) {
      case "A":
        return "text-green-600"
      case "B":
        return "text-blue-600"
      case "C":
        return "text-yellow-600"
      case "D":
        return "text-orange-600"
      case "F":
        return "text-red-600"
      default:
        return "text-gray-500"
    }
  }

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = () => {
    switch (unit.enrollmentStatus) {
      case "enrolled":
        return <Badge className="bg-green-100 text-green-800">Enrolled</Badge>
      case "dropped":
        return <Badge variant="destructive">Dropped</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return null
    }
  }

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getNextClass = () => {
    const today = new Date().getDay()
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const nextClass = unit.schedule.find((schedule) => {
      const scheduleDay = dayNames.indexOf(schedule.day)
      return scheduleDay >= today
    })

    return nextClass || unit.schedule[0]
  }

  const nextClass = getNextClass()

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg font-bold text-gray-900">{unit.code}</CardTitle>
              {getStatusBadge()}
            </div>
            <h3 className="text-sm font-medium text-gray-700 line-clamp-2 mb-2">{unit.name}</h3>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <GraduationCap className="h-3 w-3" />
                <span>{unit.creditHours} Credits</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>
                  {unit.semester} {unit.academicYear}
                </span>
              </div>
            </div>
          </div>

          {unit.currentGrade && (
            <div className="text-right">
              <div className={`text-2xl font-bold ${getGradeColor(unit.currentGrade)}`}>{unit.currentGrade}</div>
              {unit.gradePoints && <div className="text-xs text-gray-500">{unit.gradePoints.toFixed(1)} GP</div>}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Lecturer Information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">{unit.lecturer.name}</p>
              <p className="text-xs text-gray-600">{unit.lecturer.email}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`mailto:${unit.lecturer.email}`}>
              <Mail className="h-3 w-3" />
            </Link>
          </Button>
        </div>

        {/* Next Class */}
        {nextClass && unit.isActive && (
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Next Class</span>
            </div>
            <div className="text-xs text-blue-800">
              <p>
                {nextClass.day} • {formatTime(nextClass.startTime)} - {formatTime(nextClass.endTime)}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                <span>
                  {nextClass.venue} • {nextClass.type}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Progress Section */}
        {progress && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm text-gray-600">{progress.overallProgress}%</span>
            </div>
            <Progress value={progress.overallProgress} className="h-2" />

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="text-center">
                <div className="font-medium text-gray-900">
                  {progress.assignments.completed}/{progress.assignments.total}
                </div>
                <div className="text-gray-600">Assignments</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">
                  {progress.exams.completed}/{progress.exams.total}
                </div>
                <div className="text-gray-600">Exams</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">
                  {progress.cats.completed}/{progress.cats.total}
                </div>
                <div className="text-gray-600">CATs</div>
              </div>
            </div>
          </div>
        )}

        {/* Attendance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">Attendance</span>
          </div>
          <div className="text-right">
            <div className={`text-sm font-medium ${getAttendanceColor(unit.attendance.percentage)}`}>
              {unit.attendance.percentage}%
            </div>
            <div className="text-xs text-gray-600">
              {unit.attendance.attended}/{unit.attendance.total} classes
            </div>
          </div>
        </div>

        {/* Upcoming Assessments Alert */}
        {unit.upcomingAssessments > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium text-amber-900">
                {unit.upcomingAssessments} upcoming assessment{unit.upcomingAssessments > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
            <Link href={`/units/${unit.id}/materials`}>
              <FileText className="h-3 w-3 mr-1" />
              Materials
            </Link>
          </Button>

          <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
            <Link href={`/units/${unit.id}/assessments`}>
              <BookOpen className="h-3 w-3 mr-1" />
              Assessments
            </Link>
          </Button>

          <Button asChild size="sm" className="flex-1">
            <Link href={`/units/${unit.id}`}>
              <ExternalLink className="h-3 w-3 mr-1" />
              View Unit
            </Link>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{unit.completedAssessments}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{unit.totalAssessments - unit.completedAssessments}</div>
            <div className="text-xs text-gray-600">Remaining</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StudentUnitCard
