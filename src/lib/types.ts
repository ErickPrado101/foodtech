// Tipos existentes
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

export interface CartItem {
  product: Product
  quantity: number
}

// Tipos para o sistema de pedidos
export type OrderStatus =
  | "pending" // Pendente (recebido, mas não confirmado)
  | "confirmed" // Confirmado pela lanchonete
  | "preparing" // Em preparo
  | "ready" // Pronto para entrega
  | "delivering" // Em entrega
  | "delivered" // Entregue
  | "cancelled" // Cancelado

export interface OrderItem {
  product: Product
  quantity: number
  price: number // Preço no momento da compra
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerPhone: string
  customerAddress: string
  items: OrderItem[]
  status: OrderStatus
  notes?: string
  totalPrice: number
  createdAt: string // ISO date string
  estimatedDeliveryTime?: string // ISO date string
  actualDeliveryTime?: string // ISO date string
  statusHistory: {
    status: OrderStatus
    timestamp: string // ISO date string
    note?: string
  }[]
}

// Tipos para tempos estimados
export interface PrepTimeEstimate {
  status: OrderStatus
  minMinutes: number
  maxMinutes: number
}

// Tipos para o sistema de estoque
export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  minQuantity: number
  maxQuantity: number
  unit: string // unid, kg, g, l, ml, etc.
  cost: number // Custo unitário
}

// Tipos para o sistema financeiro
export interface FinancialTransaction {
  id: string
  date: string // ISO date string
  description: string
  category: string
  type: "income" | "expense"
  amount: number
}

