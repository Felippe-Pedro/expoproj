import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, StyleSheet, TextInput } from "react-native";
import * as yup from "yup";
import TirarFoto from "../camera/tirar-foto";
import { useCreateProduto } from "./hooks/useCreateProduto";

// INSTALAR: npx expo install react-hook-form yup @hookform/resolvers

// 1. Definindo o esquema de validação
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

export default function ProdutoCreateScreen() {
  const {
    // Configurando o React Hook Form com o resolver do Yup
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    mutate,
    //isPending
  } = useCreateProduto();

  // Chamar função da API para inserir novo produto
  const onSubmit = (data: any) => {
    mutate({
      nome: data.nome,
      preco: parseFloat(data.preco.replace(",", ".")),
      fotoBase64: base64, // Enviar a foto em base64
    });
  };

  const [urifoto, setUrifoto] = useState("");
  const [base64, setBase64] = useState("");

  return (
    <ThemedView style={styles.container}>
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

      <TirarFoto setURI={setUrifoto} setBase64={setBase64} />
      {/* <ThemedText>URI da Foto: {urifoto}</ThemedText>
      <ThemedText>Base64 da Foto: {base64.substring(0, 20)}</ThemedText> */}

      <ThemedView style={{ marginTop: 20 }}>
        <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
});
