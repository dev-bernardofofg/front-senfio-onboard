'use client'

import { AuthProvider } from "./auth.context"
import { QueryProvider } from "./query.context"
import { ThemeProvider } from "./theme.context"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  )
}