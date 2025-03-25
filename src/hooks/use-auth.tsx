"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipos
export type UserRole = "customer" | "admin"

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  register: (name: string, email: string, password: string, phone: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

// Dados mockados para demonstração
const MOCK_USERS = [
  {
    id: "1",
    name: "Cliente Exemplo",
    email: "cliente@exemplo.com",
    password: "senha123",
    phone: "(11) 98765-4321",
    role: "customer" as UserRole,
  },
  {
    id: "2",
    name: "Admin Sabor Express",
    email: "admin@exemplo.com",
    password: "admin123",
    role: "admin" as UserRole,
  },
]

// Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar se o usuário já está logado ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Login
  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true)

    // Simulando uma chamada de API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = MOCK_USERS.find(
          (u) => u.email === email && u.password === password && u.role === role
        )

        if (foundUser) {
          // Remover a senha antes de armazenar
          const { password: _password, ...userWithoutPassword } = foundUser
          void _password; // Consome a variável para evitar aviso do ESLint
          setUser(userWithoutPassword)
          localStorage.setItem("user", JSON.stringify(userWithoutPassword))
          setIsLoading(false)
          resolve()
        } else {
          setIsLoading(false)
          reject(new Error("Credenciais inválidas"))
        }
      }, 1000) // Simular delay de rede
    })
  }

  // Registro
  const register = async (name: string, email: string, password: string, phone: string): Promise<void> => {
    setIsLoading(true)

    // Simulando uma chamada de API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verificar se o email já existe
        const userExists = MOCK_USERS.some((u) => u.email === email)

        if (userExists) {
          setIsLoading(false)
          reject(new Error("Email já cadastrado"))
          return
        }

        // Criar novo usuário
        const newUser = {
          id: `${MOCK_USERS.length + 1}`,
          name,
          email,
          phone,
          role: "customer" as UserRole,
        }

        // Em um app real, enviaríamos para o backend
        // Aqui apenas simulamos o sucesso
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        setIsLoading(false)
        resolve()
      }, 1000) // Simular delay de rede
    })
  }

  // Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  // Valores derivados
  const isAuthenticated = !!user
  const isAdmin = user?.role === "admin"

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
