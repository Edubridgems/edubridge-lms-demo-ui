'use client'
import TeachingSummaryPanel from "@/components/lecturer/teaching-summary"
import ActiveUnitsOverview from "@/components/lecturer/active-units-overview"
import AssessmentTracker from "@/components/lecturer/assessment-tracker"
import RecentSubmissions from "@/components/lecturer/recent-submissions"
import PerformanceInsights from "@/components/lecturer/performace-insights"
import AnnouncementsActivity from "@/components/lecturer/announcements-activity"

const LecturerDashboard = () => {
  // Sample data - replace with actual API data
  const teachingStats = {
    totalUnits: 3,
    totalStudents: 115,
    pendingSubmissions: 42,
    upcomingDeadlines: 5,
    averageGrade: 78,
    attendanceRate: 87,
  }

  const activeUnits = [
    {
      id: "1",
      code: "CS301",
      name: "Data Structures and Algorithms",
      enrolledStudents: 45,
      nextSession: {
        type: "Lecture",
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        venue: "LH-101",
      },
      upcomingAssessment: {
        title: "Midterm Exam",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        type: "Exam",
      },
      status: "active" as const,
    },
    {
      id: "2",
      code: "CS401",
      name: "Software Engineering",
      enrolledStudents: 38,
      nextSession: {
        type: "Lab",
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        venue: "Lab-A",
      },
      status: "active" as const,
    },
    {
      id: "3",
      code: "CS501",
      name: "Machine Learning",
      enrolledStudents: 32,
      upcomingAssessment: {
        title: "Project Submission",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        type: "Assignment",
      },
      status: "active" as const,
    },
  ]

  const assessments = [
    {
      id: "1",
      title: "Data Structures Midterm",
      unitCode: "CS301",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      totalStudents: 45,
      submittedCount: 32,
      aiCheckStatus: "clean" as const,
      status: "active" as const,
      type: "exam" as const,
    },
    {
      id: "2",
      title: "Software Engineering Project",
      unitCode: "CS401",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      totalStudents: 38,
      submittedCount: 15,
      aiCheckStatus: "flagged" as const,
      status: "active" as const,
      type: "assignment" as const,
    },
  ]

  const recentSubmissions = [
    {
      id: "1",
      studentName: "Alice Johnson",
      assessmentTitle: "Data Structures Assignment 3",
      unitCode: "CS301",
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: "needs_grading" as const,
      aiFlag: false,
    },
    {
      id: "2",
      studentName: "Bob Smith",
      assessmentTitle: "Software Engineering Project",
      unitCode: "CS401",
      submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      status: "flagged" as const,
      aiFlag: true,
    },
    {
      id: "3",
      studentName: "Carol Davis",
      assessmentTitle: "ML Assignment 2",
      unitCode: "CS501",
      submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      status: "late" as const,
      aiFlag: false,
    },
  ]

  const performanceData = {
    unitPerformance: [
      {
        unitCode: "CS301",
        unitName: "Data Structures and Algorithms",
        averageScore: 78,
        submissionRate: 89,
        attendanceRate: 92,
        trend: "up" as const,
      },
      {
        unitCode: "CS401",
        unitName: "Software Engineering",
        averageScore: 82,
        submissionRate: 76,
        attendanceRate: 85,
        trend: "stable" as const,
      },
      {
        unitCode: "CS501",
        unitName: "Machine Learning",
        averageScore: 75,
        submissionRate: 94,
        attendanceRate: 88,
        trend: "down" as const,
      },
    ],
    outliers: [
      {
        studentName: "John Doe",
        unitCode: "CS301",
        currentGrade: 35,
        attendanceRate: 45,
        risk: "high" as const,
      },
      {
        studentName: "Jane Smith",
        unitCode: "CS401",
        currentGrade: 58,
        attendanceRate: 70,
        risk: "medium" as const,
      },
    ],
    trendData: [
      { week: "Week 1", averageScore: 75, submissionRate: 85 },
      { week: "Week 2", averageScore: 78, submissionRate: 88 },
      { week: "Week 3", averageScore: 76, submissionRate: 82 },
      { week: "Week 4", averageScore: 80, submissionRate: 90 },
      { week: "Week 5", averageScore: 78, submissionRate: 87 },
    ],
  }

  const announcements = [
    {
      id: "1",
      title: "Midterm Exam Schedule Released",
      content: "The midterm examination schedule has been posted. Please check your individual timetables.",
      author: "Dr. Sarah Johnson",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPinned: true,
      unitCode: "CS301",
    },
    {
      id: "2",
      title: "Lab Session Moved",
      content: "Tomorrow's lab session has been moved from Lab-A to Lab-B due to maintenance.",
      author: "Dr. Sarah Johnson",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isPinned: false,
      unitCode: "CS401",
    },
  ]

  const studentQuestions = [
    {
      id: "1",
      studentName: "Alice Johnson",
      question: "Could you clarify the requirements for the final project submission?",
      unitCode: "CS301",
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      hasResponse: false,
      isUrgent: true,
    },
    {
      id: "2",
      studentName: "Bob Smith",
      question: "When will the grades for Assignment 2 be released?",
      unitCode: "CS401",
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      hasResponse: true,
      isUrgent: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Lecturer Dashboard 👨‍🏫</h1>
            <p className="text-blue-100">
              Manage your courses, track student progress, and streamline your teaching workflow
            </p>
          </div>

          {/* Teaching Summary */}
          <TeachingSummaryPanel stats={teachingStats} />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1  gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              <ActiveUnitsOverview units={activeUnits} />
              <AssessmentTracker assessments={assessments} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <RecentSubmissions submissions={recentSubmissions} />
              <AnnouncementsActivity announcements={announcements} studentQuestions={studentQuestions} />
            </div>
          </div>

          {/* Performance Insights - Full Width */}
          <PerformanceInsights data={performanceData} />
        </div>
      </div>
    </div>
  )
}

export default LecturerDashboard
