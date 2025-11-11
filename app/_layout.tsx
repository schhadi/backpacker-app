// app/_layout.tsx
import { Tabs } from "expo-router";
import { BackpackersProvider } from "../context/BackpackerContext";

export default function RootLayout() {
  return (
    <BackpackersProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
        }}
      >
        <Tabs.Screen name="map" options={{ title: "Map" }} />
        <Tabs.Screen name="backpackers" options={{ title: "Backpackers" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </BackpackersProvider>
  );
}
