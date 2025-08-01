import { BaseButton } from '@/app/(components)/(base)/(clickable)/base-button'
import { BaseDialog } from '@/app/(components)/(base)/(portals)/base-dialog'
import { TrashIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

interface ConfirmDialogProps {
  onConfirm: () => void
  title: string
  description: string
  trigger: React.ReactNode
}

export const ConfirmDialog = ({
  onConfirm,
  title,
  description,
  trigger,
}: ConfirmDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(!open)
  }

  const handleConfirm = () => {
    onConfirm()
    handleClose()
  }

  return (
    <BaseDialog
      title={title}
      description={description}
      trigger={trigger}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex items-center gap-2 w-full">
        <BaseButton variant="outline" onClick={handleClose} className="flex-1">
          <XIcon className="size-4" />
          Cancelar
        </BaseButton>
        <BaseButton
          variant="destructive"
          onClick={handleConfirm}
          className="flex-1"
        >
          <TrashIcon className="size-4" />
          Confirmar
        </BaseButton>
      </div>
    </BaseDialog>
  )
}
