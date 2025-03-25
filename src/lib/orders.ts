import type { Order, OrderStatus, PrepTimeEstimate } from "./types"

// Dados mockados para demonstração
export const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    customerId: "1",
    customerName: "Cliente Exemplo",
    customerPhone: "(11) 98765-4321",
    customerAddress: "Rua das Flores, 123 - Jardim Primavera",
    items: [
      {
        product: {
          id: "1",
          name: "Hambúrguer Clássico",
          description: "Pão, hambúrguer 180g, queijo, alface, tomate e molho especial.",
          price: 25.9,
          image: "/placeholder.svg?height=300&width=300",
        },
        quantity: 2,
        price: 25.9,
      },
      {
        product: {
          id: "3",
          name: "Batata Frita Grande",
          description: "Porção de batatas fritas crocantes com sal e temperos.",
          price: 18.9,
          image: "/placeholder.svg?height=300&width=300",
        },
        quantity: 1,
        price: 18.9,
      },
    ],
    status: "delivered",
    totalPrice: 70.7,
    createdAt: "2024-03-23T18:30:00Z",
    estimatedDeliveryTime: "2024-03-23T19:15:00Z",
    actualDeliveryTime: "2024-03-23T19:10:00Z",
    statusHistory: [
      {
        status: "pending",
        timestamp: "2024-03-23T18:30:00Z",
      },
      {
        status: "confirmed",
        timestamp: "2024-03-23T18:35:00Z",
      },
      {
        status: "preparing",
        timestamp: "2024-03-23T18:40:00Z",
      },
      {
        status: "ready",
        timestamp: "2024-03-23T18:55:00Z",
      },
      {
        status: "delivering",
        timestamp: "2024-03-23T19:00:00Z",
      },
      {
        status: "delivered",
        timestamp: "2024-03-23T19:10:00Z",
      },
    ],
  },
  {
    id: "ORD-002",
    customerId: "1",
    customerName: "Cliente Exemplo",
    customerPhone: "(11) 98765-4321",
    customerAddress: "Rua das Flores, 123 - Jardim Primavera",
    items: [
      {
        product: {
          id: "2",
          name: "Pizza Margherita",
          description: "Molho de tomate, mussarela, tomate e manjericão fresco.",
          price: 45.9,
          image: "/placeholder.svg?height=300&width=300",
        },
        quantity: 1,
        price: 45.9,
      },
      {
        product: {
          id: "4",
          name: "Refrigerante 2L",
          description: "Coca-Cola, Guaraná Antarctica, Sprite ou Fanta.",
          price: 12.9,
          image: "/placeholder.svg?height=300&width=300",
        },
        quantity: 1,
        price: 12.9,
      },
    ],
    status: "preparing",
    notes: "Sem cebola, por favor.",
    totalPrice: 58.8,
    createdAt: "2024-03-24T19:45:00Z",
    estimatedDeliveryTime: "2024-03-24T20:30:00Z",
    statusHistory: [
      {
        status: "pending",
        timestamp: "2024-03-24T19:45:00Z",
      },
      {
        status: "confirmed",
        timestamp: "2024-03-24T19:50:00Z",
      },
      {
        status: "preparing",
        timestamp: "2024-03-24T19:55:00Z",
        note: "Iniciando preparo da pizza",
      },
    ],
  },
  {
    id: "ORD-003",
    customerId: "3",
    customerName: "Maria Silva",
    customerPhone: "(11) 91234-5678",
    customerAddress: "Av. Paulista, 1000 - Bela Vista",
    items: [
      {
        product: {
          id: "5",
          name: "Combo Família",
          description: "4 hambúrgueres, 2 batatas grandes, 4 refrigerantes e 2 sobremesas.",
          price: 129.9,
          image: "/placeholder.svg?height=300&width=300",
        },
        quantity: 1,
        price: 129.9,
      },
    ],
    status: "confirmed",
    totalPrice: 129.9,
    createdAt: "2024-03-24T20:10:00Z",
    estimatedDeliveryTime: "2024-03-24T21:00:00Z",
    statusHistory: [
      {
        status: "pending",
        timestamp: "2024-03-24T20:10:00Z",
      },
      {
        status: "confirmed",
        timestamp: "2024-03-24T20:15:00Z",
      },
    ],
  },
  {
    id: "ORD-004",
    customerId: "4",
    customerName: "João Oliveira",
    customerPhone: "(11) 99876-5432",
    customerAddress: "Rua Augusta, 500 - Consolação",
    items: [
      {
        product: {
          id: "7",
          name: "Sanduíche de Frango",
          description: "Pão, peito de frango grelhado, queijo, alface, tomate e maionese.",
          price: 22.9,
          image: "/placeholder.svg?height=300&width=300",
        },
        quantity: 2,
        price: 22.9,
      },
      {
        product: {
          id: "6",
          name: "Milk Shake 500ml",
          description: "Chocolate, morango, baunilha ou ovomaltine.",
          price: 16.9,
          image: "/placeholder.svg?height=300&width=300",
        },
        quantity: 2,
        price: 16.9,
      },
    ],
    status: "delivering",
    totalPrice: 79.6,
    createdAt: "2024-03-24T19:20:00Z",
    estimatedDeliveryTime: "2024-03-24T20:05:00Z",
    statusHistory: [
      {
        status: "pending",
        timestamp: "2024-03-24T19:20:00Z",
      },
      {
        status: "confirmed",
        timestamp: "2024-03-24T19:25:00Z",
      },
      {
        status: "preparing",
        timestamp: "2024-03-24T19:30:00Z",
      },
      {
        status: "ready",
        timestamp: "2024-03-24T19:45:00Z",
      },
      {
        status: "delivering",
        timestamp: "2024-03-24T19:50:00Z",
        note: "Entregador: Carlos - Moto vermelha",
      },
    ],
  },
  {
    id: "ORD-005",
    customerId: "1",
    customerName: "Cliente Exemplo",
    customerPhone: "(11) 98765-4321",
    customerAddress: "Rua das Flores, 123 - Jardim Primavera",
    items: [
      {
        product: {
          id: "9",
          name: "Sobremesa Brownie",
          description: "Brownie de chocolate com sorvete de baunilha e calda quente.",
          price: 15.9,
          image: "/placeholder.svg?height=300&width=300",
        },
        quantity: 2,
        price: 15.9,
      },
    ],
    status: "pending",
    totalPrice: 31.8,
    createdAt: "2024-03-24T20:30:00Z",
    statusHistory: [
      {
        status: "pending",
        timestamp: "2024-03-24T20:30:00Z",
      },
    ],
  },
]

