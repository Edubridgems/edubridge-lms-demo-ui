import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Megaphone, Plus, Reply, Pin } from "lucide-react"

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  createdAt: Date
  isPinned: boolean
  unitCode?: string
}

interface StudentQuestion {
  id: string
  studentName: string
  studentAvatar?: string
  question: string
  unitCode: string
  createdAt: Date
  hasResponse: boolean
  isUrgent: boolean
}

interface AnnouncementsActivityProps {
  announcements: Announcement[]
  studentQuestions: StudentQuestion[]
}

const AnnouncementsActivity = ({ announcements, studentQuestions }: AnnouncementsActivityProps) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return "Just now"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Announcements & Class Activity
          </div>
          <Button size="sm">
            <Plus className="h-3 w-3 mr-1" />
            New Announcement
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="announcements" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="announcements">Announcements ({announcements.length})</TabsTrigger>
            <TabsTrigger value="questions">
              Student Questions ({studentQuestions.filter((q) => !q.hasResponse).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="mt-4">
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                        {announcement.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                        {announcement.unitCode && (
                          <Badge variant="outline" className="text-xs">
                            {announcement.unitCode}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{formatTimeAgo(announcement.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{announcement.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">By {announcement.author}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          {announcement.isPinned ? "Unpin" : "Pin"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="questions" className="mt-4">
            <div className="space-y-4">
              {studentQuestions.map((question) => (
                <Card key={question.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={question.studentAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          {question.studentName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{question.studentName}</h4>
                          <Badge variant="outline" className="text-xs">
                            {question.unitCode}
                          </Badge>
                          {question.isUrgent && (
                            <Badge variant="destructive" className="text-xs">
                              Urgent
                            </Badge>
                          )}
                          {question.hasResponse && (
                            <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">
                              Responded
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{question.question}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{formatTimeAgo(question.createdAt)}</span>
                          <Button variant="outline" size="sm">
                            <Reply className="h-3 w-3 mr-1" />
                            {question.hasResponse ? "View Response" : "Reply"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default AnnouncementsActivity
