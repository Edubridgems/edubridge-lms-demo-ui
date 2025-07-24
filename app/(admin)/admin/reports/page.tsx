"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Users, BookOpen, Download, Award, AlertTriangle, BarChart3, ClipboardList } from "lucide-react"
import { dummyUsers, dummyCourses, dummyExamResults, dummyAssessments } from "@/lib/dummy-data"
import { Role } from "@/types"

export default function PerformanceReports() {
  const totalStudents = dummyUsers.filter((user) => user.role === Role.STUDENT).length
  const totalCourses = dummyCourses.length
  const totalAssessments = dummyAssessments.length
  const averageScore =
    dummyExamResults.reduce((acc, result) => acc + (result.score / result.maxScore) * 100, 0) / dummyExamResults.length

  const performanceStats = [
    {
      title: "Total Students",
      value: totalStudents,
      description: "Active students",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Courses",
      value: totalCourses,
      description: "Running courses",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Assessments",
      value: totalAssessments,
      description: "Total assessments",
      icon: Award,
      color: "text-purple-600",
    },
    {
      title: "Average Score",
      value: `${averageScore.toFixed(1)}%`,
      description: "Overall performance",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  const coursePerformance = dummyCourses.map((course) => ({
    course: course.name,
    code: course.code,
    enrolled: course.enrolledStudents,
    completion: Math.floor(Math.random() * 30) + 70, // Mock completion rate
    averageGrade: (Math.random() * 20 + 70).toFixed(1), // Mock average grade
  }))

  const recentResults = dummyExamResults.slice(0, 5)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Reports</h1>
          <p className="text-muted-foreground">Analytics and performance insights</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="current-semester">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current-semester">Current Semester</SelectItem>
              <SelectItem value="last-semester">Last Semester</SelectItem>
              <SelectItem value="academic-year">Academic Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Course Performance</TabsTrigger>
          <TabsTrigger value="students">Student Analytics</TabsTrigger>
          <TabsTrigger value="assessments">Assessment Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Assessment Results</CardTitle>
                <CardDescription>Latest student performance</CardDescription>
              </CardHeader>
              <CardContent>
                {recentResults.length > 0 ? (
                  <div className="space-y-4">
                    {recentResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{result.student.name}</div>
                          <div className="text-sm text-muted-foreground">{result.assessment.title}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {result.score}/{result.maxScore}
                          </div>
                          <Badge variant={result.score >= result.assessment.passingMarks ? "default" : "destructive"}>
                            {((result.score / result.maxScore) * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-sm font-medium text-gray-900">No assessment results yet</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Results will appear here once students start submitting assessments.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Monthly performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">January 2024</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+5.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">February 2024</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">+3.1%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">March 2024</span>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm text-yellow-600">-1.5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance Summary</CardTitle>
              <CardDescription>Performance metrics by course</CardDescription>
            </CardHeader>
            <CardContent>
              {coursePerformance.length > 0 ? (
                <div className="space-y-4">
                  {coursePerformance.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{course.course}</div>
                        <div className="text-sm text-muted-foreground">{course.code}</div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm font-medium">{course.enrolled}</div>
                          <div className="text-xs text-muted-foreground">Enrolled</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{course.completion}%</div>
                          <div className="text-xs text-muted-foreground">Completion</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{course.averageGrade}%</div>
                          <div className="text-xs text-muted-foreground">Avg Grade</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-gray-900">No course data available</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Course performance metrics will appear here once courses are created and students are enrolled.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Analytics</CardTitle>
              <CardDescription>Student performance and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-muted-foreground">Pass Rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">92%</div>
                  <div className="text-sm text-muted-foreground">Attendance Rate</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">78%</div>
                  <div className="text-sm text-muted-foreground">Engagement Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Analytics</CardTitle>
              <CardDescription>Assessment performance and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              {dummyAssessments.length > 0 ? (
                <div className="space-y-4">
                  {dummyAssessments.map((assessment) => (
                    <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{assessment.title}</div>
                        <div className="text-sm text-muted-foreground">{assessment.type}</div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-sm font-medium">{assessment.submissions}</div>
                          <div className="text-xs text-muted-foreground">Submissions</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{assessment.averageScore?.toFixed(1) || "N/A"}</div>
                          <div className="text-xs text-muted-foreground">Avg Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{assessment.totalMarks}</div>
                          <div className="text-xs text-muted-foreground">Max Score</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <ClipboardList className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-sm font-medium text-gray-900">No assessments available</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Assessment analytics will appear here once assessments are created.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
