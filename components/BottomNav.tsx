// components/BottomNav.tsx
import { router } from "expo-router";
import React, { useRef } from "react";
import {
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TabKey = "map" | "backpackers" | "profile";

interface Props {
  active: TabKey;
}

const TAB_ORDER: TabKey[] = ["map", "backpackers", "profile"];

const COLORS = {
  islandBg: "rgba(248, 244, 238, 0.96)",
  islandBorder: "rgba(210, 200, 185, 0.8)",
  text: "#8A7A65",
  textActive: "#6C5430",
};

export function BottomNav({ active }: Props) {
  const go = (tab: TabKey) => {
    if (tab === active) return;
    router.replace(`/${tab}` as any);
  };

  // --- Swipe handling on nav bar ---
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState: PanResponderGestureState) =>
        Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 25,
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const { dx } = gestureState;
        const threshold = 30; // minimum horizontal distance to count as a swipe

        if (Math.abs(dx) < threshold) return;

        const currentIndex = TAB_ORDER.indexOf(active);
        if (currentIndex === -1) return;

        // swipe left -> next tab, swipe right -> previous tab
        const direction = dx < 0 ? 1 : -1;
        const nextIndex = currentIndex + direction;

        if (nextIndex < 0 || nextIndex >= TAB_ORDER.length) return;

        const nextTab = TAB_ORDER[nextIndex];
        go(nextTab);
      },
    })
  ).current;

  return (
    <View style={styles.wrapper} {...panResponder.panHandlers}>
      <View style={styles.island}>
        {/* MAP */}
        <TouchableOpacity
          style={[styles.item, active === "map" && styles.itemActive]}
          onPress={() => go("map")}
          activeOpacity={0.8}
        >
          <Text style={styles.icon}>📍</Text>
          <Text style={[styles.label, active === "map" && styles.labelActive]}>
            Map
          </Text>
        </TouchableOpacity>

        {/* BACKPACKERS */}
        <TouchableOpacity
          style={[styles.item, active === "backpackers" && styles.itemActive]}
          onPress={() => go("backpackers")}
          activeOpacity={0.8}
        >
          <Text style={styles.icon}>🎒</Text>
          <Text
            style={[
              styles.label,
              active === "backpackers" && styles.labelActive,
            ]}
          >
            Backpackers
          </Text>
        </TouchableOpacity>

        {/* PROFILE */}
        <TouchableOpacity
          style={[styles.item, active === "profile" && styles.itemActive]}
          onPress={() => go("profile")}
          activeOpacity={0.8}
        >
          <Text style={styles.icon}>🙂</Text>
          <Text
            style={[
              styles.label,
              active === "profile" && styles.labelActive,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 28,
    alignItems: "center",
  },
  island: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "78%",
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: COLORS.islandBg,
    borderRadius: 30,
    borderWidth: 0.8,
    borderColor: COLORS.islandBorder,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 6,
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
    borderRadius: 22,
  },
  itemActive: {
    backgroundColor: "rgba(0,0,0,0.03)",
  },
  icon: {
    fontSize: 18,
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    color: COLORS.text,
  },
  labelActive: {
    color: COLORS.textActive,
    fontWeight: "600",
  },
});
