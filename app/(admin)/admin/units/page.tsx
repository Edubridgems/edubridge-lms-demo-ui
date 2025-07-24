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
import { Plus, Search, BookOpen, FileText, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { dummyUnits, dummyCourses } from "@/lib/dummy-data"
import type { Unit } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function UnitLibrary() {
  const [units, setUnits] = useState<Unit[]>(dummyUnits)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<string>("ALL")
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false)

  const filteredUnits = units.filter((unit) => {
    const matchesSearch =
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = selectedCourse === "ALL" || unit.courseId === selectedCourse
    return matchesSearch && matchesCourse
  })

  const handleAddUnit = (formData: FormData) => {
    const newUnit: Unit = {
      id: (units.length + 1).toString(),
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      description: formData.get("description") as string,
      courseId: formData.get("courseId") as string,
      course: dummyCourses.find((c) => c.id === formData.get("courseId")),
      materials: [],
      assessments: [],
      createdAt: new Date(),
      isActive: true,
    }
    setUnits([...units, newUnit])
    setIsAddUnitOpen(false)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Unit Library</h1>
          <p className="text-muted-foreground">Manage course units and learning modules</p>
        </div>
        <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Unit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Unit</DialogTitle>
              <DialogDescription>Create a new learning unit for a course.</DialogDescription>
            </DialogHeader>
            <form action={handleAddUnit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Unit Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Unit Code</Label>
                    <Input id="code" name="code" placeholder="e.g., CS101-U1" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="courseId">Course</Label>
                  <Select name="courseId" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {dummyCourses.length > 0 ? (
                        dummyCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name} ({course.code})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          No courses available - create a course first
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddUnitOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Unit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Units ({filteredUnits.length})</CardTitle>
          <CardDescription>All learning units across courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Courses</SelectItem>
                {dummyCourses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Lecturer</TableHead>
                <TableHead>Materials</TableHead>
                <TableHead>Assessments</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUnits.length > 0 ? (
                filteredUnits.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{unit.name}</div>
                        <div className="text-sm text-muted-foreground">{unit.code}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{unit.course?.name}</div>
                          <div className="text-sm text-muted-foreground">{unit.course?.code}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {unit.lecturer ? (
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={unit.lecturer.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">
                              {unit.lecturer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{unit.lecturer.name}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Not assigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{unit.materials.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{unit.assessments.length}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={unit.isActive ? "default" : "secondary"}>
                        {unit.isActive ? "Active" : "Inactive"}
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
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {searchTerm || selectedCourse !== "ALL" ? "No units found" : "No units yet"}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {searchTerm || selectedCourse !== "ALL"
                            ? "Try adjusting your search criteria or filters."
                            : dummyCourses.length === 0
                              ? "Create courses first, then add units to organize your curriculum."
                              : "Create your first unit to start organizing course content."}
                        </p>
                        {!searchTerm && selectedCourse === "ALL" && dummyCourses.length > 0 && (
                          <Button className="mt-4" onClick={() => setIsAddUnitOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create First Unit
                          </Button>
                        )}
                        {dummyCourses.length === 0 && (
                          <p className="mt-2 text-xs text-gray-400">Go to Manage Courses to create your first course</p>
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
