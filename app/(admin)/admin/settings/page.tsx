"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Settings, Shield, Bell, Database, Save } from "lucide-react"
import { dummySystemSettings } from "@/lib/dummy-data"
import type { SystemSettings } from "@/types"

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings[]>(dummySystemSettings)
  const [hasChanges, setHasChanges] = useState(false)

  const updateSetting = (key: string, value: string) => {
    setSettings(
      settings.map((setting) => (setting.key === key ? { ...setting, value, updatedAt: new Date() } : setting)),
    )
    setHasChanges(true)
  }

  const saveSettings = () => {
    // In a real app, this would save to the backend
    setHasChanges(false)
  }

  const generalSettings = settings.filter((s) => s.category === "GENERAL")
  const securitySettings = settings.filter((s) => s.category === "SECURITY")
  const notificationSettings = settings.filter((s) => s.category === "NOTIFICATIONS")
  const academicSettings = settings.filter((s) => s.category === "ACADEMIC")

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings and preferences</p>
        </div>
        {hasChanges && (
          <Button onClick={saveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription>Basic system configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="system-name">System Name</Label>
                  <Input id="system-name" defaultValue="EduBridge LMS" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-upload">Maximum File Upload Size</Label>
                  <Select defaultValue="100MB">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50MB">50 MB</SelectItem>
                      <SelectItem value="100MB">100 MB</SelectItem>
                      <SelectItem value="200MB">200 MB</SelectItem>
                      <SelectItem value="500MB">500 MB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Select defaultValue="UTC">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Enable to restrict system access for maintenance
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
              <CardDescription>Security and authentication configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="30"
                    onChange={(e) => updateSetting("SESSION_TIMEOUT", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-policy">Password Policy</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (6+ characters)</SelectItem>
                      <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                      <SelectItem value="high">High (12+ chars, symbols required)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <div className="text-sm text-muted-foreground">Require 2FA for admin accounts</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login Attempt Limiting</Label>
                    <div className="text-sm text-muted-foreground">Lock accounts after failed attempts</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-server">SMTP Server</Label>
                  <Input id="smtp-server" placeholder="smtp.example.com" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input id="smtp-port" defaultValue="587" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-security">Security</Label>
                    <Select defaultValue="tls">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="tls">TLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-email">From Email Address</Label>
                  <Input id="from-email" placeholder="noreply@edubridge.edu" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Assignment Due Reminders</Label>
                    <div className="text-sm text-muted-foreground">Send email reminders before due dates</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Grade Notifications</Label>
                    <div className="text-sm text-muted-foreground">Notify students when grades are posted</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Academic Settings</span>
              </CardTitle>
              <CardDescription>Academic policies and grading configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="plagiarism-threshold">Plagiarism Detection Threshold (%)</Label>
                  <Input
                    id="plagiarism-threshold"
                    type="number"
                    defaultValue="25"
                    min="0"
                    max="100"
                    onChange={(e) => updateSetting("PLAGIARISM_THRESHOLD", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade-scale">Grading Scale</Label>
                  <Select defaultValue="percentage">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (0-100)</SelectItem>
                      <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
                      <SelectItem value="gpa">GPA Scale (0-4.0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passing-grade">Minimum Passing Grade</Label>
                  <Input id="passing-grade" type="number" defaultValue="60" min="0" max="100" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Late Submission Penalties</Label>
                    <div className="text-sm text-muted-foreground">Apply automatic penalties for late submissions</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Plagiarism Checking</Label>
                    <div className="text-sm text-muted-foreground">Check all submissions automatically</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Current Settings Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Current Settings Summary</CardTitle>
          <CardDescription>Overview of key system settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {settings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{setting.key.replace(/_/g, " ")}</div>
                  <div className="text-sm text-muted-foreground">{setting.description}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{setting.value}</Badge>
                  <Badge variant="secondary" className="text-xs">
                    {setting.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
