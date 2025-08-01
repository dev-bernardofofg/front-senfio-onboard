
import { BaseButton } from "@/app/(components)/(base)/(clickable)/base-button"
import { BaseDialog } from "@/app/(components)/(base)/(portals)/base-dialog"
import { UserSettingsForm } from "@/app/(resources)/(forms)/(users)/user-settings.form"
import { FN_UTILS_DATE } from "@/app/(resources)/(helpers)/date"
import { Badge } from "@/components/ui/badge"
import { User } from "@/lib/generated/models/User"

export const usersTableColumns = [
  {
    header: "Email",
    accessorKey: "email" as keyof User,
    className: "font-medium"
  },
  {
    header: "Equipe",
    accessorKey: "team" as keyof User,
  },
  {
    header: "Admissão",
    accessorKey: "works_since" as keyof User,
    cell: (value: any) => FN_UTILS_DATE.formatDate(value)
  },
  {
    header: "Status",
    accessorKey: "is_active" as keyof User,
    cell: (value: any, user: User) => (
      <div className="flex gap-1">
        {user.is_staff && (
          <Badge variant="default" className="text-xs">Admin</Badge>
        )}
        <Badge variant={value ? "default" : "secondary"} className="text-xs">
          {value ? "Ativo" : "Inativo"}
        </Badge>
      </div>
    )
  }
]

export const usersTableActions = (user: User) => (
  <div className="flex gap-2 justify-end">
    <BaseDialog
      title="Configurações do Usuário"
      description="Editar informações do usuário e alterar senha"
      trigger={
        <BaseButton
          variant="outline"
          clickAction="edit"
          className="w-fit"
        >
          Editar
        </BaseButton>
      }
    >
      <UserSettingsForm
        user={user}
        onEditSubmit={async () => {
          // TODO: Implementar quando a rota de atualizar usuário for criada
        }}
      />
    </BaseDialog>

    {/* TODO: Implementar quando a rota de desativar usuário for criada no backend */}
    {/* 
    <ConfirmDialog
      title={user.is_active ? "Desativar usuário" : "Ativar usuário"}
      description={`Tem certeza que deseja ${user.is_active ? "desativar" : "ativar"} este usuário?`}
      trigger={
        <BaseButton 
          variant="outline" 
          size="sm"
          Icon={user.is_active ? PowerOff : Power}
          className="w-fit" 
        >
          {user.is_active ? "Desativar" : "Ativar"}
        </BaseButton>
      }
      onConfirm={async () => {
        // TODO: Implementar chamada para a API
        // await updateUserStatus(user.id, !user.is_active)
      }}
    />
    */}

    {/* TODO: Implementar quando a rota de deletar usuário for criada no backend */}
    {/* 
    <ConfirmDialog
      title="Deletar usuário"
      description="Tem certeza que deseja deletar este usuário?"
      trigger={<BaseButton variant="outline" clickAction="delete" className="w-fit" />}
      onConfirm={async () => {
        // TODO: Implementar chamada para a API
        // await deleteUser(user.id)
      }}
    />
    */}
  </div>
)
