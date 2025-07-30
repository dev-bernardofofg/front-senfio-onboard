"use client"

import { useAuth } from "@/app/(contexts)/auth.context";
import { FN_UTILS_STRING } from "@/app/(resources)/(helpers)/string";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChevronUp, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { RoleInfo } from "../../(base)/(authorization)/role-based-content";

export const SidebarProfile = () => {
  const { user, signOut } = useAuth();
  const { setTheme, resolvedTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
        >
          <Avatar className="size-8 rounded-full">
            <AvatarFallback className="rounded-lg bg-primary text-white">
              {FN_UTILS_STRING.avatarUser(user?.email || "")}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 space-y-0.5 text-left text-sm leading-tight">
            <span className="truncate text-xs text-foreground">{user?.email}</span>
            <RoleInfo />
          </div>
          <ChevronUp className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="top"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
            <User className="size-4" />
            <span>Perfil</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={toggleTheme} className="flex items-center gap-2 cursor-pointer">
          {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          <span>Trocar Tema</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="size-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
