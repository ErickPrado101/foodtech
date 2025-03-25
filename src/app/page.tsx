import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Sabor Express Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold">Sabor Express</h1>
          </div>
          <nav className="flex flex-col md:flex-row items-center gap-4">
            <ul className="flex gap-6">
              <li>
                <a
                  href="#"
                  className="transition-colors duration-200 hover:text-gray-900 text-gray-700"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="transition-colors duration-200 hover:text-gray-900 text-gray-700"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="transition-colors duration-200 hover:text-gray-900 text-gray-700"
                >
                  Contato
                </a>
              </li>
            </ul>
            <Link
              href="/login?role=admin"
              className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
            >
              Área da Empresa
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main>
          {/* Seção Hero */}
          <section className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <div className="flex-1 space-y-6">
              <h2 className="text-5xl font-bold leading-tight">
                Sabores incríveis com{" "}
                <span className="text-red-600">entrega rápida</span>
              </h2>
              <p className="text-lg text-gray-700">
                Nossa lanchonete oferece os melhores lanches, pizzas e porções da
                cidade, com ingredientes frescos e sabor incomparável.
              </p>
              <div className="pt-4">
                <Link href="/loja">
                  <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg transition-colors duration-200">
                    Ver cardápio
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Lanches deliciosos"
                  width={600}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-red-600 font-bold">Entrega em 30 minutos</p>
                <p className="text-gray-700">Ou a próxima é por nossa conta</p>
              </div>
            </div>
          </section>

          {/* Seção Sobre */}
          <section id="about" className="py-16 bg-gray-50 rounded-3xl p-12 mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Desde 2010, o Sabor Express tem se dedicado a oferecer os melhores
                lanches e refeições rápidas da cidade. Nossa paixão pela
                gastronomia e compromisso com a qualidade nos tornaram referência em
                sabor e atendimento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: 1,
                  title: "Ingredientes Frescos",
                  description:
                    "Utilizamos apenas ingredientes frescos e de alta qualidade, selecionados diariamente.",
                },
                {
                  id: 2,
                  title: "Receitas Exclusivas",
                  description:
                    "Nossas receitas são exclusivas e desenvolvidas por chefs especializados em fast food gourmet.",
                },
                {
                  id: 3,
                  title: "Entrega Rápida",
                  description:
                    "Entregamos seu pedido em até 30 minutos, garantindo que chegue quente e saboroso.",
                },
              ].map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-red-600 text-xl font-bold">{item.id}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Seção Contato */}
          <section id="contact" className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Estamos sempre à disposição para atender nossos clientes. Entre em
                contato conosco para fazer seu pedido ou tirar dúvidas.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Informações de Contato</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>📍 Av. dos Sabores, 123 - Centro</li>
                  <li>📞 (11) 99999-9999</li>
                  <li>✉️ contato@saborexpress.com</li>
                  <li>⏰ Segunda a Sábado: 11h às 23h</li>
                  <li>⏰ Domingo: 11h às 22h</li>
                </ul>
              </div>

              <div className="w-full max-w-md">
                <Link href="/loja">
                  <Button className="flex w-full items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg transition-colors duration-200">
                    Fazer um pedido agora
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Sabor Express Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-lg font-bold">Sabor Express</span>
            </div>
            <p className="text-gray-600 text-sm">
              © 2024 Sabor Express. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
