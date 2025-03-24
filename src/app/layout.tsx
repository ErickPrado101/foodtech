import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { CartProvider } from "@/hooks/use-cart"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Farmácia Saúde",
  description: "Cuidando da sua saúde com dedicação",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
        <Toaster />
      </body>
    </html>
  )
}

