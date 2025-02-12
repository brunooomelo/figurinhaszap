import Head from "next/head";
import { NextSeo } from "next-seo";
import { Check, ChevronRight, MessageSquare, Send, Sliders, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import Image from "next/image";
import { SEO_MULTI_PAGE } from "@/utils/SEO";




export async function generateStaticParams() {
  return SEO_MULTI_PAGE.map((so) => ({
    id: so.url
  }))

}
type IParams = {
  id: string
}
// function getSEO(params: IParams) {
//   return SEO_MULTI_PAGE.find(so => so.url === params.id)
// }
export const dynamicParams = true;


export default async function Home() {
  // const SEO = getSEO(params)
  // const { isLogged, user } = useAuth();
  // const router = useRouter();
  // const logPageView = useCallback(() => pageview(router.pathname), [router]);
  // useEffect(() => {
  //   router.events.on("routeChangeComplete", logPageView);
  //   return () => {
  //     router.events.off("routeChangeComplete", logPageView);
  //   };
  // }, [router, logPageView]);

  return (
    <>
      <Head>
        <meta
          name="ahrefs-site-verification"
          content="0ff7ff9de03f88bcd24fe4511f725298dc7d90f3c915636975575d8b463daf90"
        ></meta>
      </Head>
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Section */}
        <section className="bg-gray-100 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Crie Figurinhas para WhatsApp em Segundos – Sem Instalar Nada!
                </h1>
                <p className="text-xl mb-6">Transforme suas fotos em stickers divertidos com apenas alguns cliques.</p>
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                  Criar Minhas Figurinhas
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="md:w-1/2">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Criação de figurinhas"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Como Funciona?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

              {[
                { icon: <Send className="h-12 w-12 text-green-500" />, text: "Clique em 'Criar Minhas Figurinhas'" },
                { icon: <Image alt="Envie uma imagem" src="" className="h-12 w-12 text-blue-500" />, text: "Envie uma imagem" },
                { icon: <Sliders className="h-12 w-12 text-green-500" />, text: "Ajuste a figurinha (opcional)" },
                { icon: <MessageSquare className="h-12 w-12 text-purple-500" />, text: "Receba no WhatsApp" },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  {step.icon}
                  <p className="mt-4">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plan Comparison Section */}
        <section className="bg-gray-100 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Escolha seu Plano</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <Card className="w-full md:w-80">
                <CardContent className="p-6">
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

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">O que Nossos Usuários Dizem</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="mb-4">FigurinhasZap tornou super fácil criar stickers divertidos para meus grupos!</p>
                    <p className="font-semibold">- Usuário Feliz {i}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <p className="text-2xl font-bold text-green-500">+500.000 figurinhas já criadas!</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
            <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>Como recebo as figurinhas no WhatsApp?</AccordionTrigger>
                <AccordionContent>
                  Após criar suas figurinhas, você receberá um link para baixá-las diretamente no seu WhatsApp.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Posso usar o FigurinhasZap no meu computador?</AccordionTrigger>
                <AccordionContent>
                  Sim! O FigurinhasZap funciona em qualquer dispositivo com acesso à internet, incluindo computadores.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Quanto custa o Plano Plus?</AccordionTrigger>
                <AccordionContent>
                  O Plano Plus tem um custo acessível. Confira os detalhes na seção de planos acima.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-green-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Crie sua primeira figurinha grátis agora!</h2>
            <Button size="lg" className="bg-white text-green-500 hover:bg-gray-100">
              Começar a Criar
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 FigurinhasZap. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
