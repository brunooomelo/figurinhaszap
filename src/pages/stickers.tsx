import { SideAds } from "@/components/ads/SideAds";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Sparkles, Search, Share2, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

// Mock data for public stickers
const mockStickers = [
  { id: "1", name: "Risada", imageUrl: "https://media.giphy.com/media/ZqlvCTNHpqrio/giphy.gif", author: "João", downloads: 234 },
  { id: "2", name: "Feliz", imageUrl: "https://media.giphy.com/media/l0MYGb1LuZ3n7dRnO/giphy.gif", author: "Maria", downloads: 189 },
  { id: "3", name: "Pensativo", imageUrl: "https://media.giphy.com/media/a5viI92PAF89q/giphy.gif", author: "Pedro", downloads: 156 },
  { id: "4", name: "Surpreso", imageUrl: "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif", author: "Ana", downloads: 342 },
  { id: "5", name: "Dançando", imageUrl: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", author: "Carlos", downloads: 567 },
  { id: "6", name: "Aplausos", imageUrl: "https://media.giphy.com/media/l0HlMr2G3EKFgpULC/giphy.gif", author: "Lucia", downloads: 421 },
];

export default function PublicStickers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStickers = mockStickers.filter(sticker =>
    sticker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sticker.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShare = (sticker: typeof mockStickers[0]) => {
    const shareUrl = `${window.location.origin}/stickers/${sticker.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copiado!");
  };

  const handleDownload = (sticker: typeof mockStickers[0]) => {
    toast.success(`Baixando "${sticker.name}"...`);
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            Figurinhas Públicas
          </h1>
          <p className="text-muted-foreground mt-1">
            Explore e baixe figurinhas criadas pela comunidade
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Buscar figurinhas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-14 pl-12 rounded-2xl border-2 text-lg"
        />
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredStickers.map((sticker) => (
          <div
            key={sticker.id}
            className="group rounded-2xl border-2 border-border bg-card p-4 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
          >
            <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-3">
              <img
                src={sticker.imageUrl}
                alt={sticker.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h3 className="font-semibold truncate">{sticker.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">por {sticker.author}</p>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 rounded-lg"
                onClick={() => handleShare(sticker)}
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="whatsapp"
                className="flex-1 rounded-lg"
                onClick={() => handleDownload(sticker)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-2">
              {sticker.downloads} downloads
            </p>
          </div>
        ))}
      </div>

      {filteredStickers.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            Nenhuma figurinha encontrada para "{searchQuery}"
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center mt-12 p-8 rounded-3xl glass">
        <h2 className="text-2xl font-bold mb-2">Quer criar suas próprias figurinhas?</h2>
        <p className="text-muted-foreground mb-4">É grátis e super fácil!</p>
        <Button variant="whatsapp" size="lg" className="rounded-xl">
          <Link href="/app">Criar Figurinhass</Link>
        </Button>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
    </>

  );
}