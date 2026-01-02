import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { signIn, authenticate, getSession, logout } from "@/services/api";

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const response = await getSession();
      if (response.success && response.data?.isAuthenticated) {
        return { isAuthenticated: true };
      }
      return null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useSignIn() {
  return useMutation({
    mutationFn: async (phoneNumber: string) => {
      const response = await signIn(phoneNumber);
      if (!response.success) {
        throw new Error(response.error || "Erro ao enviar código");
      }
      return response.data;
    },
  });
}

export function useAuthenticate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ phoneNumber, otp }: { phoneNumber: string; otp: string }) => {
      const response = await authenticate(phoneNumber, otp);
      if (!response.success) {
        throw new Error(response.error || "Erro ao autenticar");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await logout();
      if (!response.success) {
        throw new Error(response.error || "Erro ao sair");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });
}

