import { ReactNode, useState } from "react";

import { Note } from "@/types";
import MyContext from "./MyContext";
import { AddBimestreNote } from "@/types/add-bimestre-note";

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [addBimestreNote, setAddBimestreNote] = useState<AddBimestreNote>([
    false,
    false,
    false,
    false
  ]);

  const states = {
    notes,
    setNotes,
    addBimestreNote,
    setAddBimestreNote
  }

  return (
    <main>
      <MyContext.Provider value={ states }>
        { children }
      </MyContext.Provider>
    </main>
  )
}