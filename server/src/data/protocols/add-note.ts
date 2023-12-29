import { Note, NoteBody } from "../../domain/models";

export interface AddNoteRepository {
  handle(body: NoteBody): Promise<Note>;
}
