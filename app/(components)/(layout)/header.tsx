"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  actions?: React.ReactNode[]
  title: string
}

export const Header = ({ actions, title }: HeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <header className="h-12 bg-card">
      <div className="flex items-center justify-between gap-3 px-4 h-full">
        {isMobile && (
          <SidebarTrigger />
        )}
        <div className="flex items-center gap-3 w-full">
          <h1 className="base:text-base md:text-lg font-bold text-slate-950 dark:text-white">{title}</h1>
        </div>
        {actions && (
          <div className="flex items-center gap-3 w-fit">
            {actions.map((action, index) => (
              <div key={index}>
                {action}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};