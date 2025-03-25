"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, Package, ShoppingBag, Tag } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { OrderDetailModal } from "@/components/order-detail-modal"
import { ProductCard } from "@/components/product-card"
import { CartSidebar } from "@/components/cart-sidebar"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"
import { getCustomerOrders } from "@/lib/orders"
import { products } from "@/lib/products"
import type { Order } from "@/lib/types"

export default function MyOrdersPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const {  totalItems } = useCart()
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("pedidos")

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("Acesso negado", {
        description: "Você precisa estar logado para acessar seus pedidos.",
      })
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  // Carregar pedidos do usuário
  useEffect(() => {
    if (user) {
      const userOrders = getCustomerOrders(user.id)
      setOrders(userOrders)
    }
  }, [user])

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

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

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-slate-700 hover:text-slate-900">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Área do Cliente</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 hidden md:inline-block">Olá, {user?.name}</span>
            <Button variant="outline" className="relative" onClick={() => setIsSidebarOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2">Carrinho</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </header>

        <Tabs defaultValue="pedidos" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="pedidos">Meus Pedidos</TabsTrigger>
            <TabsTrigger value="cardapio">Cardápio Exclusivo</TabsTrigger>
          </TabsList>

          <TabsContent value="pedidos" className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">Nenhum pedido encontrado</h2>
                <p className="text-slate-600 mb-6">Você ainda não fez nenhum pedido.</p>
                <Button className="bg-red-600 hover:bg-red-700" onClick={() => setActiveTab("cardapio")}>
                  Ver cardápio exclusivo
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <Card
                    key={order.id}
                    className="overflow-hidden hover:shadow-md transition-shadow h-[280px] flex flex-col"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Pedido #{order.id}</CardTitle>
                          <CardDescription>{new Date(order.createdAt).toLocaleString("pt-BR")}</CardDescription>
                        </div>
                        <OrderStatusBadge status={order.status} />
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="mb-4 flex-1">
                        <p className="font-medium">Itens:</p>
                        <ul className="text-sm text-slate-600">
                          {order.items.slice(0, 2).map((item, index) => (
                            <li key={index} className="flex justify-between">
                              <span>
                                {item.quantity}x {item.product.name}
                              </span>
                              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                          {order.items.length > 2 && (
                            <li className="text-slate-500 italic">+ {order.items.length - 2} outros itens</li>
                          )}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold text-red-600">R$ {order.totalPrice.toFixed(2)}</span>
                      </div>

                      {order.estimatedDeliveryTime && order.status !== "delivered" && (
                        <div className="flex items-center text-sm text-slate-600 mb-4">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            Entrega estimada:{" "}
                            {new Date(order.estimatedDeliveryTime).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      )}

                      <Button
                        className="w-full bg-red-600 hover:bg-red-700 mt-auto"
                        onClick={() => handleViewOrderDetails(order)}
                      >
                        Ver detalhes
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="cardapio" className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Tag className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Cardápio Exclusivo para Clientes</h2>
                  <p className="text-slate-600">
                    Aproveite preços especiais disponíveis apenas para clientes cadastrados!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    // Aplicar 10% de desconto para clientes cadastrados
                    price: Number((product.price * 0.9).toFixed(2)),
                  }}
                  showDiscountBadge={true}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}

      <CartSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  )
}

