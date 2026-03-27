import api from "@/services/api";
import { Produto } from "@/types/produto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

export function useUpdateProduto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Produto }) => {
      const response = await api.put(`/produtos/${id}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Atualiza o cache da lista e do produto específico
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
      queryClient.invalidateQueries({ queryKey: ["produto", variables.id] });

      Alert.alert("Sucesso", "Produto atualizado!");
      router.back();
    },
  });
}
