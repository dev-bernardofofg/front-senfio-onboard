import { BaseSidebar } from "@/app/(components)/(layout)/(sidebar)/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { requireAuth } from "@/lib/auth"

interface PrivateLayoutProps {
  children: React.ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  await requireAuth()

  return (
    <SidebarProvider>
      <BaseSidebar />
      <div className="flex-1 overflow-hidden py-2 pr-2 base:pl-2 md:pl-0">
        {children}
      </div>
    </SidebarProvider>
  )
}