// Tempos estimados para cada status
export const PREP_TIME_ESTIMATES: PrepTimeEstimate[] = [
  { status: "confirmed", minMinutes: 5, maxMinutes: 10 },
  { status: "preparing", minMinutes: 10, maxMinutes: 20 },
  { status: "ready", minMinutes: 5, maxMinutes: 10 },
  { status: "delivering", minMinutes: 15, maxMinutes: 30 },
]

// Funções auxiliares
export function getOrderStatusText(status: OrderStatus): string {
  const statusMap: Record<OrderStatus, string> = {
    pending: "Pendente",
    confirmed: "Confirmado",
    preparing: "Em preparo",
    ready: "Pronto para entrega",
    delivering: "Em entrega",
    delivered: "Entregue",
    cancelled: "Cancelado",
  }
  return statusMap[status]
}

export function getOrderStatusColor(status: OrderStatus): string {
  const colorMap: Record<OrderStatus, string> = {
    pending: "bg-yellow-500",
    confirmed: "bg-blue-500",
    preparing: "bg-orange-500",
    ready: "bg-green-500",
    delivering: "bg-purple-500",
    delivered: "bg-green-700",
    cancelled: "bg-red-500",
  }
  return colorMap[status]
}

export function calculateEstimatedDeliveryTime(order: Order): Date | null {
  if (order.status === "delivered" || order.status === "cancelled") {
    return null
  }

  // Se já tiver um tempo estimado, use-o
  if (order.estimatedDeliveryTime) {
    return new Date(order.estimatedDeliveryTime)
  }

  // Caso contrário, calcule com base no status atual
  const createdAt = new Date(order.createdAt)
  let totalMinutes = 0

  // Soma os tempos máximos para cada fase
  PREP_TIME_ESTIMATES.forEach((estimate) => {
    // Só adiciona o tempo se o pedido ainda não passou por essa fase
    // ou se está atualmente nessa fase
    if (order.status === estimate.status || order.statusHistory.findIndex((h) => h.status === estimate.status) === -1) {
      totalMinutes += estimate.maxMinutes
    }
  })

  const estimatedTime = new Date(createdAt)
  estimatedTime.setMinutes(estimatedTime.getMinutes() + totalMinutes)

  return estimatedTime
}

// Função para obter os pedidos de um cliente
export function getCustomerOrders(customerId: string): Order[] {
  return MOCK_ORDERS.filter((order) => order.customerId === customerId)
}

// Função para obter todos os pedidos (para o admin)
export function getAllOrders(): Order[] {
  return [...MOCK_ORDERS].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Função para atualizar o status de um pedido
export function updateOrderStatus(orderId: string, newStatus: OrderStatus, note?: string): Order {
  const orderIndex = MOCK_ORDERS.findIndex((order) => order.id === orderId)

  if (orderIndex === -1) {
    throw new Error(`Pedido ${orderId} não encontrado`)
  }

  const updatedOrder = { ...MOCK_ORDERS[orderIndex] }
  updatedOrder.status = newStatus

  // Adicionar ao histórico de status
  updatedOrder.statusHistory.push({
    status: newStatus,
    timestamp: new Date().toISOString(),
    note,
  })

  // Atualizar tempo estimado de entrega se necessário
  if (newStatus === "confirmed" && !updatedOrder.estimatedDeliveryTime) {
    const estimatedTime = calculateEstimatedDeliveryTime(updatedOrder)
    if (estimatedTime) {
      updatedOrder.estimatedDeliveryTime = estimatedTime.toISOString()
    }
  }

  // Registrar tempo real de entrega
  if (newStatus === "delivered" && !updatedOrder.actualDeliveryTime) {
    updatedOrder.actualDeliveryTime = new Date().toISOString()
  }

  // Em um app real, enviaríamos para o backend
  // Aqui apenas atualizamos o array local
  MOCK_ORDERS[orderIndex] = updatedOrder

  return updatedOrder
}

