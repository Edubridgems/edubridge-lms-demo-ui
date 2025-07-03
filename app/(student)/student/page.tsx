import AssessmentGrid from "@/components/student/AssessmentGrid"
import StudentUnitsGrid from "@/components/units/UnitGrid"


const StudentDashboard = () => {
  // Sample data - replace with actual data from your API
  const quickStats = {
    currentGPA: 3.67,
    totalCredits: 18,
    upcomingDeadlines: 4,
    completedAssignments: 12,
    attendanceRate: 87,
    unreadNotifications: 3,
  }

  const todaysSchedule = [
    {
      id: "1",
      unitCode: "CS301",
      unitName: "Data Structures and Algorithms",
      type: "lecture" as const,
      startTime: "09:00",
      endTime: "10:30",
      venue: "LH-101",
      lecturer: "Dr. Sarah Johnson",
      status: "upcoming" as const,
    },
    {
      id: "2",
      unitCode: "MATH201",
      unitName: "Calculus II",
      type: "tutorial" as const,
      startTime: "14:00",
      endTime: "15:30",
      venue: "Tutorial Room 3",
      lecturer: "Prof. Michael Chen",
      status: "upcoming" as const,
    },
  ]

  const recentNotifications = [
    {
      id: "1",
      type: "grade" as const,
      title: "New Grade Posted",
      message: "Your grade for Assignment 3 has been posted",
      unitCode: "CS301",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      priority: "medium" as const,
    },
    {
      id: "2",
      type: "deadline" as const,
      title: "Assignment Due Soon",
      message: "Mathematics Assignment 4 is due in 2 days",
      unitCode: "MATH201",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: false,
      priority: "high" as const,
    },
    {
      id: "3",
      type: "announcement" as const,
      title: "Class Cancelled",
      message: "Tomorrow's Physics lecture has been cancelled",
      unitCode: "PHYS101",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      isRead: true,
      priority: "medium" as const,
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "Data Structures Exam",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      type: "exam" as const,
      unitCode: "CS301",
      isUrgent: true,
    },
    {
      id: "2",
      title: "Mathematics Assignment Due",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      type: "assignment" as const,
      unitCode: "MATH201",
      isUrgent: true,
    },
    {
      id: "3",
      title: "Spring Break",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      type: "holiday" as const,
    },
  ]

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-8">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Alaric! 👋</h1>
                <p className="text-blue-100 mb-1">Ready to tackle another productive day of learning?</p>
                <div className="flex items-center gap-4 text-sm text-blue-100">
                  <span>{currentDate}</span>
                  <span>•</span>
                  <span>{currentTime}</span>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="text-right">
                  <div className="text-3xl font-bold">{quickStats.currentGPA}</div>
                  <div className="text-sm text-blue-100">Current GPA</div>
                </div>
              </div>
            </div>
          </div>

          <AssessmentGrid />
          <StudentUnitsGrid />

        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
