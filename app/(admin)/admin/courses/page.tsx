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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Users, UserPlus, MoreHorizontal, Edit, Trash2, BookOpen } from "lucide-react"
import { dummyCourses, dummyUsers } from "@/lib/dummy-data"
import { type Course, Role } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>(dummyCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [isAllocateOpen, setIsAllocateOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const lecturers = dummyUsers.filter((user) => user.role === Role.LECTURER)

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCourse = (formData: FormData) => {
    const newCourse: Course = {
      id: (courses.length + 1).toString(),
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      description: formData.get("description") as string,
      credits: Number.parseInt(formData.get("credits") as string),
      department: formData.get("department") as string,
      maxStudents: Number.parseInt(formData.get("maxStudents") as string),
      createdAt: new Date(),
      isActive: true,
      enrolledStudents: 0,
    }
    setCourses([...courses, newCourse])
    setIsAddCourseOpen(false)
  }

  const handleAllocateLecturer = (courseId: string, lecturerId: string) => {
    const lecturer = lecturers.find((l) => l.id === lecturerId)
    setCourses(courses.map((course) => (course.id === courseId ? { ...course, lecturerId, lecturer } : course)))
    setIsAllocateOpen(false)
    setSelectedCourse(null)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Courses</h1>
          <p className="text-muted-foreground">Create courses and allocate lecturers</p>
        </div>
        <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Create a new course in the system. You can allocate a lecturer later.
              </DialogDescription>
            </DialogHeader>
            <form action={handleAddCourse}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code</Label>
                    <Input id="code" name="code" placeholder="e.g., CS101" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input id="credits" name="credits" type="number" min="1" max="6" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" name="department" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStudents">Max Students</Label>
                    <Input id="maxStudents" name="maxStudents" type="number" min="1" required />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Course</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Courses ({filteredCourses.length})</CardTitle>
          <CardDescription>Manage all courses and lecturer allocations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Lecturer</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{course.name}</div>
                        <div className="text-sm text-muted-foreground">{course.code}</div>
                      </div>
                    </TableCell>
                    <TableCell>{course.department}</TableCell>
                    <TableCell>{course.credits}</TableCell>
                    <TableCell>
                      {course.lecturer ? (
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={course.lecturer.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {course.lecturer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{course.lecturer.name}</span>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCourse(course)
                            setIsAllocateOpen(true)
                          }}
                        >
                          <UserPlus className="mr-1 h-3 w-3" />
                          Allocate
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {course.enrolledStudents}/{course.maxStudents}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={course.isActive ? "default" : "secondary"}>
                        {course.isActive ? "Active" : "Inactive"}
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
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          {course.lecturer && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedCourse(course)
                                setIsAllocateOpen(true)
                              }}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Change Lecturer
                            </DropdownMenuItem>
                          )}
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
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {searchTerm ? "No courses found" : "No courses yet"}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {searchTerm
                            ? "Try adjusting your search terms."
                            : "Create your first course to start building your curriculum."}
                        </p>
                        {!searchTerm && (
                          <Button className="mt-4" onClick={() => setIsAddCourseOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create First Course
                          </Button>
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

      {/* Allocate Lecturer Dialog */}
      <Dialog open={isAllocateOpen} onOpenChange={setIsAllocateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Allocate Lecturer</DialogTitle>
            <DialogDescription>
              {selectedCourse && `Assign a lecturer to ${selectedCourse.name} (${selectedCourse.code})`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Lecturer</Label>
              {lecturers.length === 0 ? (
                <div className="text-center py-4">
                  <Users className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No lecturers available</p>
                  <p className="text-xs text-gray-400">Add lecturers to the system first</p>
                </div>
              ) : (
                <Select onValueChange={(value) => selectedCourse && handleAllocateLecturer(selectedCourse.id, value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a lecturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {lecturers.map((lecturer) => (
                      <SelectItem key={lecturer.id} value={lecturer.id}>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={lecturer.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {lecturer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{lecturer.name}</div>
                            <div className="text-sm text-muted-foreground">{lecturer.department}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAllocateOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
