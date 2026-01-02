import { useState } from "react";
import { History, Share2, Download, Trash2, Copy, Check, Globe, Lock, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface StickerItem {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  shareLink?: string;
  isPublic: boolean;
  isAdultContent: boolean;
}

interface StickerHistoryProps {
  stickers: StickerItem[];
  onDelete: (id: string) => void;
  onResend: (sticker: StickerItem) => void;
  isResending?: boolean;
}

export function StickerHistory({ stickers, onDelete, onResend, isResending }: StickerHistoryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = async (sticker: StickerItem) => {
    if (!sticker.shareLink) {
      toast.error("Esta figurinha é privada");
      return;
    }
    try {
      await navigator.clipboard.writeText(sticker.shareLink);
      setCopiedId(sticker.id);
      toast.success("Link copiado!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Erro ao copiar link");
    }
  };

  const handleShare = async (sticker: StickerItem) => {
    if (!sticker.isPublic || !sticker.shareLink) {
      toast.error("Esta figurinha é privada");
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({
          title: sticker.name,
          text: `Confira minha figurinha: ${sticker.name}`,
          url: sticker.shareLink,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopyLink(sticker);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative h-12 w-12 rounded-xl border-2 hover:border-primary transition-colors"
        >
          <History className="h-5 w-5" />
          {stickers.length > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
              {stickers.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md border-l-2">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            Histórico de Figurinhas
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
          {stickers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center">
                <History className="h-10 w-10 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                Nenhuma figurinha criada ainda
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Suas figurinhas aparecerão aqui
              </p>
            </div>
          ) : (
            stickers.map((sticker) => (
              <div
                key={sticker.id}
                className="group rounded-2xl border-2 border-border bg-card p-4 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={sticker.imageUrl}
                      alt={sticker.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold truncate">{sticker.name}</h4>
                      {sticker.isPublic ? (
                        <Globe className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      ) : (
                        <Lock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      )}
                      {sticker.isAdultContent && (
                        <AlertTriangle className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(sticker.createdAt)}
                    </p>

                    {/* Share Link */}
                    {sticker.isPublic && sticker.shareLink && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 text-xs text-muted-foreground truncate bg-muted px-2 py-1 rounded">
                          {sticker.shareLink}
                        </div>
                        <button
                          onClick={() => handleCopyLink(sticker)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          {copiedId === sticker.id ? (
                            <Check className="h-4 w-4 text-primary" />
                          ) : (
                            <Copy className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                  <Button
                    variant="whatsapp"
                    size="sm"
                    onClick={() => onResend(sticker)}
                    disabled={isResending}
                    className="flex-1 h-9 rounded-lg text-xs"
                  >
                    {isResending ? (
                      <RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" />
                    ) : (
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    )}
                    Reenviar
                  </Button>
                  {sticker.isPublic && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(sticker)}
                      className="h-9 w-9 p-0 rounded-lg"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 w-9 p-0 rounded-lg"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(sticker.id)}
                    className="h-9 w-9 p-0 rounded-lg text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
