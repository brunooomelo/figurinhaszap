
import type { Metadata } from 'next'
import { HomePage } from "@/components/layouts/home"
import { environment } from '@/utils/environment'


export const metadata: Metadata = {
  title: 'Crie Figurinhas para WhatsApp em Segundos – Sem Instalar Nada!',
  description: 'Envie uma imagem e receba a figurinha direto no seu WhatsApp. Rápido, fácil e gratuito para começar!',
  metadataBase: new URL(environment.SITEURL),
  alternates: {
    canonical: environment.SITEURL
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: environment.SITEURL,
    siteName:
      "Figurinhas: Deixe Suas Conversas de WhatsApp Muito Mais Divertidas!",
    description:
      "Não perca a chance de surpreender seus amigos! Crie stickers incríveis e leve a diversão para suas conversas no WhatsApp. É fácil e viciante!",
    images: [
      {
        url: `${environment.SITEURL}/home/cover.webp`,
        width: 1280,
        height: 720,
        alt: "Imagem que representa a figurinhaszap",
      },
    ],
  },
  twitter: {
    site: "@figurinhas",
    creator: "@brunooomelo",
    card: "summary_large_image",
  },
}

export default function Home() {
  return <HomePage
    heading={<>Crie Figurinhas para WhatsApp em Segundos – <span className="text-indigo-500">Sem Instalar Nada!</span></>}
    subheading="Envie uma imagem e receba a figurinha direto no seu WhatsApp. Rápido, fácil e gratuito para começar!"
  />
}
