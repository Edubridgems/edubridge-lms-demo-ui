"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, User, LogOut, ChevronDown, Moon, Sun, HelpCircle } from "lucide-react"
import Link from "next/link"

const Dropdowns = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Notifications Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="relative h-9 w-9 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 border border-transparent hover:border-blue-200/50"
          >
            <Bell className="h-4 w-4" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 hover:bg-red-600"
            >
              3
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-80 bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-xl"
        >
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              3 new
            </Badge>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-64 overflow-y-auto">
            <DropdownMenuItem className="flex flex-col items-start p-4 hover:bg-blue-50/80 transition-colors">
              <div className="font-medium text-sm">New Assignment Posted</div>
              <div className="text-xs text-gray-600 mt-1">Mathematics - Due in 3 days</div>
              <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start p-4 hover:bg-blue-50/80 transition-colors">
              <div className="font-medium text-sm">Grade Updated</div>
              <div className="text-xs text-gray-600 mt-1">Physics CAT - 85/100</div>
              <div className="text-xs text-gray-500 mt-1">5 hours ago</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start p-4 hover:bg-blue-50/80 transition-colors">
              <div className="font-medium text-sm">Class Reminder</div>
              <div className="text-xs text-gray-600 mt-1">Computer Science Lab tomorrow at 2 PM</div>
              <div className="text-xs text-gray-500 mt-1">1 day ago</div>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-center text-blue-600 hover:text-blue-700 hover:bg-blue-50/80 transition-colors">
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Settings Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-all duration-300 border border-transparent hover:border-gray-200/50"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-xl"
        >
          <DropdownMenuLabel>Quick Settings</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-50/80 transition-colors">
            <Sun className="h-4 w-4" />
            <span>Light Mode</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-50/80 transition-colors">
            <Moon className="h-4 w-4" />
            <span>Dark Mode</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-50/80 transition-colors">
            <HelpCircle className="h-4 w-4" />
            <span>Help & Support</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-3 h-10 px-3 rounded-lg hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200/50 hover:shadow-sm"
          >
            <Avatar className="h-8 w-8 ring-2 ring-blue-100 ring-offset-1">
              <AvatarImage src="/placeholder.svg" alt="Student" />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-sm font-semibold">
                AJ
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium text-gray-900">Alaric Johnson</span>
              {/* <span className="text-xs text-gray-600"></span> */}
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 bg-white/95 backdrop-blur-md border border-gray-200/60 shadow-xl"
        >
          <DropdownMenuLabel className="flex items-center gap-3 p-4">

            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">Alaric Johnson</span>
              <span className="text-sm text-gray-600">alaric.johnson@university.edu</span>
              <Badge variant="outline" className="w-fit mt-1 bg-green-50 text-green-700 border-green-200">
                Active User
              </Badge>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-blue-50/80 transition-colors">
            <User className="h-4 w-4 text-gray-600" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-3 p-3 hover:bg-blue-50/80 transition-colors">
            <Settings className="h-4 w-4 text-gray-600" />
            <span>Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-3 p-3 text-red-600 hover:text-red-700 hover:bg-red-50/80 transition-colors">
            <Link href={'/'}>
                Back to home screen
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Dropdowns
