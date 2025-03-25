"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  // Tipamos activeTab explicitamente para "customer" | "admin"
  const [activeTab, setActiveTab] = useState<"customer" | "admin">(
    searchParams.get("role") === "admin" ? "admin" : "customer",
  )

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const role = activeTab

    try {
      await login(email, password, role)
      toast.success("Login realizado com sucesso!")

      // Redirecionar com base no papel do usuário
      if (role === "customer") {
        router.push("/meus-pedidos")
      } else {
        router.push("/admin/pedidos")
      }
    } catch {
      toast.error("Falha no login", {
        description: "Email ou senha incorretos. Tente novamente.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images.png"
              alt="Sabor Express Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-bold text-slate-900">Sabor Express</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <Tabs
            defaultValue={activeTab}
            onValueChange={(value: string) =>
              setActiveTab(value as "customer" | "admin")
            }
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="customer">Cliente</TabsTrigger>
              <TabsTrigger value="admin">Empresa</TabsTrigger>
            </TabsList>

            <TabsContent value="customer">
              <h1 className="text-2xl font-bold mb-6 text-center">
                Acesso do Cliente
              </h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email</Label>
                  <Input
                    id="customer-email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="customer-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                  <LogIn className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Não tem uma conta?{" "}
                  <Link href="/registro" className="text-red-600 hover:underline">
                    Registre-se
                  </Link>
                </p>
              </div>
            </TabsContent>

            <TabsContent value="admin">
              <h1 className="text-2xl font-bold mb-6 text-center">
                Acesso da Empresa
              </h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    name="email"
                    type="email"
                    placeholder="admin@saborexpress.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                  <LogIn className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Acesso exclusivo para administradores do Sabor Express.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">Para fins de demonstração, use:</p>
          <p className="text-sm text-slate-600">
            Cliente: cliente@exemplo.com / senha123
          </p>
          <p className="text-sm text-slate-600">
            Empresa: admin@exemplo.com / admin123
          </p>
        </div>
      </div>
    </div>
  )
}
