import { Fade } from "@/app/(components)/(motion)/fade"

interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Fade className="flex flex-col items-center justify-center h-screen">
      {children}
    </Fade>
  )
}

export default PublicLayout


