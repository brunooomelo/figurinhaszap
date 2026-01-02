import { Analytics } from "@/components/Analytics";
import { AuthProvider } from "@/components/AuthContext";
import "@/styles/globals.css";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";
import SEO from "../../next-seo.config";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { SideAds } from "@/components/ads/SideAds";
import { ThemeProvider } from "next-themes";
import { BannerAd } from "@/components/ads/BannerAds";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/lib/react-query";
const font = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
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
      </Head>
      <DefaultSeo {...SEO} />
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ReactQueryProvider>
          <AuthProvider>
            <div
              className={`h-full lg:h-screen flex flex-col ${font.className} relative`}
            >
              <Header />
              <SideAds />
              <main className="container mx-auto px-4 py-12 relative z-10 max-w-5xl">
                <BannerAd className="mb-8" />
                <Component {...pageProps} />
              </main>

              <Toaster />
            </div>
          </AuthProvider>
        </ReactQueryProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
