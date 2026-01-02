import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface MSWConfig {
  enabled: boolean;
  isAuthenticated: boolean;
  stickerLimit: number;
  usedStickers: number;
  errorRate: number;
}

interface MSWContextValue extends MSWConfig {
  setEnabled: (enabled: boolean) => void;
  setIsAuthenticated: (isAuth: boolean) => void;
  setStickerLimit: (limit: number) => void;
  setUsedStickers: (used: number) => void;
  setErrorRate: (rate: number) => void;
  resetUsedStickers: () => void;
}

const MSWContext = createContext<MSWContextValue | null>(null);

export const useMSW = () => {
  const context = useContext(MSWContext);
  if (!context) {
    throw new Error('useMSW must be used within MSWProvider');
  }
  return context;
};

interface MSWProviderProps {
  children: ReactNode;
}

export const MSWProvider = ({ children }: MSWProviderProps) => {
  const [enabled, setEnabled] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stickerLimit, setStickerLimit] = useState(10);
  const [usedStickers, setUsedStickers] = useState(0);
  const [errorRate, setErrorRate] = useState(0);
  const [worker, setWorker] = useState<any>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const initWorker = async () => {
      const { worker: mswWorker } = await import('../../mocks/browser');
      setWorker(mswWorker);
    };

    initWorker();
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' || !worker) {
      return;
    }

    if (enabled) {
      worker.start({
        onUnhandledRequest: 'bypass',
      });
    } else {
      worker.stop();
    }

    return () => {
      if (enabled) {
        worker.stop();
      }
    };
  }, [enabled, worker]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__MSW_CONFIG__ = {
        enabled,
        isAuthenticated,
        stickerLimit,
        usedStickers,
        errorRate,
      };
    }
  }, [enabled, isAuthenticated, stickerLimit, usedStickers, errorRate]);

  const resetUsedStickers = () => {
    setUsedStickers(0);
  };

  const value: MSWContextValue = {
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
  };

  return <MSWContext.Provider value={value}>{children}</MSWContext.Provider>;
};
