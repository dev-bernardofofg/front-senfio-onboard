"use client"

import { StaggeredFade } from "@/app/(components)/(motion)/staggered-fade"
import { SignInForm } from "@/app/(resources)/(forms)/(auth)/sign-in.form"
import { SignUpForm } from "@/app/(resources)/(forms)/(auth)/sign-up.form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, Shield, User } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"

const AuthPage = () => {
  const { forcedTheme } = useTheme();

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <Card className="shadow-lg border-0 bg-card/50 backdrop-blur-sm gap-2">
        <CardHeader className="space-y-2">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative w-24 h-12">
              <Image
                src={forcedTheme === "dark" ? "/logo-s3-dark.svg" : "/logo-s3-light.svg"}
                alt="Senfio"
                fill
                className="object-contain"
              />
            </div>

            <div className="text-center space-y-2 sr-only">
              <CardTitle className="text-2xl font-bold">Senfio</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Coletor de Cupons
              </CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Shield className="size-3 mr-1" />
                Seguro
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Lock className="size-3 mr-1" />
                Criptografado
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs defaultValue="login" className="w-full">
            <StaggeredFade className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 h-10">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Entrar
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Criar Conta
                </TabsTrigger>
              </TabsList>

              <div className="min-h-[300px]">
                <TabsContent value="login" className="mt-0">
                  <SignInForm />
                </TabsContent>
                <TabsContent value="register" className="mt-0">
                  <SignUpForm />
                </TabsContent>
              </div>

              <div className="text-center pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  Protegido por criptografia de ponta a ponta
                </p>
              </div>
            </StaggeredFade>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPage
