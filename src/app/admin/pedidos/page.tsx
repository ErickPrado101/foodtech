"use client"

import { useEffect, useState } from "react"
import { Filter, Search, Clock, Calendar, Download, RefreshCw } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { OrderDetailModal } from "@/components/order-detail-modal"
import { AdminOrderActions } from "@/components/admin-order-actions"
import { useAuth } from "@/hooks/use-auth"
import { getAllOrders } from "@/lib/orders"
import type { Order, OrderStatus } from "@/lib/types"

export default function AdminOrdersPage() {
    const { isAdmin } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all")
    const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("active")
    const [isRefreshing, setIsRefreshing] = useState(false)

    // Carregar todos os pedidos
    useEffect(() => {
        if (isAdmin) {
            const allOrders = getAllOrders()
            setOrders(allOrders)
        }
    }, [isAdmin])

    // Filtrar pedidos
    useEffect(() => {
        let result = [...orders]

        // Filtrar por tab
        if (activeTab === "active") {
            result = result.filter((order) => !["delivered", "cancelled"].includes(order.status))
        } else if (activeTab === "completed") {
            result = result.filter((order) => ["delivered", "cancelled"].includes(order.status))
        }

        // Filtrar por status
        if (statusFilter !== "all") {
            result = result.filter((order) => order.status === statusFilter)
        }

        // Filtrar por busca
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(
                (order) =>
                    order.id.toLowerCase().includes(query) ||
                    order.customerName.toLowerCase().includes(query) ||
                    order.customerPhone.includes(query) ||
                    order.customerAddress.toLowerCase().includes(query),
            )
        }

        setFilteredOrders(result)
    }, [orders, activeTab, statusFilter, searchQuery])

    const handleViewOrderDetails = (order: Order) => {
        setSelectedOrder(order)
        setIsDetailModalOpen(true)
    }

    const handleOrderUpdated = (updatedOrder: Order) => {
        // Atualizar a lista de pedidos
        setOrders((prevOrders) =>
            prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)),
        )

        // Atualizar o pedido selecionado se estiver aberto
        if (selectedOrder?.id === updatedOrder.id) {
            setSelectedOrder(updatedOrder)
        }
    }

    const handleRefreshOrders = () => {
        setIsRefreshing(true)
        // Simular uma atualização de dados
        setTimeout(() => {
            const allOrders = getAllOrders()
            setOrders(allOrders)
            setIsRefreshing(false)
            toast.success("Pedidos atualizados com sucesso!")
        }, 1000)
    }

    // Estatísticas de pedidos
    const pendingOrders = orders.filter((order) => order.status === "pending").length
    const preparingOrders = orders.filter((order) => order.status === "preparing").length
    const deliveringOrders = orders.filter((order) => order.status === "delivering").length
    const completedOrders = orders.filter((order) => order.status === "delivered").length

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gestor de Pedidos</h1>
                    <p className="text-muted-foreground">Gerencie todos os pedidos da sua lanchonete.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleRefreshOrders} disabled={isRefreshing}>
                        <RefreshCw
                            className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                        />
                        {isRefreshing ? "Atualizando..." : "Atualizar"}
                    </Button>
                    <Button variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Filtrar por data
                    </Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-amber-50 border-amber-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingOrders}</div>
                        <p className="text-xs text-muted-foreground">Aguardando confirmação</p>
                    </CardContent>
                </Card>
                <Card className="bg-orange-50 border-orange-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Em Preparo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{preparingOrders}</div>
                        <p className="text-xs text-muted-foreground">Na cozinha</p>
                    </CardContent>
                </Card>
                <Card className="bg-purple-50 border-purple-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Em Entrega</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{deliveringOrders}</div>
                        <p className="text-xs text-muted-foreground">A caminho do cliente</p>
                    </CardContent>
                </Card>
                <Card className="bg-green-50 border-green-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedOrders}</div>
                        <p className="text-xs text-muted-foreground">Entregues hoje</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>Lista de Pedidos</CardTitle>
                            <CardDescription>Gerencie todos os pedidos em um só lugar</CardDescription>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                                <Input
                                    placeholder="Buscar pedido..."
                                    className="pl-8 w-full md:w-[250px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Select
                                value={statusFilter}
                                onValueChange={(value: OrderStatus | "all") =>
                                    setStatusFilter(value)
                                }
                            >
                                <SelectTrigger className="w-full md:w-[180px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="Filtrar por status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos os status</SelectItem>
                                    <SelectItem value="pending">Pendente</SelectItem>
                                    <SelectItem value="confirmed">Confirmado</SelectItem>
                                    <SelectItem value="preparing">Em preparo</SelectItem>
                                    <SelectItem value="ready">Pronto</SelectItem>
                                    <SelectItem value="delivering">Em entrega</SelectItem>
                                    <SelectItem value="delivered">Entregue</SelectItem>
                                    <SelectItem value="cancelled">Cancelado</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs
                        defaultValue="active"
                        onValueChange={(value: string) =>
                            setActiveTab(value as "all" | "active" | "completed")
                        }
                        className="space-y-4"
                    >
                        <TabsList>
                            <TabsTrigger value="active">Pedidos Ativos</TabsTrigger>
                            <TabsTrigger value="completed">Concluídos</TabsTrigger>
                            <TabsTrigger value="all">Todos</TabsTrigger>
                        </TabsList>

                        <TabsContent value="active" className="m-0">
                            <OrdersTable
                                orders={filteredOrders}
                                onViewDetails={handleViewOrderDetails}
                                onOrderUpdated={handleOrderUpdated}
                            />
                        </TabsContent>

                        <TabsContent value="completed" className="m-0">
                            <OrdersTable
                                orders={filteredOrders}
                                onViewDetails={handleViewOrderDetails}
                                onOrderUpdated={handleOrderUpdated}
                            />
                        </TabsContent>

                        <TabsContent value="all" className="m-0">
                            <OrdersTable
                                orders={filteredOrders}
                                onViewDetails={handleViewOrderDetails}
                                onOrderUpdated={handleOrderUpdated}
                            />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {selectedOrder && (
                <OrderDetailModal
                    order={selectedOrder}
                    isOpen={isDetailModalOpen}
                    onClose={() => setIsDetailModalOpen(false)}
                />
            )}
        </div>
    )
}

