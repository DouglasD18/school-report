import { Note } from '@/types';
import { AddBimestreNote } from '@/types/add-bimestre-note';
import { createContext } from 'react';

export interface IContext {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  addBimestreNote: AddBimestreNote;
  setAddBimestreNote: React.Dispatch<React.SetStateAction<AddBimestreNote>>;
}

const MyContext = createContext<IContext | undefined>(undefined);

export default MyContext;
