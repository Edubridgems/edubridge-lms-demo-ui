"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, FileCheck2, Users, TrendingUp, Clock, MoreHorizontal, Eye, Edit, MessageSquare } from "lucide-react"
import { dummyExamResults, dummyAssessments, dummyUnits } from "@/lib/dummy-data"
import type { ExamResult } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EmptyState } from "@/components/emptystate"

export default function ExamResultsAndMarking() {
  const lecturerId = "2" // Current lecturer ID
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL")
  const [selectedAssessment, setSelectedAssessment] = useState<string>("ALL")

  const lecturerUnits = dummyUnits.filter((unit) => unit.lecturerId === lecturerId)
  const lecturerAssessments = dummyAssessments.filter((assessment) =>
    lecturerUnits.some((unit) => unit.id === assessment.unitId),
  )
  const lecturerResults = dummyExamResults.filter((result) =>
    lecturerAssessments.some((assessment) => assessment.id === result.assessmentId),
  )

  const filteredResults = lecturerResults.filter((result) => {
    const matchesSearch = result.student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "ALL" || result.status === selectedStatus
    const matchesAssessment = selectedAssessment === "ALL" || result.assessmentId === selectedAssessment
    return matchesSearch && matchesStatus && matchesAssessment
  })

  const pendingResults = lecturerResults.filter((r) => r.status === "PENDING")
  const gradedResults = lecturerResults.filter((r) => r.status === "GRADED")
  const lateResults = lecturerResults.filter((r) => r.status === "LATE")
  const averageScore =
    lecturerResults.length > 0
      ? lecturerResults.reduce((acc, result) => acc + (result.score / result.maxScore) * 100, 0) /
        lecturerResults.length
      : 0

  const getStatusBadgeColor = (status: ExamResult["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "GRADED":
        return "bg-green-100 text-green-800"
      case "LATE":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-blue-600"
    if (percentage >= 40) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exam Results & Marking</h1>
          <p className="text-muted-foreground">Grade student submissions and manage results</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingResults.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graded</CardTitle>
            <FileCheck2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{gradedResults.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Submissions</CardTitle>
            <Users className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{lateResults.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {averageScore > 0 ? `${averageScore.toFixed(1)}%` : "N/A"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingResults.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({gradedResults.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Results ({filteredResults.length})</CardTitle>
              <CardDescription>All student submissions across your assessments</CardDescription>
            </CardHeader>
            <CardContent>
              {lecturerUnits.length === 0 ? (
                <EmptyState
                  icon={FileCheck2}
                  title="No units assigned"
                  description="You need to be assigned to units before you can view and grade student results."
                />
              ) : lecturerResults.length === 0 ? (
                <EmptyState
                  icon={FileCheck2}
                  title="No submissions yet"
                  description="Student submissions will appear here once they start submitting assessments for your units."
                />
              ) : (
                <>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Filter by assessment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">All Assessments</SelectItem>
                        {lecturerAssessments.map((assessment) => (
                          <SelectItem key={assessment.id} value={assessment.id}>
                            {assessment.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="GRADED">Graded</SelectItem>
                        <SelectItem value="LATE">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {filteredResults.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Student</TableHead>
                          <TableHead>Assessment</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Graded</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredResults.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={result.student.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {result.student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{result.student.name}</div>
                                <div className="text-sm text-muted-foreground">{result.student.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{result.assessment.title}</div>
                                <div className="text-sm text-muted-foreground">{result.assessment.type}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className={`font-bold ${getScoreColor(result.score, result.maxScore)}`}>
                                {result.score}/{result.maxScore}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {((result.score / result.maxScore) * 100).toFixed(1)}%
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">{new Date(result.submittedAt).toLocaleDateString()}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(result.submittedAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusBadgeColor(result.status)}>{result.status}</Badge>
                            </TableCell>
                            <TableCell>
                              {result.gradedAt ? (
                                <div className="text-sm">{new Date(result.gradedAt).toLocaleDateString()}</div>
                              ) : (
                                <span className="text-sm text-muted-foreground">Not graded</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Submission
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Grade/Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Add Feedback
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <EmptyState
                      icon={Search}
                      title="No results found"
                      description="Try adjusting your search terms or filters to find the results you're looking for."
                    />
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Grading ({pendingResults.length})</CardTitle>
              <CardDescription>Submissions waiting for your review and grading</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingResults.length > 0 ? (
                <div className="space-y-4">
                  {pendingResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={result.student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {result.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{result.student.name}</div>
                          <div className="text-sm text-muted-foreground">{result.assessment.title}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            Submitted: {new Date(result.submittedAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">Max Score: {result.maxScore} points</div>
                        </div>
                        <Button size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Grade Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Clock}
                  title="No pending submissions"
                  description="All submissions have been graded. New submissions will appear here when students submit their work."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Graded Submissions ({gradedResults.length})</CardTitle>
              <CardDescription>All submissions you have already graded</CardDescription>
            </CardHeader>
            <CardContent>
              {gradedResults.length > 0 ? (
                <div className="space-y-4">
                  {gradedResults.map((result) => (
                    <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={result.student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {result.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{result.student.name}</div>
                          <div className="text-sm text-muted-foreground">{result.assessment.title}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(result.score, result.maxScore)}`}>
                            {result.score}/{result.maxScore}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {((result.score / result.maxScore) * 100).toFixed(1)}%
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="mr-2 h-4 w-4" />
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={FileCheck2}
                  title="No graded submissions"
                  description="Submissions you have graded will appear here for review and reference."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
