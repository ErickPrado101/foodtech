"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/lib/types"

interface QuantityModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function QuantityModal({ product, isOpen, onClose }: QuantityModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    onClose()
    setQuantity(1)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar ao Carrinho</DialogTitle>
          <DialogDescription>Selecione a quantidade desejada de {product.name}.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4 py-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-md">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-teal-600 font-bold">R$ {product.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 py-2">
          <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium text-lg">{quantity}</span>
          <Button variant="outline" size="icon" onClick={incrementQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-between">
          <div className="text-lg font-bold">Total: R$ {(product.price * quantity).toFixed(2)}</div>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleAddToCart}>
            Adicionar ao Carrinho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

