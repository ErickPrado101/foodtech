"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CheckoutModal } from "@/components/checkout-modal"
import { useCart } from "@/hooks/use-cart"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true)
  }

  const handleCheckoutComplete = () => {
    setIsCheckoutModalOpen(false)
    onClose()
    clearCart()
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader className="mb-4">
            <SheetTitle className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Seu Carrinho
            </SheetTitle>
          </SheetHeader>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <ShoppingBag className="h-16 w-16 text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg mb-4">Seu carrinho está vazio</p>
              <Button variant="outline" onClick={onClose}>
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[65vh] pr-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md flex-shrink-0">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-slate-500"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-red-600 font-medium">R$ {item.product.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">R$ {totalPrice.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleCheckout}>
                  Finalizar Pedido
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        onComplete={handleCheckoutComplete}
      />
    </>
  )
}

