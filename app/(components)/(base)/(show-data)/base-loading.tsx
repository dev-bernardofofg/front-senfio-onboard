import { Loader2 } from 'lucide-react'

interface BaseLoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export const BaseLoading = ({ 
  size = 'md', 
  text = 'Carregando...',
  className = ''
}: BaseLoadingProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 space-y-4 ${className}`}>
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  )
} 