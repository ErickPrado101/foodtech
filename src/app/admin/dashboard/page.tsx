"use client"

import { useState } from "react"
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import { Calendar, DollarSign, Package, ShoppingBag, TrendingUp, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getFinancialData, getRecentSales, getSalesByCategory } from "@/lib/finance"
import { getInventoryAlerts } from "@/lib/inventory"
import { getAllOrders } from "@/lib/orders"

export default function AdminDashboardPage() {
    // Definindo o tipo do estado period explicitamente
    const [period, setPeriod] = useState<"7d" | "30d" | "90d" | "1y">("7d")
    const financialData = getFinancialData(period)
    const recentSales = getRecentSales()
    const salesByCategory = getSalesByCategory()
    const inventoryAlerts = getInventoryAlerts()
    const orders = getAllOrders()

    const pendingOrders = orders.filter((order) => order.status === "pending").length
    const deliveringOrders = orders.filter((order) => order.status === "delivering").length
    const completedOrders = orders.filter((order) => order.status === "delivered").length
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0)

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Visão geral do seu negócio e desempenho recente.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select
                        value={period}
                        onValueChange={(value) => setPeriod(value as "7d" | "30d" | "90d" | "1y")}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecionar período" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7d">Últimos 7 dias</SelectItem>
                            <SelectItem value="30d">Últimos 30 dias</SelectItem>
                            <SelectItem value="90d">Últimos 90 dias</SelectItem>
                            <SelectItem value="1y">Este ano</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button>
                        <Calendar className="mr-2 h-4 w-4" />
                        Período personalizado
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">+20.1% em relação ao mês anterior</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pedidos Pendentes</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingOrders}</div>
                        <p className="text-xs text-muted-foreground">
                            {pendingOrders > 0 ? "Requer atenção" : "Nenhum pedido pendente"}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Em Entrega</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{deliveringOrders}</div>
                        <p className="text-xs text-muted-foreground">{deliveringOrders} pedidos em rota de entrega</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pedidos Concluídos</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{completedOrders}</div>
                        <p className="text-xs text-muted-foreground">+7% em relação à semana anterior</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="analytics">Análise de Vendas</TabsTrigger>
                    <TabsTrigger value="alerts">Alertas</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Receita</CardTitle>
                                <CardDescription>Receita diária durante o período selecionado</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ResponsiveContainer width="100%" height={350}>
                                    <LineChart data={financialData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip formatter={(value) => [`R$ ${value}`, "Receita"]} />
                                        <Legend />
                                        <Line type="monotone" dataKey="revenue" stroke="#ef4444" activeDot={{ r: 8 }} name="Receita" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Vendas por Categoria</CardTitle>
                                <CardDescription>Distribuição de vendas por categoria de produto</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={350}>
                                    <PieChart>
                                        <Pie
                                            data={salesByCategory}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {salesByCategory.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => [`R$ ${value}`, "Vendas"]} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle>Vendas Recentes</CardTitle>
                                <CardDescription>Últimos pedidos realizados</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-8">
                                    {recentSales.map((sale) => (
                                        <div key={sale.id} className="flex items-center">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">{sale.customer}</p>
                                                <p className="text-sm text-muted-foreground">{sale.email}</p>
                                            </div>
                                            <div className="ml-auto font-medium">+R$ {sale.amount.toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Alertas de Estoque</CardTitle>
                                <CardDescription>Produtos com estoque baixo</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {inventoryAlerts.map((item) => (
                                        <div key={item.id} className="flex items-center">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">{item.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${item.quantity <= item.minQuantity ? "bg-red-500" : "bg-amber-500"}`}
                                                            style={{ width: `${(item.quantity / item.maxQuantity) * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.quantity} unid.</span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" className="ml-auto">
                                                Repor
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Análise de Vendas por Dia da Semana</CardTitle>
                            <CardDescription>Comparativo de vendas por dia da semana</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart
                                    data={[
                                        { day: "Segunda", sales: 4000 },
                                        { day: "Terça", sales: 3000 },
                                        { day: "Quarta", sales: 2000 },
                                        { day: "Quinta", sales: 2780 },
                                        { day: "Sexta", sales: 5890 },
                                        { day: "Sábado", sales: 6390 },
                                        { day: "Domingo", sales: 3490 },
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`R$ ${value}`, "Vendas"]} />
                                    <Legend />
                                    <Bar dataKey="sales" fill="#ef4444" name="Vendas" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="alerts" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Alertas do Sistema</CardTitle>
                            <CardDescription>Notificações importantes que requerem sua atenção</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {inventoryAlerts.map((item) => (
                                    <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                                            <TrendingUp className="h-4 w-4 text-red-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Estoque Baixo: {item.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Restam apenas {item.quantity} unidades. O nível mínimo recomendado é {item.minQuantity}.
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Resolver
                                        </Button>
                                    </div>
                                ))}
                                {pendingOrders > 0 && (
                                    <div className="flex items-start gap-4 p-4 border rounded-lg">
                                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                                            <ShoppingBag className="h-4 w-4 text-amber-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">Pedidos Pendentes</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Existem {pendingOrders} pedidos aguardando confirmação.
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" onClick={() => (window.location.href = "/admin/pedidos")}>
                                            Ver Pedidos
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
