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
import {
  Plus,
  Search,
  Upload,
  FileText,
  Video,
  File,
  Link,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  AlertTriangle,
} from "lucide-react"
import { dummyMaterials, dummyUnits } from "@/lib/dummy-data"
import type { Material } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function UploadMaterials() {
  const lecturerId = "2" // Current lecturer ID
  const [materials, setMaterials] = useState<Material[]>(dummyMaterials)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("ALL")
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const lecturerUnits = dummyUnits.filter((unit) => unit.lecturerId === lecturerId)
  const lecturerMaterials = materials.filter((material) => material.uploadedBy === lecturerId)

  const filteredMaterials = lecturerMaterials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "ALL" || material.type === selectedType
    return matchesSearch && matchesType
  })

  const handleUploadMaterial = (formData: FormData) => {
    const newMaterial: Material = {
      id: (materials.length + 1).toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as Material["type"],
      url: "/materials/" + (formData.get("title") as string).toLowerCase().replace(/\s+/g, "-"),
      unitId: formData.get("unitId") as string,
      uploadedBy: lecturerId,
      uploadedAt: new Date(),
      size: "2.5 MB", // Mock size
      downloads: 0,
    }
    setMaterials([...materials, newMaterial])
    setIsUploadOpen(false)
  }

  const getTypeIcon = (type: Material["type"]) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-4 w-4 text-red-600" />
      case "VIDEO":
        return <Video className="h-4 w-4 text-blue-600" />
      case "DOCUMENT":
        return <File className="h-4 w-4 text-green-600" />
      case "LINK":
        return <Link className="h-4 w-4 text-purple-600" />
      case "PRESENTATION":
        return <FileText className="h-4 w-4 text-orange-600" />
      default:
        return <File className="h-4 w-4 text-gray-600" />
    }
  }

  const getTypeBadgeColor = (type: Material["type"]) => {
    switch (type) {
      case "PDF":
        return "bg-red-100 text-red-800"
      case "VIDEO":
        return "bg-blue-100 text-blue-800"
      case "DOCUMENT":
        return "bg-green-100 text-green-800"
      case "LINK":
        return "bg-purple-100 text-purple-800"
      case "PRESENTATION":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Add comprehensive empty state handling for materials page

  // Update stats cards to handle empty data
  const totalMaterials = lecturerMaterials.length
  const totalDownloads = lecturerMaterials.reduce((acc, material) => acc + material.downloads, 0)
  const videoCount = lecturerMaterials.filter((m) => m.type === "VIDEO").length
  const documentCount = lecturerMaterials.filter((m) => m.type === "PDF" || m.type === "DOCUMENT").length

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Materials</h1>
          <p className="text-muted-foreground">Manage learning materials for your units</p>
        </div>
        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload New Material</DialogTitle>
              <DialogDescription>Add a new learning material to one of your units.</DialogDescription>
            </DialogHeader>
            <form action={handleUploadMaterial}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Material Title</Label>
                    <Input id="title" name="title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDF">PDF Document</SelectItem>
                        <SelectItem value="VIDEO">Video</SelectItem>
                        <SelectItem value="DOCUMENT">Document</SelectItem>
                        <SelectItem value="PRESENTATION">Presentation</SelectItem>
                        <SelectItem value="LINK">External Link</SelectItem>
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
                      {lecturerUnits.length > 0 ? (
                        lecturerUnits.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name} ({unit.code})
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="" disabled>
                          No units assigned - contact administrator
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">File Upload</Label>
                  <Input id="file" name="file" type="file" />
                  <p className="text-sm text-muted-foreground">
                    Maximum file size: 100MB. Supported formats: PDF, DOC, PPT, MP4, etc.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Material
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMaterials}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDownloads}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{videoCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Materials ({filteredMaterials.length})</CardTitle>
          <CardDescription>All materials you have uploaded</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search materials..."
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
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="VIDEO">Video</SelectItem>
                <SelectItem value="DOCUMENT">Document</SelectItem>
                <SelectItem value="PRESENTATION">Presentation</SelectItem>
                <SelectItem value="LINK">Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(material.type)}
                      <div>
                        <div className="font-medium">{material.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{material.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeBadgeColor(material.type)}>{material.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">Unit {material.unitId}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{material.size}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Download className="h-4 w-4 text-muted-foreground" />
                      <span>{material.downloads}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{new Date(material.uploadedAt).toLocaleDateString()}</span>
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
                          <Download className="mr-2 h-4 w-4" />
                          Download
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
              ))}
            </TableBody>
          </Table>

          {filteredMaterials.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {searchTerm || selectedType !== "ALL"
                  ? "No materials found"
                  : lecturerMaterials.length === 0
                    ? "No materials uploaded yet"
                    : "No matching materials"}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {searchTerm || selectedType !== "ALL"
                  ? "Try adjusting your search terms or filters."
                  : lecturerMaterials.length === 0
                    ? lecturerUnits.length === 0
                      ? "You need to be assigned to units before you can upload materials."
                      : "Upload your first learning material to help students with their studies."
                    : "All your materials are currently filtered out."}
              </p>
              {lecturerMaterials.length === 0 && lecturerUnits.length > 0 && (
                <Button className="mt-4" onClick={() => setIsUploadOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload First Material
                </Button>
              )}
              {lecturerUnits.length === 0 && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg max-w-md mx-auto">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">No units assigned</span>
                  </div>
                  <p className="mt-1 text-sm text-yellow-700">
                    Contact your administrator to get courses allocated to you before uploading materials.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
