import { Instagram, Twitter, Facebook } from "lucide-react"
import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-[#0D1117] text-gray-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-medium mb-4">FigurinhasZap</h3>
            <p className="text-sm">Crie figurinhas para WhatsApp em segundos, sem instalar nada.</p>
          </div>

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
        <div className="mt-16 text-center text-sm">
          <p>© 2025 FigurinhasZap. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}