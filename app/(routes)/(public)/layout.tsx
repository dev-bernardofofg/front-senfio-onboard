import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Fade } from "@/app/(components)/(motion)/fade"

interface PublicLayoutProps {
  children: React.ReactNode
}

export default async function PublicLayout({ children }: PublicLayoutProps) {
  // Se o usuário já está autenticado, redireciona para dashboard
  const session = await getSession()
  if (session) {
    redirect('/dashboard')
  }
  
  return (
    <Fade className="flex flex-col items-center justify-center h-screen">
      {children}
    </Fade>
  )
}


