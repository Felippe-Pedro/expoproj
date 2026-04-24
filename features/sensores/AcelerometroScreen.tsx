import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useAccelerometer } from "./hooks/useAccelerometer";

export default function AcelerometroScreen() {
  // Consumindo o hook com intervalo de 200ms
  const { data, methods } = useAccelerometer(200);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Acelerômetro</ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText style={styles.label}>
          Eixo X:{" "}
          <ThemedText style={styles.value}>{data.x.toFixed(2)}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.label}>
          Eixo Y:{" "}
          <ThemedText style={styles.value}>{data.y.toFixed(2)}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.label}>
          Eixo Z:{" "}
          <ThemedText style={styles.value}>{data.z.toFixed(2)}</ThemedText>
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity onPress={methods.subscribe} style={styles.button}>
          <ThemedText>Ativar</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={methods.unsubscribe}
          style={[styles.button, styles.stopButton]}
        >
          <ThemedText>Pausar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    width: "80%",
  },
  label: { fontSize: 18, marginVertical: 5 },
  value: { fontWeight: "bold", color: "#2196F3" },
  buttonContainer: { flexDirection: "row", marginTop: 30 },
  button: {
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  stopButton: { backgroundColor: "#f44336" },
});
