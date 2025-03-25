"use client"

import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { QuantityModal } from "@/components/quantity-modal"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  showDiscountBadge?: boolean
}

export function ProductCard({ product, showDiscountBadge = false }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg h-[400px] flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          {showDiscountBadge && <Badge className="absolute top-2 right-2 bg-green-600">10% OFF</Badge>}
        </div>
        <CardHeader className="p-4 pb-0">
          <CardTitle className="text-xl line-clamp-1">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2 flex-1">
          <p className="text-slate-700 mb-2 line-clamp-3 h-[4.5rem]">{product.description}</p>
          <div className="flex items-center gap-2">
            {showDiscountBadge && (
              <span className="text-sm text-slate-500 line-through">R$ {(product.price / 0.9).toFixed(2)}</span>
            )}
            <p className="text-red-600 font-bold text-lg">R$ {product.price.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => setIsModalOpen(true)}>
            Adicionar ao Carrinho
          </Button>
        </CardFooter>
      </Card>

      <QuantityModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

