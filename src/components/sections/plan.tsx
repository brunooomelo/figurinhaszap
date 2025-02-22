import { Check } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"

export const PlanSection = () => {
  return (
    <section className="bg-gray-100 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Escolha seu Plano</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          <Card className="w-full md:w-80">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold mb-4">Plano Free</h3>
                <ul className="mb-6">
                  <li className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-green-500 mr-2" />3 figurinhas por dia
                  </li>
                  <li className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    Edição básica
                  </li>
                </ul>
              </div>
              <Button className="w-full bg-gray-500 hover:bg-gray-600 text-white">Começar Grátis</Button>
            </CardContent>
          </Card>
          <Card className="w-full md:w-80 border-green-500 border-2">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">Plano Plus</h3>
              <ul className="mb-6">
                <li className="flex items-center mb-2">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Figurinhas ilimitadas
                </li>
                <li className="flex items-center mb-2">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Criação de GIFs
                </li>
                <li className="flex items-center mb-2">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Edição avançada
                </li>
                <li className="flex items-center mb-2">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Compartilhamento direto
                </li>
              </ul>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                Desbloquear Figurinhas Ilimitadas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}