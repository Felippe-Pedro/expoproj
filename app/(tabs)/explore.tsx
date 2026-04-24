import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { Button, StyleSheet } from "react-native";


export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <Button
        title="Acelerômetro"
        onPress={() => router.push("/sensor/acelerometro")}
      />
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
});
