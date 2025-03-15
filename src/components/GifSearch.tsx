// @ts-nocheck
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Search, Badge, X, CheckCircle, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { DialogHeader, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

type GifSearchModalProps = {
  open: boolean
  onOpenChange: () => void
  onSend: ()=> void
  title: string
  description: string
}
export const GifSearchModal = ({ open, onOpenChange, onSend, title = "GIF Explorer", description = "Search and select your favorite GIFs to share" }: GifSearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGifs, setSelectedGifs] = useState([]);
  const [error, setError] = useState(null);

  const searchGifs = (query: string) => {
    setLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      // Mock data structure
      const mockResults = Array(20).fill('').map((_, i) => ({
        id: `gif-${i}`,
        url: `/api/placeholder/${200 + (i % 3) * 50}/${150 + (i % 2) * 50}`,
        title: `Sample GIF ${i + 1} for "${query}"`
      }));

      setGifs([]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      searchGifs(searchQuery);
    }
  }, [searchQuery]);

  const handleSelectGif = (gif: any) => {
    if (selectedGifs.some(g => g.id === gif.id)) {
      setSelectedGifs(selectedGifs.filter(g => g.id !== gif.id));
    } else if (selectedGifs.length < 3) {
      setSelectedGifs([...selectedGifs, gif]);
    }
  };

  const handleSend = () => {
    if (selectedGifs.length > 0) {
      onSend(selectedGifs);
      setSelectedGifs([]);
      setSearchQuery('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger>
        <button
          type="button"
          aria-label="Gerar figurinha para receber pelo Whatsapp"
          className="rounded bg-indigo-600 px-2.5 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-indigo-300 hover:bg-indigo-500 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
        >
          {"buscar figurinha 🪄"}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-screen flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Search Bar */}
        <div className="py-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for GIFs..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Selected GIFs */}
        {selectedGifs.length > 0 && (
          <div className="py-2 px-1 bg-muted/40 rounded-md mb-4">
            <div className="flex items-center mb-2">
              <h3 className="text-sm font-medium">Selected</h3>
              <Badge variant="secondary" className="ml-2">{selectedGifs.length}/3</Badge>
            </div>
            <div className="flex space-x-2 overflow-x-auto py-1">
              {selectedGifs.map(gif => (
                <div key={`selected-${gif.id}`} className="relative flex-shrink-0">
                  <img
                    src={gif.url}
                    alt={gif.title}
                    className="h-16 w-24 object-cover rounded border"
                  />
                  <Button
                    onClick={() => handleSelectGif(gif)}
                    variant="destructive"
                    size="icon"
                    className="h-6 w-6 absolute -top-2 -right-2 p-0"
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Grid with H1 */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-4">GIF Results</h1>

          <ScrollArea className="h-64">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : error ? (
              <div className="text-center text-destructive p-4">{error}</div>
            ) : gifs.length === 0 ? (
              <div className="text-center text-muted-foreground p-4">
                {searchQuery.length > 0
                  ? "No GIFs found. Try another search term."
                  : "Search for GIFs to see results here."}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {gifs.map(gif => (
                  <Card
                    key={gif.id}
                    className={`overflow-hidden cursor-pointer hover:opacity-90 transition-opacity border-2 ${selectedGifs.some(g => g.id === gif.id) ? 'border-primary' : 'border-transparent'
                      }`}
                    onClick={() => handleSelectGif(gif)}
                  >
                    <CardContent className="p-0 relative">
                      <img
                        src={gif.url}
                        alt={gif.title}
                        className="w-full aspect-video object-cover"
                      />
                      {selectedGifs.some(g => g.id === gif.id) && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="text-primary bg-background rounded-full" size={24} />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedGifs.length === 0
              ? "Select up to 3 GIFs"
              : `${selectedGifs.length} GIF${selectedGifs.length > 1 ? 's' : ''} selected`}
          </div>
          <Button
            onClick={handleSend}
            disabled={selectedGifs.length === 0}
            className="flex items-center gap-2"
          >
            <span>Send</span>
            <Send size={16} />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};