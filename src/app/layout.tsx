import "@/styles/globals.css";

import { Analytics } from "../components/Analytics"
import { AuthProvider } from "../components/AuthContext"
import { Banner } from "../components/Banner"
import { Inter } from "next/font/google";

export const metadata = {
  title: 'Crie Figurinhas WhatsApp | Ferramenta Fácil em 3 Passos',
  description: 'Aprenda como fazer figurinhas WhatsApp em segundos! Autentique-se, escolha sua imagem e compartilhe no WhatsApp. Baixe a melhor ferramenta para figurinhas grátis agora.',
}
const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="ahrefs-site-verification"
          content="0ff7ff9de03f88bcd24fe4511f725298dc7d90f3c915636975575d8b463daf90"
        ></meta>
      </head>
      <body>
        <AuthProvider>
          <div
            className={`h-full lg:h-screen flex flex-col ${font.className} relative`}
          >
            <Banner />
            {children}
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
