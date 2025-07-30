'use client'

import { BaseForm } from '@/app/(components)/(base)/(form)/base-form'
import { BaseInput } from '@/app/(components)/(base)/(form)/base-input'
import { BaseSelect } from '@/app/(components)/(base)/(form)/base-select'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Filter, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface BaseFiltersProps<T = Record<string, unknown>> {
  schema: z.ZodObject<Record<string, z.ZodTypeAny>>
  defaultValues: Record<string, string | undefined>
  onFiltersChange: (filters: T) => void
  className?: string
  showClearButton?: boolean
}

export const BaseFilters = <T = Record<string, unknown>>({
  schema,
  defaultValues,
  onFiltersChange,
  className = "",
  showClearButton = true
}: BaseFiltersProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  // Atualizar form quando defaultValues mudar (ex: quando vem da URL)
  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues, form])

  const onSubmit = (data: Record<string, unknown>) => {
    onFiltersChange(data as T)
    setIsOpen(false)
  }

  const handleClear = () => {
    form.reset(defaultValues)
    onFiltersChange(defaultValues as T)
  }

  const hasFilters = Object.values(form.watch()).some(value =>
    value !== undefined && value !== "" && value !== "all"
  )

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="h-4 w-4" />
          Filtros Avançados
          {hasFilters && (
            <div className="w-2 h-2 bg-primary rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-4">
        <div className="space-y-4">
          {/* Formulário de filtros */}
          <Form {...form}>
            <BaseForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {/* Campo de busca geral */}
              <BaseInput
                control={form.control}
                name="search"
                placeholder="Buscar por código, descrição..."
                className="w-full"
              />

              {/* Seletor de ordenação - sempre visível */}
              <BaseSelect
                control={form.control}
                name="ordering"
                placeholder="Ordenar por"
                options={
                  !('email' in schema.shape) ? [
                    { label: "Mais recentes", value: "-created_at" },
                    { label: "Mais antigos", value: "created_at" },
                    { label: "Código A-Z", value: "code" },
                    { label: "Código Z-A", value: "-code" }
                  ] : [
                    { label: "Mais recentes", value: "-redeemed_at" },
                    { label: "Mais antigos", value: "redeemed_at" },
                    { label: "Código A-Z", value: "coupon__code" },
                    { label: "Código Z-A", value: "-coupon__code" }
                  ]
                }
              />

              {/* Botões de ação */}
              <div className="flex gap-2 pt-2">
                {showClearButton && hasFilters && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Limpar
                  </Button>
                )}
                <Button
                  type="submit"
                  size="sm"
                  className="flex-1"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Aplicar
                </Button>
              </div>
            </BaseForm>
          </Form>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 