// app/backpackers.tsx
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { BottomNav } from "../components/BottomNav";
import { useBackpackers } from "../context/BackpackerContext";

const COLORS = {
  bg: "#F9F7F2",
  text: "#6C5430",
};

export default function BackpackersScreen() {
  const { backpackers } = useBackpackers();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Backpackers</Text>
        <Text style={styles.subtitle}>
          People you’ve added from the map camera
        </Text>
      </View>

      <View style={styles.listWrapper}>
        <FlatList
          data={backpackers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.photoUri }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardMeta}>{item.fromCountry}</Text>
                {item.phone && (
                  <Text style={styles.cardMetaSmall}>{item.phone}</Text>
                )}
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No backpackers yet. Add one from the map using the + button.
            </Text>
          }
          contentContainerStyle={{ paddingVertical: 8 }}
        />
      </View>

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
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  cardMeta: {
    fontSize: 13,
    color: "#A49A8D",
    marginTop: 2,
  },
  cardMetaSmall: {
    fontSize: 12,
    color: "#B0A597",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#A0A0A0",
  },
});
