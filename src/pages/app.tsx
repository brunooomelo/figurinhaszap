import { UploadSticker } from "@/components/UploadSticker";
import { useAuth } from "@/components/AuthContext";
import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import { PinForm } from "@/components/PinForm";
import Head from "next/head";
import { pageview } from "@/utils/gtag";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { Support } from "@/components/Support";
import { Header } from "@/components/Header";
import { SideAds } from "@/components/ads/SideAds";
import { BannerAd } from "@/components/ads/BannerAds";
import { StickerCreator } from "@/components/v2/sticker";
import { CustomAdSpot } from "@/components/ads/custom-ads";
import { LandingStats } from "@/components/v2/landing-stats";
import { ArrowRight, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isLogged, user } = useAuth();
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
      <StickerCreator />

    </>
  );
}
