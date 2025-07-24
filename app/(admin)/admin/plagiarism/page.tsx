"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  MoreHorizontal,
  MonitorCheck,
} from "lucide-react"
import { dummyPlagiarismReports } from "@/lib/dummy-data"
import type { PlagiarismReport } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function PlagiarismChecks() {
  const [reports, setReports] = useState<PlagiarismReport[]>(dummyPlagiarismReports)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL")
  const [selectedReport, setSelectedReport] = useState<PlagiarismReport | null>(null)
  const [isReviewOpen, setIsReviewOpen] = useState(false)

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "ALL" || report.status === selectedStatus
    return matchesSearch && matchesStatus
  })

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

  const handleReviewReport = (reportId: string, status: PlagiarismReport["status"], notes: string) => {
    setReports(
      reports.map((report) => (report.id === reportId ? { ...report, status, notes, reviewedBy: "1" } : report)),
    )
    setIsReviewOpen(false)
    setSelectedReport(null)
  }

  const flaggedCount = reports.filter((r) => r.status === "FLAGGED").length
  const reviewedCount = reports.filter((r) => r.status === "REVIEWED").length
  const clearedCount = reports.filter((r) => r.status === "CLEARED").length

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plagiarism Checks</h1>
          <p className="text-muted-foreground">Monitor and review plagiarism detection reports</p>
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
            <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
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
          <CardDescription>All plagiarism detection reports and their status</CardDescription>
        </CardHeader>
        <CardContent>
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

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Assessment</TableHead>
                <TableHead>Similarity Score</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported Date</TableHead>
                <TableHead>Reviewed By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
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
                    <TableCell>
                      {report.reviewedBy ? (
                        <span className="text-sm">Admin</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not reviewed</span>
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
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedReport(report)
                              setIsReviewOpen(true)
                            }}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <MonitorCheck className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {searchTerm || selectedStatus !== "ALL" ? "No reports found" : "No plagiarism reports yet"}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {searchTerm || selectedStatus !== "ALL"
                            ? "Try adjusting your search criteria or filters."
                            : reports.length === 0
                              ? "Plagiarism reports will appear here once the system detects potential issues in student submissions."
                              : "All reports have been filtered out by your current criteria."}
                        </p>
                        {reports.length === 0 && (
                          <div className="mt-4 p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <span className="text-sm font-medium text-green-800">
                                System is monitoring submissions
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-green-700">
                              The plagiarism detection system is active and will flag suspicious submissions
                              automatically.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Plagiarism Report</DialogTitle>
            <DialogDescription>
              {selectedReport && `Review plagiarism report for ${selectedReport.student.name}`}
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Student</Label>
                  <div className="text-sm">{selectedReport.student.name}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Assessment</Label>
                  <div className="text-sm">{selectedReport.assessment.title}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Similarity Score</Label>
                  <div className={`text-lg font-bold ${getSimilarityColor(selectedReport.similarityScore)}`}>
                    {selectedReport.similarityScore}%
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Current Status</Label>
                  <Badge className={getStatusBadgeColor(selectedReport.status)}>{selectedReport.status}</Badge>
                </div>
              </div>
              {selectedReport.notes && (
                <div>
                  <Label className="text-sm font-medium">Previous Notes</Label>
                  <div className="text-sm text-muted-foreground">{selectedReport.notes}</div>
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleReviewReport(
                    selectedReport.id,
                    formData.get("status") as PlagiarismReport["status"],
                    formData.get("notes") as string,
                  )
                }}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status">New Status</Label>
                    <Select name="status" defaultValue={selectedReport.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FLAGGED">Flagged</SelectItem>
                        <SelectItem value="REVIEWED">Under Review</SelectItem>
                        <SelectItem value="CLEARED">Cleared</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Review Notes</Label>
                    <Textarea
                      name="notes"
                      placeholder="Add your review notes..."
                      defaultValue={selectedReport.notes || ""}
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsReviewOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Update Review</Button>
                </DialogFooter>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
