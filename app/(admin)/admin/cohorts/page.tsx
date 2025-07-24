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
import { Plus, Search, Calendar, Users, BookOpen, MoreHorizontal, Edit, Trash2, Eye, CalendarDays } from "lucide-react"
import { dummyCohorts } from "@/lib/dummy-data"
import type { Cohort } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function CohortsAndAcademicYears() {
  const [cohorts, setCohorts] = useState<Cohort[]>(dummyCohorts)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddCohortOpen, setIsAddCohortOpen] = useState(false)

  const filteredCohorts = cohorts.filter(
    (cohort) =>
      cohort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cohort.academicYear.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCohort = (formData: FormData) => {
    const newCohort: Cohort = {
      id: (cohorts.length + 1).toString(),
      name: formData.get("name") as string,
      academicYear: formData.get("academicYear") as string,
      startDate: new Date(formData.get("startDate") as string),
      endDate: new Date(formData.get("endDate") as string),
      students: [],
      courses: [],
      isActive: true,
    }
    setCohorts([...cohorts, newCohort])
    setIsAddCohortOpen(false)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cohorts & Academic Years</h1>
          <p className="text-muted-foreground">Manage student cohorts and academic periods</p>
        </div>
        <Dialog open={isAddCohortOpen} onOpenChange={setIsAddCohortOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Cohort
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Cohort</DialogTitle>
              <DialogDescription>Create a new student cohort for an academic year.</DialogDescription>
            </DialogHeader>
            <form action={handleAddCohort}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Cohort Name</Label>
                    <Input id="name" name="name" placeholder="e.g., Computer Science 2024" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicYear">Academic Year</Label>
                    <Input id="academicYear" name="academicYear" placeholder="e.g., 2024-2025" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" name="startDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" name="endDate" type="date" required />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddCohortOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Cohort</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cohorts ({filteredCohorts.length})</CardTitle>
          <CardDescription>Student cohorts and their academic periods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search cohorts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cohort</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCohorts.length > 0 ? (
                filteredCohorts.map((cohort) => (
                  <TableRow key={cohort.id}>
                    <TableCell>
                      <div className="font-medium">{cohort.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{cohort.academicYear}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(cohort.startDate).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">to {new Date(cohort.endDate).toLocaleDateString()}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{cohort.students.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{cohort.courses.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={cohort.isActive ? "default" : "secondary"}>
                        {cohort.isActive ? "Active" : "Inactive"}
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
                        <CalendarDays className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {searchTerm ? "No cohorts found" : "No cohorts yet"}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {searchTerm
                            ? "Try adjusting your search terms."
                            : "Create your first cohort to organize students by academic year."}
                        </p>
                        {!searchTerm && (
                          <Button className="mt-4" onClick={() => setIsAddCohortOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Create First Cohort
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
    </div>
  )
}
