import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface BaseCardProps {
  title: string
  description: string
  Icon: LucideIcon
  children: React.ReactNode
  footer?: React.ReactNode
}

export const BaseCard = ({
  title,
  Icon,
  description,
  children,
  footer,
}: BaseCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
