'use client';

import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { useSession, useLogin, useLogout, useValidatePin, User } from '@/hooks/useAuthQuery';
import { toast } from 'sonner';

type IOpenLogin = {
  status?: boolean;
  reset?: boolean;
};

type IContext = {
  user: User | null;
  isLogged: boolean;
  isOpen: boolean;
  isLoading: boolean;
  openLogin: (data?: IOpenLogin) => void;
  changeNumber: () => void;
  logout: () => void;
  setPin: (token: string) => void;
  login: ({ whatsapp }: { whatsapp: string }) => void;
};

const Context = createContext({ user: null } as IContext);
export const useAuth = () => useContext(Context);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false);

  const { data: user, isLoading: isSessionLoading } = useSession();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const validatePinMutation = useValidatePin();

  const isLogged = !!user?.isAuthenticated;
  const isLoading = isSessionLoading || loginMutation.isPending || logoutMutation.isPending || validatePinMutation.isPending;

  const openLogin = useCallback(
    ({ status = true, reset = false } = {} as IOpenLogin) => {
      if (reset) {
        logoutMutation.mutate();
      }
      setOpen(status);
    },
    [logoutMutation]
  );

  const login = useCallback(
    ({ whatsapp }: { whatsapp: string }) => {
      loginMutation.mutate(whatsapp, {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error) => {
          toast.error(error.message || 'Ocorreu um erro ao fazer login');
        },
      });
    },
    [loginMutation]
  );

  const setPin = useCallback(
    (token: string) => {
      if (!user?.id || !token) {
        toast.error('Usuário ou token inválido');
        return;
      }

      validatePinMutation.mutate(
        { userId: user.id, token },
        {
          onSuccess: ({ message }) => {
            toast.success(message);
            setOpen(false);
          },
          onError: (error) => {
            toast.error(error.message || 'Ocorreu um erro ao validar o PIN');
          },
        }
      );
    },
    [user?.id, validatePinMutation]
  );

  const logout = useCallback(() => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Logout realizado com sucesso');
      },
      onError: (error) => {
        toast.error(error.message || 'Ocorreu um erro ao fazer logout');
      },
    });
  }, [logoutMutation]);

  const changeNumber = useCallback(() => {
    logoutMutation.mutate();
    setOpen(true);
  }, [logoutMutation]);

  return (
    <Context.Provider
      value={{
        user: user || null,
        logout,
        isLogged,
        openLogin,
        isOpen,
        login,
        setPin,
        changeNumber,
        isLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};
