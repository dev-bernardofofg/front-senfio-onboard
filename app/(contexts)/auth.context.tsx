'use client'

import { deleteCookie, getCookie, setCookie } from '@/lib/cookies'
import { Me200, User } from '@/lib/generated'
import { useLogout, useMe } from '@/lib/generated/hooks'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

type Tokens = {
  access: string
  refresh: string
}

interface AuthContextProps {
  user: User | null
  tokens: Tokens | null
  setAuth: (user: Me200, tokens: Tokens) => void
  setTokensOnly: (tokens: Tokens) => void
  updateUser: (userData: User) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<Tokens | null>(null)
  const router = useRouter()

  const { data: meData } = useMe({
    query: {
      enabled: !!tokens?.access && !user,
    },
  })

  const logoutMutation = useLogout({
    mutation: {
      onSuccess: () => {
        setUser(null)
        setTokens(null)
        deleteCookie('auth_user')
        deleteCookie('tokens')
        router.push('/auth')
      },
      onError: () => {
        setUser(null)
        setTokens(null)
        deleteCookie('auth_user')
        deleteCookie('tokens')
        router.push('/auth')
      },
    },
  })

  useEffect(() => {
    const storedUser = getCookie('auth_user')
    const storedTokens = getCookie('tokens')

    if (storedUser && storedTokens) {
      try {
        const parsedUser = JSON.parse(storedUser)
        const parsedTokens = JSON.parse(storedTokens)
        setUser(parsedUser)
        setTokens(parsedTokens)
      } catch {
        deleteCookie('auth_user')
        deleteCookie('tokens')
      }
    }
  }, [])

  useEffect(() => {
    if (meData?.data) {
      setUser(meData.data)
      setCookie('auth_user', JSON.stringify(meData.data))
      router.push('/dashboard')
    }
  }, [tokens])

  const setAuth = (user: Me200, tokens: Tokens) => {
    setUser(user)
    setTokens(tokens)
    setCookie('auth_user', JSON.stringify(user))
    setCookie('tokens', JSON.stringify(tokens))
  }

  const setTokensOnly = (tokens: Tokens) => {
    setTokens(tokens)
    setCookie('tokens', JSON.stringify(tokens))
  }

  const updateUser = (userData: User) => {
    setUser(userData)
    setCookie('auth_user', JSON.stringify(userData))
  }

  const signOut = () => {
    if (tokens?.refresh) {
      logoutMutation.mutate({ data: { refresh: tokens.refresh } })
    } else {
      setUser(null)
      setTokens(null)
      deleteCookie('auth_user')
      deleteCookie('tokens')
      router.push('/auth')
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, tokens, setAuth, setTokensOnly, updateUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
