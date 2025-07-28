interface PrivateLayoutProps {
  children: React.ReactNode
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  )
}

export default PrivateLayout