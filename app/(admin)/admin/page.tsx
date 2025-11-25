'use client'
import PlatformOverviewStats from "@/components/admin/platform-overview-stats"
import SystemActivityFeed from "@/components/admin/system-activity-feed"
import UserRoleBreakdown from "@/components/admin/user-role-breakdown"
import AssessmentAISummary from "@/components/admin/assessment-ai-summary"
import RecentChanges from "@/components/admin/recent-changes"
import SystemNotifications from "@/components/admin/system-notifications"

const AdminDashboard = () => {
  // Sample data - replace with actual API data
  const platformStats = {
    totalUsers: 1423,
    totalCourses: 28,
    assessmentsThisWeek: 67,
    loginsToday: 342,
    flaggedExams: 8,
    systemLoad: 67,
    activeUsers: 89,
    serverUptime: 99.8,
  }

  const systemActivities = [
    // {
    //   id: "1",
    //   type: "assessment_created" as const,
    //   title: "New Assessment Created",
    //   description: "Midterm Exam for Data Structures course",
    //   timestamp: new Date(Date.now() - 15 * 60 * 1000),
    //   severity: "info" as const,
    //   unitCode: "CS301",
    //   userName: "Dr. Sarah Johnson",
    // },
    // {
    //   id: "2",
    //   type: "user_registered" as const,
    //   title: "New User Registration",
    //   description: "Student Alice Johnson registered",
    //   timestamp: new Date(Date.now() - 30 * 60 * 1000),
    //   severity: "success" as const,
    //   userName: "Alice Johnson",
    // },
    // {
    //   id: "3",
    //   type: "ai_flagged" as const,
    //   title: "AI Flagged Submission",
    //   description: "Potential plagiarism detected in Software Engineering assignment",
    //   timestamp: new Date(Date.now() - 45 * 60 * 1000),
    //   severity: "warning" as const,
    //   unitCode: "CS401",
    // },
    // {
    //   id: "4",
    //   type: "lecturer_assigned" as const,
    //   title: "Lecturer Assignment",
    //   description: "Prof. Michael Chen assigned to Mathematics unit",
    //   timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    //   severity: "info" as const,
    //   unitCode: "MATH201",
    //   userName: "Admin",
    // },
  ]

  const roleDistribution = [
    { role: "Students", count: 1285, percentage: 90.3 },
    { role: "Lecturers", count: 125, percentage: 8.8 },
    { role: "Admins", count: 13, percentage: 0.9 },
  ]

  const activityData = [
    { day: "Mon", active: 245, inactive: 89 },
    { day: "Tue", active: 289, inactive: 67 },
    { day: "Wed", active: 312, inactive: 45 },
    { day: "Thu", active: 298, inactive: 78 },
    { day: "Fri", active: 267, inactive: 92 },
    { day: "Sat", active: 156, inactive: 134 },
    { day: "Sun", active: 123, inactive: 167 },
  ]

  const assessmentAIStats = {
    assessmentsRunning: 67,
    flaggedSubmissions: 23,
    aiReviewsCompleted: 89,
    totalSubmissions: 156,
    flaggedPercentage: 14.7,
    reviewProgress: 89,
  }

  const flaggedReports = [
    // {
    //   id: "1",
    //   assessmentTitle: "Software Engineering Project",
    //   unitCode: "CS401",
    //   flaggedCount: 8,
    //   severity: "high" as const,
    //   lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
    // },
    // {
    //   id: "2",
    //   assessmentTitle: "Data Structures Assignment",
    //   unitCode: "CS301",
    //   flaggedCount: 3,
    //   severity: "medium" as const,
    //   lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000),
    // },
  ]

  const recentChanges = [
    // {
    //   id: "1",
    //   type: "course_created" as const,
    //   title: "New Course Created",
    //   description: "Advanced Machine Learning course added",
    //   changedBy: "Dr. Emily Rodriguez",
    //   timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    //   entityName: "Advanced Machine Learning",
    //   entityCode: "CS601",
    //   status: "completed" as const,
    // },
    // {
    //   id: "2",
    //   type: "lecturer_assigned" as const,
    //   title: "Lecturer Assignment",
    //   description: "New lecturer assigned to unit",
    //   changedBy: "Admin",
    //   timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    //   entityName: "Calculus II",
    //   entityCode: "MATH201",
    //   status: "completed" as const,
    // },
    // {
    //   id: "3",
    //   type: "curriculum_updated" as const,
    //   title: "Curriculum Update",
    //   description: "Course syllabus updated",
    //   changedBy: "Prof. Michael Chen",
    //   timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    //   entityName: "Physics I",
    //   entityCode: "PHYS101",
    //   status: "pending" as const,
    // },
  ]

  const systemNotifications = [
    // {
    //   id: "1",
    //   type: "overdue_grading" as const,
    //   title: "Overdue Grading Alert",
    //   message: "3 assessments are overdue for grading and require immediate attention",
    //   severity: "warning" as const,
    //   count: 3,
    //   timestamp: new Date(Date.now() - 30 * 60 * 1000),
    //   isRead: false,
    //   actionRequired: true,
    // },
    // {
    //   id: "2",
    //   type: "locked_users" as const,
    //   title: "User Account Lockouts",
    //   message: "5 user accounts have been locked due to multiple failed login attempts",
    //   severity: "critical" as const,
    //   count: 5,
    //   timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    //   isRead: false,
    //   actionRequired: true,
    // },
    // {
    //   id: "3",
    //   type: "ai_flagged" as const,
    //   title: "AI Similarity Detection",
    //   message: "2 submissions flagged for exceeding similarity threshold in CS401",
    //   severity: "warning" as const,
    //   count: 2,
    //   timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    //   isRead: true,
    //   actionRequired: true,
    // },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard 🛠️</h1>
            <p className="text-indigo-100">Monitor platform health, manage users, and oversee system operations</p>
          </div>

          {/* Platform Overview Stats */}
          <PlatformOverviewStats stats={platformStats} />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1  gap-8">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-8">
              <SystemActivityFeed activities={systemActivities} />
              <UserRoleBreakdown
                roleDistribution={roleDistribution}
                activityData={activityData}
                totalUsers={platformStats.totalUsers}
              />
              <RecentChanges changes={recentChanges} />
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-8">
              <SystemNotifications notifications={systemNotifications} />
            </div>
          </div>

          {/* Assessment & AI Summary - Full Width */}
          <AssessmentAISummary stats={assessmentAIStats} flaggedReports={flaggedReports} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
