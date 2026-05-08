import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Image } from "expo-image";
import { useProdutos } from "./hooks/useProdutos";

export default function ProdutoListScreen() {
  // Listagem de produtos mockada - futuramente virá do backend via API
  //   const [listaProduto] = useState<Produto[]>([
  //     { id: "1", nome: "Produto 1", preco: 10.99 },
  //     { id: "2", nome: "Produto 2", preco: 20.99 },
  //     { id: "3", nome: "Produto 3", preco: 30.99 },
  //   ]);

  const router = useRouter(); // navegação entre telas usando expo-router

  const {
    data: listaProduto,
    isLoading,
    error,
    refetch,
    //isRefetching,
  } = useProdutos();

  // 1. Estado de Carregamento Inicial
  if (isLoading) {
    return (
      <ThemedView>
        <ActivityIndicator size="large" color="#007bff" />
        <ThemedText>Carregando produtos...</ThemedText>
      </ThemedView>
    );
  }

  // 2. Estado de Erro (Tratamento de 401 já foi feito no Interceptor do Axios)
  if (error) {
    return (
      <ThemedView>
        <ThemedText>Ocorreu um erro ao buscar os produtos.</ThemedText>
        <TouchableOpacity onPress={() => refetch()}>
          <ThemedText>Tentar Novamente</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  // 3. Estado Vazio (Caso a API retorne um array vazio [])
  if (!listaProduto || listaProduto.length === 0) {
    return (
      <ThemedView>
        <ThemedText>Nenhum produto cadastrado.</ThemedText>
      </ThemedView>
    );
  }

  //console.log(listaProduto);

  // 4. Renderização da Lista (Performance com FlatList)
  return (
    <ThemedView style={{ flex: 1, marginTop: 20, alignItems: "center" }}>
      <ThemedText>Lista de Produtos</ThemedText>
      <Pressable
        onPress={() => router.push("/produto/create")} // navegacão para tela de criação de produto
        style={styles.botaoNovo}
      >
        <ThemedText>Novo Produto</ThemedText>
      </Pressable>
      <FlatList // lista de produtos usando FlatList para melhor performance em listas longas
        // style={styles.lista}
        data={listaProduto}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.listaItems}>
            <ThemedText style={{ marginTop: 10, color: "#000" }}>
              {item.nome} - R$ {item.preco.toString().replace(",", ".")}
              {item.fotoBase64 && (
                <ThemedView>
                  <Image
                    source={{ uri: `data:image/jpg;base64,${item.fotoBase64}` }}
                    style={styles.image}
                  />
                </ThemedView>
              )}
            </ThemedText>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/produto/edit/[id]",
                  params: { id: item.id },
                })
              } // navegação para tela de edição de produto
              style={styles.botaoEditar}
            >
              <ThemedText>Editar</ThemedText>
            </Pressable>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/produto/delete/[id]",
                  params: { id: item.id },
                })
              } // navegação para tela de exclusão de produto
              style={styles.botaoEditar}
            >
              <ThemedText>Excluir</ThemedText>
            </Pressable>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  botaoEditar: {
    color: "white",
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: "#9999FF",
    padding: 0,
    borderRadius: 5,
    width: 60,
  },
  botaoNovo: {
    color: "white",
    marginTop: 20,
    backgroundColor: "#9999FF",
    padding: 1,
    borderRadius: 5,
    width: 120,
  },
  image: {
    // ESSENCIAL: Defina o tamanho da imagem!
    width: 150,
    height: 150,
    resizeMode: "cover", //'contain', // Ajusta como a imagem preenche o espaço
    borderWidth: 1,
    borderColor: "#ccc",
  },
  listaItems: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
