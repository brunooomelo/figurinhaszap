import { Megaphone, ExternalLink } from "lucide-react";

export function SideAds() {
  return (
    <>
      {/* Left Side Ad */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block animate-slide-in-left">
        <AdBanner position="left" />
      </div>

      {/* Right Side Ad */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:block animate-slide-in-right">
        <AdBanner position="right" />
      </div>
    </>
  );
}

function AdBanner({ position }: { position: "left" | "right" }) {
  return (
    <a
      href="mailto:bruno94@outlook.com?subject=Anunciar"
      className="group block w-[160px] p-4 rounded-2xl glass border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow"
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Megaphone className="h-6 w-6 text-primary" />
        </div>
        
        <div>
          <p className="text-xs text-muted-foreground mb-1">Espaço Publicitário</p>
          <p className="text-sm font-semibold text-foreground">Anuncie Aqui</p>
        </div>

        <div className="w-full h-[200px] rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/30">
          <div className="text-center p-2">
            <p className="text-xs text-muted-foreground">160 x 600</p>
            <p className="text-xs text-muted-foreground">Banner</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium group-hover:underline">
          Saiba mais <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
}
