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

// Componente para mostrar funcionalidades disponíveis
export const AvailableFeatures = () => {
  const { isStaff } = useAuthorization()

  const staffFeatures = [
    "Gerenciar todos os cupons",
    "Visualizar todos os resgates",
    "Acessar relatórios completos",
    "Gerenciar usuários",
    "Configurar sistema"
  ]

  const userFeatures = [
    "Visualizar cupons disponíveis",
    "Realizar resgates",
    "Ver histórico pessoal",
    "Acessar informações básicas"
  ]

  const features = isStaff ? staffFeatures : userFeatures

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-sm">
        Funcionalidades Disponíveis:
      </h4>
      <ul className="text-sm space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
} 