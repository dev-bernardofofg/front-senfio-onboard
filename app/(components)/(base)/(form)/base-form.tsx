import { motion, MotionProps } from 'framer-motion'
import { ComponentPropsWithoutRef } from 'react'

import { StaggeredFade } from '@/app/(components)/(motion)/staggered-fade'
import { cn } from '@/lib/utils'

type BaseFormProps = ComponentPropsWithoutRef<'form'> & MotionProps

export const BaseForm = ({ children, className, ...props }: BaseFormProps) => {
  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <StaggeredFade className={cn('space-y-4', className)} variant="default">
        {children}
      </StaggeredFade>
    </motion.form>
  )
}
