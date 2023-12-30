export interface DeleteNoteRepository {
  handle(id: string): Promise<boolean>;
}
