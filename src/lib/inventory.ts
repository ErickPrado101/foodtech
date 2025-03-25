import type { InventoryItem } from "./types"

// Dados mockados para demonstração
const MOCK_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "INV-001",
    name: "Hambúrguer 180g",
    category: "Carnes",
    quantity: 45,
    minQuantity: 20,
    maxQuantity: 100,
    unit: "unid",
    cost: 4.5,
  },
  {
    id: "INV-002",
    name: "Pão de Hambúrguer",
    category: "Pães",
    quantity: 60,
    minQuantity: 30,
    maxQuantity: 150,
    unit: "unid",
    cost: 1.2,
  },
  {
    id: "INV-003",
    name: "Queijo Cheddar",
    category: "Laticínios",
    quantity: 25,
    minQuantity: 15,
    maxQuantity: 50,
    unit: "kg",
    cost: 28.9,
  },
  {
    id: "INV-004",
    name: "Alface Americana",
    category: "Vegetais",
    quantity: 8,
    minQuantity: 5,
    maxQuantity: 20,
    unit: "kg",
    cost: 12.5,
  },
  {
    id: "INV-005",
    name: "Tomate",
    category: "Vegetais",
    quantity: 12,
    minQuantity: 10,
    maxQuantity: 30,
    unit: "kg",
    cost: 8.9,
  },
  {
    id: "INV-006",
    name: "Batata Frita Congelada",
    category: "Congelados",
    quantity: 35,
    minQuantity: 20,
    maxQuantity: 80,
    unit: "kg",
    cost: 15.5,
  },
  {
    id: "INV-007",
    name: "Refrigerante Cola 2L",
    category: "Bebidas",
    quantity: 48,
    minQuantity: 24,
    maxQuantity: 120,
    unit: "unid",
    cost: 6.5,
  },
  {
    id: "INV-008",
    name: "Refrigerante Guaraná 2L",
    category: "Bebidas",
    quantity: 36,
    minQuantity: 24,
    maxQuantity: 120,
    unit: "unid",
    cost: 5.9,
  },
  {
    id: "INV-009",
    name: "Molho Especial",
    category: "Molhos",
    quantity: 5,
    minQuantity: 10,
    maxQuantity: 30,
    unit: "l",
    cost: 22.0,
  },
  {
    id: "INV-010",
    name: "Bacon",
    category: "Carnes",
    quantity: 8,
    minQuantity: 5,
    maxQuantity: 15,
    unit: "kg",
    cost: 32.9,
  },
  {
    id: "INV-011",
    name: "Massa de Pizza",
    category: "Massas",
    quantity: 40,
    minQuantity: 20,
    maxQuantity: 80,
    unit: "unid",
    cost: 3.5,
  },
  {
    id: "INV-012",
    name: "Molho de Tomate",
    category: "Molhos",
    quantity: 18,
    minQuantity: 10,
    maxQuantity: 40,
    unit: "l",
    cost: 12.0,
  },
  {
    id: "INV-013",
    name: "Mussarela",
    category: "Laticínios",
    quantity: 15,
    minQuantity: 10,
    maxQuantity: 30,
    unit: "kg",
    cost: 32.5,
  },
  {
    id: "INV-014",
    name: "Cebola",
    category: "Vegetais",
    quantity: 20,
    minQuantity: 10,
    maxQuantity: 40,
    unit: "kg",
    cost: 5.9,
  },
  {
    id: "INV-015",
    name: "Óleo de Fritura",
    category: "Óleos",
    quantity: 12,
    minQuantity: 6,
    maxQuantity: 24,
    unit: "l",
    cost: 9.8,
  },
]

// Funções para gerenciar o estoque
export function getInventoryItems(): InventoryItem[] {
  return [...MOCK_INVENTORY_ITEMS]
}

export function getInventoryCategories(): string[] {
  const categories = new Set(MOCK_INVENTORY_ITEMS.map((item) => item.category))
  return Array.from(categories)
}

export function getInventoryAlerts(): InventoryItem[] {
  return MOCK_INVENTORY_ITEMS.filter((item) => item.quantity <= item.minQuantity)
}

export function addInventoryItem(item: InventoryItem): InventoryItem {
  // Gerar ID para o novo item
  const newId = `INV-${String(MOCK_INVENTORY_ITEMS.length + 1).padStart(3, "0")}`
  const newItem = { ...item, id: newId }

  // Em um app real, enviaríamos para o backend
  // Aqui apenas simulamos adicionando ao array
  MOCK_INVENTORY_ITEMS.push(newItem)

  return newItem
}

export function updateInventoryItem(id: string, updatedItem: InventoryItem): InventoryItem {
  const index = MOCK_INVENTORY_ITEMS.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new Error(`Item ${id} não encontrado`)
  }

  // Em um app real, enviaríamos para o backend
  // Aqui apenas simulamos atualizando o array
  MOCK_INVENTORY_ITEMS[index] = { ...updatedItem }

  return MOCK_INVENTORY_ITEMS[index]
}

export function deleteInventoryItem(id: string): void {
  const index = MOCK_INVENTORY_ITEMS.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new Error(`Item ${id} não encontrado`)
  }

  // Em um app real, enviaríamos para o backend
  // Aqui apenas simulamos removendo do array
  MOCK_INVENTORY_ITEMS.splice(index, 1)
}

