"use client"

import { useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, AlertTriangle, Save, X, ArrowUpDown } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  getInventoryItems,
  getInventoryCategories,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from "@/lib/inventory"
import type { InventoryItem } from "@/lib/types"

export default function AdminEstoquePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortField, setSortField] = useState<keyof InventoryItem>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null)
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    category: "",
    quantity: 0,
    minQuantity: 0,
    maxQuantity: 100,
    unit: "unid",
    cost: 0,
  })

  // Obter dados do estoque
  const inventoryItems = getInventoryItems()
  const categories = getInventoryCategories()

  // Filtrar e ordenar itens
  const filteredItems = inventoryItems
    .filter(
      (item) =>
        (categoryFilter === "all" || item.category === categoryFilter) &&
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.id.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        // @ts-expect-error - Sabemos que são números neste caso
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
    })

  // Manipuladores de eventos
  const handleSort = (field: keyof InventoryItem) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleAddItem = () => {
    try {
      addInventoryItem(newItem as InventoryItem)
      setIsAddDialogOpen(false)
      setNewItem({
        name: "",
        category: "",
        quantity: 0,
        minQuantity: 0,
        maxQuantity: 100,
        unit: "unid",
        cost: 0,
      })
      toast.success("Item adicionado com sucesso!")
    } catch {
      toast.error("Erro ao adicionar item", {
        description: "Verifique os dados e tente novamente.",
      })
    }
  }

  const handleEditItem = () => {
    if (!currentItem) return

    try {
      updateInventoryItem(currentItem.id, currentItem)
      setIsEditDialogOpen(false)
      setCurrentItem(null)
      toast.success("Item atualizado com sucesso!")
    } catch {
      toast.error("Erro ao atualizar item", {
        description: "Verifique os dados e tente novamente.",
      })
    }
  }

  const handleDeleteItem = () => {
    if (!currentItem) return

    try {
      deleteInventoryItem(currentItem.id)
      setIsDeleteDialogOpen(false)
      setCurrentItem(null)
      toast.success("Item removido com sucesso!")
    } catch {
      toast.error("Erro ao remover item", {
        description: "Não foi possível remover o item.",
      })
    }
  }

  const openEditDialog = (item: InventoryItem) => {
    setCurrentItem({ ...item })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (item: InventoryItem) => {
    setCurrentItem(item)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estoque</h1>
          <p className="text-muted-foreground">Gerencie o estoque de ingredientes e produtos.</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Item
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Itens cadastrados no estoque</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {inventoryItems.filter((item) => item.quantity <= item.minQuantity).length}
            </div>
            <p className="text-xs text-muted-foreground">Itens com estoque baixo</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor em Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {inventoryItems.reduce((sum, item) => sum + item.cost * item.quantity, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Valor total dos itens em estoque</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">Categorias de produtos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Itens em Estoque</CardTitle>
              <CardDescription>Gerencie todos os itens do seu estoque</CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Buscar item..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
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
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                    <div className="flex items-center">
                      Nome
                      {sortField === "name" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("quantity")}>
                    <div className="flex items-center">
                      Quantidade
                      {sortField === "quantity" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Unidade</TableHead>
                  <TableHead className="cursor-pointer" onClick={() => handleSort("cost")}>
                    <div className="flex items-center">
                      Custo Unit.
                      {sortField === "cost" && (
                        <ArrowUpDown className={`ml-2 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                      )}
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{item.quantity}</span>
                        <div className="h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              item.quantity <= item.minQuantity
                                ? "bg-red-500"
                                : item.quantity < item.minQuantity * 2
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${(item.quantity / item.maxQuantity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>R$ {item.cost.toFixed(2)}</TableCell>
                    <TableCell>
                      {item.quantity <= item.minQuantity ? (
                        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Baixo
                        </span>
                      ) : item.quantity < item.minQuantity * 2 ? (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                          Médio
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                          Adequado
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" onClick={() => openEditDialog(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-600" onClick={() => openDeleteDialog(item)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Nenhum item encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo para adicionar item */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Item ao Estoque</DialogTitle>
            <DialogDescription>Preencha os dados do novo item a ser adicionado ao estoque.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Item</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Ex: Hambúrguer 180g"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="unit">Unidade</Label>
                <Select value={newItem.unit} onValueChange={(value) => setNewItem({ ...newItem, unit: value })}>
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unid">Unidade</SelectItem>
                    <SelectItem value="kg">Quilograma (kg)</SelectItem>
                    <SelectItem value="g">Grama (g)</SelectItem>
                    <SelectItem value="l">Litro (l)</SelectItem>
                    <SelectItem value="ml">Mililitro (ml)</SelectItem>
                    <SelectItem value="cx">Caixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="minQuantity">Quantidade Mínima</Label>
                <Input
                  id="minQuantity"
                  type="number"
                  value={newItem.minQuantity}
                  onChange={(e) => setNewItem({ ...newItem, minQuantity: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxQuantity">Quantidade Máxima</Label>
                <Input
                  id="maxQuantity"
                  type="number"
                  value={newItem.maxQuantity}
                  onChange={(e) => setNewItem({ ...newItem, maxQuantity: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cost">Custo Unitário (R$)</Label>
              <Input
                id="cost"
                type="number"
                step="0.01"
                value={newItem.cost}
                onChange={(e) => setNewItem({ ...newItem, cost: Number(e.target.value) })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddItem}>Adicionar Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar item */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Item</DialogTitle>
            <DialogDescription>Atualize as informações do item selecionado.</DialogDescription>
          </DialogHeader>
          {currentItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nome do Item</Label>
                <Input
                  id="edit-name"
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Categoria</Label>
                <Select
                  value={currentItem.category}
                  onValueChange={(value) => setCurrentItem({ ...currentItem, category: value })}
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-quantity">Quantidade</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem({ ...currentItem, quantity: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-unit">Unidade</Label>
                  <Select
                    value={currentItem.unit}
                    onValueChange={(value) => setCurrentItem({ ...currentItem, unit: value })}
                  >
                    <SelectTrigger id="edit-unit">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unid">Unidade</SelectItem>
                      <SelectItem value="kg">Quilograma (kg)</SelectItem>
                      <SelectItem value="g">Grama (g)</SelectItem>
                      <SelectItem value="l">Litro (l)</SelectItem>
                      <SelectItem value="ml">Mililitro (ml)</SelectItem>
                      <SelectItem value="cx">Caixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-minQuantity">Quantidade Mínima</Label>
                  <Input
                    id="edit-minQuantity"
                    type="number"
                    value={currentItem.minQuantity}
                    onChange={(e) => setCurrentItem({ ...currentItem, minQuantity: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-maxQuantity">Quantidade Máxima</Label>
                  <Input
                    id="edit-maxQuantity"
                    type="number"
                    value={currentItem.maxQuantity}
                    onChange={(e) => setCurrentItem({ ...currentItem, maxQuantity: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-cost">Custo Unitário (R$)</Label>
                <Input
                  id="edit-cost"
                  type="number"
                  step="0.01"
                  value={currentItem.cost}
                  onChange={(e) => setCurrentItem({ ...currentItem, cost: Number(e.target.value) })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditItem}>
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
              Tem certeza que deseja excluir este item do estoque? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          {currentItem && (
            <div className="py-4">
              <p className="font-medium">{currentItem.name}</p>
              <p className="text-sm text-muted-foreground">
                Categoria: {currentItem.category} | Quantidade: {currentItem.quantity} {currentItem.unit}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteItem}>
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
