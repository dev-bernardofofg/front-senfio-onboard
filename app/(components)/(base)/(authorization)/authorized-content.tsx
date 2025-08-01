'use client'

import { useAuth } from '@/app/(contexts)/auth.context'
import { ReactNode } from 'react'

interface AuthorizedContentProps {
  children: ReactNode
  requireStaff?: boolean
  requireNonStaff?: boolean
  fallback?: ReactNode
}

export const AuthorizedContent = ({
  children,
  requireStaff = false,
  requireNonStaff = false,
  fallback = null,
}: AuthorizedContentProps) => {
  const { user } = useAuth()

  // Se não há usuário, não mostra nada
  if (!user) {
    return fallback
  }

  // Se requer staff e usuário não é staff
  if (requireStaff && !user.is_staff) {
    return fallback
  }

  // Se requer não-staff e usuário é staff
  if (requireNonStaff && user.is_staff) {
    return fallback
  }

  // Se não há restrições ou as condições são atendidas
  return <>{children}</>
}

// Componente específico para conteúdo apenas para staff
export const StaffOnly = ({
  children,
  fallback,
}: {
  children: ReactNode
  fallback?: ReactNode
}) => (
  <AuthorizedContent requireStaff={true} fallback={fallback}>
    {children}
  </AuthorizedContent>
)

// Componente específico para conteúdo apenas para não-staff
export const NonStaffOnly = ({
  children,
  fallback,
}: {
  children: ReactNode
  fallback?: ReactNode
}) => (
  <AuthorizedContent requireNonStaff={true} fallback={fallback}>
    {children}
  </AuthorizedContent>
)
