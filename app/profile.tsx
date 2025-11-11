// app/profile.tsx
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { BottomNav } from "../components/BottomNav";

const COLORS = {
  bg: "#F9F7F2",
  text: "#6C5430",
};

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>
          Coming soon – stats, trips and more.
        </Text>
      </View>
      <BottomNav active="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: "#9B8A70",
    textAlign: "center",
  },
});
