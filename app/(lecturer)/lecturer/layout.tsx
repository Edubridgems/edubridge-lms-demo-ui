import Dropdowns from "@/components/shared/Dropdowns"
import Appsidebar from "@/components/sidebars/Appsidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Role } from "@/constants/constants"

export default function LecturerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="p-2 rounded-md overflow-hidden bg-sidebar/15">
        <Appsidebar role={Role.LECTURER} />
        <main className="w-full min-h-screen bg-white/55 shadow-md rounded-md overflow-hidden">
          <SidebarInset className="border-b flex items-center justify-between flex-row px-3 border-b-caribbean-current-100 h-14 bg-white/55">
            <SidebarTrigger />
          <Dropdowns />
          </SidebarInset>
          <div className="p-2 w-full h-full">
          {children}
          </div>

        </main>
    </SidebarProvider>
  )
}

