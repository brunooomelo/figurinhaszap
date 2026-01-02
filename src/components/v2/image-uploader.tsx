import { useCallback } from "react";
import { Upload, ImageIcon, Film } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
}

export function ImageUploader({ onImageSelect, isDragging, setIsDragging }: ImageUploaderProps) {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, [setIsDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, [setIsDragging]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith("image/") || file.type === "image/gif")) {
      onImageSelect(file);
    }
  }, [onImageSelect, setIsDragging]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer group",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.02]"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*,.gif"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="flex flex-col items-center gap-4 pointer-events-none">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <ImageIcon className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center">
            <Film className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <p className="font-semibold text-foreground">
            Transforme suas imagens em figurinhas!
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">Clique para upload</span>
            {" "}ou arraste e solte
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG, GIF, WEBP até 25MB
          </p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Upload className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Solte seu arquivo aqui
          </span>
        </div>
      </div>
    </div>
  );
}
