"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar";

export const SidebarGroupCustom = ({ children, label }: { children: React.ReactNode, label: string }) => {
  return (
    <SidebarGroup className="flex flex-col gap-2">
      <SidebarGroupLabel>
        <span>{label}</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        {children}
      </SidebarGroupContent>
    </SidebarGroup>
  );
};