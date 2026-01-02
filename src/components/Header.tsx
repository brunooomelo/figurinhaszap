'use client'
import { cn } from "@/lib/utils";
import { Globe, Wand2, Home } from "lucide-react";
import { useRouter } from "next/router";
import Link from "next/link";


export function Header() {
  const navLinks = [
    { href: "/", label: "Início", icon: Home },
    { href: "/app", label: "Criar", icon: Wand2 },
    { href: "/stickers", label: "Públicas", icon: Globe, isDisabled: true },
  ];
  const route = useRouter()
  return (
    <header className="w-full py-3 px-4 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-center max-w-5xl">
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = route.pathname === link.href;
            const isDisabled = link.isDisabled ?? false;
            return (
              <Link
                key={link.href}
                href={isDisabled ? "#" : link.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  isActive && !isDisabled
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span className="hidden sm:inline">{link.label}</span>
                {isDisabled && <span className="text-xs text-muted-foreground gradient-text">Em breve</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}