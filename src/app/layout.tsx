import "@/styles/globals.css";

import { Analytics } from "../components/Analytics"
import { AuthProvider } from "../components/AuthContext"
import { Banner } from "../components/Banner"
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";


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
      </head>
      <body>
        <AuthProvider>
          <div
            id="body-id"
            className={`h-full lg:h-screen flex flex-col ${font.className} relative`}
          >
            <Banner />
            {children}
            <Toaster
              richColors
              position="top-center"
              theme="light"
              closeButton
            />
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
