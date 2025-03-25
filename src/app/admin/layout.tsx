"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { AdminSidebar } from "@/components/admin-sidebar"
import { useAuth } from "@/hooks/use-auth"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const {  isAdmin, isAuthenticated, isLoading } = useAuth()

  // Redirecionar se não for admin
  useEffect(() => {
    if (!isLoading && isAuthenticated && !isAdmin) {
      toast.error("Acesso negado", {
        description: "Você não tem permissão para acessar esta página.",
      })
      router.push("/meus-pedidos")
    } else if (!isLoading && !isAuthenticated) {
      toast.error("Acesso negado", {
        description: "Você precisa estar logado como administrador.",
      })
      router.push("/login?role=admin")
    }
  }, [isLoading, isAuthenticated, isAdmin, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar />
      <div className="flex-1 p-6 md:p-8 overflow-auto">{children}</div>
    </div>
  )
}

