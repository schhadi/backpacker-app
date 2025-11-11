// context/BackpackerContext.tsx
import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

export type Backpacker = {
  id: string;
  photoUri: string;
  lat: number;
  lng: number;
  createdAt: number;
  name: string;
  fromCountry: string;
  phone?: string;
  note?: string;
};

type ContextValue = {
  backpackers: Backpacker[];
  addBackpacker: (data: Omit<Backpacker, "id">) => void;
};

const BackpackersContext = createContext<ContextValue | undefined>(undefined);

export function BackpackersProvider({ children }: { children: ReactNode }) {
  const [backpackers, setBackpackers] = useState<Backpacker[]>([]);

  const addBackpacker = (data: Omit<Backpacker, "id">) => {
    const id = Date.now().toString();
    setBackpackers((prev) => [{ id, ...data }, ...prev]);
  };

  return (
    <BackpackersContext.Provider value={{ backpackers, addBackpacker }}>
      {children}
    </BackpackersContext.Provider>
  );
}

export function useBackpackers() {
  const ctx = useContext(BackpackersContext);
  if (!ctx) {
    throw new Error("useBackpackers must be used inside BackpackersProvider");
  }
  return ctx;
}
