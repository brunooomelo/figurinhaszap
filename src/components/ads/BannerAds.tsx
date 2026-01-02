import { useState, useEffect } from "react";
import { Megaphone, ExternalLink, Sparkles, ShoppingBag, Zap } from "lucide-react";

interface BannerAdProps {
  variant?: "top" | "inline" | "bottom";
  className?: string;
}

const demoAds = [
  {
    title: "StickerPro Premium",
    description: "Crie figurinhas ilimitadas com IA avançada",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Loja de Stickers",
    description: "Pacotes exclusivos para seu WhatsApp",
    icon: ShoppingBag,
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "StickBot Automação",
    description: "Automatize suas figurinhas no WhatsApp",
    icon: Zap,
    gradient: "from-cyan-500 to-blue-500",
  },
];

export function BannerAd({ variant = "inline", className = "" }: BannerAdProps) {
  const [showDemo, setShowDemo] = useState(true);
  const [demoIndex, setDemoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        if (showDemo) {
          // Cycle through demos or switch to "Anuncie Aqui"
          if (demoIndex < demoAds.length - 1) {
            setDemoIndex(prev => prev + 1);
          } else {
            setShowDemo(false);
            setDemoIndex(0);
          }
        } else {
          setShowDemo(true);
        }
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [showDemo, demoIndex]);

  const variants = {
    top: "mt-0",
    inline: "my-8",
    bottom: "mb-0",
  };

  const currentDemo = demoAds[demoIndex];
  const DemoIcon = currentDemo.icon;

  return (
    <div className={`relative w-full max-w-4xl mx-auto ${variants[variant]} ${className}`}>
      <div
        className={`transition-all duration-300 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
      >
        {showDemo ? (
          <div className="relative group block w-full p-4 rounded-2xl border border-border/50 overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${currentDemo.gradient} opacity-10`} />
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentDemo.gradient} flex items-center justify-center shrink-0`}>
                  <DemoIcon className="h-5 w-5 text-white" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Publicidade</p>
                  <p className="text-sm font-semibold text-foreground truncate">
                    {currentDemo.title} · {currentDemo.description}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium whitespace-nowrap shrink-0">
                Saiba mais <ExternalLink className="h-3 w-3" />
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground/5">
              <div
                className={`h-full bg-gradient-to-r ${currentDemo.gradient} animate-[progress_4s_linear_infinite]`}
              />
            </div>
          </div>
        ) : (
          <a
            href="mailto:bruno94@outlook.com?subject=Anunciar"
            className="group block w-full p-4 rounded-2xl glass border border-border/50 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Megaphone className="h-5 w-5 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Espaço Publicitário</p>
                  <p className="text-sm font-semibold text-foreground truncate">
                    Anuncie sua marca aqui · Alcance milhares de usuários
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 text-xs text-primary font-medium whitespace-nowrap group-hover:underline shrink-0">
                Saiba mais <ExternalLink className="h-3 w-3" />
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground/5 rounded-b-2xl overflow-hidden">
              <div className="h-full bg-primary/50 animate-[progress_4s_linear_infinite]" />
            </div>
          </a>
        )}
      </div>

      <div className="flex justify-center gap-1.5 mt-3">
        {demoAds.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${showDemo && demoIndex === i
              ? "bg-primary w-4"
              : "bg-foreground/20"
              }`}
          />
        ))}
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${!showDemo ? "bg-primary w-4" : "bg-foreground/20"
            }`}
        />
      </div>
    </div>
  );
}
