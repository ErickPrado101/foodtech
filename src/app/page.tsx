import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white/95 text-slate-900">
      <div className="container mx-auto px-4 py-12">
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <Image
              src="/Beige and Brown Vintage Minimalist Bakery Shop Logo.png"
              alt="Padaria Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-slate-900">Padaria</h1>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <a href="#" className="text-slate-700 hover:text-slate-900">
                  Início
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-700 hover:text-slate-900">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-700 hover:text-slate-900">
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <section className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <div className="flex-1 space-y-6">
              <h2 className="text-5xl font-bold leading-tight">
                Pães artesanais feitos com <span className="text-amber-600">paixão</span> e tradição
              </h2>
              <p className="text-lg text-slate-700">
                Nossa padaria combina técnicas tradicionais com ingredientes selecionados para criar pães artesanais de
                sabor incomparável.
              </p>
              <div className="pt-4">
                <Link href="/shop">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-6 rounded-lg text-lg">
                    Visitar nossa padaria
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/passo-a-passo-como-montar-uma-padaria.webp"
                  alt="Pães artesanais"
                  width={600}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-amber-600 font-bold">Mais de 20 variedades</p>
                <p className="text-slate-700">Feitos diariamente</p>
              </div>
            </div>
          </section>

          <section id="about" className="py-16 bg-slate-50 rounded-3xl p-12 mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
              <p className="text-slate-700 max-w-3xl mx-auto">
                Desde 1995, a Padaria Elegante tem se dedicado a trazer o melhor da panificação artesanal para nossa
                comunidade. Nossos pães são feitos com fermentação natural e ingredientes orgânicos, garantindo sabor e
                qualidade em cada mordida.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Ingredientes Selecionados</h3>
                <p className="text-slate-700">
                  Utilizamos apenas ingredientes de alta qualidade, muitos deles orgânicos e de produtores locais.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Técnicas Tradicionais</h3>
                <p className="text-slate-700">
                  Nossos padeiros são mestres em técnicas tradicionais de fermentação e modelagem de pães.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-amber-600 text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Frescor Diário</h3>
                <p className="text-slate-700">
                  Todos os nossos produtos são feitos diariamente, garantindo frescor e qualidade em cada compra.
                </p>
              </div>
            </div>
          </section>

          <section id="contact" className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
              <p className="text-slate-700 max-w-3xl mx-auto">
                Estamos sempre à disposição para atender nossos clientes. Entre em contato conosco para encomendas
                especiais ou dúvidas.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Informações de Contato</h3>
                <ul className="space-y-3 text-slate-700">
                  <li>📍 Rua dos Pães, 123 - Centro</li>
                  <li>📞 (11) 99999-9999</li>
                  <li>✉️ contato@padariaelegante.com</li>
                  <li>⏰ Segunda a Sábado: 6h às 20h</li>
                  <li>⏰ Domingo: 7h às 13h</li>
                </ul>
              </div>

              <div className="w-full max-w-md">
                <Link href="/shop">
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-6 rounded-lg text-lg">
                    Fazer um pedido agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-24 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image
                src="/Beige and Brown Vintage Minimalist Bakery Shop Logo.png"
                alt="Padaria Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-lg font-bold">Padaria Elegante</span>
            </div>
            <p className="text-slate-600 text-sm">© 2024 Padaria Elegante. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

