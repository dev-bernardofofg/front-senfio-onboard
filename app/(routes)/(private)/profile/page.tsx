'use client'

import { BaseCard } from '@/app/(components)/(base)/(show-data)/base-card'
import { BasePaper } from '@/app/(components)/(base)/(show-data)/base-paper'
import { Header } from '@/app/(components)/(layout)/header'
import { StaggeredFade } from '@/app/(components)/(motion)/staggered-fade'
import { useAuth } from '@/app/(contexts)/auth.context'
import { ProfileForm } from '@/app/(resources)/(forms)/(users)/profile.form'
import { FN_UTILS_DATE } from '@/app/(resources)/(helpers)/date'
import { Settings, User } from 'lucide-react'

const ProfilePage = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <StaggeredFade className="w-full" variant="page">
        <Header title="Perfil" />
        <StaggeredFade className="w-full p-3 space-y-3" variant="content">
          <BaseCard
            title="Erro"
            description="Usuário não encontrado"
            Icon={User}
          >
            <div className="flex items-center justify-center p-8">
              <p className="text-muted-foreground">Usuário não autenticado</p>
            </div>
          </BaseCard>
        </StaggeredFade>
      </StaggeredFade>
    )
  }

  return (
    <StaggeredFade className="w-full" variant="page">
      <Header title="Meu Perfil" />
      <StaggeredFade className="w-full p-3 space-y-3" variant="content">
        {/* Informações do Perfil */}
        <BaseCard
          title="Informações Pessoais"
          Icon={User}
          description="Suas informações de perfil"
        >
          <StaggeredFade className="grid grid-cols-4 gap-2">
            <BasePaper title="Email" subtitle={user.email} />
            <BasePaper title="Equipe" subtitle={user.team} />
            <BasePaper
              title="Data de Admissão"
              subtitle={FN_UTILS_DATE.formatDate(user.works_since)}
            />
            <BasePaper
              title="Status da Conta"
              subtitle={user.is_active ? 'Ativo' : 'Inativo'}
            />
          </StaggeredFade>
        </BaseCard>

        {/* Formulário de Edição */}
        <BaseCard
          title="Editar Perfil"
          Icon={Settings}
          description="Atualize suas informações pessoais"
        >
          <ProfileForm user={user} />
        </BaseCard>
      </StaggeredFade>
    </StaggeredFade>
  )
}

export default ProfilePage
