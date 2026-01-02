import { TrendingUp, Users, Star, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "50K+", label: "Figurinhas criadas", icon: TrendingUp },
  { value: "10K+", label: "Usuários ativos", icon: Users },
  { value: "4.9", label: "Avaliação média", icon: Star },
  { value: "100%", label: "Gratuito", icon: Gift },
];

export function LandingStats() {
  return (
    <section className="py-12">
      <div className="rounded-3xl gradient-primary p-8 md:p-12 shadow-glow animate-scale-up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className={`text-center animate-count-up stagger-${index + 1} opacity-0`}
                style={{ animationFillMode: 'forwards' }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
