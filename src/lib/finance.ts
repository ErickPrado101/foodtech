import type { FinancialTransaction } from "./types"

// Dados mockados para demonstração
const MOCK_FINANCIAL_DATA = {
  "7d": [
    { date: "18/03", revenue: 1200, expenses: 450, profit: 750 },
    { date: "19/03", revenue: 1500, expenses: 520, profit: 980 },
    { date: "20/03", revenue: 1350, expenses: 480, profit: 870 },
    { date: "21/03", revenue: 1800, expenses: 600, profit: 1200 },
    { date: "22/03", revenue: 2100, expenses: 700, profit: 1400 },
    { date: "23/03", revenue: 1950, expenses: 650, profit: 1300 },
    { date: "24/03", revenue: 2300, expenses: 750, profit: 1550 },
  ],
  "30d": [
    { date: "Semana 1", revenue: 8500, expenses: 3200, profit: 5300 },
    { date: "Semana 2", revenue: 9200, expenses: 3500, profit: 5700 },
    { date: "Semana 3", revenue: 10500, expenses: 3800, profit: 6700 },
    { date: "Semana 4", revenue: 11800, expenses: 4100, profit: 7700 },
  ],
  "90d": [
    { date: "Janeiro", revenue: 35000, expenses: 12000, profit: 23000 },
    { date: "Fevereiro", revenue: 38000, expenses: 13500, profit: 24500 },
    { date: "Março", revenue: 42000, expenses: 15000, profit: 27000 },
  ],
  "1y": [
    { date: "Jan", revenue: 35000, expenses: 12000, profit: 23000 },
    { date: "Fev", revenue: 38000, expenses: 13500, profit: 24500 },
    { date: "Mar", revenue: 42000, expenses: 15000, profit: 27000 },
    { date: "Abr", revenue: 39000, expenses: 14000, profit: 25000 },
    { date: "Mai", revenue: 41000, expenses: 14500, profit: 26500 },
    { date: "Jun", revenue: 43000, expenses: 15500, profit: 27500 },
    { date: "Jul", revenue: 45000, expenses: 16000, profit: 29000 },
    { date: "Ago", revenue: 44000, expenses: 15800, profit: 28200 },
    { date: "Set", revenue: 46000, expenses: 16500, profit: 29500 },
    { date: "Out", revenue: 48000, expenses: 17000, profit: 31000 },
    { date: "Nov", revenue: 50000, expenses: 18000, profit: 32000 },
    { date: "Dez", revenue: 55000, expenses: 20000, profit: 35000 },
  ],
}

const MOCK_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: "TRX-001",
    date: "2024-03-24T19:30:00Z",
    description: "Pedido #ORD-001",
    category: "Vendas",
    type: "income",
    amount: 70.7,
  },
  {
    id: "TRX-002",
    date: "2024-03-24T20:15:00Z",
    description: "Pedido #ORD-002",
    category: "Vendas",
    type: "income",
    amount: 58.8,
  },
  {
    id: "TRX-003",
    date: "2024-03-24T20:45:00Z",
    description: "Pedido #ORD-003",
    category: "Vendas",
    type: "income",
    amount: 129.9,
  },
  {
    id: "TRX-004",
    date: "2024-03-24T21:10:00Z",
    description: "Pedido #ORD-004",
    category: "Vendas",
    type: "income",
    amount: 79.6,
  },
  {
    id: "TRX-005",
    date: "2024-03-24T21:30:00Z",
    description: "Pedido #ORD-005",
    category: "Vendas",
    type: "income",
    amount: 31.8,
  },
  {
    id: "TRX-006",
    date: "2024-03-24T08:00:00Z",
    description: "Compra de ingredientes",
    category: "Insumos",
    type: "expense",
    amount: 450.0,
  },
  {
    id: "TRX-007",
    date: "2024-03-24T09:30:00Z",
    description: "Pagamento de funcionários",
    category: "Salários",
    type: "expense",
    amount: 1200.0,
  },
  {
    id: "TRX-008",
    date: "2024-03-23T14:00:00Z",
    description: "Conta de energia",
    category: "Utilidades",
    type: "expense",
    amount: 350.0,
  },
  {
    id: "TRX-009",
    date: "2024-03-23T15:30:00Z",
    description: "Aluguel do espaço",
    category: "Aluguel",
    type: "expense",
    amount: 2500.0,
  },
  {
    id: "TRX-010",
    date: "2024-03-23T16:45:00Z",
    description: "Manutenção de equipamentos",
    category: "Manutenção",
    type: "expense",
    amount: 180.0,
  },
  {
    id: "TRX-011",
    date: "2024-03-23T18:30:00Z",
    description: "Pedido #ORD-006",
    category: "Vendas",
    type: "income",
    amount: 95.5,
  },
  {
    id: "TRX-012",
    date: "2024-03-23T19:15:00Z",
    description: "Pedido #ORD-007",
    category: "Vendas",
    type: "income",
    amount: 120.3,
  },
  {
    id: "TRX-013",
    date: "2024-03-23T20:00:00Z",
    description: "Pedido #ORD-008",
    category: "Vendas",
    type: "income",
    amount: 85.2,
  },
  {
    id: "TRX-014",
    date: "2024-03-22T19:00:00Z",
    description: "Pedido #ORD-009",
    category: "Vendas",
    type: "income",
    amount: 110.0,
  },
  {
    id: "TRX-015",
    date: "2024-03-22T20:30:00Z",
    description: "Pedido #ORD-010",
    category: "Vendas",
    type: "income",
    amount: 75.8,
  },
]

// Funções para obter dados financeiros
export function getFinancialData(period: "7d" | "30d" | "90d" | "1y") {
  return MOCK_FINANCIAL_DATA[period]
}

export function getFinancialTransactions(): FinancialTransaction[] {
  return [...MOCK_TRANSACTIONS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getRecentSales() {
  return [
    { id: "1", customer: "Maria Silva", email: "maria@example.com", amount: 129.9 },
    { id: "2", customer: "João Oliveira", email: "joao@example.com", amount: 79.6 },
    { id: "3", customer: "Ana Souza", email: "ana@example.com", amount: 95.5 },
    { id: "4", customer: "Pedro Santos", email: "pedro@example.com", amount: 85.2 },
    { id: "5", customer: "Carla Mendes", email: "carla@example.com", amount: 110.0 },
  ]
}

export function getSalesByCategory() {
  return [
    { name: "Hambúrgueres", value: 15400 },
    { name: "Pizzas", value: 12300 },
    { name: "Bebidas", value: 8700 },
    { name: "Porções", value: 5600 },
    { name: "Sobremesas", value: 3200 },
  ]
}

