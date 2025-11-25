export interface PlatformStats {
  totalUsers: number
  totalCourses: number
  assessmentsThisWeek: number
  loginsToday: number
  flaggedExams: number
  systemLoad: number
  activeUsers: number
  serverUptime: number
  storageUsed: number
  totalStorage: number
  avgResponseTime: number
  errorRate: number
}

export interface SystemActivity {
  id: string
  type: 'assessment_created' | 'user_registered' | 'ai_flagged' | 'lecturer_assigned' | 'system_alert' | 'course_updated' | 'plagiarism_detected' | 'maintenance_scheduled'
  title: string
  description: string
  timestamp: Date
  severity: 'info' | 'success' | 'warning' | 'error' | 'critical'
  unitCode?: string
  userName?: string
  metadata?: Record<string, any>
}

export interface RoleDistribution {
  role: string
  count: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
  changePercent: number
}

export interface ActivityData {
  day: string
  active: number
  inactive: number
  total: number
}

export interface AssessmentAIStats {
  assessmentsRunning: number
  flaggedSubmissions: number
  aiReviewsCompleted: number
  totalSubmissions: number
  flaggedPercentage: number
  reviewProgress: number
  averageProcessingTime: number
  accuracyRate: number
}

export interface FlaggedReport {
  id: string
  assessmentTitle: string
  unitCode: string
  flaggedCount: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  lastUpdated: Date
  similarityScore: number
  status: 'pending' | 'reviewing' | 'resolved' | 'escalated'
}

export interface RecentChange {
  id: string
  type: 'course_created' | 'lecturer_assigned' | 'curriculum_updated' | 'system_update' | 'user_added' | 'assessment_modified'
  title: string
  description: string
  changedBy: string
  timestamp: Date
  entityName: string
  entityCode: string
  status: 'completed' | 'pending' | 'failed'
  impact: 'low' | 'medium' | 'high'
}

export interface SystemNotification {
  id: string
  type: 'overdue_grading' | 'locked_users' | 'ai_flagged' | 'system_maintenance' | 'storage_warning' | 'security_alert'
  title: string
  message: string
  severity: 'info' | 'warning' | 'critical' | 'success'
  count?: number
  timestamp: Date
  isRead: boolean
  actionRequired: boolean
  actionUrl?: string
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  href: string
  color: string
  count?: number
}

export interface SystemHealthMetric {
  name: string
  value: number
  unit: string
  status: 'healthy' | 'warning' | 'critical'
  trend: 'up' | 'down' | 'stable'
}
