"use client"

import { BaseTable } from "@/app/(components)/(base)/(tables)/base-table"
import { Header } from "@/app/(components)/(layout)/header"
import { StaggeredFade } from "@/app/(components)/(motion)/staggered-fade"
import { usersTableActions, usersTableColumns } from "@/app/(resources)/(tables)/users.table"
import { useListUsers } from "@/lib/generated"

const UsersPage = () => {
  const { data: usersData, isLoading, refetch } = useListUsers()

  const users = usersData?.data?.results || []

  return (
    <StaggeredFade className="w-full" variant="page">
      <Header title="Usuários" />
      <StaggeredFade className="w-full space-y-3" variant="content">
        <BaseTable
          data={users}
          columns={usersTableColumns}
          actions={usersTableActions}
          loading={isLoading}
          emptyMessage="Nenhum usuário encontrado"
        />
      </StaggeredFade>
    </StaggeredFade>
  )
}

export default UsersPage 