import api from "@/services/api"; // Sua instância do Axios
import { Produto } from "@/types/produto";
import { useQuery } from "@tanstack/react-query";

export function useProdutos() {
  return useQuery<Produto[]>({
    queryKey: ["produtos"], // Chave do cache
    queryFn: async () => {
      const { data }: { data: Produto[] } = await api.get("/produtos");
      return data;
    },
    staleTime: 1000 * 60 * 5, // Tempo com cache válido: 5 minutos - só consulta a api depois que os dados ficam obsoletos (> 5 min)
  });
}
