import { Note } from "../models";

export interface ListNotes {
  handle():Promise<Note[]>
}
