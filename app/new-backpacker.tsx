// app/new-backpacker.tsx
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useBackpackers } from "../context/BackpackerContext";

const COLORS = {
  bg: "#F9F7F2",
  text: "#6C5430",
  accent: "#B77A3F",
};

export default function NewBackpackerScreen() {
  const { addBackpacker } = useBackpackers();
  const params = useLocalSearchParams<{
    photoUri?: string;
    lat?: string;
    lng?: string;
  }>();

  const photoUri = params.photoUri ?? "";
  const lat = params.lat ? parseFloat(params.lat) : NaN;
  const lng = params.lng ? parseFloat(params.lng) : NaN;

  const [name, setName] = useState("");
  const [fromCountry, setFromCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const canSave =
    photoUri && !Number.isNaN(lat) && !Number.isNaN(lng) && name.trim();

  const handleSave = () => {
    if (!canSave) return;

    addBackpacker({
      photoUri,
      lat,
      lng,
      createdAt: Date.now(),
      name: name.trim(),
      fromCountry: fromCountry.trim() || "Unknown",
      phone: phone.trim() || undefined,
      note: note.trim() || undefined,
    });

    router.replace("/map");
  };

  const handleCancel = () => {
    router.replace("/map");
  };

  if (!photoUri || Number.isNaN(lat) || Number.isNaN(lng)) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>Something went wrong with this capture.</Text>
        <TouchableOpacity onPress={() => router.replace("/map")}>
          <Text style={styles.link}>Back to map</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.headerTitle}>New backpacker</Text>
          <Text style={styles.headerSubtitle}>
            Add some info so others can connect with them.
          </Text>

          <View style={styles.photoWrapper}>
            <Image source={{ uri: photoUri }} style={styles.photo} />
          </View>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Backpacker’s name"
            placeholderTextColor="#B0A597"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Where they’re from</Text>
          <TextInput
            style={styles.input}
            placeholder="Country / hometown"
            placeholderTextColor="#B0A597"
            value={fromCountry}
            onChangeText={setFromCountry}
          />

          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="WhatsApp / phone"
            placeholderTextColor="#B0A597"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Note</Text>
          <TextInput
            style={[styles.input, { height: 90, textAlignVertical: "top" }]}
            placeholder="Where you met, anything to remember"
            placeholderTextColor="#B0A597"
            value={note}
            onChangeText={setNote}
            multiline
          />

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.saveButton,
                !canSave && { opacity: 0.4 },
              ]}
              onPress={handleSave}
              disabled={!canSave}
            >
              <Text style={styles.saveText}>Save & pin</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  headerSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#9B8A70",
  },
  photoWrapper: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontSize: 13,
    color: "#8B7A60",
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(210,200,185,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    color: COLORS.text,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: "transparent",
  },
  saveButton: {
    backgroundColor: COLORS.accent,
  },
  cancelText: {
    color: "#9B8A70",
    fontWeight: "500",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
  center: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: COLORS.text,
    marginBottom: 8,
  },
  link: {
    color: "#4fd1c5",
    fontWeight: "600",
  },
});
