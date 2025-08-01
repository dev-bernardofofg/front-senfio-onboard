'use client'

import { BaseSidebar } from '@/app/(components)/(layout)/(sidebar)/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

interface PrivateLayoutProps {
  children: React.ReactNode
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <SidebarProvider>
      <BaseSidebar />
      <div className="flex-1 overflow-hidden py-2 pr-2 base:pl-2 md:pl-0">
        {children}
      </div>
    </SidebarProvider>
  )
}
