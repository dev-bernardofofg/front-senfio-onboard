import { motion } from 'framer-motion'
import type { Control, FieldValues, Path } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

type Option = { label: string; value: string | number; available?: boolean }
type OptionGroup = { label: string; options: Option[] }

export interface IBaseSelect<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  options?: Option[]
  optionGroups?: OptionGroup[]
  description?: string
  disabled?: string | boolean
  selectDate?: string | boolean
  className?: string
}

export const BaseSelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Selecione uma opção',
  options = [],
  optionGroups = [],
  description,
  disabled = false,
  selectDate = false,
  className,
}: IBaseSelect<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn('relative w-full', className)}>
          {label && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between"
            >
              {fieldState.error ? (
                <FormLabel className="text-destructive">
                  {fieldState.error.message}
                </FormLabel>
              ) : (
                <FormLabel>{label}</FormLabel>
              )}
            </motion.div>
          )}

          <FormControl>
            <Select
              value={field.value ? String(field.value) : ''}
              onValueChange={field.onChange}
              disabled={Boolean(disabled || selectDate)}
            >
              <motion.div
                className="relative group rounded-md border focus-within:border-primary focus-within:ring-0.5 focus-within:ring-primary focus-within:outline-hidden"
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <SelectTrigger className="h-10 w-full bg-transparent dark:bg-transparent border-none outline-hidden ring-0 focus:ring-0 focus-visible:ring-0 focus-within:ring-0 focus:border-none focus-within:border-none focus-visible:border-none active:border-none active:ring-0 active:outline-hidden focus:outline-hidden focus-visible:outline-hidden px-3 py-2 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 min-h-[40px]">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </motion.div>

              <SelectContent>
                {optionGroups.length > 0
                  ? optionGroups.map(group => (
                      <SelectGroup key={group.label}>
                        <SelectLabel>{group.label}</SelectLabel>
                        {group.options.map(option => (
                          <SelectItem
                            key={option.value}
                            value={String(option.value)}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))
                  : options.map(option => (
                      <SelectItem
                        key={option.value}
                        value={String(option.value)}
                        className="truncate"
                        disabled={option.available === false}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  )
}
