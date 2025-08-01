import {
  type User,
  type Course,
  type Unit,
  type Material,
  type Assessment,
  type Cohort,
  type ExamResult,
  type PlagiarismReport,
  type SystemSettings,
  Role,
} from "@/types"

export const dummyUsers: User[] = [
//   {
//     id: "1",
//     name: "John Smith",
//     email: "john.smith@edubridge.edu",
//     role: Role.ADMIN,
//     avatar: "/placeholder.svg?height=40&width=40",
//     createdAt: new Date("2024-01-15"),
//     lastLogin: new Date("2024-12-18"),
//     isActive: true,
//     department: "Administration",
//     employeeId: "EMP001",
//   },
//   {
//     id: "2",
//     name: "Dr. Sarah Johnson",
//     email: "sarah.johnson@edubridge.edu",
//     role: Role.LECTURER,
//     avatar: "/placeholder.svg?height=40&width=40",
//     createdAt: new Date("2024-02-01"),
//     lastLogin: new Date("2024-12-17"),
//     isActive: true,
//     department: "Computer Science",
//     employeeId: "EMP002",
//   },
//   {
//     id: "3",
//     name: "Prof. Michael Brown",
//     email: "michael.brown@edubridge.edu",
//     role: Role.LECTURER,
//     avatar: "/placeholder.svg?height=40&width=40",
//     createdAt: new Date("2024-01-20"),
//     lastLogin: new Date("2024-12-16"),
//     isActive: true,
//     department: "Mathematics",
//     employeeId: "EMP003",
//   },
//   {
//     id: "4",
//     name: "Alice Wilson",
//     email: "alice.wilson@student.edubridge.edu",
//     role: Role.STUDENT,
//     avatar: "/placeholder.svg?height=40&width=40",
//     createdAt: new Date("2024-09-01"),
//     lastLogin: new Date("2024-12-18"),
//     isActive: true,
//     department: "Computer Science",
//     studentId: "STU001",
//   },
//   {
//     id: "5",
//     name: "Bob Davis",
//     email: "bob.davis@student.edubridge.edu",
//     role: Role.STUDENT,
//     avatar: "/placeholder.svg?height=40&width=40",
//     createdAt: new Date("2024-09-01"),
//     lastLogin: new Date("2024-12-17"),
//     isActive: true,
//     department: "Mathematics",
//     studentId: "STU002",
//   },
]

export const dummyCourses: Course[] = [
//   {
//     id: "1",
//     name: "Introduction to Programming",
//     code: "CS101",
//     description: "Fundamental concepts of programming using Python",
//     credits: 3,
//     department: "Computer Science",
//     createdAt: new Date("2024-01-10"),
//     isActive: true,
//     lecturerId: "2",
//     lecturer: dummyUsers[1],
//     enrolledStudents: 45,
//     maxStudents: 50,
//   },
//   {
//     id: "2",
//     name: "Data Structures and Algorithms",
//     code: "CS201",
//     description: "Advanced data structures and algorithmic problem solving",
//     credits: 4,
//     department: "Computer Science",
//     createdAt: new Date("2024-01-12"),
//     isActive: true,
//     lecturerId: "2",
//     lecturer: dummyUsers[1],
//     enrolledStudents: 38,
//     maxStudents: 40,
//   },
//   {
//     id: "3",
//     name: "Calculus I",
//     code: "MATH101",
//     description: "Differential and integral calculus",
//     credits: 4,
//     department: "Mathematics",
//     createdAt: new Date("2024-01-08"),
//     isActive: true,
//     lecturerId: "3",
//     lecturer: dummyUsers[2],
//     enrolledStudents: 52,
//     maxStudents: 60,
//   },
//   {
//     id: "4",
//     name: "Web Development",
//     code: "CS301",
//     description: "Modern web development with React and Node.js",
//     credits: 3,
//     department: "Computer Science",
//     createdAt: new Date("2024-02-01"),
//     isActive: true,
//     enrolledStudents: 0,
//     maxStudents: 35,
//   },
]

export const dummyUnits: Unit[] = [
//   {
//     id: "1",
//     name: "Python Basics",
//     code: "CS101-U1",
//     description: "Introduction to Python syntax and basic programming concepts",
//     courseId: "1",
//     course: dummyCourses[0],
//     lecturerId: "2",
//     lecturer: dummyUsers[1],
//     materials: [],
//     assessments: [],
//     createdAt: new Date("2024-01-15"),
//     isActive: true,
//   },
//   {
//     id: "2",
//     name: "Control Structures",
//     code: "CS101-U2",
//     description: "Loops, conditionals, and program flow control",
//     courseId: "1",
//     course: dummyCourses[0],
//     lecturerId: "2",
//     lecturer: dummyUsers[1],
//     materials: [],
//     assessments: [],
//     createdAt: new Date("2024-01-20"),
//     isActive: true,
//   },
//   {
//     id: "3",
//     name: "Arrays and Lists",
//     code: "CS201-U1",
//     description: "Linear data structures and their implementations",
//     courseId: "2",
//     course: dummyCourses[1],
//     lecturerId: "2",
//     lecturer: dummyUsers[1],
//     materials: [],
//     assessments: [],
//     createdAt: new Date("2024-01-25"),
//     isActive: true,
//   },
]

