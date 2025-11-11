// app/_layout.tsx
import { Tabs } from "expo-router";


export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none", // hide default bottom bar
        },
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
        }}
      />
      <Tabs.Screen
        name="backpackers"
        options={{
          title: "Backpackers",
        }}
      />
      <Tabs.Screen
        name="profile"          // 👈 changed from "you"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
  
}


