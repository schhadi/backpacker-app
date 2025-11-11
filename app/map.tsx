// app/map.tsx
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { BottomNav } from "../components/BottomNav";

const COLORS = {
  fabBg: "#B77A3F",
  fabText: "#FFFFFF",
};

export default function MapScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Full-screen map */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.6,
          longitudeDelta: 0.6,
        }}
      />

      {/* Floating + button (add place / story) */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* Custom bottom nav “island” */}
      <BottomNav active="map" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000", // just behind the map edges
  },
  fab: {
    position: "absolute",
    right: 30,
    bottom: 120, // sits above the nav island
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.fabBg,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 7,
  },
  fabText: {
    fontSize: 34,
    lineHeight: 34,
    color: COLORS.fabText,
  },
});
