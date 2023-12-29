import { Note, NoteBody } from "../models";

export interface AddNote {
  handle(body: NoteBody): Promise<Note>;
}
