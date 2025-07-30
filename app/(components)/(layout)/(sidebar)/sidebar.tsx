"use client";

import { StaffOnly } from "@/app/(components)/(base)/(authorization)/authorized-content";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { BarChart3, Home, Settings, Ticket, Users } from "lucide-react";
import Image from "next/image";
import { SidebarGroupCustom } from "./sidebar-group";
import { SidebarItem } from "./sidebar-item";
import { SidebarProfile } from "./sidebar-profile";

export const BaseSidebar = () => {
  return (
    <Sidebar variant="floating">
      <SidebarHeader className="pt-4">
        <div className="relative w-full h-12">
          <Image src="/logo-s3-light.svg" alt="Senfio" fill className="object-contain" />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroupCustom label="Início">
          <SidebarItem Icon={Home} href="/dashboard" title="Dashboard" />
        </SidebarGroupCustom>
        <SidebarGroupCustom label="Gestão">
          <SidebarItem Icon={Ticket} href="/cupons" title="Cupons" />
        </SidebarGroupCustom>

        <StaffOnly>
          <SidebarGroupCustom label="Administração">
            <SidebarItem Icon={Users} href="/admin/users" title="Usuários" />
            <SidebarItem Icon={BarChart3} href="/admin/analytics" title="Analytics" />
            <SidebarItem Icon={Settings} href="/admin/settings" title="Configurações" />
          </SidebarGroupCustom>
        </StaffOnly>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarProfile />
      </SidebarFooter>
    </Sidebar >
  );
};