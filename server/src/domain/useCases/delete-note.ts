export interface DeleteNote {
  handle(id: string): Promise<void>;
}