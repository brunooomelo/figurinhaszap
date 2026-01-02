import { Megaphone, Sparkles, ExternalLink } from "lucide-react";

interface CustomAdSpotProps {
  index?: number;
  variant?: "horizontal" | "square";
  className?: string;
}

const adVariants = [
  {
    title: "Destaque sua Marca",
    description: "Alcance milhares de usuários criando figurinhas diariamente",
    icon: Megaphone,
  },
  {
    title: "Anuncie Conosco",
    description: "Posicione sua marca onde seu público está engajado",
    icon: Sparkles,
  },
  {
    title: "Espaço Premium",
    description: "Publicidade discreta e eficiente para sua empresa",
    icon: Megaphone,
  },
  {
    title: "Parceria Especial",
    description: "Entre em contato e conheça nossos pacotes de anúncios",
    icon: Sparkles,
  },
  {
    title: "Seu Anúncio Aqui",
    description: "Conecte-se com uma audiência engajada e ativa",
    icon: Megaphone,
  },
];

export function CustomAdSpot({ index = 0, variant = "horizontal", className = "" }: CustomAdSpotProps) {
  const adVariant = adVariants[index % adVariants.length];
  const Icon = adVariant.icon;

  return (
    <div className={`py-6 ${className}`}>
      <a
        href="mailto:bruno94@outlook.com?subject=Anunciar"
        className="group block w-full max-w-2xl mx-auto p-6 rounded-2xl glass border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow animate-fade-in"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-glow">
            <Icon className="h-7 w-7 text-primary-foreground" />
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary font-medium mb-1">PUBLICIDADE</p>
            <h4 className="text-lg font-bold text-foreground mb-1">{adVariant.title}</h4>
            <p className="text-sm text-muted-foreground">{adVariant.description}</p>
          </div>

          <div className="shrink-0 hidden sm:block">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              Anuncie <ExternalLink className="h-4 w-4" />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
