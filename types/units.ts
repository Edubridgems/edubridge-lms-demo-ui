export interface Unit {
  id: string
  code: string
  name: string
  description?: string
  creditHours: number
  semester: string
  academicYear: string

  // Lecturer Information
  lecturer: {
    id: string
    name: string
    email: string
    office?: string
    consultationHours?: string
  }

  // Schedule Information
  schedule: {
    day: string
    startTime: string
    endTime: string
    venue: string
    type: "lecture" | "tutorial" | "lab" | "seminar"
  }[]

  // Academic Progress
  currentGrade?: string
  gradePoints?: number
  attendance: {
    attended: number
    total: number
    percentage: number
  }

  // Unit Status
  enrollmentStatus: "enrolled" | "dropped" | "completed" | "pending"
  isActive: boolean

  // Academic Content
  upcomingAssessments: number
  totalAssessments: number
  completedAssessments: number

  // Resources
  hasOnlineMaterials: boolean
  lastMaterialUpdate?: Date

  // Dates
  startDate: Date
  endDate: Date
  enrolledDate: Date
}

export interface UnitProgress {
  assignments: {
    completed: number
    total: number
    averageScore?: number
  }
  exams: {
    completed: number
    total: number
    averageScore?: number
  }
  cats: {
    completed: number
    total: number
    averageScore?: number
  }
  overallProgress: number // percentage
}
