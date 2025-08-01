"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useChangePassword, User } from "@/lib/generated"
import { Lock, User as UserIcon } from "lucide-react"
import { ChangePasswordForm } from "./change-password.form"
import { ChangePasswordSchemaType } from "./change-password.schema"
import { EditUserForm } from "./edit-user.form"
import { EditUserSchemaType } from "./edit-user.schema"

interface UserSettingsFormProps {
  user?: User
  onEditSubmit: (data: EditUserSchemaType) => Promise<void>
  isLoading?: boolean
}

export const UserSettingsForm = ({ user, onEditSubmit, isLoading = false }: UserSettingsFormProps) => {
  const changePasswordMutation = useChangePassword()

  const handleChangePassword = async (data: ChangePasswordSchemaType) => {
    await changePasswordMutation.mutateAsync({
      data: {
        current_password: data.current_password,
        new_password: data.new_password,
      }
    })
  }

  return (
    <Tabs defaultValue="profile" className="w-full space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile" className="flex items-center gap-2">
          <UserIcon className="size-4" />
          Informações
        </TabsTrigger>
        <TabsTrigger value="password" className="flex items-center gap-2">
          <Lock className="size-4" />
          Alterar Senha
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="space-y-4">
        <EditUserForm
          user={user}
          onSubmit={onEditSubmit}
          isLoading={isLoading}
        />
      </TabsContent>

      <TabsContent value="password" className="space-y-4">
        <ChangePasswordForm
          onSubmit={handleChangePassword}
          isLoading={changePasswordMutation.isPending}
        />
      </TabsContent>
    </Tabs>
  )
} 