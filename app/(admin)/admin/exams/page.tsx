"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, ClipboardList, Calendar, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { dummyAssessments, dummyUnits } from "@/lib/dummy-data"
import type { Assessment } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ExamSetup() {
  const [assessments, setAssessments] = useState<Assessment[]>(dummyAssessments)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("ALL")
  const [isAddExamOpen, setIsAddExamOpen] = useState(false)

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "ALL" || assessment.type === selectedType
    return matchesSearch && matchesType
  })

  const handleAddAssessment = (formData: FormData) => {
    const newAssessment: Assessment = {
      id: (assessments.length + 1).toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as Assessment["type"],
      unitId: formData.get("unitId") as string,
      totalMarks: Number.parseInt(formData.get("totalMarks") as string),
      passingMarks: Number.parseInt(formData.get("passingMarks") as string),
      dueDate: new Date(formData.get("dueDate") as string),
      createdAt: new Date(),
      isActive: true,
      submissions: 0,
    }
    setAssessments([...assessments, newAssessment])
    setIsAddExamOpen(false)
  }

  const getTypeBadgeColor = (type: Assessment["type"]) => {
    switch (type) {
      case "QUIZ":
        return "bg-blue-100 text-blue-800"
      case "ASSIGNMENT":
        return "bg-green-100 text-green-800"
      case "EXAM":
        return "bg-red-100 text-red-800"
      case "PROJECT":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exam Setup</h1>
          <p className="text-muted-foreground">Create and manage assessments and examinations</p>
        </div>
        <Dialog open={isAddExamOpen} onOpenChange={setIsAddExamOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Assessment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Assessment</DialogTitle>
              <DialogDescription>Create a new assessment for a unit.</DialogDescription>
            </DialogHeader>
            <form action={handleAddAssessment}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Assessment Title</Label>
                    <Input id="title" name="title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="QUIZ">Quiz</SelectItem>
                        <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                        <SelectItem value="EXAM">Exam</SelectItem>
                        <SelectItem value="PROJECT">Project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitId">Unit</Label>
                  <Select name="unitId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyUnits.length > 0 ? (
                        dummyUnits.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name} ({unit.code})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          No units available - create a unit first
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalMarks">Total Marks</Label>
                    <Input id="totalMarks" name="totalMarks" type="number" min="1" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passingMarks">Passing Marks</Label>
                    <Input id="passingMarks" name="passingMarks" type="number" min="1" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" name="dueDate" type="datetime-local" required />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddExamOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Assessment</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Assessments ({filteredAssessments.length})</CardTitle>
          <CardDescription>All assessments and examinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Types</SelectItem>
                <SelectItem value="QUIZ">Quiz</SelectItem>
                <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                <SelectItem value="EXAM">Exam</SelectItem>
                <SelectItem value="PROJECT">Project</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Submissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessments.length > 0 ? (
                filteredAssessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{assessment.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{assessment.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeBadgeColor(assessment.type)}>{assessment.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Unit {assessment.unitId}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{assessment.totalMarks} total</div>
                        <div className="text-muted-foreground">{assessment.passingMarks} to pass</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <div>{new Date(assessment.dueDate).toLocaleDateString()}</div>
                          <div className="text-muted-foreground">
                            {new Date(assessment.dueDate).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{assessment.submissions}</div>
                        {assessment.averageScore && (
                          <div className="text-sm text-muted-foreground">Avg: {assessment.averageScore.toFixed(1)}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={assessment.isActive ? "default" : "secondary"}>
                        {assessment.isActive ? "Active" : "Inactive"}
                      </Badge>
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
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <ClipboardList className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {searchTerm || selectedType !== "ALL" ? "No assessments found" : "No assessments yet"}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {searchTerm || selectedType !== "ALL"
                            ? "Try adjusting your search criteria or filters."
                            : dummyUnits.length === 0
                              ? "Create units first, then add assessments to evaluate student learning."
                              : "Create your first assessment to start evaluating student performance."}
                        </p>
                        {!searchTerm && selectedType === "ALL" && dummyUnits.length > 0 && (
                          <Button className="mt-4" onClick={() => setIsAddExamOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create First Assessment
                          </Button>
                        )}
                        {dummyUnits.length === 0 && (
                          <p className="mt-2 text-xs text-gray-400">Go to Unit Library to create your first unit</p>
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
    </div>
  )
}
