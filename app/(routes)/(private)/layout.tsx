'use client'

import { BaseSidebar } from "@/app/(components)/(layout)/(sidebar)/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

interface PrivateLayoutProps {
  children: React.ReactNode
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <SidebarProvider>
      <BaseSidebar />
      <div className="flex-1 overflow-hidden py-2 pr-2">
        {children}
      </div>
    </SidebarProvider>
  )
}

export default PrivateLayout