'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, BookOpen, Play, Eye, AlertTriangle, CheckCircle, Timer } from 'lucide-react'
import Link from "next/link"
import { Assessment } from "@/constants/constants"
import { Toaster } from "../ui/sonner"



interface StudentAssessmentCardProps {
  assessment: Assessment
}

const StudentAssessmentCard = ({ assessment }: StudentAssessmentCardProps) => {
  const now = new Date()
  const startTime = new Date(assessment.startTime)
  const endTime = new Date(assessment.endTime)
  
  // Determine assessment status
  const getAssessmentStatus = () => {
    if (now < startTime) return "upcoming"
    if (now > endTime) return "expired"
    if (assessment.attemptsUsed && assessment.maxAttempts && assessment.attemptsUsed >= assessment.maxAttempts) return "completed"
    return "active"
  }

  const status = getAssessmentStatus()

  // Calculate time remaining
  const getTimeRemaining = () => {
    if (status === "upcoming") {
      const diff = startTime.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      
      if (days > 0) return `Starts in ${days}d ${hours}h`
      if (hours > 0) return `Starts in ${hours}h`
      return "Starting soon"
    }
    
    if (status === "active") {
      const diff = endTime.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      
      if (days > 1) return `${days} days left`
      if (days === 1) return `1 day ${hours}h left`
      if (hours > 0) return `${hours}h ${minutes}m left`
      if (minutes > 0) return `${minutes}m left`
      return "Ending soon"
    }
    
    return null
  }

  const getStatusBadge = () => {
    switch (status) {
      case "upcoming":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">Available</Badge>
      case "completed":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Completed</Badge>
      case "expired":
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Expired</Badge>
      default:
        return null
    }
  }

  const getUrgencyIndicator = () => {
    if (status !== "active") return null
    
    const diff = endTime.getTime() - now.getTime()
    const hoursLeft = diff / (1000 * 60 * 60)
    
    if (hoursLeft <= 24) {
      return (
        <div className="flex items-center gap-1 text-red-600">
          <AlertTriangle className="h-3 w-3" />
          <span className="text-xs font-medium">Urgent</span>
        </div>
      )
    }
    
    return null
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card className={`w-full transition-all duration-200 hover:shadow-lg ${
      status === "active" ? "ring-2 ring-green-200 shadow-md" : ""
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">
              {assessment.name}
            </h3>
            <p className="text-xs text-gray-600">{assessment.unitCode}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {getStatusBadge()}
            {getUrgencyIndicator()}
          </div>
        </div>
      </CardHeader>

      <Toaster position="top-center" />

      <CardContent className="space-y-4">
        {/* Assessment Details */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-gray-500" />
            <span className="text-gray-600">{assessment.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3 text-gray-500" />
            <span className="text-gray-600">{assessment.totalMarks} marks</span>
          </div>
        </div>

        {/* Time Information */}
        <div className="space-y-2">
          {status === "upcoming" && (
            <div className="flex items-center gap-2 text-xs">
              <Calendar className="h-3 w-3 text-blue-600" />
              <span className="text-gray-600">Opens: {formatDate(startTime)}</span>
            </div>
          )}
          
          {(status === "active" || status === "upcoming") && (
            <div className="flex items-center gap-2 text-xs">
              <Timer className="h-3 w-3 text-red-600" />
              <span className="text-gray-600">Due: {formatDate(endTime)}</span>
            </div>
          )}

          {getTimeRemaining() && (
            <div className={`text-xs font-medium ${
              status === "active" ? "text-green-700" : "text-blue-700"
            }`}>
              {getTimeRemaining()}
            </div>
          )}
        </div>

        {/* Attempt Information */}
        {assessment.maxAttempts && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">Attempts:</span>
            <span className="font-medium">
              {assessment.attemptsUsed || 0} / {assessment.maxAttempts}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 flex-col pt-2">
          {status === "active" && (
            <>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex-1 text-xs"
              >
                <Link href={`#`}>
                  <Eye className="h-3 w-3 mr-1" />
                  Instructions
                </Link>
              </Button>
              
              <Button
                asChild
                size="sm"
                className="flex-1 text-xs bg-green-600 hover:bg-green-700"
                disabled={assessment.attemptsUsed === assessment.maxAttempts}
              >
                <Link href={`#`}>
                  <Play className="h-3 w-3 mr-1" />
                  Start Attempt
                </Link>
              </Button>
            </>
          )}

          {status === "upcoming" && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              <Link href={`#`}>
                <Eye className="h-3 w-3 mr-1" />
                View Instructions
              </Link>
            </Button>
          )}

          {status === "completed" && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              <Link href={`#`}>
                <CheckCircle className="h-3 w-3 mr-1" />
                View Results
              </Link>
            </Button>
          )}

          {status === "expired" && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-gray-500"
              disabled
            >
              Assessment Expired
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default StudentAssessmentCard
