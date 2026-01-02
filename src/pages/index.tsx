import { useAuth } from "@/components/AuthContext";
import Link from "next/link";
import Head from "next/head";
import { pageview } from "@/utils/gtag";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { CustomAdSpot } from "@/components/ads/custom-ads";
import { ArrowRight, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const logPageView = useCallback(() => pageview(router.pathname), [router]);
  useEffect(() => {
    router.events.on("routeChangeComplete", logPageView);
    return () => {
      router.events.off("routeChangeComplete", logPageView);
    };
  }, [router, logPageView]);

  return (
    <>
      <Head>
        <meta
          name="ahrefs-site-verification"
          content="0ff7ff9de03f88bcd24fe4511f725298dc7d90f3c915636975575d8b463daf90"
        />
      </Head>
      <NextSeo
        title="Crie Figurinhas WhatsApp Grátis em 3 Passos | Online e Divertido"
        description="Saiba como fazer figurinhas para WhatsApp de forma fácil e gratuita. Com nossa aplicação online, autentique-se, escolha a imagem e receba no WhatsApp. Diversão garantida! Começe agora."
      />

      <section className="text-center space-y-8 py-16 animate-slide-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
          Fazer Figurinhas para WhatsApp{" "}
          <span className="gradient-text">Nunca Foi Tão Fácil!</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Descubra a maneira mais simples, gratuita e online de criar suas próprias figurinhas
          para WhatsApp. Com apenas três passos - selecionar, customizar e gerar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" variant="whatsapp" className="h-14 px-8 rounded-xl text-lg">
            <Link href="/app">
              <Wand2 className="h-5 w-5 mr-2" />
              Criar Figurinha
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-14 px-8 rounded-xl text-lg" disabled>
            <Link href="/stickers">
              Ver Figurinhas Públicas
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
      <CustomAdSpot variant="horizontal" className="my-8" />

      <footer className="text-center font-bold text-xs p-4">
        Criado Por{" "}
        <Link
          title="github do fundador do figurinhas Bruno"
          href="https://github.com/brunooomelo"
          target="_blank"
          className="text-primary"
        >
          Bruno Melo
        </Link>
      </footer>
    </>
  );
}
