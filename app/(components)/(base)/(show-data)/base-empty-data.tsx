import { LucideIcon } from "lucide-react"

interface BaseEmptyDataProps {
  Icon: LucideIcon
  title: string
}

export const BaseEmptyData = ({ Icon, title }: BaseEmptyDataProps) => {
  return (
    <div className="text-center py-8 text-muted-foreground">
      <Icon className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p>{title}</p>
    </div>
  )
}
