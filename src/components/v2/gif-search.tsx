import { useState, useCallback, useEffect, useRef } from "react";
import { Search, Loader2, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { environment } from "@/utils/environment";

interface GifSearchProps {
  onGifSelect: (url: string) => void;
  apiProvider: "giphy" | "tenor";
}

interface GifResult {
  id: string;
  url: string;
  preview: string;
  title: string;
}

interface GiphyResponse {
  data: GifResult[];
  pagination: { total_count: number; count: number; offset: number };
}

interface TenorResponse {
  results: GifResult[];
  next: string;
}

const LIMIT = 18;

// Giphy API
const searchGiphy = async (query: string, offset: number = 0): Promise<GiphyResponse> => {
  const apiKey = environment.GIPHY_API_KEY;
  if (!apiKey) {
    console.warn("GIPHY API key not configured");
    return { data: [], pagination: { total_count: 0, count: 0, offset: 0 } };
  }

  const endpoint = query.trim()
    ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=${LIMIT}&offset=${offset}&rating=g`
    : `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${LIMIT}&offset=${offset}&rating=g`;

  const response = await fetch(endpoint);
  const data = await response.json();

  const gifs = data.data.map((gif: {
    id: string;
    images: {
      original: { url: string };
      fixed_width_small: { url: string };
    };
    title: string;
  }) => ({
    id: gif.id,
    url: gif.images.original.url,
    preview: gif.images.fixed_width_small.url,
    title: gif.title || "GIF",
  }));

  return { data: gifs, pagination: data.pagination };
};

// Tenor API
const searchTenor = async (query: string, pos: string = ""): Promise<TenorResponse> => {
  const apiKey = environment.TENOR_API_KEY;
  if (!apiKey) {
    console.warn("Tenor API key not configured");
    return { results: [], next: "" };
  }

  const posParam = pos ? `&pos=${pos}` : "";
  const endpoint = query.trim()
    ? `https://tenor.googleapis.com/v2/search?key=${apiKey}&q=${encodeURIComponent(query)}&limit=${LIMIT}&contentfilter=medium${posParam}`
    : `https://tenor.googleapis.com/v2/featured?key=${apiKey}&limit=${LIMIT}&contentfilter=medium${posParam}`;

  const response = await fetch(endpoint);
  const data = await response.json();

  const gifs = data.results.map((gif: {
    id: string;
    media_formats: {
      gif: { url: string };
      tinygif: { url: string };
    };
    title: string;
    content_description: string;
  }) => ({
    id: gif.id,
    url: gif.media_formats.gif.url,
    preview: gif.media_formats.tinygif.url,
    title: gif.title || gif.content_description || "GIF",
  }));

  return { results: gifs, next: data.next || "" };
};

export function GifSearch({ onGifSelect, apiProvider }: GifSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GifResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [tenorNextPos, setTenorNextPos] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchGifs = useCallback(async (reset: boolean = true) => {
    if (reset) {
      setIsLoading(true);
      setOffset(0);
      setTenorNextPos("");
      setHasMore(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      if (apiProvider === "giphy") {
        const currentOffset = reset ? 0 : offset;
        const response = await searchGiphy(query, currentOffset);

        if (reset) {
          setResults(response.data);
        } else {
          setResults(prev => [...prev, ...response.data]);
        }

        setOffset(currentOffset + response.data.length);
        setHasMore(response.data.length === LIMIT);
      } else {
        const currentPos = reset ? "" : tenorNextPos;
        const response = await searchTenor(query, currentPos);

        if (reset) {
          setResults(response.results);
        } else {
          setResults(prev => [...prev, ...response.results]);
        }

        setTenorNextPos(response.next);
        setHasMore(!!response.next && response.results.length > 0);
      }
    } catch (error) {
      console.error("Error searching GIFs:", error);
      if (reset) setResults([]);
    }

    setIsLoading(false);
    setIsLoadingMore(false);
  }, [query, apiProvider, offset, tenorNextPos]);

  // Load trending on mount and when provider changes
  useEffect(() => {
    searchGifs(true);
  }, [apiProvider]);

  // Handle scroll for infinite loading
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isLoading || isLoadingMore || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      searchGifs(false);
    }
  }, [isLoading, isLoadingMore, hasMore, searchGifs]);

  const handleSearch = () => {
    searchGifs(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = (gif: GifResult) => {
    setSelectedId(gif.id);
    onGifSelect(gif.url);
  };

  const isApiConfigured = apiProvider === "giphy"
    ? !!environment.GIPHY_API_KEY
    : !!environment.TENOR_API_KEY;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Buscar GIFs no ${apiProvider === "giphy" ? "Giphy" : "Tenor"}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-10 h-11 rounded-xl border-2 focus:border-primary transition-colors"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isLoading}
          variant="whatsapp"
          size="default"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar"}
        </Button>
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="max-h-[300px] overflow-y-auto rounded-xl p-2 bg-muted/30"
      >
        {isApiConfigured ? (
          <div className="grid grid-cols-3 gap-2">
            {results.map((gif) => (
              <button
                key={gif.id}
                onClick={() => handleSelect(gif)}
                className={cn(
                  "relative aspect-square rounded-lg overflow-hidden transition-all duration-200 group",
                  selectedId === gif.id
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-95"
                    : "hover:scale-105 hover:shadow-lg"
                )}
              >
                <img
                  src={gif.preview}
                  alt={gif.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-xs font-medium truncate">{gif.title}</span>
                </div>
              </button>
            ))}
            {results.length === 0 && !isLoading && (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                Nenhum GIF encontrado
              </div>
            )}
            {isLoading && (
              <div className="col-span-3 text-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
              </div>
            )}
            {isLoadingMore && (
              <div className="col-span-3 text-center py-4">
                <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1 block">Carregando mais...</span>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>API do {apiProvider === "giphy" ? "Giphy" : "Tenor"} não configurada</p>
            <p className="text-sm">Configure NEXT_PUBLIC_{apiProvider.toUpperCase()}_API_KEY</p>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
        Powered by {apiProvider === "giphy" ? "GIPHY" : "Tenor"}
        <ExternalLink className="h-3 w-3" />
      </p>
    </div>
  );
}
