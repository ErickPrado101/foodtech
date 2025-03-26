"use client"

import { useState } from "react"
import { Save, Store, CreditCard, Truck, Bell, Smartphone, Globe, MapPin } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export default function AdminConfiguracoesPage() {
  const [isLoading, setIsLoading] = useState(false)

  // Configurações da loja
  const [storeSettings, setStoreSettings] = useState({
    name: "Sabor Express",
    description: "Lanches deliciosos com entrega rápida",
    address: "Av. dos Sabores, 123 - Centro",
    phone: "(11) 99999-9999",
    email: "contato@saborexpress.com",
    openingHours: "Segunda a Sábado: 11h às 23h, Domingo: 11h às 22h",
    logo: "/placeholder.svg?height=40&width=40",
  })

  // Configurações de entrega
  const [deliverySettings, setDeliverySettings] = useState({
    deliveryFee: "5.00",
    freeDeliveryThreshold: "50.00",
    deliveryRadius: "5",
    estimatedDeliveryTime: "30-45",
    allowScheduledDelivery: true,
    allowPickup: true,
  })

  // Configurações de pagamento
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCreditCard: true,
    acceptDebitCard: true,
    acceptPix: true,
    acceptCash: true,
    acceptVoucher: false,
    minOrderValue: "15.00",
  })

  // Configurações de notificações
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderConfirmation: true,
    orderStatusUpdate: true,
    marketingEmails: false,
  })

  // Configurações de integração
  const [integrationSettings, setIntegrationSettings] = useState({
    whatsappNumber: "5511999999999",
    instagramUsername: "saborexpress",
    facebookPage: "saborexpress",
    googleMapsApiKey: "",
    googleAnalyticsId: "",
  })

  const handleSaveSettings = (settingType: string) => {
    setIsLoading(true)

    // Simular uma chamada de API
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Configurações salvas com sucesso!", {
        description: `As configurações de ${settingType} foram atualizadas.`,
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações do seu estabelecimento.</p>
        </div>
      </div>

      <Tabs defaultValue="loja" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="loja">
            <Store className="h-4 w-4 mr-2" />
            Loja
          </TabsTrigger>
          <TabsTrigger value="entrega">
            <Truck className="h-4 w-4 mr-2" />
            Entrega
          </TabsTrigger>
          <TabsTrigger value="pagamento">
            <CreditCard className="h-4 w-4 mr-2" />
            Pagamento
          </TabsTrigger>
          <TabsTrigger value="notificacoes">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="integracoes">
            <Globe className="h-4 w-4 mr-2" />
            Integrações
          </TabsTrigger>
        </TabsList>

        {/* Configurações da Loja */}
        <TabsContent value="loja">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Loja</CardTitle>
              <CardDescription>Configure as informações básicas do seu estabelecimento.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Nome da Loja</Label>
                  <Input
                    id="store-name"
                    value={storeSettings.name}
                    onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-email">Email de Contato</Label>
                  <Input
                    id="store-email"
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-description">Descrição</Label>
                <Textarea
                  id="store-description"
                  value={storeSettings.description}
                  onChange={(e) => setStoreSettings({ ...storeSettings, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-address">Endereço</Label>
                  <Input
                    id="store-address"
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="store-phone">Telefone</Label>
                  <Input
                    id="store-phone"
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-hours">Horário de Funcionamento</Label>
                <Input
                  id="store-hours"
                  value={storeSettings.openingHours}
                  onChange={(e) => setStoreSettings({ ...storeSettings, openingHours: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-logo">Logo da Loja</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md border overflow-hidden">
                    <img
                      src={storeSettings.logo || "/placeholder.svg"}
                      alt="Logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Button variant="outline">Alterar Logo</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto bg-red-600 hover:bg-red-700"
                onClick={() => handleSaveSettings("loja")}
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configurações de Entrega */}
        <TabsContent value="entrega">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Entrega</CardTitle>
              <CardDescription>Configure as opções de entrega e retirada.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery-fee">Taxa de Entrega (R$)</Label>
                  <Input
                    id="delivery-fee"
                    type="number"
                    value={deliverySettings.deliveryFee}
                    onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryFee: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="free-delivery">Valor Mínimo para Entrega Grátis (R$)</Label>
                  <Input
                    id="free-delivery"
                    type="number"
                    value={deliverySettings.freeDeliveryThreshold}
                    onChange={(e) =>
                      setDeliverySettings({ ...deliverySettings, freeDeliveryThreshold: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery-radius">Raio de Entrega (km)</Label>
                  <Input
                    id="delivery-radius"
                    type="number"
                    value={deliverySettings.deliveryRadius}
                    onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryRadius: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="delivery-time">Tempo Estimado de Entrega (minutos)</Label>
                  <Input
                    id="delivery-time"
                    value={deliverySettings.estimatedDeliveryTime}
                    onChange={(e) =>
                      setDeliverySettings({ ...deliverySettings, estimatedDeliveryTime: e.target.value })
                    }
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="scheduled-delivery">Permitir Agendamento de Entrega</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que os clientes agendem a entrega para um horário específico.
                    </p>
                  </div>
                  <Switch
                    id="scheduled-delivery"
                    checked={deliverySettings.allowScheduledDelivery}
                    onCheckedChange={(checked) =>
                      setDeliverySettings({ ...deliverySettings, allowScheduledDelivery: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allow-pickup">Permitir Retirada no Local</Label>
                    <p className="text-sm text-muted-foreground">
                      Permite que os clientes retirem o pedido diretamente no estabelecimento.
                    </p>
                  </div>
                  <Switch
                    id="allow-pickup"
                    checked={deliverySettings.allowPickup}
                    onCheckedChange={(checked) => setDeliverySettings({ ...deliverySettings, allowPickup: checked })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto bg-red-600 hover:bg-red-700"
                onClick={() => handleSaveSettings("entrega")}
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configurações de Pagamento */}
        <TabsContent value="pagamento">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Pagamento</CardTitle>
              <CardDescription>Configure as formas de pagamento aceitas.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="credit-card">Cartão de Crédito</Label>
                    <p className="text-sm text-muted-foreground">Aceitar pagamentos com cartão de crédito.</p>
                  </div>
                  <Switch
                    id="credit-card"
                    checked={paymentSettings.acceptCreditCard}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, acceptCreditCard: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="debit-card">Cartão de Débito</Label>
                    <p className="text-sm text-muted-foreground">Aceitar pagamentos com cartão de débito.</p>
                  </div>
                  <Switch
                    id="debit-card"
                    checked={paymentSettings.acceptDebitCard}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, acceptDebitCard: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pix">PIX</Label>
                    <p className="text-sm text-muted-foreground">Aceitar pagamentos via PIX.</p>
                  </div>
                  <Switch
                    id="pix"
                    checked={paymentSettings.acceptPix}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, acceptPix: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cash">Dinheiro</Label>
                    <p className="text-sm text-muted-foreground">Aceitar pagamentos em dinheiro na entrega.</p>
                  </div>
                  <Switch
                    id="cash"
                    checked={paymentSettings.acceptCash}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, acceptCash: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="voucher">Vale-Refeição</Label>
                    <p className="text-sm text-muted-foreground">Aceitar pagamentos com vale-refeição.</p>
                  </div>
                  <Switch
                    id="voucher"
                    checked={paymentSettings.acceptVoucher}
                    onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, acceptVoucher: checked })}
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label htmlFor="min-order">Valor Mínimo do Pedido (R$)</Label>
                <Input
                  id="min-order"
                  type="number"
                  value={paymentSettings.minOrderValue}
                  onChange={(e) => setPaymentSettings({ ...paymentSettings, minOrderValue: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto bg-red-600 hover:bg-red-700"
                onClick={() => handleSaveSettings("pagamento")}
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configurações de Notificações */}
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
              <CardDescription>Configure como você e seus clientes recebem notificações.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações por email.</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">Notificações por SMS</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações por SMS.</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-notifications">Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações push no navegador.</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Tipos de Notificações</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-confirmation">Confirmação de Pedido</Label>
                    <p className="text-sm text-muted-foreground">Notificar quando um novo pedido for recebido.</p>
                  </div>
                  <Switch
                    id="order-confirmation"
                    checked={notificationSettings.orderConfirmation}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, orderConfirmation: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="order-status">Atualização de Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificar quando o status de um pedido for alterado.
                    </p>
                  </div>
                  <Switch
                    id="order-status"
                    checked={notificationSettings.orderStatusUpdate}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, orderStatusUpdate: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Emails de Marketing</Label>
                    <p className="text-sm text-muted-foreground">Enviar emails promocionais para clientes.</p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto bg-red-600 hover:bg-red-700"
                onClick={() => handleSaveSettings("notificações")}
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Configurações de Integrações */}
        <TabsContent value="integracoes">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>Configure integrações com serviços externos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-green-600" />
                    <Label htmlFor="whatsapp-number">WhatsApp Business</Label>
                  </div>
                  <Input
                    id="whatsapp-number"
                    value={integrationSettings.whatsappNumber}
                    onChange={(e) => setIntegrationSettings({ ...integrationSettings, whatsappNumber: e.target.value })}
                    placeholder="5511999999999"
                  />
                  <p className="text-xs text-muted-foreground">
                    Número completo com código do país (ex: 5511999999999)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={integrationSettings.instagramUsername}
                      onChange={(e) =>
                        setIntegrationSettings({ ...integrationSettings, instagramUsername: e.target.value })
                      }
                      placeholder="@seurestaurante"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={integrationSettings.facebookPage}
                      onChange={(e) => setIntegrationSettings({ ...integrationSettings, facebookPage: e.target.value })}
                      placeholder="seurestaurante"
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <Label htmlFor="google-maps">Google Maps API Key</Label>
                  </div>
                  <Input
                    id="google-maps"
                    type="password"
                    value={integrationSettings.googleMapsApiKey}
                    onChange={(e) =>
                      setIntegrationSettings({ ...integrationSettings, googleMapsApiKey: e.target.value })
                    }
                    placeholder="Sua chave API do Google Maps"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="google-analytics">Google Analytics ID</Label>
                  <Input
                    id="google-analytics"
                    value={integrationSettings.googleAnalyticsId}
                    onChange={(e) =>
                      setIntegrationSettings({ ...integrationSettings, googleAnalyticsId: e.target.value })
                    }
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto bg-red-600 hover:bg-red-700"
                onClick={() => handleSaveSettings("integrações")}
                disabled={isLoading}
              >
                <Save className="mr-2 h-4 w-4" />
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

