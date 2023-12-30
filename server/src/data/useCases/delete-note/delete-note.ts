import { DeleteNote, DeleteNoteRepository, NotFoundError } from "./delete-note-protocols";

export class DeleteNoteAdapter implements DeleteNote {
  constructor(private repository: DeleteNoteRepository) {}

  async handle(id: string): Promise<void> {
    const isDeleted = await this.repository.handle(id);
    
    if (!isDeleted) {
      throw new NotFoundError();
    }
  }

}