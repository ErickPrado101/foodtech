"use client"
import Image from "next/image"
import { Clock, MapPin, Phone, User } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { OrderStatusBadge } from "@/components/order-status-badge"
import { OrderStatusTimeline } from "@/components/order-status-timeline"
import type { Order } from "@/lib/types"

interface OrderDetailModalProps {
  order: Order
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailModal({ order, isOpen, onClose }: OrderDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Detalhes do Pedido #{order.id}</span>
            <OrderStatusBadge status={order.status} />
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            {/* Informações do cliente */}
            <div>
              <h3 className="text-lg font-medium mb-2">Informações de Entrega</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <User className="h-4 w-4 mr-2 mt-0.5 text-slate-500" />
                  <span>{order.customerName}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 mt-0.5 text-slate-500" />
                  <span>{order.customerPhone}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-slate-500" />
                  <span>{order.customerAddress}</span>
                </div>
                {order.estimatedDeliveryTime && (
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-slate-500" />
                    <span>Entrega estimada: {new Date(order.estimatedDeliveryTime).toLocaleString("pt-BR")}</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Itens do pedido */}
            <div>
              <h3 className="text-lg font-medium mb-2">Itens do Pedido</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <span className="text-slate-600">
                          {item.quantity}x R$ {item.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 line-clamp-1">{item.product.description}</p>
                      <p className="text-sm font-medium text-red-600">R$ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {order.notes && (
              <>
                <Separator />
                <div>
                  <h3 className="text-lg font-medium mb-2">Observações</h3>
                  <div className="bg-slate-50 p-3 rounded-md text-sm">{order.notes}</div>
                </div>
              </>
            )}

            <Separator />

            {/* Resumo financeiro */}
            <div>
              <h3 className="text-lg font-medium mb-2">Resumo</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal:</span>
                  <span>R$ {order.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Taxa de entrega:</span>
                  <span>Grátis</span>
                </div>
                <div className="flex justify-between font-bold mt-2">
                  <span>Total:</span>
                  <span className="text-red-600">R$ {order.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Timeline de status */}
            <div>
              <h3 className="text-lg font-medium mb-2">Status do Pedido</h3>
              <OrderStatusTimeline statusHistory={order.statusHistory} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

