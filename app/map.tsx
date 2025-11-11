// app/map.tsx
import { router } from "expo-router";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { BottomNav } from "../components/BottomNav";
import { useBackpackers } from "../context/BackpackerContext";

const COLORS = {
  fabBg: "#B77A3F",
  fabText: "#FFFFFF",
};

export default function MapScreen() {
  const { backpackers } = useBackpackers();

  const handleAddFromCamera = () => {
    router.push("/capture"); // new screen below
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 30, // wide view over Europe / MENA
          longitude: 10,
          latitudeDelta: 70,
          longitudeDelta: 70,
        }}
      >
        {backpackers.map((b) => (
          <Marker
            key={b.id}
            coordinate={{ latitude: b.lat, longitude: b.lng }}
          >
            <View style={styles.markerOuter}>
              <Image source={{ uri: b.photoUri }} style={styles.markerImage} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Floating + button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.9}
        onPress={handleAddFromCamera}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <BottomNav active="map" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  fab: {
    position: "absolute",
    right: 30,
    bottom: 120,
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
  markerOuter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.fabBg,
    overflow: "hidden",
    backgroundColor: "#F9F7F2",
    justifyContent: "center",
    alignItems: "center",
  },
  markerImage: {
    width: "100%",
    height: "100%",
  },
});
