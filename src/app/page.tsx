'use client'
import { UploadSticker } from "../components/UploadSticker";
import { useAuth } from "../components/AuthContext";
import Link from "next/link";
import { LoginForm } from "../components/LoginForm";
import { PinForm } from "../components/PinForm";
import Head from "next/head";
import { pageview } from "../utils/gtag";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { Support } from "../components/Support";
import { ArrowBigDownDash, Check, ChevronRight, Facebook, Instagram, MessageSquare, Send, Star, Twitter, User } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { useReward } from 'react-rewards';
import { MousePointerClick, Upload, Sliders, Phone } from "lucide-react"
import { motion } from 'framer-motion'

const steps = [
  {
    icon: MousePointerClick,
    title: 'Clique em "Criar"',
    description: "Inicie o processo com um simples clique",
    color: "bg-zinc-700",
  },
  {
    icon: Upload,
    title: "Envie sua imagem",
    description: "Do celular ou computador",
    color: "bg-zinc-700",
  },
  {
    icon: Sliders,
    title: "Ajuste (opcional)",
    description: "Personalize sua figurinha",
    color: "bg-zinc-700",
  },
  {
    icon: Phone,
    title: "Receba no Whatsapp",
    description: "Sua figurinha pronto para usar",
    color: "bg-zinc-700",
  },
]
const asks = [{
  question: 'Preciso baixar um aplicativo',
  answer: 'Não! Tudo aceontece direto no navegador.'
}, {
  question: 'Como eu recebo minhas figurinhas',
  answer: 'Depois de enviar a imagem, sua figurinha chega diretamente no seu WhatsApp'
}, {
  question: 'O plano gratuito tem limites?',
  answer: 'Sim! Você pode criar até 3 figurinhas por dia no plano gratuito.'
}, {
  question: 'O que ganho no plano Plus?',
  answer: 'Figurinhas ilimitadas, GIF animados, envio em lote e compartilhamento direto pelo site.'
}, {
  question: 'Posso cancelar o plano plus quando quiser?',
  answer: 'Sim! O cancelamento é fácil e sem burocracia.'
}]

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function Home() {
  // const { isLogged, user } = useAuth();
  // const router = useRouter();
  // const logPageView = useCallback(() => pageview(router.pathname), [router]);
  // useEffect(() => {
  //   router.events.on("routeChangeComplete", logPageView);
  //   return () => {
  //     router.events.off("routeChangeComplete", logPageView);
  //   };
  // }, [router, logPageView]);

  const { reward, isAnimating } = useReward('rewardId', 'confetti');

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="w-full h-16 flex justify-between container mx-auto px-4 items-center">
        <ArrowBigDownDash />
        <ul className="flex gap-8">
          <li className="">
            Como Funciona
          </li>
          <li className="">
            Planos
          </li>
          <li className="">
            FAQ
          </li>
        </ul>
        <Button>Login</Button>
      </header>
      <section className="bg-gray-100 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Crie Figurinhas para WhatsApp em Segundos – <span className="text-green-500">Sem Instalar Nada!</span>
              </h1>
              <p className="text-xl mb-6">Transforme suas fotos em stickers divertidos com apenas alguns cliques.</p>
              <Button onClick={reward} id='rewardId' size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                Criar Minhas Figurinhas
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2">
              PICTURE (IMAGEM)
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >

                {/* Card */}
                <div className="group relative bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Icon Background */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-5 rounded-xl bg-gradient-to-br ${step.color} transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <div className={`mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br ${step.color}`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>

                </div>
              </motion.div>
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

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O que Nossos Usuários Dizem</h2>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-green-500">+
              <NumberTicker
                value={500_000}
                className="text-green-500"
              />
              {' '}figurinhas já criadas!</p>
          </div>
        </div>
      </section>

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

      <section className="py-12 md:py-20 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Comece agora e crie sua primeira figurinha grátis!</h2>
          <Button size="lg" className="bg-white text-green-500 hover:bg-gray-100">
            Começar a Criar
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-sm">Faça upgrade para Plus e desbloqueie figurinhas ilimitadas e GIFs!</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1117] text-gray-400 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div>
              <h3 className="text-white font-medium mb-4">FigurinhasZap</h3>
              <p className="text-sm">Crie figurinhas para WhatsApp em segundos, sem instalar nada.</p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-white font-medium mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/como-funciona" className="hover:text-white transition-colors">
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link href="/planos" className="hover:text-white transition-colors">
                    Planos
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/termos" className="hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacidade" className="hover:text-white transition-colors">
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Column */}
            <div>
              <h3 className="text-white font-medium mb-4">Siga-nos</h3>
              <div className="flex space-x-4">
                <Link href="https://instagram.com" className="hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="https://twitter.com" className="hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="https://facebook.com" className="hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 text-center text-sm">
            <p>© 2025 FigurinhasZap. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
