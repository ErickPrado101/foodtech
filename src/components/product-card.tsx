"use client"

import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { QuantityModal } from "@/components/quantity-modal"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardHeader className="p-4">
          <CardTitle className="text-xl">{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-slate-700 mb-2">{product.description}</p>
          <p className="text-amber-600 font-bold text-lg">R$ {product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={() => setIsModalOpen(true)}>
            Adicionar ao Carrinho
          </Button>
        </CardFooter>
      </Card>

      <QuantityModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

