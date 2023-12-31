import { Note } from '@/types';
import { createContext } from 'react';

export interface IContext {
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const MyContext = createContext<IContext | undefined>(undefined);

export default MyContext;
