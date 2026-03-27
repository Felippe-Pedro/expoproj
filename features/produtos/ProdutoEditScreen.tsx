import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, TextInput } from "react-native";
import * as yup from "yup";
import { useProduto } from "./hooks/useProduto";
import { useUpdateProduto } from "./hooks/useUpdateProduto";

const schema = yup
  .object({
    nome: yup
      .string()
      .required("O nome é obrigatório")
      .matches(
        /^[A-Za-zÀ-ÿ\s]+$/,
        "O nome deve conter apenas letras e espaços",
      ),
    preco: yup
      .string()
      .transform((value) => value.replace(",", ".")) // Troca vírgula por ponto (formatos BR)
      .test(
        "is-number",
        "Preço inválido",
        (value) => !isNaN(parseFloat(value as string)),
      )
      .required("O preço é obrigatório"),
  })
  .required();

export default function ProdutoEditScreen({ id }: { id: string }) {
  const { data: produto, isLoading } = useProduto(id);
  const { mutate, isPending } = useUpdateProduto();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { nome: "", preco: "" },
    resolver: yupResolver(schema),
  });

  // EFEITO IMPORTANTE: Quando o produto carregar da API, preenche o formulário
  useEffect(() => {
    if (produto) {
      reset({
        nome: produto.nome,
        preco: produto.preco.toString(),
      });
    }
  }, [produto, reset]);

  // Chamar função da API para inserir novo produto
  const onSubmit = (data: any) => {
    mutate({
      id: id,
      data: {
        id: id,
        nome: data.nome,
        preco: parseFloat(data.preco.replace(",", ".")),
      },
    });
  };

  return (
    <ThemedView>
      {/* 2. Campo Nome */}
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <TextInput onChangeText={onChange} value={value} placeholder="Nome" />
        )}
      />
      {errors.nome && (
        <ThemedText style={{ color: "red" }}>{errors.nome.message}</ThemedText>
      )}

      {/* 3. Campo Preço */}
      <Controller
        control={control}
        name="preco"
        render={({ field: { onChange, value } }) => (
          <TextInput
            onChangeText={onChange}
            value={value ? value.toString() : ""}
            placeholder="Preço"
            keyboardType="numeric"
          />
        )}
      />
      {errors.preco && (
        <ThemedText style={{ color: "red" }}>{errors.preco.message}</ThemedText>
      )}

      <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  botaoVoltar: {
    color: "white",
    marginTop: 20,
    backgroundColor: "#9999FF",
    padding: 1,
    borderRadius: 5,
    width: 120,
  },
});
