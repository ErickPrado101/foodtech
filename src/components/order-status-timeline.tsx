import { CheckCircle2 } from "lucide-react"
import { getOrderStatusText, getOrderStatusColor } from "@/lib/orders"
import type { OrderStatus } from "@/lib/types"

interface StatusHistoryItem {
  status: OrderStatus
  timestamp: string
  note?: string
}

interface OrderStatusTimelineProps {
  statusHistory: StatusHistoryItem[]
}

export function OrderStatusTimeline({ statusHistory }: OrderStatusTimelineProps) {
  // Ordenar por timestamp
  const sortedHistory = [...statusHistory].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  )

  return (
    <div className="relative space-y-4 ml-2 mt-2">
      {sortedHistory.map((item, index) => {
        const isLast = index === sortedHistory.length - 1
        const colorClass = getOrderStatusColor(item.status).replace("bg-", "text-")

        return (
          <div key={index} className="relative pl-6">
            {/* Linha vertical conectando os pontos */}
            {!isLast && (
              <div
                className="absolute left-[0.6rem] top-[1.4rem] w-0.5 bg-slate-200"
                style={{ height: "calc(100% + 0.5rem)" }}
              />
            )}

            {/* Círculo de status */}
            <div className={`absolute left-0 top-1 rounded-full ${colorClass}`}>
              <CheckCircle2 className="h-5 w-5" />
            </div>

            {/* Conteúdo */}
            <div>
              <p className="font-medium">{getOrderStatusText(item.status)}</p>
              <p className="text-sm text-slate-500">{new Date(item.timestamp).toLocaleString("pt-BR")}</p>
              {item.note && (
                <p className="text-sm text-slate-600 mt-1 italic">&quot;{item.note}&quot;</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
