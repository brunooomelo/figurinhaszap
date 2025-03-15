'use client'
import { pageview } from "@/utils/gtag";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { LoginButton } from "../LoginButton";
import { Faq } from "../sections/faqs";
import { UploadSticker } from "../UploadSticker";

type HomePage = {
  heading: ReactNode
  subheading: ReactNode
}
export const HomePage = ({ heading, subheading }: HomePage) => {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname) {
      if (process.env.NODE_ENV === 'production') {
        pageview(pathname);
      }
    }
  }, [pathname]);


  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="w-full h-16 flex justify-between container mx-auto px-4 items-center">
        <span />
        {/* <ul className="flex gap-8">
          <li className="">
            Como Funciona
          </li>
          <li className="">
            Planos
          </li>
          <li className="">
            FAQ
          </li>
        </ul> */}
        <LoginButton />
      </header>
      <section className="bg-gray-100 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {heading}
              </h1>
              <p className="text-xl mb-6">{subheading}</p>
            </div>
            <div className="md:w-1/2">
              <UploadSticker />
            </div>
          </div>
        </div>
      </section>
      <Faq />


      <footer className="bg-[#0D1117] text-gray-400 py-16">
        <div className="container mx-auto px-4">
          <div className="mt-16 text-center text-sm">
            <p>© 2025 FigurinhasZap. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}