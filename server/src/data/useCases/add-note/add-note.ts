import { AddNote, AddNoteRepository, NoteBody, Note } from "./add-note-protocols";

export class AddNoteAdapter implements AddNote {
  constructor(private repository: AddNoteRepository) {}

  async handle(body: NoteBody): Promise<Note> {
    return await this.repository.handle(body);
  }

}
