'use client'

import { Role } from '@/constants/constants';
import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { Home, Users, BookOpen, ClipboardList, FileCheck2, LayoutDashboard, GraduationCap, FileText, MonitorCheck, BarChart3, CalendarDays, MessageSquare, Upload, Settings, LogOut } from 'lucide-react';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

type SidebarProps = {
  role: Role;
};

const AppSidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname()

  const getMenuItems = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return [
          { label: 'Dashboard Overview', icon: <LayoutDashboard className="h-5 w-5" />, href: '/admin' },
          { label: 'Manage Users', icon: <Users className="h-5 w-5" />, href: '/admin/users' },
          { label: 'Manage Courses', icon: <BookOpen className="h-5 w-5" />, href: '/admin/courses' },
          { label: 'Unit Library', icon: <FileText className="h-5 w-5" />, href: '/admin/units' },
          { label: 'Cohorts & Academic Years', icon: <CalendarDays className="h-5 w-5" />, href: '/admin/cohorts' },
          { label: 'Exam Setup', icon: <ClipboardList className="h-5 w-5" />, href: '/admin/exams' },
          { label: 'Performance Reports', icon: <BarChart3 className="h-5 w-5" />, href: '/admin/reports' },
          { label: 'Plagiarism Checks', icon: <MonitorCheck className="h-5 w-5" />, href: '/admin/plagiarism' },
          { label: 'System Settings', icon: <Settings className="h-5 w-5" />, href: '/admin/settings' },
        ];
      case Role.LECTURER:
        return [
          { label: 'My Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, href: '/lecturer' },
          { label: 'Assigned Units', icon: <BookOpen className="h-5 w-5" />, href: '/lecturer/units' },
          { label: 'Upload Materials', icon: <Upload className="h-5 w-5" />, href: '/lecturer/materials' },
          { label: 'Manage Assessments', icon: <ClipboardList className="h-5 w-5" />, href: '/lecturer/assessments' },
          { label: 'Exam Results & Marking', icon: <FileCheck2 className="h-5 w-5" />, href: '/lecturer/results' },
          { label: 'Plagiarism Flags', icon: <MonitorCheck className="h-5 w-5" />, href: '/lecturer/plagiarism' },
          { label: 'Student Feedback', icon: <MessageSquare className="h-5 w-5" />, href: '/lecturer/feedback' },
        ];
      case Role.STUDENT:
        return [
          { label: 'My Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, href: '/student' },
          // { label: 'My Enrolled Courses', icon: <BookOpen className="h-5 w-5" />, href: '/student/courses' },
          { label: 'Active Units', icon: <ClipboardList className="h-5 w-5" />, href: '/student/units' },
          { label: 'Learning Materials', icon: <FileText className="h-5 w-5" />, href: '/student/materials' },
          // { label: 'Take Assessments', icon: <FileCheck2 className="h-5 w-5" />, href: '/student/assessments' },
          { label: 'View Results', icon: <GraduationCap className="h-5 w-5" />, href: '/student/results' },
          // { label: 'Plagiarism Reports', icon: <MonitorCheck className="h-5 w-5" />, href: '/student/plagiarism' },
          // { label: 'Feedback & Support', icon: <MessageSquare className="h-5 w-5" />, href: '/student/support' },
        ];
      default:
        return [];
    }
  };

  const items = getMenuItems(role);

  return (
    <Sidebar className="border-r border-gray-200/80 shadow-md shadow-black/45">
      <SidebarHeader className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-b border-gray-200/60">
        <div className="py-6 flex items-center justify-start gap-4 text-2xl px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 shadow-lg">
            <GraduationCap size={28} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              EduBridge
            </h1>
            {/* <p className="text-xs text-gray-600 font-medium">Learning Management</p> */}
          </div>
        </div>
      </SidebarHeader>

      <Separator className="bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 h-0.5" />

      <SidebarContent className="bg-gradient-to-b from-gray-50/30 to-white px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {getMenuItems(role).map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className="w-full h-12 group">
                    <Link 
                      href={item.href} 
                      className={cn(
                        'w-full h-12 flex items-center justify-start gap-4 px-4 rounded-xl font-medium text-sm transition-all duration-300 ease-out relative overflow-hidden',
                        'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-md hover:scale-[1.02] hover:border-blue-200/50 border border-transparent',
                        pathname === item.href 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 border-blue-500/20' 
                          : 'text-gray-700 hover:text-gray-900'
                      )}
                    >
                      <div className={cn(
                        'flex items-center justify-center transition-all duration-300',
                        pathname === item.href ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'
                      )}>
                        {item.icon}
                      </div>
                      <span className="flex-1 font-medium tracking-wide">
                        {item.label}
                      </span>
                      {pathname === item.href && (
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/30 rounded-l-full" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200/60">
        <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-sm border border-gray-200/60 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-start gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-blue-100 ring-offset-2">
              <AvatarImage src={'/wind.png'} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-semibold text-sm">
                US
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold text-gray-900">
                {Role[role]}
              </h2>
              <p className="text-xs text-gray-600 font-medium">
                demo@gmail.com
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600 transition-all duration-300 rounded-lg group"
          >
            <LogOut 
              size={18} 
              className="text-gray-500 group-hover:text-red-600 transition-colors duration-300" 
            />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
