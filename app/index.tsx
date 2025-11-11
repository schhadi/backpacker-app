// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  // When the app opens at "/", send user to /map
  return <Redirect href="/map" />;
}
