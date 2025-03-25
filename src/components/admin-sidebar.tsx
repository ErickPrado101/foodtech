"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, DollarSign, Package, Settings, Users, LogOut, ChevronRight, Menu, Bell, HelpCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"

export function AdminSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Detectar se é mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      }
    }
    
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    
    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Pedidos", href: "/admin/pedidos", icon: ShoppingBag },
    { name: "Finanças", href: "/admin/financas", icon: DollarSign },
    { name: "Estoque", href: "/admin/estoque", icon: Package },
    { name: "Clientes", href: "/admin/clientes", icon: Users },
    { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
  ]

  // Versão mobile
  if (isMobile) {
    return (
      <>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md border-red-100"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <Menu className="h-5 w-5 text-red-600" />
        </Button>
        
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
        
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-red-50 to-white border-r border-red-100 transform transition-transform duration-200 ease-in-out lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-red-100 bg-white">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SE</span>
                </div>
                <span className="text-lg font-bold text-red-600">Sabor Express</span>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileOpen(false)}
                className="text-red-600 hover:bg-red-50"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-auto py-4">
              <nav className="space-y-1 px-3">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-red-100 text-red-700"
                          : "text-slate-700 hover:bg-red-50 hover:text-red-600"
                      )}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 flex-shrink-0",
                        isActive ? "text-red-600" : "text-slate-500"
                      )} />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
              </nav>
              
              <div className="mt-6 px-3">
                <div className="rounded-md bg-red-50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <HelpCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-red-700">Precisa de ajuda?</h5>
                      <p className="text-xs text-red-600">Acesse nosso suporte</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-red-100 p-4 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="font-medium text-red-600">{user?.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Versão desktop
  return (
    <div 
      className={cn(
        "h-screen border-r border-red-100 bg-gradient-to-b from-red-50 to-white transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex h-full flex-col">
        <div className={cn(
          "flex h-16 items-center border-b border-red-100 px-4 bg-white",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SE</span>
              </div>
              <span className="text-lg font-bold text-red-600">Sabor Express</span>
            </Link>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "text-red-600 hover:bg-red-50",
              isCollapsed ? "rotate-180" : ""
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-red-100 text-red-700"
                      : "text-slate-700 hover:bg-red-50 hover:text-red-600",
                    isCollapsed && "justify-center"
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <item.icon className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive ? "text-red-600" : "text-slate-500"
                  )} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>
          
          {!isCollapsed && (
            <div className="mt-6 px-3">
              <div className="rounded-md bg-red-50 p-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-red-700">Novos pedidos</h5>
                    <p className="text-xs text-red-600">3 pedidos aguardando</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-red-100 p-4 bg-white">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="font-medium text-red-600">{user?.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-full text-red-600 hover:bg-red-50" 
              onClick={handleLogout}
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
