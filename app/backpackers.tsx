import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BottomNav } from "../components/BottomNav";

const COLORS = {
  bg: "#F9F7F2",
  text: "#6C5430",
  accent: "#B77A3F",
};

export default function BackpackersScreen() {
  const [backpackers, setBackpackers] = useState<string[]>(["Backpacker #1"]);
  const [count, setCount] = useState(2);

  const addBackpacker = () => {
    setBackpackers((prev) => [...prev, `Backpacker #${count}`]);
    setCount((n) => n + 1);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Backpackers</Text>
        <Text style={styles.subtitle}>People you’ve met on the road</Text>
      </View>

      <View style={styles.listWrapper}>
        <FlatList
          data={backpackers}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardEmoji}>🙂</Text>
              <View>
                <Text style={styles.cardName}>{item}</Text>
                <Text style={styles.cardMeta}>Tap to view story</Text>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={
            <Text style={styles.empty}>No backpackers yet. Add your first one.</Text>
          }
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      </View>

      {/* Add person pill */}
      <TouchableOpacity style={styles.addButton} onPress={addBackpacker}>
        <Text style={styles.addText}>＋ Add Person</Text>
      </TouchableOpacity>

      <BottomNav active="backpackers" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#9B8A70",
  },
  listWrapper: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardEmoji: {
    fontSize: 26,
    marginRight: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  cardMeta: {
    fontSize: 12,
    color: "#A49A8D",
    marginTop: 2,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#A0A0A0",
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: COLORS.accent,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
