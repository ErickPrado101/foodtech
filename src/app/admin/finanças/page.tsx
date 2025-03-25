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
} from "recharts"
import { Calendar, Download, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getFinancialData, getFinancialTransactions } from "@/lib/finance"

export default function AdminFinancasPage() {
    const [period, setPeriod] = useState<"30d" | "7d" | "90d" | "1y">("30d")
    const [searchQuery, setSearchQuery] = useState("")
    const financialData = getFinancialData(period)
    const transactions = getFinancialTransactions()

    // Filtrar transações com base na busca
    const filteredTransactions = transactions.filter(
        (transaction) =>
            transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.id.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Finanças</h1>
                    <p className="text-muted-foreground">Gerencie e analise o desempenho financeiro do seu negócio.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select
                        value={period}
                        onValueChange={(value: string) => setPeriod(value as "30d" | "7d" | "90d" | "1y")}
                    >
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
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Exportar
                    </Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ 45.231,89</div>
                        <p className="text-xs text-muted-foreground">+20.1% em relação ao período anterior</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Despesas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ 12.543,65</div>
                        <p className="text-xs text-muted-foreground">-5.2% em relação ao período anterior</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">R$ 32.688,24</div>
                        <p className="text-xs text-muted-foreground">+32.5% em relação ao período anterior</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="transactions">Transações</TabsTrigger>
                    <TabsTrigger value="reports">Relatórios</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Receita vs Despesas</CardTitle>
                            <CardDescription>Comparativo entre receitas e despesas no período selecionado</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={financialData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`R$ ${value}`, ""]} />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#ef4444" activeDot={{ r: 8 }} name="Receita" />
                                    <Line type="monotone" dataKey="expenses" stroke="#3b82f6" name="Despesas" />
                                    <Line type="monotone" dataKey="profit" stroke="#10b981" name="Lucro" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Receita por Categoria</CardTitle>
                            <CardDescription>Distribuição da receita por categoria de produto</CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart
                                    data={[
                                        { category: "Hambúrgueres", value: 15400 },
                                        { category: "Pizzas", value: 12300 },
                                        { category: "Bebidas", value: 8700 },
                                        { category: "Porções", value: 5600 },
                                        { category: "Sobremesas", value: 3200 },
                                    ]}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="category" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`R$ ${value}`, "Receita"]} />
                                    <Legend />
                                    <Bar dataKey="value" fill="#ef4444" name="Receita" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="transactions" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div>
                                    <CardTitle>Histórico de Transações</CardTitle>
                                    <CardDescription>Registro completo de receitas e despesas</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                                        <Input
                                            placeholder="Buscar transação..."
                                            className="pl-8 w-full md:w-[250px]"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-[180px]">
                                            <Filter className="h-4 w-4 mr-2" />
                                            <SelectValue placeholder="Filtrar por tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todos os tipos</SelectItem>
                                            <SelectItem value="income">Receitas</SelectItem>
                                            <SelectItem value="expense">Despesas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium text-slate-600">ID</th>
                                            <th className="text-left py-3 px-4 font-medium text-slate-600">Data</th>
                                            <th className="text-left py-3 px-4 font-medium text-slate-600">Descrição</th>
                                            <th className="text-left py-3 px-4 font-medium text-slate-600">Categoria</th>
                                            <th className="text-left py-3 px-4 font-medium text-slate-600">Tipo</th>
                                            <th className="text-right py-3 px-4 font-medium text-slate-600">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredTransactions.map((transaction) => (
                                            <tr key={transaction.id} className="border-b hover:bg-slate-50">
                                                <td className="py-3 px-4">
                                                    <span className="font-medium">#{transaction.id}</span>
                                                </td>
                                                <td className="py-3 px-4">{new Date(transaction.date).toLocaleDateString("pt-BR")}</td>
                                                <td className="py-3 px-4">{transaction.description}</td>
                                                <td className="py-3 px-4">{transaction.category}</td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${transaction.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                            }`}
                                                    >
                                                        {transaction.type === "income" ? "Receita" : "Despesa"}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-right">
                                                    <span
                                                        className={`font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"
                                                            }`}
                                                    >
                                                        {transaction.type === "income" ? "+" : "-"}R$ {transaction.amount.toFixed(2)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="reports" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Relatórios Financeiros</CardTitle>
                            <CardDescription>Relatórios detalhados para análise financeira</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Button className="flex items-center justify-between p-4 h-auto">
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">Relatório de Vendas</span>
                                        <span className="text-sm text-muted-foreground">Análise detalhada de vendas por período</span>
                                    </div>
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button className="flex items-center justify-between p-4 h-auto">
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">Demonstrativo de Resultados</span>
                                        <span className="text-sm text-muted-foreground">Lucros e perdas do período</span>
                                    </div>
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button className="flex items-center justify-between p-4 h-auto">
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">Fluxo de Caixa</span>
                                        <span className="text-sm text-muted-foreground">Entradas e saídas detalhadas</span>
                                    </div>
                                    <Download className="h-4 w-4" />
                                </Button>
                                <Button className="flex items-center justify-between p-4 h-auto">
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium">Análise de Custos</span>
                                        <span className="text-sm text-muted-foreground">Detalhamento de custos operacionais</span>
                                    </div>
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

