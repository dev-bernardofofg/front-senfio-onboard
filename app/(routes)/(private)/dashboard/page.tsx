"use client"

import { NonStaffOnly, StaffOnly } from "@/app/(components)/(base)/(authorization)/authorized-content"
import { BaseButton } from "@/app/(components)/(base)/(clickable)/base-button"
import { BaseCard } from "@/app/(components)/(base)/(show-data)/base-card"
import { BaseEmptyData } from "@/app/(components)/(base)/(show-data)/base-empty-data"
import { BaseStats } from "@/app/(components)/(base)/(show-data)/base-stats"
import { Header } from "@/app/(components)/(layout)/header"
import { StaggeredFade } from "@/app/(components)/(motion)/staggered-fade"
import { useAuth } from "@/app/(contexts)/auth.context"
import { FN_UTILS_DATE } from "@/app/(resources)/(helpers)/date"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetBalance, useListCoupons, useListRedemptions, useListUsers, useRecentRedemptions } from "@/lib/generated"
import {
  Activity,
  BarChart3,
  CreditCard,
  Gift,
  RefreshCw,
  Settings,
  Shield,
  TrendingUp,
  User,
  Users
} from "lucide-react"
import { Suspense } from "react"


const DashboardPage = () => {
  const { user } = useAuth()

  const balanceQuery = useGetBalance()
  const couponsQuery = useListCoupons()
  const redemptionsQuery = useListRedemptions()
  const recentRedemptionsQuery = useRecentRedemptions()
  const usersQuery = useListUsers()

  return (
    <StaggeredFade className="w-full" variant="page">
      {/* Header */}
      <Header title="Dashboard" />
      <StaggeredFade className="w-full p-3 space-y-3" variant="content">
        <StaggeredFade className="grid base:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BaseStats
            title="Cupons Ativos"
            Icon={Gift}
            value={couponsQuery.data?.data?.count}
            loading={couponsQuery.isLoading}
            description="Cupons disponíveis"
          />


          <BaseStats
            title="Resgates Hoje"
            Icon={Activity}
            value={recentRedemptionsQuery.data?.data?.length}
            loading={recentRedemptionsQuery.isLoading}
            description="Resgates realizados hoje"
          />

          <NonStaffOnly>
            <BaseStats
              title="Saldo Atual"
              Icon={CreditCard}
              value={balanceQuery.data?.data?.length}
              loading={balanceQuery.isLoading}
              description="Cupons disponíveis"
            />
          </NonStaffOnly>

          <BaseStats title="Status da Conta" Icon={User} value={user?.is_active ? 'Ativo' : 'Inativo'} loading={false} description="Status da Conta" />

          {/* Staff-only stats - A query só executa se o usuário for staff */}
          <StaffOnly>
            <BaseStats
              title="Total de Usuários"
              Icon={Users}
              value={usersQuery.data?.data?.count}
              loading={usersQuery.isLoading}
              description="Usuários cadastrados"
            />
          </StaffOnly>
        </StaggeredFade>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="gap-3">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-muted/50 p-1 rounded-lg custom-tabs">
            <TabsTrigger
              value="overview"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 tab-trigger"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Visão Geral</span>
              <span className="sm:hidden">Geral</span>
            </TabsTrigger>
            <TabsTrigger
              value="coupons"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 tab-trigger"
            >
              <Gift className="h-4 w-4" />
              <span className="hidden sm:inline">Cupons</span>
            </TabsTrigger>
            <TabsTrigger
              value="redemptions"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 tab-trigger"
            >
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Resgates</span>
            </TabsTrigger>
            <StaffOnly>
              <TabsTrigger
                value="admin"
                className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 tab-trigger"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </TabsTrigger>
            </StaffOnly>
          </TabsList>

          <TabsContent value="overview" className="space-y-3">
            <StaggeredFade className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <BaseCard title="Resgates Recentes" Icon={Activity} description="Últimos resgates realizados" footer={<BaseButton variant="outline" href="/my-coupons">Ver todos</BaseButton>}>

                <Suspense fallback={<div className="flex items-center justify-center p-4"><RefreshCw className="h-6 w-6 animate-spin" /></div>}>
                  {recentRedemptionsQuery.data?.data?.length ? (
                    <StaggeredFade className="space-y-3">
                      {recentRedemptionsQuery.data.data.slice(0, 5).map((redemption: any) => (
                        <div key={redemption.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">{redemption.coupon?.code}</p>
                            <p className="text-sm text-muted-foreground">
                              {FN_UTILS_DATE.formatDate(redemption.redeemed_at)}
                            </p>
                          </div>
                          <Badge variant="outline">Resgatado</Badge>
                        </div>
                      ))}
                    </StaggeredFade>
                  ) : (
                    <BaseEmptyData Icon={Activity} title="Nenhum resgate recente" />
                  )}
                </Suspense>
              </BaseCard>

              {/* Quick Actions */}
              <BaseCard title="Ações Rápidas" Icon={BarChart3} description="Acesse as principais funcionalidades">
                <div className="space-y-3">
                  <BaseButton variant="outline" Icon={Gift} href="/coupons">Gerenciar Cupons</BaseButton>

                  <StaffOnly>
                    <BaseButton variant="outline" Icon={TrendingUp} href="/reports">Ver Relatórios</BaseButton>
                    <BaseButton variant="outline" Icon={Users} href="/users">Usuários</BaseButton>
                    <BaseButton variant="outline" Icon={Settings} href="/admin">Configurações</BaseButton>
                  </StaffOnly>

                  <NonStaffOnly>
                    <BaseButton variant="outline" Icon={Activity} href="/my-coupons">Meus Resgates</BaseButton>
                  </NonStaffOnly>
                </div>
              </BaseCard>
            </StaggeredFade>
          </TabsContent>

          <TabsContent value="coupons" className="space-y-3">
            <StaggeredFade>
              <BaseCard title="Cupons Disponíveis" Icon={Gift} description="Lista dos cupons mais recentes" footer={<BaseButton variant="outline" href="/coupons">Ver todos</BaseButton>}>

                <Suspense fallback={<div className="flex items-center justify-center p-4"><RefreshCw className="h-6 w-6 animate-spin" /></div>}>
                  {couponsQuery.data?.data?.results?.length ? (
                    <StaggeredFade className="space-y-3">
                      {couponsQuery.data.data.results.slice(0, 5).map((coupon: any) => (
                        <div key={coupon.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div>
                            <p className="font-medium">{coupon.code}</p>
                            <p className="text-sm text-muted-foreground">{coupon.description}</p>
                          </div>
                          <Badge variant={coupon.available ? "default" : "secondary"}>
                            {coupon.available ? "Disponível" : "Indisponível"}
                          </Badge>
                        </div>
                      ))}
                    </StaggeredFade>
                  ) : (
                    <BaseEmptyData Icon={Gift} title="Nenhum cupom encontrado" />
                  )}
                </Suspense>
              </BaseCard>
            </StaggeredFade>
          </TabsContent>

          <TabsContent value="redemptions" className="space-y-3">
            <StaggeredFade>
              <BaseCard title="Histórico de Resgates" Icon={Activity} description="Todos os resgates realizados" footer={<BaseButton variant="outline" href="/my-coupons">Ver todos</BaseButton>}>

                <div className="space-y-3">
                  <Suspense fallback={<div className="flex items-center justify-center p-4"><RefreshCw className="h-6 w-6 animate-spin" /></div>}>
                    {redemptionsQuery.data?.data?.results?.length ? (
                      <StaggeredFade className="space-y-3">
                        {redemptionsQuery.data.data.results.slice(0, 5).map((redemption: any) => (
                          <div key={redemption.id} className="flex items-center justify-between p-3 rounded-lg border">
                            <div>
                              <p className="font-medium">{redemption.coupon?.code}</p>
                              <p className="text-sm text-muted-foreground">
                                {FN_UTILS_DATE.formatDate(redemption.created_at)}
                              </p>
                            </div>
                            <Badge variant="outline">Resgatado</Badge>
                          </div>
                        ))}
                      </StaggeredFade>
                    ) : (
                      <BaseEmptyData Icon={Activity} title="Nenhum resgate encontrado" />
                    )}
                  </Suspense>
                </div>
              </BaseCard>
            </StaggeredFade>
          </TabsContent>

          <StaffOnly>
            <TabsContent value="admin" className="space-y-3">
              <BaseCard title="Painel Administrativo" Icon={Shield} description="Ferramentas de administração do sistema">
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <BaseButton variant="outline" Icon={Users} href="/admin/users">
                      Gerenciar Usuários
                    </BaseButton>
                    <BaseButton variant="outline" Icon={BarChart3} href="/admin/analytics">
                      Analytics
                    </BaseButton>
                    <BaseButton variant="outline" Icon={Settings} href="/admin/settings">
                      Configurações do Sistema
                    </BaseButton>
                    <BaseButton variant="outline" Icon={Activity} href="/admin/logs">
                      Logs do Sistema
                    </BaseButton>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Informações do Sistema</h4>
                    <div className="text-sm space-y-1">
                      <p><strong>Usuários Ativos:</strong> --</p>
                      <p><strong>Cupons Criados:</strong> {couponsQuery.data?.data?.count || 0}</p>
                      <p><strong>Resgates Totais:</strong> {redemptionsQuery.data?.data?.count || 0}</p>
                    </div>
                  </div>
                </div>
              </BaseCard>
            </TabsContent>
          </StaffOnly>
        </Tabs>
      </StaggeredFade>
    </StaggeredFade >
  )
}

export default DashboardPage