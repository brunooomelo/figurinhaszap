import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { environment } from '@/utils/environment';
import { parseCookies, setCookie, destroyCookie } from 'nookies';

export type User = {
  id: string;
  whatsapp: string;
  isAuthenticated: boolean;
};

type SessionResponse = {
  data?: User;
  error?: string;
};

type LoginResponse = {
  id: string;
  whatsapp: string;
  isAuthenticated: boolean;
  error?: string;
};

type ValidateResponse = {
  data: User;
  token: string;
  message: string;
  error?: string;
};

const AUTH_QUERY_KEY = ['auth', 'session'] as const;

async function fetchSession(): Promise<User | null> {
  const cookies = parseCookies();
  const token = cookies.phone_token;

  if (!token) return null;

  const response = await fetch(`${environment.APIURL}/session`, {
    headers: {
      'x-auth-token': token,
    },
  });

  const session: SessionResponse = await response.json();

  if (session.error) {
    throw new Error(session.error);
  }

  return session.data || null;
}

async function loginUser(whatsapp: string): Promise<User> {
  const response = await fetch(`${environment.APIURL}/login`, {
    method: 'POST',
    body: JSON.stringify({ whatsapp }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: LoginResponse = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return {
    id: data.id,
    whatsapp: data.whatsapp,
    isAuthenticated: data.isAuthenticated,
  };
}

async function validatePin(userId: string, token: string): Promise<{ user: User; token: string; message: string }> {
  const response = await fetch(`${environment.APIURL}/phone/validade`, {
    method: 'POST',
    body: JSON.stringify({
      id: userId,
      token,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: ValidateResponse = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return {
    user: data.data,
    token: data.token,
    message: data.message,
  };
}

export function useSession() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
    },
  });
}

export function useValidatePin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, token }: { userId: string; token: string }) =>
      validatePin(userId, token),
    onSuccess: ({ user, token }) => {
      setCookie(null, 'phone_token', token, {
        maxAge: 86400 * 7,
        path: '/',
      });
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      destroyCookie(null, 'phone_token');
    },
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
}
