import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface UserBreakdownProps {
  roleDistribution: {
    role: string
    count: number
    percentage: number
  }[]
  activityData: {
    day: string
    active: number
    inactive: number
  }[]
  totalUsers: number
}

const UserRoleBreakdown = ({ roleDistribution, activityData, totalUsers }: UserBreakdownProps) => {
  const COLORS = {
    Students: "#3b82f6",
    Lecturers: "#10b981",
    Admins: "#f59e0b",
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-sm text-gray-600">{`${payload[0].payload.percentage}% of total`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Role Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Role Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.role as keyof typeof COLORS]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {roleDistribution.map((item) => (
              <div key={item.role} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[item.role as keyof typeof COLORS] }}
                  />
                  <span className="text-sm font-medium">{item.role}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">{item.count}</span>
                  <span className="text-xs text-gray-500 ml-1">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            User Activity (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="active" stackId="a" fill="#10b981" name="Active Users" />
                <Bar dataKey="inactive" stackId="a" fill="#ef4444" name="Inactive Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {activityData.reduce((sum, day) => sum + day.active, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {activityData.reduce((sum, day) => sum + day.inactive, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Inactive</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UserRoleBreakdown
