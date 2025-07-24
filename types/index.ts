export enum Role {
  ADMIN = "ADMIN",
  LECTURER = "LECTURER",
  STUDENT = "STUDENT",
}

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  createdAt: Date
  lastLogin?: Date
  isActive: boolean
  department?: string
  employeeId?: string
  studentId?: string
}

export interface Course {
  id: string
  name: string
  code: string
  description: string
  credits: number
  department: string
  createdAt: Date
  isActive: boolean
  lecturerId?: string
  lecturer?: User
  enrolledStudents: number
  maxStudents: number
}

export interface Unit {
  id: string
  name: string
  code: string
  description: string
  courseId: string
  course?: Course
  lecturerId?: string
  lecturer?: User
  materials: Material[]
  assessments: Assessment[]
  createdAt: Date
  isActive: boolean
}

export interface Material {
  id: string
  title: string
  description: string
  type: "PDF" | "VIDEO" | "DOCUMENT" | "LINK" | "PRESENTATION"
  url: string
  unitId: string
  uploadedBy: string
  uploadedAt: Date
  size?: string
  downloads: number
}

export interface Assessment {
  id: string
  title: string
  description: string
  type: "QUIZ" | "ASSIGNMENT" | "EXAM" | "PROJECT"
  unitId: string
  totalMarks: number
  passingMarks: number
  dueDate: Date
  createdAt: Date
  isActive: boolean
  submissions: number
  averageScore?: number
}

export interface Cohort {
  id: string
  name: string
  academicYear: string
  startDate: Date
  endDate: Date
  students: User[]
  courses: Course[]
  isActive: boolean
}

export interface ExamResult {
  id: string
  studentId: string
  student: User
  assessmentId: string
  assessment: Assessment
  score: number
  maxScore: number
  submittedAt: Date
  gradedAt?: Date
  feedback?: string
  status: "PENDING" | "GRADED" | "LATE"
}

export interface PlagiarismReport {
  id: string
  studentId: string
  student: User
  assessmentId: string
  assessment: Assessment
  similarityScore: number
  status: "FLAGGED" | "REVIEWED" | "CLEARED"
  reportedAt: Date
  reviewedBy?: string
  notes?: string
}

export interface SystemSettings {
  id: string
  key: string
  value: string
  description: string
  category: "GENERAL" | "SECURITY" | "NOTIFICATIONS" | "ACADEMIC"
  updatedAt: Date
  updatedBy: string
}
