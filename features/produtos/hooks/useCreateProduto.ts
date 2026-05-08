import api from "@/services/api";
import { Produto } from "@/types/produto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Alert } from "react-native";

export function useCreateProduto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduto: {
      nome: string;
      preco: number;
      fotoBase64: string;
    }) => {
      const { data }: { data: Produto } = await api.post(
        "/produtos",
        newProduto,
      );
      return data;
    },
    onSuccess: () => {
      // Invalida o cache para que novo produto aparece na lista
      queryClient.invalidateQueries({ queryKey: ["produtos"] });

      Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
      router.back(); // Volta para a lista
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Erro ao salvar produto";
      Alert.alert("Erro", message);
    },
  });
}
