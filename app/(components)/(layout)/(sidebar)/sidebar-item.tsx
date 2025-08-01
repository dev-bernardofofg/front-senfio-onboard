'use client'

import { usePathname } from 'next/navigation'

import { useSidebar } from '@/components/ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface SidebarItemProps {
  href: string
  title: string
  Icon: LucideIcon
}

export const SidebarItem = ({ Icon, href, title }: SidebarItemProps) => {
  const pathname = usePathname()
  const active = pathname === href
  const { toggleSidebar } = useSidebar()
  const isMobile = useIsMobile()

  return (
    <Link
      href={href}
      onClick={() => isMobile && toggleSidebar()}
      id="sidebar-item"
      className={`group/item flex gap-2 w-full items-center transition-all text-sm relative p-2 rounded-md ${
        active
          ? 'text-primary bg-primary/20'
          : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
      }`}
    >
      <div
        className={`w-1 h-5 absolute left-0 top-1/2 -translate-y-1/2 rounded-full ${
          active ? 'bg-primary' : 'group-hover/item:bg-primary'
        }`}
      />
      <div className="flex items-center gap-3">
        <Icon className="size-4" />
        <span>{title}</span>
      </div>
    </Link>
  )
}
