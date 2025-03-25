"use client"

import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { QuantityModal } from "@/components/quantity-modal"

interface ProductCardProps {
  product: {
    price: number;
    id: string;
    name: string;
    description: string;
    image: string;
  };
  showDiscountBadge?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Card className="flex flex-col h-96 overflow-hidden transition-all hover:shadow-lg">
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
        <CardContent className="p-4 flex-1">
          {/* Caixa de texto com altura fixa para manter padronização mesmo com descrições longas */}
          <div className="h-24">
            <p className="text-slate-700 mb-2 line-clamp-3">{product.description}</p>
            <p className="text-red-600 font-bold text-lg">R$ {product.price.toFixed(2)}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => setIsModalOpen(true)}
          >
            Adicionar ao Carrinho
          </Button>
        </CardFooter>
      </Card>

      <QuantityModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}