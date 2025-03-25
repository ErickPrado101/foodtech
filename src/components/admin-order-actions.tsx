"use client"

import { useState } from "react"
import { ChevronDown, Clock } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { updateOrderStatus, getOrderStatusText } from "@/lib/orders"
import type { Order, OrderStatus } from "@/lib/types"

interface AdminOrderActionsProps {
  order: Order
  onOrderUpdated: (order: Order) => void
}

export function AdminOrderActions({ order, onOrderUpdated }: AdminOrderActionsProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null)
  const [statusNote, setStatusNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Determinar quais status estão disponíveis para atualização com base no status atual
  const getAvailableStatusOptions = (): OrderStatus[] => {
    switch (order.status) {
      case "pending":
        return ["confirmed", "cancelled"]
      case "confirmed":
        return ["preparing", "cancelled"]
      case "preparing":
        return ["ready", "cancelled"]
      case "ready":
        return ["delivering", "cancelled"]
      case "delivering":
        return ["delivered", "cancelled"]
      case "delivered":
      case "cancelled":
        return []
      default:
        return []
    }
  }

  const handleOpenUpdateDialog = (status: OrderStatus) => {
    setSelectedStatus(status)
    setStatusNote("")
    setIsUpdateDialogOpen(true)
  }

  const handleUpdateStatus = async () => {
    if (!selectedStatus) return

    setIsSubmitting(true)
    try {
      // Em um app real, isso seria uma chamada de API
      const updatedOrder = updateOrderStatus(order.id, selectedStatus, statusNote || undefined)

      onOrderUpdated(updatedOrder)
      setIsUpdateDialogOpen(false)

      toast.success("Status atualizado", {
        description: `Pedido #${order.id} atualizado para ${getOrderStatusText(selectedStatus)}.`,
      })
    } catch {
      toast.error("Erro ao atualizar", {
        description: "Não foi possível atualizar o status do pedido.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const availableStatusOptions = getAvailableStatusOptions()

  // Se não houver opções disponíveis, desabilitar o botão
  if (availableStatusOptions.length === 0) {
    return (
      <Button variant="outline" size="sm" disabled>
        Atualizar
      </Button>
    )
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
            Atualizar
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {availableStatusOptions.map((status) => (
            <DropdownMenuItem key={status} onClick={() => handleOpenUpdateDialog(status)}>
              {getOrderStatusText(status)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Status do Pedido</DialogTitle>
            <DialogDescription>
              Você está alterando o status do pedido #{order.id} para{" "}
              {selectedStatus && getOrderStatusText(selectedStatus)}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="h-4 w-4" />
              <span>Status atual: {getOrderStatusText(order.status)}</span>
            </div>

            <div className="space-y-2">
              <label htmlFor="status-note" className="text-sm font-medium">
                Observação (opcional)
              </label>
              <Textarea
                id="status-note"
                placeholder="Adicione uma observação sobre esta atualização..."
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleUpdateStatus} disabled={isSubmitting}>
              {isSubmitting ? "Atualizando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
