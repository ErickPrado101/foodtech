"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { CartSidebar } from "@/components/cart-sidebar"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/lib/products"

export default function StorePage() {
  const {  totalItems } = useCart()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white/95 text-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-slate-700 hover:text-slate-900">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Voltar
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Nossa Loja</h1>
          </div>
          <Button variant="outline" className="relative" onClick={() => setIsSidebarOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-2">Carrinho</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </header>

        <main>
          <section className="mb-12">
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-100 rounded-2xl p-8 mb-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Nossos Produtos</h2>
                <p className="text-slate-700">
                  Descubra nossa seleção de medicamentos, vitaminas, produtos de higiene e beleza. Todos os produtos são
                  selecionados com cuidado para garantir sua saúde e bem-estar.
                </p>
              </div>
              <div className="flex-1">
                <Image
                  src="/171101_farmacia_de_buzios_125616-1024x683-1.jpg"
                  alt="Produtos farmacêuticos"
                  width={500}
                  height={300}
                  className="rounded-xl object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <CartSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  )
}

