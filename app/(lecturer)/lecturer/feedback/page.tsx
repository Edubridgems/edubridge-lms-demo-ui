"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Search, MessageSquare, Send, Clock, CheckCircle } from "lucide-react"
import { dummyUsers, dummyUnits } from "@/lib/dummy-data"
import { Role } from "@/types"
import { EmptyState } from "@/components/emptystate"

interface Feedback {
  id: string
  studentId: string
  student: (typeof dummyUsers)[0]
  subject: string
  message: string
  response?: string
  status: "PENDING" | "RESPONDED" | "RESOLVED"
  priority: "LOW" | "MEDIUM" | "HIGH"
  createdAt: Date
  respondedAt?: Date
}

export default function StudentFeedback() {
  const lecturerId = "2" // Current lecturer ID
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL")
  const [isResponseOpen, setIsResponseOpen] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)

  const lecturerUnits = dummyUnits.filter((unit) => unit.lecturerId === lecturerId)
  const students = dummyUsers.filter((user) => user.role === Role.STUDENT)

  // Mock feedback data
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(
    lecturerUnits.length > 0 && students.length > 0
      ? [
          {
            id: "1",
            studentId: "4",
            student: students[0],
            subject: "Question about Python Assignment",
            message:
              "Hi Dr. Johnson, I'm having trouble understanding the loop concepts in the assignment. Could you provide some additional examples?",
            status: "PENDING",
            priority: "MEDIUM",
            createdAt: new Date("2024-12-17"),
          },
          {
            id: "2",
            studentId: "4",
            student: students[0],
            subject: "Request for Extension",
            message:
              "I've been sick and would like to request an extension for the programming assignment. I have a medical certificate.",
            response:
              "Hi Alice, I understand your situation. I'm granting you a 3-day extension. Please submit by Friday. Get well soon!",
            status: "RESPONDED",
            priority: "HIGH",
            createdAt: new Date("2024-12-15"),
            respondedAt: new Date("2024-12-16"),
          },
        ]
      : [],
  )

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      feedback.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "ALL" || feedback.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const pendingCount = feedbacks.filter((f) => f.status === "PENDING").length
  const respondedCount = feedbacks.filter((f) => f.status === "RESPONDED").length
  const resolvedCount = feedbacks.filter((f) => f.status === "RESOLVED").length

  const handleSendResponse = (feedbackId: string, response: string) => {
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === feedbackId
          ? { ...feedback, response, status: "RESPONDED" as const, respondedAt: new Date() }
          : feedback,
      ),
    )
    setIsResponseOpen(false)
    setSelectedFeedback(null)
  }

  const getStatusBadgeColor = (status: Feedback["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "RESPONDED":
        return "bg-blue-100 text-blue-800"
      case "RESOLVED":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityBadgeColor = (priority: Feedback["priority"]) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800"
      case "LOW":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Feedback</h1>
          <p className="text-muted-foreground">Manage student questions and feedback</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Responded</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{respondedCount}</div>
            <p className="text-xs text-muted-foreground">Recently responded</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{resolvedCount}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="responded">Responded ({respondedCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Feedback ({filteredFeedbacks.length})</CardTitle>
              <CardDescription>Student questions and feedback for your courses</CardDescription>
            </CardHeader>
            <CardContent>
              {lecturerUnits.length === 0 ? (
                <EmptyState
                  icon={MessageSquare}
                  title="No units assigned"
                  description="You need to be assigned to units before you can receive student feedback."
                />
              ) : feedbacks.length === 0 ? (
                <EmptyState
                  icon={MessageSquare}
                  title="No feedback yet"
                  description="Student questions and feedback will appear here. Students can reach out to you through the system for support and clarification."
                />
              ) : (
                <>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search feedback..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALL">All Status</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="RESPONDED">Responded</SelectItem>
                        <SelectItem value="RESOLVED">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {filteredFeedbacks.length > 0 ? (
                    <div className="space-y-4">
                      {filteredFeedbacks.map((feedback) => (
                        <div key={feedback.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src={feedback.student.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {feedback.student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{feedback.student.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(feedback.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityBadgeColor(feedback.priority)}>{feedback.priority}</Badge>
                              <Badge className={getStatusBadgeColor(feedback.status)}>{feedback.status}</Badge>
                            </div>
                          </div>
                          <div className="mb-3">
                            <h4 className="font-medium mb-2">{feedback.subject}</h4>
                            <p className="text-sm text-gray-700">{feedback.message}</p>
                          </div>
                          {feedback.response && (
                            <div className="bg-blue-50 p-3 rounded-lg mb-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <MessageSquare className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-900">Your Response</span>
                                {feedback.respondedAt && (
                                  <span className="text-xs text-blue-700">
                                    {new Date(feedback.respondedAt).toLocaleDateString()}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-blue-800">{feedback.response}</p>
                            </div>
                          )}
                          <div className="flex justify-end">
                            {feedback.status === "PENDING" && (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedFeedback(feedback)
                                  setIsResponseOpen(true)
                                }}
                              >
                                <Send className="mr-2 h-4 w-4" />
                                Respond
                              </Button>
                            )}
                            {feedback.status === "RESPONDED" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setFeedbacks(
                                    feedbacks.map((f) =>
                                      f.id === feedback.id ? { ...f, status: "RESOLVED" as const } : f,
                                    ),
                                  )
                                }}
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Resolved
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      icon={Search}
                      title="No feedback found"
                      description="Try adjusting your search terms or filters to find the feedback you're looking for."
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
              <CardTitle>Pending Feedback ({pendingCount})</CardTitle>
              <CardDescription>Student feedback awaiting your response</CardDescription>
            </CardHeader>
            <CardContent>
              {feedbacks.filter((f) => f.status === "PENDING").length > 0 ? (
                <div className="space-y-4">
                  {feedbacks
                    .filter((f) => f.status === "PENDING")
                    .map((feedback) => (
                      <div key={feedback.id} className="border rounded-lg p-4 border-yellow-200 bg-yellow-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={feedback.student.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {feedback.student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{feedback.student.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(feedback.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Badge className={getPriorityBadgeColor(feedback.priority)}>{feedback.priority}</Badge>
                        </div>
                        <div className="mb-3">
                          <h4 className="font-medium mb-2">{feedback.subject}</h4>
                          <p className="text-sm text-gray-700">{feedback.message}</p>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedFeedback(feedback)
                              setIsResponseOpen(true)
                            }}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Respond Now
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <EmptyState
                  icon={CheckCircle}
                  title="No pending feedback"
                  description="Great! You've responded to all student feedback. New questions will appear here when students reach out."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responded" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Responded Feedback ({respondedCount})</CardTitle>
              <CardDescription>Feedback you have recently responded to</CardDescription>
            </CardHeader>
            <CardContent>
              {feedbacks.filter((f) => f.status === "RESPONDED").length > 0 ? (
                <div className="space-y-4">
                  {feedbacks
                    .filter((f) => f.status === "RESPONDED")
                    .map((feedback) => (
                      <div key={feedback.id} className="border rounded-lg p-4 border-blue-200 bg-blue-50">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={feedback.student.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {feedback.student.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{feedback.student.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Responded: {feedback.respondedAt && new Date(feedback.respondedAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <h4 className="font-medium mb-2">{feedback.subject}</h4>
                          <p className="text-sm text-gray-700 mb-3">{feedback.message}</p>
                          {feedback.response && (
                            <div className="bg-white p-3 rounded border">
                              <div className="flex items-center space-x-2 mb-2">
                                <MessageSquare className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium">Your Response</span>
                              </div>
                              <p className="text-sm">{feedback.response}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setFeedbacks(
                                feedbacks.map((f) =>
                                  f.id === feedback.id ? { ...f, status: "RESOLVED" as const } : f,
                                ),
                              )
                            }}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark Resolved
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <EmptyState
                  icon={MessageSquare}
                  title="No responded feedback"
                  description="Feedback you respond to will appear here for tracking and follow-up."
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Response Dialog */}
      <Dialog open={isResponseOpen} onOpenChange={setIsResponseOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Respond to Student Feedback</DialogTitle>
            <DialogDescription>
              {selectedFeedback && `Responding to ${selectedFeedback.student.name}'s question`}
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">{selectedFeedback.subject}</h4>
                <p className="text-sm text-gray-700">{selectedFeedback.message}</p>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  const response = formData.get("response") as string
                  if (response.trim()) {
                    handleSendResponse(selectedFeedback.id, response)
                  }
                }}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="response">Your Response</Label>
                    <Textarea
                      id="response"
                      name="response"
                      placeholder="Type your response here..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsResponseOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Send className="mr-2 h-4 w-4" />
                    Send Response
                  </Button>
                </DialogFooter>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
