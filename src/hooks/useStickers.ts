import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSticker, healthCheck } from "@/services/api";

export function useCreateSticker() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const response = await createSticker(file);
      if (!response.success) {
        throw new Error(response.error || "Erro ao criar figurinha");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stickers"] });
    },
  });
}

export function useHealthCheck() {
  return useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await healthCheck();
      if (!response.success) {
        throw new Error(response.error || "API offline");
      }
      return response.data;
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // 1 minute
  });
}
