"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Check, Copy, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function CheckoutModal({ isOpen, onClose, onComplete }: CheckoutModalProps) {
  const router = useRouter()
  const { cartItems, totalPrice } = useCart()
  const { user, isAuthenticated } = useAuth()

  const [name, setName] = useState(user?.name || "")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState(user?.phone || "")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState("")
  const [showWhatsappLink, setShowWhatsappLink] = useState(false)
  const linkRef = useRef<HTMLAnchorElement>(null)

  // Redirecionar para login se não estiver autenticado
  const handleLoginRedirect = () => {
    onClose()
    router.push("/login")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Prepare order message
    const orderItems = cartItems
      .map((item) => `- ${item.quantity}x ${item.product.name} (R$ ${(item.product.price * item.quantity).toFixed(2)})`)
      .join("\n")

    const message = `*NOVO PEDIDO*\n\n*Cliente:* ${name}\n*Telefone:* ${phone}\n*Endereço:* ${address}\n\n*Itens do Pedido:*\n${orderItems}\n\n*Total:* R$ ${totalPrice.toFixed(2)}\n\n*Observações:* ${notes || "Nenhuma"}`

    // Encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(message)

    // Use o número de telefone correto (este é um exemplo, substitua pelo número real)
    // Formato internacional sem o '+' e sem espaços ou caracteres especiais
    const phoneNumber = "5511999999999" // Substitua pelo número real da lanchonete

    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
    setWhatsappUrl(url)
    setShowWhatsappLink(true)

    // Redirecionar diretamente para o WhatsApp após um pequeno delay
    // para dar tempo ao usuário de ver a mensagem de sucesso
    setTimeout(() => {
      // Tenta abrir o WhatsApp usando o elemento <a> com atributo target="_self"
      if (linkRef.current) {
        linkRef.current.click()
      }
    }, 1000)

    // Show success state
    setIsSuccess(true)
    setTimeout(() => {
      onComplete()
      setIsSuccess(false)
      setIsSubmitting(false)
      setShowWhatsappLink(false)
      // Reset form
      if (!user) {
        setName("")
        setPhone("")
      }
      setAddress("")
      setNotes("")
    }, 5000) // Aumentado para dar tempo ao usuário de ver e usar o link
  }

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(whatsappUrl)
      .then(() => {
        toast.success("Link copiado!", {
          description: "O link do WhatsApp foi copiado para a área de transferência.",
        })
      })
      .catch((err) => {
        console.error("Erro ao copiar: ", err)
        toast.error("Erro ao copiar o link", {
          description: "Tente novamente ou copie manualmente.",
        })
      })
  }

  return (
    <Dialog open={isOpen} onOpenChange={isSuccess ? undefined : onClose}>
      <DialogContent className="sm:max-w-md">
        {!isAuthenticated ? (
          <div className="py-6">
            <DialogHeader>
              <DialogTitle>Faça login para continuar</DialogTitle>
              <DialogDescription>Para finalizar seu pedido, você precisa estar logado.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-6">
              <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleLoginRedirect}>
                Fazer login
              </Button>
              <Button variant="outline" className="w-full" onClick={onClose}>
                Voltar ao carrinho
              </Button>
            </div>
          </div>
        ) : isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold mb-2">Pedido Enviado!</h2>
            <p className="text-center text-slate-600 mb-4">
              Seu pedido foi processado com sucesso. Você será redirecionado para o WhatsApp para enviar a mensagem.
            </p>

            {showWhatsappLink && (
              <div className="w-full mt-2 space-y-3">
                <p className="text-sm text-slate-500">
                  Se você não for redirecionado automaticamente, clique no botão abaixo:
                </p>

                <Button
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                  onClick={() => (window.location.href = whatsappUrl)}
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir WhatsApp
                </Button>

                <div className="flex items-center gap-2">
                  <Button variant="outline" className="flex-1" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar Link
                  </Button>
                </div>

                {/* Link invisível que será clicado programaticamente */}
                <a ref={linkRef} href={whatsappUrl} target="_self" className="hidden" rel="noopener noreferrer">
                  Abrir WhatsApp
                </a>
              </div>
            )}
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Finalizar Pedido</DialogTitle>
              <DialogDescription>
                Preencha seus dados para finalizar o pedido. Enviaremos as informações via WhatsApp.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required disabled={!!user} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={!!user?.phone}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Endereço de entrega</Label>
                  <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Observações (opcional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Instruções especiais para entrega, etc."
                  />
                </div>
              </div>
              <DialogFooter>
                <div className="w-full flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total do Pedido:</span>
                    <span className="font-bold text-lg">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                    {isSubmitting ? "Processando..." : "Confirmar Pedido"}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

