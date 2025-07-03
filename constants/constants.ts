enum Role {
    "ADMIN",
    "LECTURER",
    "STUDENT"
}

type nav = {
  name:string;
  href: string
}

type navlist = nav[]


export interface Assessment {
  id: string
  name: string
  type: "exam" | "cat" | "assignment" | (string & {})
  unitCode: string
  lecturerId: string
  duration: string
  totalMarks: number
  startTime: Date
  endTime: Date
  created_at: Date
  isPublished: boolean
  maxAttempts?: number
  attemptsUsed?: number
  instructions?: string
}

export interface LearningMaterial {
  id:string;
  name: string;
  type: 'video'| 'pptx'| 'pdf'| (string & {})
  size:string;
  courseid:string;
  courseName:string;
}


export interface Transcript {
  name: string;
  examPeriod: string;
  studyYear:string;
}


export const Transcripts:Transcript[] =[
  {
    name: 'First  semester Transcript',
    examPeriod: 'April-May 2024',
    studyYear: '1'
  },
    {
    name: 'Second  semester Transcript',
    examPeriod: 'August-september 2024',
    studyYear: '1'
  }

]




export const LearningMaterials: LearningMaterial[] = [
  {
    id:'1',
    name: 'Introduction to operating system',
    type: 'pptx',
    size: '3mb',
    courseid: '12',
    courseName: 'Operating systems'
  },
    {
    id:'1',
    name: 'Diving deep into the kernel',
    type: 'video',
    size: '3mb',
    courseid: '12',
    courseName: 'Operating systems'
  },
    {
    id:'1',
    name: 'Elements of an operating system',
    type: 'pdf',
    size: '3mb',
    courseid: '12',
    courseName: 'Operating systems'
  }
]

export const assessments = [
  {
    id: "1",
    name: "Mathematics Exam",
    type: "exam",
    unitCode: "MATH101",
    lecturerId: "Dr. Smith",
    duration: "2h 30m",
    totalMarks: 100,
    startTime: new Date(new Date().setDate(new Date().getDate() + 1)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 2),
    created_at: new Date(),
    isPublished: true,
    maxAttempts: 2,
    attemptsUsed: 0,
    instructions: "Read all instructions carefully before starting the exam."
  },
  {
    id: "2",
    name: "Physics CAT",
    type: "cat",
    unitCode: "PHYS201",
    lecturerId: "Prof. Johnson",
    duration: "1h",
    totalMarks: 50,
    startTime: new Date(new Date().setDate(new Date().getDate() + 3)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 3)).setHours(new Date().getHours() + 1),
    created_at: new Date(),
    isPublished: true,
    maxAttempts: 1,
    attemptsUsed: 0,
    instructions: "Answer all questions."
  },
  {
    id: "3",
    name: "Computer Science Assignment",
    type: "assignment",
    unitCode: "CS101",
    lecturerId: "Dr. Lee",
    duration: "7 days",
    totalMarks: 80,
    startTime: new Date(new Date().setDate(new Date().getDate() + 5)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 12)),
    created_at: new Date(),
    isPublished: true,
    maxAttempts: 1,
    attemptsUsed: 0,
    instructions: "Submit your code and a report."
  },
  {
    id: "4",
    name: "Chemistry Exam",
    type: "exam",
    unitCode: "CHEM101",
    lecturerId: "Prof. Brown",
    duration: "2h",
    totalMarks: 120,
    startTime: new Date(new Date().setDate(new Date().getDate() + 7)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 7)).setHours(new Date().getHours() + 2),
    created_at: new Date(),
    isPublished: false,
    maxAttempts: 3,
    attemptsUsed: 1,
    instructions: "Answer all questions clearly and concisely."
  },
  {
    id: "5",
    name: "Biology CAT",
    type: "cat",
    unitCode: "BIO201",
    lecturerId: "Dr. Wilson",
    duration: "1h 30m",
    totalMarks: 60,
    startTime: new Date(new Date().setDate(new Date().getDate() + 9)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 9)).setHours(new Date().getHours() + 1),
    created_at: new Date(),
    isPublished: true,
    maxAttempts: 1,
    attemptsUsed: 1,
    instructions: "Choose the best answer for each question."
  },
  {
    id: "6",
    name: "Engineering Assignment",
    type: "assignment",
    unitCode: "ENG101",
    lecturerId: "Prof. Davis",
    duration: "10 days",
    totalMarks: 90,
    startTime: new Date(new Date().setDate(new Date().getDate() + 11)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 21)),
    created_at: new Date(),
    isPublished: true,
    maxAttempts: 1,
    attemptsUsed: 0,
    instructions: "Follow the guidelines provided in the assignment brief."
  }
]
export {
    Role
};
    
export type {
    nav,
    navlist
};


