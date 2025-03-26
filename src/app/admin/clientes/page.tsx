"use client"

import { useState } from "react"
import { Search, Filter, Mail, Phone, Edit, Trash2, Plus, ArrowUpDown, Save, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Modificar a interface Customer para ser mais precisa
interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  registeredAt: string
  totalOrders: number
  totalSpent: number
  status: "active" | "inactive"
}

// Garantir que MOCK_CUSTOMERS seja tipado corretamente
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "Cliente Exemplo",
    email: "cliente@exemplo.com",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123 - Jardim Primavera",
    registeredAt: "2024-01-15T14:30:00Z",
    totalOrders: 5,
    totalSpent: 370.8,
    status: "active" as const,
  },
  {
    id: "2",
    name: "Maria Silva",
    email: "maria@exemplo.com",
    phone: "(11) 91234-5678",
    address: "Av. Paulista, 1000 - Bela Vista",
    registeredAt: "2024-02-10T10:15:00Z",
    totalOrders: 3,
    totalSpent: 129.9,
    status: "active" as const,
  },
  {
    id: "3",
    name: "João Oliveira",
    email: "joao@exemplo.com",
    phone: "(11) 99876-5432",
    address: "Rua Augusta, 500 - Consolação",
    registeredAt: "2024-02-22T16:45:00Z",
    totalOrders: 2,
    totalSpent: 79.6,
    status: "active" as const,
  },
  {
    id: "4",
    name: "Ana Souza",
    email: "ana@exemplo.com",
    phone: "(11) 97654-3210",
    address: "Rua Oscar Freire, 300 - Jardins",
    registeredAt: "2024-03-05T09:20:00Z",
    totalOrders: 1,
    totalSpent: 45.9,
    status: "active" as const,
  },
  {
    id: "5",
    name: "Pedro Santos",
    email: "pedro@exemplo.com",
    phone: "(11) 98888-7777",
    address: "Av. Brigadeiro Faria Lima, 1500 - Pinheiros",
    registeredAt: "2024-03-10T11:30:00Z",
    totalOrders: 4,
    totalSpent: 215.6,
    status: "inactive" as const,
  },
  {
    id: "6",
    name: "Carla Mendes",
    email: "carla@exemplo.com",
    phone: "(11) 96666-5555",
    address: "Rua Teodoro Sampaio, 800 - Pinheiros",
    registeredAt: "2024-03-15T14:00:00Z",
    totalOrders: 2,
    totalSpent: 110.0,
    status: "active" as const,
  },
  {
    id: "7",
    name: "Roberto Almeida",
    email: "roberto@exemplo.com",
    phone: "(11) 95555-4444",
    address: "Av. Rebouças, 1200 - Pinheiros",
    registeredAt: "2024-03-18T10:45:00Z",
    totalOrders: 0,
    totalSpent: 0,
    status: "inactive" as const,
  },
]

