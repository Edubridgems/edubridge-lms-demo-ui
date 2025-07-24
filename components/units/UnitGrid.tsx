import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, GraduationCap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Unit, UnitProgress } from "@/types/units"
import SectionHeader from "../shared/SectionHeader"
import StudentUnitCard from "./UnitCard"

// Sample data - replace with actual data from your API
const sampleUnits: Unit[] = [
  // {
  //   id: "1",
  //   code: "CS301",
  //   name: "Data Structures and Algorithms",
  //   description: "Advanced data structures and algorithmic problem solving",
  //   creditHours: 3,
  //   semester: "Fall",
  //   academicYear: "2024",
  //   lecturer: {
  //     id: "lec1",
  //     name: "Dr. Sarah Johnson",
  //     email: "s.johnson@university.edu",
  //     office: "CS Building Room 301",
  //     consultationHours: "Mon-Wed 2-4 PM",
  //   },
  //   schedule: [
  //     {
  //       day: "Monday",
  //       startTime: "09:00",
  //       endTime: "10:30",
  //       venue: "LH-101",
  //       type: "lecture",
  //     },
  //     {
  //       day: "Wednesday",
  //       startTime: "14:00",
  //       endTime: "16:00",
  //       venue: "Lab-A",
  //       type: "lab",
  //     },
  //   ],
  //   currentGrade: "A-",
  //   gradePoints: 3.7,
  //   attendance: {
  //     attended: 28,
  //     total: 32,
  //     percentage: 87.5,
  //   },
  //   enrollmentStatus: "enrolled",
  //   isActive: true,
  //   upcomingAssessments: 2,
  //   totalAssessments: 6,
  //   completedAssessments: 4,
  //   hasOnlineMaterials: true,
  //   lastMaterialUpdate: new Date("2024-01-15"),
  //   startDate: new Date("2024-01-08"),
  //   endDate: new Date("2024-05-15"),
  //   enrolledDate: new Date("2023-12-01"),
  // },
  // {
  //   id: "2",
  //   code: "MATH201",
  //   name: "Calculus II",
  //   description: "Integration techniques and applications",
  //   creditHours: 4,
  //   semester: "Fall",
  //   academicYear: "2024",
  //   lecturer: {
  //     id: "lec2",
  //     name: "Prof. Michael Chen",
  //     email: "m.chen@university.edu",
  //     office: "Math Building Room 205",
  //   },
  //   schedule: [
  //     {
  //       day: "Tuesday",
  //       startTime: "10:00",
  //       endTime: "11:30",
  //       venue: "LH-203",
  //       type: "lecture",
  //     },
  //     {
  //       day: "Thursday",
  //       startTime: "10:00",
  //       endTime: "11:30",
  //       venue: "LH-203",
  //       type: "lecture",
  //     },
  //   ],
  //   currentGrade: "B+",
  //   gradePoints: 3.3,
  //   attendance: {
  //     attended: 25,
  //     total: 30,
  //     percentage: 83.3,
  //   },
  //   enrollmentStatus: "enrolled",
  //   isActive: true,
  //   upcomingAssessments: 1,
  //   totalAssessments: 4,
  //   completedAssessments: 2,
  //   hasOnlineMaterials: true,
  //   startDate: new Date("2024-01-08"),
  //   endDate: new Date("2024-05-15"),
  //   enrolledDate: new Date("2023-12-01"),
  // },
  // {
  //   id: "3",
  //   code: "PHYS101",
  //   name: "General Physics I",
  //   description: "Mechanics, waves, and thermodynamics",
  //   creditHours: 3,
  //   semester: "Fall",
  //   academicYear: "2024",
  //   lecturer: {
  //     id: "lec3",
  //     name: "Dr. Emily Rodriguez",
  //     email: "e.rodriguez@university.edu",
  //     office: "Physics Building Room 102",
  //   },
  //   schedule: [
  //     {
  //       day: "Monday",
  //       startTime: "14:00",
  //       endTime: "15:30",
  //       venue: "LH-105",
  //       type: "lecture",
  //     },
  //     {
  //       day: "Friday",
  //       startTime: "09:00",
  //       endTime: "12:00",
  //       venue: "Physics Lab",
  //       type: "lab",
  //     },
  //   ],
  //   currentGrade: "A",
  //   gradePoints: 4.0,
  //   attendance: {
  //     attended: 30,
  //     total: 32,
  //     percentage: 93.8,
  //   },
  //   enrollmentStatus: "enrolled",
  //   isActive: true,
  //   upcomingAssessments: 0,
  //   totalAssessments: 5,
  //   completedAssessments: 5,
  //   hasOnlineMaterials: true,
  //   startDate: new Date("2024-01-08"),
  //   endDate: new Date("2024-05-15"),
  //   enrolledDate: new Date("2023-12-01"),
  // },
]

