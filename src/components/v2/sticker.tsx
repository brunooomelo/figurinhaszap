import { useState, useCallback, useRef } from "react";
import { Wand2, Trash2, Image as ImageIcon, Film, User, Globe, Lock, AlertTriangle, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploader } from "@/components/v2/image-uploader";
import { GifSearch } from "@/components/v2/gif-search";
import { AuthModal } from "@/components/v2/auth-modal";
import { StickerHistory, StickerItem } from "@/components/v2/sticker-history";
import { toast } from "sonner";
import { useCreateSticker, useHealthCheck } from "@/hooks/useStickers";
import { useSession } from "@/hooks/useAuth";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ImagePreview } from "./imagem-preview";

type ApiProvider = "giphy" | "tenor";

export function StickerCreator() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isGif, setIsGif] = useState(false);
  const [stickerName, setStickerName] = useState("");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [apiProvider, setApiProvider] = useState<ApiProvider>("giphy");

  // Privacy and content settings
  const [isPublic, setIsPublic] = useState(false);
  const [isAdultContent, setIsAdultContent] = useState(false);

  // Auth state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authenticatedPhone, setAuthenticatedPhone] = useState<string | null>(null);

  // Sticker history
  const [stickerHistory, setStickerHistory] = useState<StickerItem[]>([]);

  // Preview ref for capturing
  const previewRef = useRef<HTMLDivElement>(null);

  // React Query hooks
  const createStickerMutation = useCreateSticker();
  const { data: session } = useSession();
  const { data: healthData, isLoading: isHealthLoading, isError: isHealthError } = useHealthCheck();

  // Capture preview as File with zoom/position applied (1:1 aspect ratio)
  const capturePreview = useCallback(async (): Promise<File | null> => {
    if (!selectedImage) return null;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Sticker size (512x512 is standard for WhatsApp)
    const size = 512;
    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.crossOrigin = "anonymous";

    return new Promise((resolve) => {
      img.onload = () => {
        // Calculate base size to fit image in canvas (object-contain behavior)
        const imgAspect = img.width / img.height;
        let baseWidth: number;
        let baseHeight: number;

        if (imgAspect > 1) {
          // Landscape image
          baseWidth = size;
          baseHeight = size / imgAspect;
        } else {
          // Portrait or square image
          baseWidth = size * imgAspect;
          baseHeight = size;
        }

        // Apply zoom
        const scaledWidth = baseWidth * zoom;
        const scaledHeight = baseHeight * zoom;

        // Convert position from preview size to canvas size
        const previewSize = previewRef.current?.offsetWidth || size;
        const positionScale = size / previewSize;

        // Center image and apply position offset
        const x = (size - scaledWidth) / 2 + position.x * positionScale;
        const y = (size - scaledHeight) / 2 + position.y * positionScale;

        // Draw image with transformations
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "sticker.png", { type: "image/png" });
            resolve(file);
          } else {
            resolve(null);
          }
        }, "image/png");
      };

      img.onerror = () => resolve(null);
      img.src = selectedImage;
    });
  }, [selectedImage, zoom, position]);

  const handleImageSelect = useCallback((file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    setIsGif(file.type === "image/gif");
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    toast.success("Imagem carregada com sucesso!");
  }, []);

  const handleGifSelect = useCallback((url: string) => {
    setSelectedImage(url);
    setIsGif(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    toast.success("GIF selecionado!");
  }, []);

  const handleRemove = useCallback(() => {
    setSelectedImage(null);
    setIsGif(false);
    setStickerName("");
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setIsPublic(false);
    setIsAdultContent(false);
  }, []);

  const handleAuthSuccess = (phone: string) => {
    setAuthenticatedPhone(phone);
    setIsAuthModalOpen(false);
  };

  const handleGenerate = useCallback(async () => {
    if (!selectedImage) {
      toast.error("Selecione uma imagem primeiro!");
      return;
    }

    // Check authentication (local state or session)
    if (!authenticatedPhone && !session) {
      setIsAuthModalOpen(true);
      return;
    }

    let file: File | null = null;
    let imageUrlForHistory: string = selectedImage;

    if (isGif) {
      // For GIFs, download and send original without crop
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        file = new File([blob], "sticker.gif", { type: "image/gif" });
      } catch {
        toast.error("Erro ao processar GIF. Tente novamente.");
        return;
      }
    } else {
      // For images, capture preview with zoom/position applied
      file = await capturePreview();
      if (file) {
        imageUrlForHistory = URL.createObjectURL(file);
      }
    }

    if (!file) {
      toast.error("Erro ao processar imagem. Tente novamente.");
      return;
    }

    createStickerMutation.mutate(file, {
      onSuccess: (data: { stickerId: string; shareLink?: string } | undefined) => {
        // Create new sticker in history
        const newSticker: StickerItem = {
          id: data?.stickerId || Date.now().toString(),
          name: stickerName || "Minha Figurinha",
          imageUrl: imageUrlForHistory,
          createdAt: new Date(),
          shareLink: isPublic ? `https://figurinhaszap.com/s/${Date.now().toString(36)}` : undefined,
          isPublic,
          isAdultContent,
        };

        setStickerHistory(prev => [newSticker, ...prev]);

        toast.success("Figurinha gerada com sucesso! 🎉", {
          description: `Figurinha enviada para ${authenticatedPhone || "seu WhatsApp"}`,
        });

        handleRemove();
      },
      onError: (error: Error) => {
        // Se não autenticado, reabrir modal de login/OTP
        if (error.message.includes("Não autenticado")) {
          setAuthenticatedPhone(null);
          setIsAuthModalOpen(true);
          toast.error("Sessão expirada. Faça login novamente.");
        } else {
          toast.error(error.message);
        }
      },
    });
  }, [selectedImage, isGif, authenticatedPhone, session, capturePreview, stickerName, isPublic, isAdultContent, createStickerMutation, handleRemove]);

  const handleDeleteSticker = (id: string) => {
    setStickerHistory(prev => prev.filter(s => s.id !== id));
    toast.success("Figurinha removida do histórico");
  };

  const handleResendSticker = useCallback(async (sticker: StickerItem) => {
    // Check authentication
    if (!authenticatedPhone && !session) {
      setIsAuthModalOpen(true);
      return;
    }

    // Fetch the image and convert to File
    try {
      const response = await fetch(sticker.imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "sticker.png", { type: "image/png" });

      createStickerMutation.mutate(file, {
        onSuccess: () => {
          toast.success("Figurinha reenviada com sucesso! 🎉", {
            description: `Figurinha enviada para ${authenticatedPhone || "seu WhatsApp"}`,
          });
        },
        onError: (error: Error) => {
          if (error.message.includes("Não autenticado")) {
            setAuthenticatedPhone(null);
            setIsAuthModalOpen(true);
            toast.error("Sessão expirada. Faça login novamente.");
          } else {
            toast.error(error.message);
          }
        },
      });
    } catch {
      toast.error("Erro ao reenviar figurinha");
    }
  }, [authenticatedPhone, session, createStickerMutation]);

  const isGenerating = createStickerMutation.isPending;

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Content */}
        <div className="space-y-6 animate-slide-up">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Fazer Figurinhas para WhatsApp{" "}
              <span className="gradient-text">Nunca Foi Tão Fácil!</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Descubra a maneira mais simples, gratuita e online de criar suas próprias figurinhas 
              para WhatsApp. Com apenas três passos - selecionar, customizar e gerar - você estará 
              criando figurinhas incríveis em segundos.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: "🖼️", label: "Upload" },
              { icon: "🎨", label: "Customize" },
              { icon: "✨", label: "Gerar" },
            ].map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl glass hover:shadow-lg transition-all duration-300"
              >
                <span className="text-2xl">{step.icon}</span>
                <span className="text-sm font-medium">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Auth Status */}
          {authenticatedPhone && (
            <div className="flex items-center gap-3 p-4 rounded-2xl border-2 border-primary/30 bg-primary/5">
              <div className="p-2 rounded-xl gradient-primary">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Autenticado</p>
                <p className="text-xs text-muted-foreground">{authenticatedPhone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Creator Card */}
        <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="rounded-3xl border-2 border-border bg-card p-6 shadow-xl">
            {/* Header with History Button and API Status */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-lg">Criar Figurinha</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium cursor-default">
                        {isHealthLoading ? (
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse" />
                        ) : isHealthError ? (
                          <>
                            <WifiOff className="h-3 w-3 text-destructive" />
                            <span className="text-destructive">Offline</span>
                          </>
                        ) : (
                          <>
                            <Wifi className="h-3 w-3 text-green-500" />
                            <span className="text-green-500">Online</span>
                          </>
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isHealthError 
                        ? "API indisponível. Tente novamente mais tarde." 
                        : "API online e funcionando"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <StickerHistory
                stickers={stickerHistory}
                onDelete={handleDeleteSticker}
                onResend={handleResendSticker}
                isResending={isGenerating}
              />
            </div>

            {!selectedImage ? (
              <Tabs defaultValue="upload" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 h-12 rounded-xl p-1 bg-muted">
                  <TabsTrigger 
                    value="upload" 
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Upload
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gif" 
                    className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm flex items-center gap-2"
                  >
                    <Film className="h-4 w-4" />
                    GIFs
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="upload" className="mt-4">
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    isDragging={isDragging}
                    setIsDragging={setIsDragging}
                  />
                </TabsContent>

                <TabsContent value="gif" className="mt-4 space-y-4">
                  {/* API Provider Toggle */}
                  <div className="flex gap-2 p-1 bg-muted rounded-xl">
                    <button
                      onClick={() => setApiProvider("giphy")}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        apiProvider === "giphy"
                          ? "bg-card shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Giphy
                    </button>
                    <button
                      onClick={() => setApiProvider("tenor")}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        apiProvider === "tenor"
                          ? "bg-card shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      disabled
                    >
                      Tenor
                    </button>
                  </div>

                  <GifSearch 
                    onGifSelect={handleGifSelect} 
                    apiProvider={apiProvider}
                  />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="space-y-6">
                <div ref={previewRef}>
                  <ImagePreview
                    imageUrl={selectedImage}
                    zoom={zoom}
                    onZoomChange={setZoom}
                    position={position}
                    onPositionChange={setPosition}
                    disableControls={isGif}
                  />
                </div>

                {/* Sticker Name */}
                <div className="space-y-2">
                  <Label htmlFor="sticker-name" className="text-sm font-medium">
                    Nome do sticker
                  </Label>
                  <Input
                    id="sticker-name"
                    placeholder="Minha figurinha incrível"
                    value={stickerName}
                    onChange={(e) => setStickerName(e.target.value)}
                    className="h-12 rounded-xl border-2 focus:border-primary transition-colors"
                  />
                </div>

                {/* Privacy Settings */}
                <div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isPublic ? (
                        <Globe className="h-5 w-5 text-primary" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <Label htmlFor="public-toggle" className="text-sm font-medium cursor-pointer">
                          Figurinha Pública
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {isPublic ? "Visível para todos na galeria" : "Apenas você pode ver"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="public-toggle"
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`h-5 w-5 ${isAdultContent ? "text-orange-500" : "text-muted-foreground"}`} />
                      <div>
                        <Label htmlFor="adult-toggle" className="text-sm font-medium cursor-pointer">
                          Conteúdo +18
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Marque se contém conteúdo adulto
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="adult-toggle"
                      checked={isAdultContent}
                      onCheckedChange={setIsAdultContent}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleRemove}
                    className="flex-1 h-12 rounded-xl border-2"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remover
                  </Button>
                  <Button
                    variant="whatsapp"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex-1 h-12 rounded-xl"
                  >
                    {isGenerating ? (
                      <>
                        <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Gerar Figurinha
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
