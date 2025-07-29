'use client'

import { useAuth } from "@/app/(contexts)/auth.context"

interface PrivateLayoutProps {
  children: React.ReactNode
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-lg">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {children}
    </div>
  )
}

export default PrivateLayout