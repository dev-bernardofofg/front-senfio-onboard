import { LucideIcon } from "lucide-react"
import { BaseButton } from "../(clickable)/base-button"

interface BaseEmptyDataProps {
  Icon: LucideIcon
  title: string
  onClick?: () => void
}

export const BaseEmptyData = ({ Icon, title, onClick }: BaseEmptyDataProps) => {
  return (
    <div className="text-center py-8 text-muted-foreground space-y-4">
      <Icon className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p>{title}</p>

      {onClick && (
        <BaseButton onClick={onClick} variant="outline" className="w-fit">
          Voltar para a página inicial
        </BaseButton>
      )}
    </div>
  )
}
