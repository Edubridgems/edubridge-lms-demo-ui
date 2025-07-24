"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, AlertTriangle, CheckCircle, Clock, Eye, MessageSquare, MoreHorizontal } from "lucide-react"
import { dummyPlagiarismReports, dummyAssessments, dummyUnits } from "@/lib/dummy-data"
import type { PlagiarismReport } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EmptyState } from "@/components/emptystate"

export default function PlagiarismFlags() {
  const lecturerId = "2" // Current lecturer ID
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL")

  const lecturerUnits = dummyUnits.filter((unit) => unit.lecturerId === lecturerId)
  const lecturerAssessments = dummyAssessments.filter((assessment) =>
    lecturerUnits.some((unit) => unit.id === assessment.unitId),
  )
  const lecturerReports = dummyPlagiarismReports.filter((report) =>
    lecturerAssessments.some((assessment) => assessment.id === report.assessmentId),
  )

  const filteredReports = lecturerReports.filter((report) => {
    const matchesSearch =
      report.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "ALL" || report.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const flaggedCount = lecturerReports.filter((r) => r.status === "FLAGGED").length
  const reviewedCount = lecturerReports.filter((r) => r.status === "REVIEWED").length
  const clearedCount = lecturerReports.filter((r) => r.status === "CLEARED").length

  const getStatusBadgeColor = (status: PlagiarismReport["status"]) => {
    switch (status) {
      case "FLAGGED":
        return "bg-red-100 text-red-800"
      case "REVIEWED":
        return "bg-yellow-100 text-yellow-800"
      case "CLEARED":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSimilarityColor = (score: number) => {
    if (score >= 75) return "text-red-600"
    if (score >= 50) return "text-yellow-600"
    if (score >= 25) return "text-blue-600"
    return "text-green-600"
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plagiarism Flags</h1>
          <p className="text-muted-foreground">Review plagiarism reports for your assessments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{flaggedCount}</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{reviewedCount}</div>
            <p className="text-xs text-muted-foreground">Being reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cleared</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{clearedCount}</div>
            <p className="text-xs text-muted-foreground">Resolved cases</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Plagiarism Reports ({filteredReports.length})</CardTitle>
          <CardDescription>Plagiarism detection reports for your assessments</CardDescription>
        </CardHeader>
        <CardContent>
          {lecturerUnits.length === 0 ? (
            <EmptyState
              icon={AlertTriangle}
              title="No units assigned"
              description="You need to be assigned to units before you can view plagiarism reports for your assessments."
            />
          ) : lecturerReports.length === 0 ? (
            <EmptyState
              icon={CheckCircle}
              title="No plagiarism reports"
              description="Great news! No plagiarism has been detected in submissions for your assessments. The system continuously monitors all submissions."
            />
          ) : (
            <>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Status</SelectItem>
                    <SelectItem value="FLAGGED">Flagged</SelectItem>
                    <SelectItem value="REVIEWED">Under Review</SelectItem>
                    <SelectItem value="CLEARED">Cleared</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {filteredReports.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Similarity Score</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reported Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={report.student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {report.student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{report.student.name}</div>
                            <div className="text-sm text-muted-foreground">{report.student.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{report.assessment.title}</div>
                            <div className="text-sm text-muted-foreground">{report.assessment.type}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`text-lg font-bold ${getSimilarityColor(report.similarityScore)}`}>
                            {report.similarityScore}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(report.status)}>{report.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(report.reportedAt).toLocaleDateString()}</TableCell>
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
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact Student
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
                  title="No reports found"
                  description="Try adjusting your search terms or filters to find the reports you're looking for."
                />
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
