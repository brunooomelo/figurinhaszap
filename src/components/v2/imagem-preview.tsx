import { useState, useRef, useEffect } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  imageUrl: string;
  zoom: number;
  onZoomChange: (value: number) => void;
  position: { x: number; y: number };
  onPositionChange: (position: { x: number; y: number }) => void;
  disableControls?: boolean;
}

export function ImagePreview({
  imageUrl,
  zoom,
  onZoomChange,
  position,
  onPositionChange,
  disableControls = false,
}: ImagePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disableControls) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    onPositionChange({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    onZoomChange(1);
    onPositionChange({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  return (
    <div className="space-y-4">
    {/* Preview Container */}
    <div
      ref={containerRef}
      className={cn(
        "relative w-full aspect-square rounded-2xl overflow-hidden bg-muted/50 border-2 border-border",
        isDragging ? "cursor-grabbing" : "cursor-grab"
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Grid background for transparency */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%),
            linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%),
            linear-gradient(-45deg, transparent 75%, hsl(var(--muted)) 75%)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        }}
      />

      {/* Sticker boundary preview */}
      <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-xl pointer-events-none z-10" />

      {/* Image */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-100"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
        }}
      >
        <img
          src={imageUrl}
          alt="Preview"
          className="max-w-full max-h-full object-contain pointer-events-none select-none"
          draggable={false}
        />
      </div>

      {/* Drag indicator */}
      {!disableControls && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground">
          <Move className="h-3 w-3" />
          Arraste para ajustar
        </div>
      )}
    </div>

    {/* Zoom Controls - Hidden for GIFs */}
    {!disableControls && (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Zoom</span>
          <span className="text-muted-foreground">{Math.round(zoom * 100)}%</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onZoomChange(Math.max(0.5, zoom - 0.1))}
            className="h-8 w-8"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>

          <Slider
            value={[zoom]}
            onValueChange={([value]) => onZoomChange(value)}
            min={0.5}
            max={3}
            step={0.1}
            className="flex-1"
          />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onZoomChange(Math.min(3, zoom + 0.1))}
            className="h-8 w-8"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleReset}
            className="h-8 w-8"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )}
  </div>
  );
}
