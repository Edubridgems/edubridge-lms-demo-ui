"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, BookOpen, FileText, ClipboardList, Users, Eye, MoreHorizontal } from "lucide-react"
import { dummyUnits } from "@/lib/dummy-data"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AssignedUnits() {
  const lecturerId = "2" // Current lecturer ID
  const [searchTerm, setSearchTerm] = useState("")

  const assignedUnits = dummyUnits.filter((unit) => unit.lecturerId === lecturerId)

  const filteredUnits = assignedUnits.filter(
    (unit) =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.course?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assigned Units</h1>
          <p className="text-muted-foreground">Units you are currently teaching</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {assignedUnits.length} Active Units
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Teaching Units</CardTitle>
          <CardDescription>All units assigned to you for the current semester</CardDescription>
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
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Unit</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Materials</TableHead>
                <TableHead>Assessments</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUnits.map((unit) => (
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
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{unit.materials.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <ClipboardList className="h-4 w-4 text-muted-foreground" />
                      <span>{unit.assessments.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{unit.course?.enrolledStudents || 0}</span>
                    </div>
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
                          <FileText className="mr-2 h-4 w-4" />
                          Manage Materials
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ClipboardList className="mr-2 h-4 w-4" />
                          Manage Assessments
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUnits.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {searchTerm ? "No units found" : assignedUnits.length === 0 ? "No units assigned" : "No matching units"}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms to find the units you're looking for."
                  : assignedUnits.length === 0
                    ? "You don't have any units assigned to you yet. Contact your administrator to get courses allocated."
                    : "All your units are currently filtered out."}
              </p>
              {assignedUnits.length === 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="text-left">
                      <h4 className="text-sm font-medium text-blue-900">Getting Started</h4>
                      <p className="mt-1 text-sm text-blue-700">
                        Once an administrator allocates courses to you, you'll be able to:
                      </p>
                      <ul className="mt-2 text-sm text-blue-700 list-disc list-inside space-y-1">
                        <li>Upload learning materials</li>
                        <li>Create assessments</li>
                        <li>Grade student submissions</li>
                        <li>Track student progress</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Unit Details Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUnits.length > 0 ? (
          filteredUnits.slice(0, 3).map((unit) => (
            <Card key={unit.id}>
              <CardHeader>
                <CardTitle className="text-lg">{unit.name}</CardTitle>
                <CardDescription>{unit.course?.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Materials:</span>
                    <span className="font-medium">{unit.materials.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Assessments:</span>
                    <span className="font-medium">{unit.assessments.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Students:</span>
                    <span className="font-medium">{unit.course?.enrolledStudents || 0}</span>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <Eye className="mr-2 h-4 w-4" />
                      View Unit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : assignedUnits.length > 0 ? (
          <div className="col-span-full text-center py-8">
            <Search className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">No units match your current search</p>
          </div>
        ) : (
          <div className="col-span-full text-center py-8">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">No unit details to display</p>
          </div>
        )}
      </div>
    </div>
  )
}
