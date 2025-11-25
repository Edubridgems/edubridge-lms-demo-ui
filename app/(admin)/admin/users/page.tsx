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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Upload, Download, MoreHorizontal, Edit, Trash2, Users } from "lucide-react"
import { dummyUsers } from "@/lib/dummy-data"
import { Role, type User } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>(dummyUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState<string>("ALL")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isBatchAddOpen, setIsBatchAddOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "ALL" || user.role === selectedRole
    return matchesSearch && matchesRole
  })

  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return "bg-red-100 text-red-800"
      case Role.LECTURER:
        return "bg-blue-100 text-blue-800"
      case Role.STUDENT:
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAddUser = (formData: FormData) => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as Role,
      department: formData.get("department") as string,
      employeeId: formData.get("role") !== Role.STUDENT ? `EMP${String(users.length + 1).padStart(3, "0")}` : undefined,
      studentId: formData.get("role") === Role.STUDENT ? `STU${String(users.length + 1).padStart(3, "0")}` : undefined,
      createdAt: new Date(),
      isActive: true,
      avatar: "/placeholder.svg?height=40&width=40",
    }
    setUsers([...users, newUser])
    setIsAddUserOpen(false)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="text-muted-foreground">Add, edit, and manage system users</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isBatchAddOpen} onOpenChange={setIsBatchAddOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Batch Add
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Batch Add Users</DialogTitle>
                <DialogDescription>
                  Upload a CSV file or paste user data. All users in a batch must have the same role.
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="upload" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Upload CSV</TabsTrigger>
                  <TabsTrigger value="paste">Paste Data</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Role (All users will have this role)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Role.STUDENT}>Student</SelectItem>
                        <SelectItem value={Role.LECTURER}>Lecturer</SelectItem>
                        <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>CSV File</Label>
                    <Input type="file" accept=".csv" />
                    <p className="text-sm text-muted-foreground">CSV should contain: name, email, department columns</p>
                  </div>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                </TabsContent>
                <TabsContent value="paste" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Role (All users will have this role)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Role.STUDENT}>Student</SelectItem>
                        <SelectItem value={Role.LECTURER}>Lecturer</SelectItem>
                        <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>User Data</Label>
                    <Textarea
                      placeholder="Paste user data here (one user per line: name, email, department)"
                      className="min-h-[200px]"
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBatchAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsBatchAddOpen(false)}>Add Users</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account in the system.</DialogDescription>
              </DialogHeader>
              <form action={handleAddUser}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" name="name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" name="email" type="email" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select name="role" required>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={Role.STUDENT}>Student</SelectItem>
                        <SelectItem value={Role.LECTURER}>Lecturer</SelectItem>
                        <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="department" className="text-right">
                      Department
                    </Label>
                    <Input id="department" name="department" className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add User</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage all system users and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                <SelectItem value={Role.LECTURER}>Lecturer</SelectItem>
                <SelectItem value={Role.STUDENT}>Student</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell className="font-mono text-sm">{user.employeeId || user.studentId}</TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}</TableCell>
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
                        <Users className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {searchTerm || selectedRole !== "ALL" ? "No users found" : "No users yet"}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {searchTerm || selectedRole !== "ALL"
                            ? "Try adjusting your search criteria or filters."
                            : "Get started by adding your first user to the system."}
                        </p>
                        {!searchTerm && selectedRole === "ALL" && (
                          <Button className="mt-4" onClick={() => setIsAddUserOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add First User
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
