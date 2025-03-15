import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth } from "./AuthContext";
import { hiddenPhone } from "@/utils/hiddenNumber";
import { event } from "@/utils/gtag";
import { useState, useEffect } from "react";
import { User, Crown, LogOut, ChevronDown } from 'lucide-react';

export const LoginButton = () => {
  const { isLogged, openLogin, user, logout } = useAuth();
  const [isPremium, setIsPremium] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);

  useEffect(() => {
    if (isLogged && user) {
      setIsPremium(!user.isPremium);
    }
  }, [isLogged, user]);

  useEffect(() => {
    if (isPremium) {
      const interval = setInterval(() => {
        setGlowEffect(prev => !prev);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isPremium]);

  const handleUpgrade = () => {
    event({
      action: "upgrade",
      label: "Iniciou upgrade para premium",
      category: "premium",
      value: 1,
    });

    setIsPremium(true);
  };

  return (
    <div className="relative">
      {isLogged && isPremium && (
        <div className={`absolute inset-0 rounded-md ${glowEffect ? "bg-purple-400 blur-md opacity-30" : "opacity-0"
          } transition-opacity duration-1000`} />
      )}

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            aria-label={isLogged ? "Menu do usuário" : "Entrar"}
            className={`relative z-10 flex items-center gap-2 px-3 py-1.5 text-sm font-semibold shadow-sm rounded ${!isLogged
              ? "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              : isPremium
                ? "bg-gradient-to-r from-purple-600 to-indigo-700 text-white border-none shadow-lg"
                : "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              }`}
            onClick={() => {
              if (!isLogged) {
                openLogin();
              }
            }}
          >
            {isLogged && user?.whatsapp ? (
              <>
                <span className="flex items-center gap-2">
                  {isPremium ? (
                    <div className="relative">
                      <Crown className="w-4 h-4 text-yellow-300" />
                      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" />
                    </div>
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  {hiddenPhone(user)}
                </span>

                {isPremium && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-black bg-opacity-30 backdrop-blur-sm border border-white border-opacity-20">
                    Premium
                  </span>
                )}
                <ChevronDown className="w-4 h-4 ml-1" />

                {isPremium && (
                  <div className="absolute inset-0 rounded-md overflow-hidden">
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-white opacity-10 rounded-full" />
                    <div className="absolute top-1/2 -right-4 w-12 h-1 bg-white opacity-10 rotate-45" />
                    <div className="absolute -bottom-3 left-1/3 w-6 h-6 bg-white opacity-10 rounded-full" />
                  </div>
                )}
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </DropdownMenu.Trigger>

        {isLogged && (
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-50"
              sideOffset={5}
            >
              {!isPremium && (
                <DropdownMenu.Item
                  className="group text-[13px] leading-none rounded flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-300 cursor-pointer"
                  onClick={handleUpgrade}
                >
                  Fazer upgrade para Premium
                </DropdownMenu.Item>
              )}

              <DropdownMenu.Item
                className="group text-[13px] leading-none text-red-500 rounded flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-zinc-300 cursor-pointer"
                onClick={() => {
                  event({
                    action: "logout",
                    label: "Sair da autenticacao",
                    category: "login",
                    value: 1,
                  });
                  logout();
                }}
              >
                Sair
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        )}
      </DropdownMenu.Root>
    </div>
  );
};