export default function AdminClientesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<keyof Customer>("name")
  const [sortDirection, setSortDirection] = useState("asc")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null)
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS)

  // Filtrar e ordenar clientes
  const filteredCustomers = customers
    .filter(
      (customer) =>
        (statusFilter === "all" || customer.status === statusFilter) &&
        (customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phone.includes(searchQuery)),
    )
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue
        } else {
          return 0
        }
      }
    })

  // Manipuladores de eventos
  const handleSort = (field: keyof Customer) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleEditCustomer = () => {
    if (!currentCustomer) return

    setCustomers(customers.map((c) => (c.id === currentCustomer.id ? currentCustomer : c)))
    setIsEditDialogOpen(false)
    setCurrentCustomer(null)
    toast.success("Cliente atualizado com sucesso!")
  }

  const handleDeleteCustomer = () => {
    if (!currentCustomer) return

    setCustomers(customers.filter((c) => c.id !== currentCustomer.id))
    setIsDeleteDialogOpen(false)
    setCurrentCustomer(null)
    toast.success("Cliente removido com sucesso!")
  }

  // Corrigir o método handleAddCustomer para garantir tipagem correta
  const handleAddCustomer = () => {
    if (!currentCustomer) return

    const newCustomer: Customer = {
      ...currentCustomer,
      id: `${customers.length + 1}`,
      registeredAt: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0,
      status: "active",
    }

    setCustomers([...customers, newCustomer])
    setIsAddDialogOpen(false)
    setCurrentCustomer(null)
    toast.success("Cliente adicionado com sucesso!")
  }

  // Corrigir o método openAddDialog para criar um objeto Customer completo
  const openAddDialog = () => {
    setCurrentCustomer({
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      registeredAt: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0,
      status: "active" as const,
    })
    setIsAddDialogOpen(true)
  }

  const openEditDialog = (customer: Customer) => {
    setCurrentCustomer(customer)
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (customer: Customer) => {
    setCurrentCustomer(customer)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">Gerencie os clientes cadastrados no sistema.</p>
        </div>
        <Button onClick={openAddDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Cliente
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">Clientes cadastrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.filter((c) => c.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Realizaram pedidos recentemente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Nos últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R${" "}
              {(
                customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.filter((c) => c.totalOrders > 0).length
              ).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Gasto médio por cliente</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="todos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="todos">Todos os Clientes</TabsTrigger>
          <TabsTrigger value="ativos">Clientes Ativos</TabsTrigger>
          <TabsTrigger value="inativos">Clientes Inativos</TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Lista de Clientes</CardTitle>
                  <CardDescription>Gerencie todos os clientes cadastrados</CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                      placeholder="Buscar cliente..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os status</SelectItem>
                      <SelectItem value="active">Ativos</SelectItem>
                      <SelectItem value="inactive">Inativos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                        <div className="flex items-center">
                          Nome
                          {sortField === "name" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Endereço</TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("totalOrders")}>
                        <div className="flex items-center">
                          Pedidos
                          {sortField === "totalOrders" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("totalSpent")}>
                        <div className="flex items-center">
                          Total Gasto
                          {sortField === "totalSpent" && (
                            <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Mail className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                              <span className="text-sm">{customer.email}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="h-3.5 w-3.5 mr-1.5 text-slate-500" />
                              <span className="text-sm">{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{customer.address}</TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell>R$ {customer.totalSpent.toFixed(2)}</TableCell>
                        <TableCell>
                          {customer.status === "active" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-100">Inativo</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => openEditDialog(customer)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              className="text-red-600"
                              onClick={() => openDeleteDialog(customer)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredCustomers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Nenhum cliente encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ativos" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Pedidos</TableHead>
                    <TableHead>Total Gasto</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers
                    .filter((c) => c.status === "active")
                    .map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{customer.email}</span>
                            <span className="text-sm text-slate-500">{customer.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell>R$ {customer.totalSpent.toFixed(2)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(customer)}>
                            Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inativos" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead>Último Pedido</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers
                    .filter((c) => c.status === "inactive")
                    .map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{customer.email}</span>
                            <span className="text-sm text-slate-500">{customer.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {customer.totalOrders > 0
                            ? new Date(customer.registeredAt).toLocaleDateString("pt-BR")
                            : "Nunca pediu"}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600"
                            onClick={() => {
                              const updated: Customer = {
                                ...customer,
                                status: "active",
                              }
                              setCustomers(customers.map((c) => (c.id === customer.id ? updated : c)))
                              toast.success(`Cliente ${customer.name} ativado com sucesso!`)
                            }}
                          >
                            Ativar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo para editar cliente */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Cliente</DialogTitle>
            <DialogDescription>Atualize as informações do cliente selecionado.</DialogDescription>
          </DialogHeader>
          {currentCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome completo</Label>
                <Input
                  id="edit-name"
                  value={currentCustomer.name}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentCustomer.email}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Telefone</Label>
                <Input
                  id="edit-phone"
                  value={currentCustomer.phone}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, phone: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Endereço</Label>
                <Input
                  id="edit-address"
                  value={currentCustomer.address}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, address: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={currentCustomer.status}
                  onValueChange={(value) =>
                    setCurrentCustomer({ ...currentCustomer, status: value as "active" | "inactive" })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditCustomer}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para confirmar exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          {currentCustomer && (
            <div className="py-4">
              <p className="font-medium">{currentCustomer.name}</p>
              <p className="text-sm text-muted-foreground">
                Email: {currentCustomer.email} | Telefone: {currentCustomer.phone}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteCustomer}>
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para adicionar cliente */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Cliente</DialogTitle>
            <DialogDescription>Preencha os dados do novo cliente.</DialogDescription>
          </DialogHeader>
          {currentCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="add-name">Nome completo</Label>
                <Input
                  id="add-name"
                  value={currentCustomer.name}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, name: e.target.value })}
                  placeholder="Nome do cliente"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-email">Email</Label>
                <Input
                  id="add-email"
                  type="email"
                  value={currentCustomer.email}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-phone">Telefone</Label>
                <Input
                  id="add-phone"
                  value={currentCustomer.phone}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="add-address">Endereço</Label>
                <Input
                  id="add-address"
                  value={currentCustomer.address}
                  onChange={(e) => setCurrentCustomer({ ...currentCustomer, address: e.target.value })}
                  placeholder="Endereço completo"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddCustomer}>
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Cliente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

