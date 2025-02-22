import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

const asks = [{
  question: 'Preciso baixar um app?',
  answer: 'Não! Tudo funciona direto no navegador.'
}, {
  question: 'Como recebo minhas figurinhas?',
  answer: 'Elas chegam no seu WhatsApp logo após o envio da imagem.'
}, {
  question: 'O plano grátis tem limite?',
  // answer: 'Sim! Você pode criar até 3 figurinhas por dia.'
  answer: 'Não! Então aproveite.'
},
  //  {
  //   question: 'O que tem no plano Plus?',
  //   answer: 'Figurinhas ilimitadas, GIFs, envio em lote e compartilhamento fácil.'
  // }
  //   , {
  //   question: 'Posso cancelar o Plus quando quiser?',
  //   answer: 'Sim! O cancelamento é simples e sem burocracia.'
  // }
];



export const Faq = () => {
  return (
    <section className="bg-gray-100 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {asks.map((ask, index) => (
            <AccordionItem key={index} value={ask.answer}>
              <AccordionTrigger>{ask.question}</AccordionTrigger>
              <AccordionContent>
                {ask.answer}
              </AccordionContent>
            </AccordionItem>
          ))}

        </Accordion>
      </div>
    </section>
  )
}