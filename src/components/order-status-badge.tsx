import { Badge } from "@/components/ui/badge"
import { getOrderStatusText, getOrderStatusColor } from "@/lib/orders"
import type { OrderStatus } from "@/lib/types"

interface OrderStatusBadgeProps {
  status: OrderStatus
  className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const statusText = getOrderStatusText(status)
  const colorClass = getOrderStatusColor(status)

  return (
    <Badge className={`${colorClass} text-white ${className}`} variant="secondary">
      {statusText}
    </Badge>
  )
}

