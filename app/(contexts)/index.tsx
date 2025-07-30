'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "./auth.context"
import { ThemeProvider } from "./theme.context"

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}