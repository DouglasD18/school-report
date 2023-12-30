import { ListNotes, ListNotesRepository, Note } from "./list-notes-protocols";

export class ListNotesAdapter implements ListNotes {
  constructor(private repository: ListNotesRepository) {}

  async handle(): Promise<Note[]> {
    return await this.repository.handle();
  }
  
}