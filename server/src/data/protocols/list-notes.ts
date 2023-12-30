import { Note } from "../../domain/models";

export interface ListNotesRepository {
  handle(): Promise<Note[]>
}
