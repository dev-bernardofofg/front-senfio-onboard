"use client"

import { StaffOnly } from "@/app/(components)/(base)/(authorization)/authorized-content"
import { BaseButton } from "@/app/(components)/(base)/(clickable)/base-button"
import { BaseCard } from "@/app/(components)/(base)/(show-data)/base-card"
import { BaseEmptyData } from "@/app/(components)/(base)/(show-data)/base-empty-data"
import { Header } from "@/app/(components)/(layout)/header"
import { StaggeredFade } from "@/app/(components)/(motion)/staggered-fade"
import { FN_UTILS_DATE } from "@/app/(resources)/(helpers)/date"
import { Badge } from "@/components/ui/badge"
import { useListUsers } from "@/lib/generated"
import { Edit, RefreshCw, Users } from "lucide-react"
import { Suspense } from "react"

const UsersPage = () => {
  const { data: usersData, isLoading, refetch } = useListUsers()

  const users = usersData?.data?.results || []

  return (
    <StaggeredFade className="w-full" variant="page">
      <Header title="Usuários" />
      <StaggeredFade className="w-full p-3 space-y-3" variant="content">
        <BaseCard
          title="Gerenciar Usuários"
          Icon={Users}
          description="Lista de todos os usuários do sistema"
          footer={
            <BaseButton
              variant="outline"
              Icon={RefreshCw}
              onClick={() => refetch()}
              disabled={isLoading}
            >
              Atualizar
            </BaseButton>
          }
        >
          <Suspense fallback={<div className="flex items-center justify-center p-4"><RefreshCw className="h-6 w-6 animate-spin" /></div>}>
            {users.length > 0 ? (
              <StaggeredFade className="space-y-3">
                {users.map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{user.email}</p>
                        <div className="flex gap-1">
                          {user.is_staff && (
                            <Badge variant="default" className="text-xs">Admin</Badge>
                          )}
                          <Badge variant={user.is_active ? "default" : "secondary"} className="text-xs">
                            {user.is_active ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Equipe:</strong> {user.team}</p>
                        <p><strong>Admissão:</strong> {FN_UTILS_DATE.formatDate(user.works_since)}</p>
                      </div>
                    </div>

                    <StaffOnly>
                      <BaseButton
                        variant="outline"
                        size="sm"
                        Icon={Edit}
                        href={`/users/${user.id}/edit`}
                      >
                        Editar
                      </BaseButton>
                    </StaffOnly>
                  </div>
                ))}
              </StaggeredFade>
            ) : (
              <BaseEmptyData Icon={Users} title="Nenhum usuário encontrado" />
            )}
          </Suspense>
        </BaseCard>
      </StaggeredFade>
    </StaggeredFade>
  )
}

export default UsersPage 