import type React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Role } from "@/constants/constants"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import AppSidebar from "@/components/sidebars/Appsidebar"
import Dropdowns from "@/components/shared/Dropdowns"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // This would typically come from your auth context or API
  const currentUser = {
    name: "Alaric Johnson",
    email: "alaric.johnson@university.edu",
    avatar: "/avatars/alaric.jpg",
    initials: "AJ",
    role: Role.STUDENT, // This would be dynamic based on the logged-in user
  }

  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <AppSidebar role={currentUser.role}  />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
              
              <span>
                <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
                </span>
              {/* <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">{Role[currentUser.role]} Portal</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb> */}
              <Dropdowns />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