interface OrdersTableProps {
    orders: Order[]
    onViewDetails: (order: Order) => void
    onOrderUpdated: (order: Order) => void
}

function OrdersTable({ orders, onViewDetails, onOrderUpdated }: OrdersTableProps) {
    if (orders.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-500">Nenhum pedido encontrado.</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Pedido</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Cliente</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Data</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Total</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-600">Tempo</th>
                        <th className="text-right py-3 px-4 font-medium text-slate-600">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => {
                        // Calcular tempo estimado ou tempo decorrido
                        const createdAt = new Date(order.createdAt)
                        const now = new Date()
                        const estimatedDelivery = order.estimatedDeliveryTime
                            ? new Date(order.estimatedDeliveryTime)
                            : null

                        // Tempo decorrido desde a criação do pedido
                        const elapsedMinutes = Math.floor(
                            (now.getTime() - createdAt.getTime()) / (1000 * 60),
                        )

                        // Tempo restante até a entrega estimada
                        const remainingMinutes = estimatedDelivery
                            ? Math.floor(
                                (estimatedDelivery.getTime() - now.getTime()) / (1000 * 60),
                            )
                            : null

                        // Determinar classe de cor com base no tempo
                        let timeClass = "text-slate-600"
                        if (["pending", "confirmed", "preparing"].includes(order.status)) {
                            if (elapsedMinutes > 30) timeClass = "text-red-600 font-medium"
                            else if (elapsedMinutes > 20) timeClass = "text-amber-600 font-medium"
                        } else if (remainingMinutes !== null) {
                            if (remainingMinutes < 0) timeClass = "text-red-600 font-medium"
                            else if (remainingMinutes < 10) timeClass = "text-amber-600 font-medium"
                            else timeClass = "text-green-600"
                        }

                        return (
                            <tr key={order.id} className="border-b hover:bg-slate-50">
                                <td className="py-3 px-4">
                                    <span className="font-medium">#{order.id}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <div>
                                        <p className="font-medium">{order.customerName}</p>
                                        <p className="text-sm text-slate-500">{order.customerPhone}</p>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <div>
                                        <p>{new Date(order.createdAt).toLocaleDateString("pt-BR")}</p>
                                        <p className="text-sm text-slate-500">
                                            {new Date(order.createdAt).toLocaleTimeString("pt-BR")}
                                        </p>
                                    </div>
                                </td>
                                <td className="py-3 px-4">
                                    <span className="font-medium">R$ {order.totalPrice.toFixed(2)}</span>
                                </td>
                                <td className="py-3 px-4">
                                    <OrderStatusBadge status={order.status} />
                                </td>
                                <td className="py-3 px-4">
                                    <div className={`flex items-center ${timeClass}`}>
                                        <Clock className="h-4 w-4 mr-1" />
                                        {["delivered", "cancelled"].includes(order.status) ? (
                                            <span>Finalizado</span>
                                        ) : remainingMinutes !== null ? (
                                            <span>
                                                {remainingMinutes > 0
                                                    ? `${remainingMinutes} min restantes`
                                                    : "Atrasado"}
                                            </span>
                                        ) : (
                                            <span>{elapsedMinutes} min</span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm" onClick={() => onViewDetails(order)}>
                                            Detalhes
                                        </Button>
                                        <AdminOrderActions order={order} onOrderUpdated={onOrderUpdated} />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
