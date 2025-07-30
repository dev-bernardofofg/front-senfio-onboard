"use client"

import { useAuthorization } from "@/hooks/use-authorization"
import { Shield, User } from "lucide-react"
import { ReactNode } from "react"

interface RoleBasedContentProps {
  staffContent?: ReactNode
  nonStaffContent?: ReactNode
  fallback?: ReactNode
}

export const RoleBasedContent = ({
  staffContent,
  nonStaffContent,
  fallback
}: RoleBasedContentProps) => {
  const { isStaff, isNonStaff } = useAuthorization()

  if (isStaff && staffContent) {
    return <>{staffContent}</>
  }

  if (isNonStaff && nonStaffContent) {
    return <>{nonStaffContent}</>
  }

  return fallback || null
}

// Componente para mostrar informações específicas do papel
export const RoleInfo = () => {
  const { isStaff, user } = useAuthorization()

  if (!user) return null

  return (
    <div className="flex items-center gap-1">
      {isStaff ? (
        <>
          <Shield className="size-3.5  text-blue-600" />
          <span className="text-xs text-muted-foreground">Admin</span>
        </>
      ) : (
        <>
          <User className="size-3.5 text-green-600" />
          <span className="text-xs text-muted-foreground">Usuário</span>
        </>
      )}
    </div>
  )
}