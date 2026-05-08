// ATENÇÃO: NECESSÁRIO INSTALAR O EXPO CAMERA PARA FUNCIONAR ESTE COMPONENTE. O COMANDO É: npx expo install expo-camera

import {
  CameraCapturedPicture,
  CameraPictureOptions,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import React, { useRef } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// Importe o tipo correto para a referência do componente CameraView
type CameraViewRef = React.ComponentRef<typeof CameraView>;

interface ChildProps {
  setURI: (arquivo: string) => void;
  setBase64: (base64: string) => void;
}

const TirarFoto: React.FC<ChildProps> = ({ setURI, setBase64 }) => {
  const [permission, requestPermission] = useCameraPermissions();

  // Referência para o componente CameraView
  const cameraRef = useRef<CameraViewRef>(null);

  async function tirarFoto() {
    if (cameraRef.current) {
      try {
        const options: CameraPictureOptions = {
          quality: 0, // Qualidade da imagem - Compressão máxima
          base64: true, // Gerar foto convertida para string base64
        };

        // Chamada do método nativo de captura
        const photo: CameraCapturedPicture =
          await cameraRef.current.takePictureAsync(options);

        // Armazena o URI da foto
        setURI(photo.uri);
        // Armazena base64 da foto
        if (photo.base64) {
          setBase64(photo.base64);
        } else {
          setBase64("Não gerado");
        }

        // Mostra um alerta simples com o URI (para debug)
        Alert.alert("Foto Capturada!", photo.uri);
      } catch {
        Alert.alert("Erro", "Não foi possível tirar a foto.");
      }
    } else {
      Alert.alert("Erro", "Câmera não está pronta.");
    }
  }

  if (!permission) {
    // Carregando status da permissão
    return (
      <ThemedView style={styles.containerCenter}>
        <ActivityIndicator size="large" color="#007AFF" />
        <ThemedText style={styles.text}>Verificando permissões...</ThemedText>
      </ThemedView>
    );
  }

  if (!permission.granted) {
    // Permissão negada ou não solicitada
    return (
      <ThemedView style={styles.containerCenter}>
        <ThemedText style={styles.textPermissionDenied}>
          Acesso à câmera é necessário!
        </ThemedText>
        <Button
          onPress={requestPermission}
          title="Conceder Permissão"
          color="#FF9800"
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <ThemedView style={{ minHeight: "50%" }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back" // ou "front" para a câmera frontal
          ref={cameraRef}
        ></CameraView>
        <Button onPress={tirarFoto} title="Tirar Foto" color="#007AFF" />
      </ThemedView>
    </ThemedView>
  );
};

export default TirarFoto;

const styles = StyleSheet.create({
  containerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  text: { fontSize: 16, marginBottom: 10, textAlign: "center", color: "#333" },
  textPermissionDenied: {
    fontSize: 18,
    color: "red",
    marginBottom: 15,
    fontWeight: "bold",
  },
});
