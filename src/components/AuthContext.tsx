'use client'
import { environment } from "../utils/environment";
import { parseCookies, destroyCookie } from "nookies";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { PinForm } from "./PinForm";
import { LoginForm } from "./LoginForm";

export type User = {
  id: string;
  whatsapp: string;
  isPremium: boolean
};
type IOpenLogin = {
  status?: boolean;
  reset?: boolean;
};
type IContext = {
  user: User | null;
  isLogged: boolean;
  isOpen: boolean;
  openLogin: (data?: IOpenLogin) => Promise<void>;
  changeNumber: () => Promise<void>;
  logout: () => Promise<void>;
  setPin: (token: string) => Promise<void>;
  login: ({ whatsapp }: { whatsapp: string }) => Promise<void>;
};

const Context = createContext({ user: null } as IContext);
export const useAuth = () => useContext(Context);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const getSession = useCallback(async () => {
    const cookies = parseCookies();
    const token = cookies.auth;

    if (!token) return;
    const session = await fetch(`${environment.APIURL}/session`, {
      headers: {
        "x-auth-token": token,
      },
      credentials: 'include'
    }).then((res) => res.json());

    if (session.error) {
      //TODO: adicionar toast error
      alert(session.error);
      return;
    }
    setUser({
      id: session.id,
      whatsapp: session.whatsapp,
      isPremium: (session.plan === "premium")
    });
    setIsLogged(true);
  }, []);

  const logout = useCallback(async () => {
    destroyCookie(null, 'auth')
    setIsLogged(false);
    setUser(null);
  }, []);

  const openLogin = useCallback(
    async ({ status = true, reset = false } = {} as IOpenLogin) => {
      if (reset) {
        setUser(null);
        setIsLogged(false);
      }
      setOpen(status);
    },
    []
  );

  const login = async ({ whatsapp }: { whatsapp: string }) => {
    try {
      const response = await fetch(`${environment.APIURL}/sign-in`, {
        method: "POST",
        body: JSON.stringify({
          whatsapp,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (response.error) {
        //TODO: adicionar toast error
        alert(response.error);
        return;
      }

      setUser({
        id: response.id,
        whatsapp,
        isPremium: false
      });
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro, tente mais tarde");
    }
  };

  const setPin = async (token: string) => {
    try {
      if (!user?.id || !token) {
        // TODO: error toast
        return;
      }
      const response = await fetch(`${environment.APIURL}/authenticate`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          id: user.id,
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      if (response.error) {
        alert(response.error);
        return;
      }

      alert(response.message);
      setIsLogged(true)
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro, tente mais tarde");
    }
  };

  const changeNumber = async () => {
    setUser(null);
    setIsLogged(false);
  };

  useEffect(() => {
    getSession();
  }, [getSession]);

  return (
    <Context.Provider
      value={{
        user,
        logout,
        isLogged,
        openLogin,
        isOpen,
        login,
        setPin,
        changeNumber,
      }}
    >
      {children}
      <LoginForm />
      <PinForm />
    </Context.Provider>
  );
};
