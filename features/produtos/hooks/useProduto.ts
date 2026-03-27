import api from "@/services/api";
import { Produto } from "@/types/produto";
import { useQuery } from "@tanstack/react-query";

export function useProduto(id: string) {
  return useQuery<Produto>({
    queryKey: ["produto", id],
    queryFn: async () => {
      const { data }: { data: Produto } = await api.get(`/produtos/${id}`);
      return data;
    },
    enabled: !!id, // Só dispara a busca se houver um ID
  });
}
