import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", router.pathname);
  }, [router.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-whatsapp/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="text-center z-10 px-4">
        {/* Animated 404 */}
        <h1 className="text-[150px] md:text-[200px] font-bold gradient-text leading-none animate-bounce-in">
          404
        </h1>

        {/* Message */}
        <div className="space-y-4 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Oops! Página não encontrada
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Parece que você se perdeu. A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button asChild variant="whatsapp" size="lg">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/app">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Criar Figurinhas
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}