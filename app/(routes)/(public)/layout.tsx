interface PublicLayoutProps {
  children: React.ReactNode
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  )
}

export default PublicLayout


