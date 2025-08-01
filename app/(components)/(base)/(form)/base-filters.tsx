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
import { Filter, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BaseButton } from '../(clickable)/base-button'

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
    defaultValues: {
      ...defaultValues,
      ordering: defaultValues.ordering || "-created_at"
    },
  })

  // Não sincronizar com URL - sempre manter campos limpos

  const onSubmit = (data: Record<string, unknown>) => {
    // Limpar campos vazios para campos opcionais
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" ? undefined : value
      ])
    )
    onFiltersChange(cleanedData as T)
    setIsOpen(false)
  }

  const handleClear = () => {
    form.reset({})
    onFiltersChange(null as T)
  }

  const hasFilters = Object.values(form.watch()).some(value =>
    value !== undefined && value !== "" && value !== "all"
  )

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <BaseButton variant="outline" clickAction="filters">
          Filtros
        </BaseButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-4">
        <div className="space-y-4">
          {/* Formulário de filtros */}
          <Form {...form}>
            <BaseForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              {/* Campo de busca geral */}
              {!!schema.shape.search && (
                <BaseInput
                  control={form.control}
                  name="search"
                  placeholder="Buscar por código, descrição..."
                  className="w-full"
                />
              )}
              {!!schema.shape.ordering && (
                <BaseSelect
                  control={form.control}
                  name="ordering"
                  placeholder="Ordenar por"
                  options={
                    [
                      { label: "Mais recentes", value: "-created_at" },
                      { label: "Mais antigos", value: "created_at" },
                    ]
                  }
                />
              )}
              <div className="flex gap-2 pt-2">
                {showClearButton && hasFilters && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    className="flex-1"
                  >
                    <X className="size-4" />
                    Limpar
                  </Button>
                )}
                <Button
                  type="submit"
                  size="sm"
                  className="flex-1"
                >
                  <Filter className="size-4" />
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