import { Note } from "@/types";
import { ReactNode, useState } from "react";
import MyContext from "./MyContext";

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  const states = {
    notes,
    setNotes
  }

  return (
    <main>
      <MyContext.Provider value={states}>
        { children }
      </MyContext.Provider>
    </main>
  )
}