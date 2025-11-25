"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GraduationCap, BookOpen, Users, Shield } from "lucide-react"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const Home = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Dummy credentials for each role
    const dummyUsers = {
      admin: {
        email: "admin@edubridge.edu",
        password: "admin123",
        redirect: "/admin",
        role: "Administrator",
      },
      lecturer: {
        email: "lecturer@edubridge.edu",
        password: "lecturer123",
        redirect: "/lecturer",
        role: "Lecturer",
      },
      student: {
        email: "student@edubridge.edu",
        password: "student123",
        redirect: "/student",
        role: "Student",
      },
    }

    let loggedIn = false
    for (const role in dummyUsers) {
      const user = dummyUsers[role as keyof typeof dummyUsers]
      if (email === user.email && password === user.password) {
        // Success animation could be added here
        router.push(user.redirect)
        loggedIn = true
        break
      }
    }

    if (!loggedIn) {
      alert("Invalid credentials. Please check your email and password.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via--900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">EduBridge</h1>
          <p className="text-blue-200 text-lg">Learning Management System</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-white">Welcome Back</CardTitle>
            <CardDescription className="text-blue-200">Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Credentials */}
            {/* <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Demo Credentials
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-blue-200">
                  <Shield className="w-3 h-3" />
                  <span className="font-medium">Admin:</span>
                  <span>admin@edubridge.edu / admin123</span>
                </div>
                <div className="flex items-center gap-2 text-green-200">
                  <BookOpen className="w-3 h-3" />
                  <span className="font-medium">Lecturer:</span>
                  <span>lecturer@edubridge.edu / lecturer123</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-200">
                  <Users className="w-3 h-3" />
                  <span className="font-medium">Student:</span>
                  <span>student@edubridge.edu / student123</span>
                </div>
              </div>
            </div> */}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-200/80 text-sm">
          <p>&copy; 2024 EduBridge LMS. Empowering Education Through Technology.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