export const dummyMaterials: Material[] = [
//   {
//     id: "1",
//     title: "Python Installation Guide",
//     description: "Step-by-step guide to install Python on different operating systems",
//     type: "PDF",
//     url: "/materials/python-install.pdf",
//     unitId: "1",
//     uploadedBy: "2",
//     uploadedAt: new Date("2024-01-16"),
//     size: "2.5 MB",
//     downloads: 45,
//   },
//   {
//     id: "2",
//     title: "Variables and Data Types",
//     description: "Video lecture on Python variables and data types",
//     type: "VIDEO",
//     url: "/materials/variables-datatypes.mp4",
//     unitId: "1",
//     uploadedBy: "2",
//     uploadedAt: new Date("2024-01-18"),
//     size: "125 MB",
//     downloads: 42,
//   },
//   {
//     id: "3",
//     title: "Loop Examples",
//     description: "Code examples demonstrating different types of loops",
//     type: "DOCUMENT",
//     url: "/materials/loop-examples.docx",
//     unitId: "2",
//     uploadedBy: "2",
//     uploadedAt: new Date("2024-01-22"),
//     size: "1.2 MB",
//     downloads: 38,
//   },
]

export const dummyAssessments: Assessment[] = [
//   {
//     id: "1",
//     title: "Python Basics Quiz",
//     description: "Multiple choice quiz on Python fundamentals",
//     type: "QUIZ",
//     unitId: "1",
//     totalMarks: 20,
//     passingMarks: 12,
//     dueDate: new Date("2024-02-15"),
//     createdAt: new Date("2024-01-20"),
//     isActive: true,
//     submissions: 43,
//     averageScore: 16.5,
//   },
//   {
//     id: "2",
//     title: "Programming Assignment 1",
//     description: "Write a Python program to solve basic mathematical problems",
//     type: "ASSIGNMENT",
//     unitId: "2",
//     totalMarks: 50,
//     passingMarks: 30,
//     dueDate: new Date("2024-02-28"),
//     createdAt: new Date("2024-01-25"),
//     isActive: true,
//     submissions: 35,
//     averageScore: 42.3,
//   },
]

export const dummyCohorts: Cohort[] = [
//   {
//     id: "1",
//     name: "Computer Science 2024",
//     academicYear: "2024-2025",
//     startDate: new Date("2024-09-01"),
//     endDate: new Date("2025-06-30"),
//     students: [dummyUsers[3]],
//     courses: [dummyCourses[0], dummyCourses[1]],
//     isActive: true,
//   },
//   {
//     id: "2",
//     name: "Mathematics 2024",
//     academicYear: "2024-2025",
//     startDate: new Date("2024-09-01"),
//     endDate: new Date("2025-06-30"),
//     students: [dummyUsers[4]],
//     courses: [dummyCourses[2]],
//     isActive: true,
//   },
]

export const dummyExamResults: ExamResult[] = [
//   {
//     id: "1",
//     studentId: "4",
//     student: dummyUsers[3],
//     assessmentId: "1",
//     assessment: dummyAssessments[0],
//     score: 18,
//     maxScore: 20,
//     submittedAt: new Date("2024-02-14"),
//     gradedAt: new Date("2024-02-15"),
//     feedback: "Excellent work! Good understanding of Python basics.",
//     status: "GRADED",
//   },
//   {
//     id: "2",
//     studentId: "4",
//     student: dummyUsers[3],
//     assessmentId: "2",
//     assessment: dummyAssessments[1],
//     score: 45,
//     maxScore: 50,
//     submittedAt: new Date("2024-02-27"),
//     gradedAt: new Date("2024-03-01"),
//     feedback: "Good programming logic. Minor improvements needed in code structure.",
//     status: "GRADED",
//   },
]

export const dummyPlagiarismReports: PlagiarismReport[] = [
//   {
//     id: "1",
//     studentId: "4",
//     student: dummyUsers[3],
//     assessmentId: "2",
//     assessment: dummyAssessments[1],
//     similarityScore: 15,
//     status: "CLEARED",
//     reportedAt: new Date("2024-02-28"),
//     reviewedBy: "2",
//     notes: "Low similarity score, likely due to common programming patterns.",
//   },
//   {
//     id: "2",
//     studentId: "5",
//     student: dummyUsers[4],
//     assessmentId: "1",
//     assessment: dummyAssessments[0],
//     similarityScore: 85,
//     status: "FLAGGED",
//     reportedAt: new Date("2024-02-15"),
//     notes: "High similarity detected. Requires manual review.",
//   },
]

export const dummySystemSettings: SystemSettings[] = [
//   {
//     id: "1",
//     key: "MAX_FILE_UPLOAD_SIZE",
//     value: "100MB",
//     description: "Maximum file size allowed for material uploads",
//     category: "GENERAL",
//     updatedAt: new Date("2024-01-10"),
//     updatedBy: "1",
//   },
//   {
//     id: "2",
//     key: "PLAGIARISM_THRESHOLD",
//     value: "25",
//     description: "Similarity percentage threshold for plagiarism detection",
//     category: "ACADEMIC",
//     updatedAt: new Date("2024-01-15"),
//     updatedBy: "1",
//   },
//   {
//     id: "3",
//     key: "SESSION_TIMEOUT",
//     value: "30",
//     description: "User session timeout in minutes",
//     category: "SECURITY",
//     updatedAt: new Date("2024-01-20"),
//     updatedBy: "1",
//   },
]
