import { useMSW } from '@/contexts/MSWContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState } from 'react';

export const MSWDevPanel = () => {
  const {
    enabled,
    isAuthenticated,
    stickerLimit,
    usedStickers,
    errorRate,
    setEnabled,
    setIsAuthenticated,
    setStickerLimit,
    setUsedStickers,
    setErrorRate,
    resetUsedStickers,
  } = useMSW();

  const [isOpen, setIsOpen] = useState(true);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[9999] bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition-colors font-mono text-sm font-bold"
      >
        MSW Dev Panel
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] w-80">
      <Card className="border-yellow-500 border-2 shadow-2xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-yellow-500">⚠️</span>
                MSW Dev Panel
              </CardTitle>
              <CardDescription className="text-xs">
                Mock Service Worker Controls
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <Label htmlFor="msw-enabled" className="text-sm font-medium">
              MSW Enabled
            </Label>
            <Switch
              id="msw-enabled"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          {enabled && (
            <>
              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is-auth" className="text-sm font-medium">
                    Is Authenticated
                  </Label>
                  <Switch
                    id="is-auth"
                    checked={isAuthenticated}
                    onCheckedChange={setIsAuthenticated}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sticker-limit" className="text-sm font-medium">
                    Sticker Limit: {stickerLimit}
                  </Label>
                  <Input
                    id="sticker-limit"
                    type="number"
                    min="0"
                    max="100"
                    value={stickerLimit}
                    onChange={(e) => setStickerLimit(Number(e.target.value))}
                    className="h-8"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">
                      Used: {usedStickers}/{stickerLimit}
                    </Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={resetUsedStickers}
                      className="h-6 text-xs"
                    >
                      Reset
                    </Button>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min((usedStickers / stickerLimit) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="error-rate" className="text-sm font-medium">
                    Error Rate: {(errorRate * 100).toFixed(0)}%
                  </Label>
                  <Input
                    id="error-rate"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={errorRate}
                    onChange={(e) => setErrorRate(Number(e.target.value))}
                    className="h-8"
                  />
                </div>

                <div className="text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-200 dark:border-yellow-800">
                  <strong>⚠️ DEV ONLY:</strong> This panel only works in development
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
