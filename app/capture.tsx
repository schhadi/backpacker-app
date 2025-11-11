// app/capture.tsx
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function CaptureScreen() {
  const cameraRef = useRef<CameraView | null>(null);

  const [camPermission, requestCamPermission] = useCameraPermissions();
  const [locStatus, setLocStatus] = React.useState<"unknown" | "granted" | "denied">(
    "unknown"
  );

  useEffect(() => {
    (async () => {
      const loc = await Location.requestForegroundPermissionsAsync();
      setLocStatus(loc.status === "granted" ? "granted" : "denied");
    })();
  }, []);

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    if (!camPermission?.granted || locStatus !== "granted") return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    const location = await Location.getCurrentPositionAsync({});

    router.push({
      pathname: "/new-backpacker",
      params: {
        photoUri: photo.uri,
        lat: String(location.coords.latitude),
        lng: String(location.coords.longitude),
      },
    });
  };

  if (!camPermission || locStatus === "unknown") {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.text}>Requesting permissions…</Text>
      </SafeAreaView>
    );
  }

  if (!camPermission.granted || locStatus === "denied") {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.text}>
          Camera and location access are required to add a backpacker.
        </Text>

        {!camPermission.granted && (
          <TouchableOpacity style={styles.button} onPress={requestCamPermission}>
            <Text style={styles.buttonText}>Enable camera</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "transparent" }]}
          onPress={() => router.replace("/map")}
        >
          <Text style={[styles.buttonText, { color: "#4fd1c5" }]}>
            Back to map
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        facing="back"
      />

      <View style={styles.bottomControls}>
        <TouchableOpacity
          style={styles.shutterOuter}
          onPress={handleCapture}
          activeOpacity={0.8}
        >
          <View style={styles.shutterInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  bottomControls: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#ffffffaa",
    justifyContent: "center",
    alignItems: "center",
  },
  shutterInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",
  },
  center: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#B77A3F",
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
