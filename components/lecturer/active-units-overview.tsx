import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Calendar, ExternalLink, Clock } from 'lucide-react'
import Link from "next/link"

interface Unit {
  id: string
  code: string
  name: string
  enrolledStudents: number
  nextSession?: {
    type: string
    date: Date
    venue: string
  }
  upcomingAssessment?: {
    title: string
    dueDate: Date
    type: string
  }
  status: "active" | "completed" | "upcoming"
}

interface ActiveUnitsOverviewProps {
  units: Unit[]
}

const ActiveUnitsOverview = ({ units }: ActiveUnitsOverviewProps) => {
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
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Active Units Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {units.map((unit) => (
            <Card key={unit.id} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{unit.code}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{unit.name}</p>
                  </div>
                  <Badge variant="outline" className={getStatusColor(unit.status)}>
                    {unit.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{unit.enrolledStudents} students enrolled</span>
                  </div>

                  {unit.nextSession && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-900 mb-1">
                        <Calendar className="h-4 w-4" />
                        Next {unit.nextSession.type}
                      </div>
                      <div className="text-xs text-blue-800">
                        {formatDate(unit.nextSession.date)} • {unit.nextSession.venue}
                      </div>
                    </div>
                  )}

                  {unit.upcomingAssessment && (
                    <div className="bg-amber-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-amber-900 mb-1">
                        <Clock className="h-4 w-4" />
                        Upcoming {unit.upcomingAssessment.type}
                      </div>
                      <div className="text-xs text-amber-800">
                        {unit.upcomingAssessment.title} • Due {formatDate(unit.upcomingAssessment.dueDate)}
                      </div>
                    </div>
                  )}

                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/lecturer/units/${unit.id}`} className="flex items-center gap-2">
                      <ExternalLink className="h-3 w-3" />
                      Open Unit Workspace
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default ActiveUnitsOverview
