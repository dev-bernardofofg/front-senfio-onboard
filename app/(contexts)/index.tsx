'use client'

import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { AuthProvider } from './auth.context'
import { QueryProvider } from './query.context'
import { ThemeProvider } from './theme.context'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <QueryProvider>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </QueryProvider>
    </NuqsAdapter>
  )
}
