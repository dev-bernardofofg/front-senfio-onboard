import { BaseCard } from '@/app/(components)/(base)/(show-data)/base-card'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { Suspense } from 'react'

interface BaseStatsProps {
  title: string
  Icon: LucideIcon
  value: string | number | undefined
  loading: boolean
  description: string
}

export const BaseStats = ({ title, Icon, value, loading, description }: BaseStatsProps) => {
  return (
    <BaseCard title={title} Icon={Icon} description={description}>
      <Suspense fallback={<Skeleton className="h-8 w-20" />}>

        {loading ? (
          <Skeleton className="h-8 w-20" />
        ) : (
          <motion.div className="text-2xl font-bold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {value || 0}
          </motion.div>
        )}
      </Suspense>
    </BaseCard >
  )
}