const sampleProgress: Record<string, UnitProgress> = {
  "1": {
    assignments: { completed: 3, total: 4, averageScore: 85 },
    exams: { completed: 1, total: 1, averageScore: 88 },
    cats: { completed: 0, total: 1 },
    overallProgress: 75,
  },
  "2": {
    assignments: { completed: 2, total: 3, averageScore: 78 },
    exams: { completed: 0, total: 1 },
    cats: { completed: 0, total: 0 },
    overallProgress: 60,
  },
  "3": {
    assignments: { completed: 4, total: 4, averageScore: 92 },
    exams: { completed: 1, total: 1, averageScore: 95 },
    cats: { completed: 0, total: 0 },
    overallProgress: 100,
  },
}

const StudentUnitsGrid = () => {
  const activeUnits = sampleUnits.filter((unit) => unit.isActive && unit.enrollmentStatus === "enrolled")
  const completedUnits = sampleUnits.filter((unit) => unit.enrollmentStatus === "completed")

  // Calculate semester stats
  const totalCredits = activeUnits.reduce((sum, unit) => sum + unit.creditHours, 0)
  const averageGPA = activeUnits.reduce((sum, unit) => sum + (unit.gradePoints || 0), 0) / activeUnits.length
  const totalUpcomingAssessments = activeUnits.reduce((sum, unit) => sum + unit.upcomingAssessments, 0)
  const averageAttendance = activeUnits.reduce((sum, unit) => sum + unit.attendance.percentage, 0) / activeUnits.length

  const EmptyState = ({ type }: { type: string }) => (
    <Card className="border-dashed border-2 border-gray-200">
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="rounded-full bg-gray-100 p-3 mb-4">
          <BookOpen className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No {type === "active" ? "Active" : "Completed"} Units
        </h3>
        <p className="text-gray-600 max-w-sm">
          {type === "active"
            ? "You don't have any active units this semester."
            : "You haven't completed any units yet."}
        </p>
      </CardContent>
    </Card>
  )

  return (
    <section className="space-y-6">
      <SectionHeader
        name="My Units"
        description="Track your enrolled courses, grades, and academic progress"
        hasShowMore={false}
      />

      {/* Semester Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{activeUnits.length}</div>
            <div className="text-sm text-blue-600">Active Units</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{totalCredits}</div>
            <div className="text-sm text-green-600">Credit Hours</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">{averageGPA.toFixed(1)}</div>
            <div className="text-sm text-purple-600">Current GPA</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-amber-700">{averageAttendance.toFixed(0)}%</div>
            <div className="text-sm text-amber-600">Attendance</div>
          </CardContent>
        </Card>
      </div>

      {/* Units Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Current Units ({activeUnits.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Completed ({completedUnits.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          {totalUpcomingAssessments > 0 && (
            <Card className="border-amber-200 bg-amber-50 mb-6">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-amber-600" />
                  <div>
                    <h3 className="font-semibold text-amber-900">Upcoming Assessments</h3>
                    <p className="text-sm text-amber-800">
                      You have {totalUpcomingAssessments} assessment{totalUpcomingAssessments > 1 ? "s" : ""} coming up
                      across your units.
                    </p>
                  </div>
                  <Button asChild size="sm" className="ml-auto bg-amber-600 hover:bg-amber-700">
                    <a href="/assessments">View All</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {activeUnits.length > 0 ? (
              activeUnits.map((unit) => (
                <StudentUnitCard key={unit.id} unit={unit} progress={sampleProgress[unit.id]} />
              ))
            ) : (
              <div className="col-span-full">
                <EmptyState type="active" />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {completedUnits.length > 0 ? (
              completedUnits.map((unit) => (
                <StudentUnitCard key={unit.id} unit={unit} progress={sampleProgress[unit.id]} />
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

export default StudentUnitsGrid
