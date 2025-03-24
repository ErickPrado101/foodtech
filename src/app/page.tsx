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
              src="/images.jpeg"
              alt="Farmácia Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold text-slate-900">Farmácia Saúde</h1>
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
                Cuidando da sua <span className="text-teal-600">saúde</span> com dedicação
              </h2>
              <p className="text-lg text-slate-700">
                Nossa farmácia oferece produtos de qualidade, atendimento personalizado e preços justos para cuidar da
                saúde de toda a família.
              </p>
              <div className="pt-4">
                <Link href="/shop">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-6 rounded-lg text-lg">
                    Visitar nossa loja
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/profissionalizante-atendente-de-farmacia.webp"
                  alt="Produtos farmacêuticos"
                  width={600}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-teal-600 font-bold">Entrega rápida</p>
                <p className="text-slate-700">Medicamentos e produtos</p>
              </div>
            </div>
          </section>

          <section id="about" className="py-16 bg-slate-50 rounded-3xl p-12 mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
              <p className="text-slate-700 max-w-3xl mx-auto">
                Desde 2005, a Farmácia Saúde tem se dedicado a oferecer os melhores produtos e serviços farmacêuticos
                para nossa comunidade. Nosso compromisso é com a saúde e bem-estar de nossos clientes, oferecendo
                atendimento personalizado e produtos de qualidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-teal-600 text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Produtos de Qualidade</h3>
                <p className="text-slate-700">
                  Trabalhamos apenas com fornecedores confiáveis e produtos de alta qualidade para garantir sua saúde.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-teal-600 text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Atendimento Especializado</h3>
                <p className="text-slate-700">
                  Nossa equipe de farmacêuticos está sempre pronta para oferecer orientações e tirar suas dúvidas.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-teal-600 text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Entrega Rápida</h3>
                <p className="text-slate-700">
                  Entregamos seus medicamentos e produtos em sua casa com rapidez e segurança.
                </p>
              </div>
            </div>
          </section>

          <section id="contact" className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
              <p className="text-slate-700 max-w-3xl mx-auto">
                Estamos sempre à disposição para atender nossos clientes. Entre em contato conosco para tirar dúvidas ou
                fazer pedidos.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
              <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Informações de Contato</h3>
                <ul className="space-y-3 text-slate-700">
                  <li>📍 Av. da Saúde, 123 - Centro</li>
                  <li>📞 (11) 99999-9999</li>
                  <li>✉️ contato@farmaciasaude.com</li>
                  <li>⏰ Segunda a Sábado: 8h às 22h</li>
                  <li>⏰ Domingo: 9h às 18h</li>
                </ul>
              </div>

              <div className="w-full max-w-md">
                <Link href="/shop">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white px-6 py-6 rounded-lg text-lg">
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
                src="/placeholder.svg?height=32&width=32"
                alt="Farmácia Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-lg font-bold">Farmácia Saúde</span>
            </div>
            <p className="text-slate-600 text-sm">© 2024 Farmácia Saúde. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

