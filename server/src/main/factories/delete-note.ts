import { DeleteNoteAdapter } from "../../data/useCases/delete-note/delete-note";
import { DeleteNoteMongoRepository } from "../../infra/db/mongodb/repositories/delete-note/delete-note";
import { DeleteNoteController } from "../../presentation/controllers/delete-note/delete-note";

export const makeDeleteNoteController = (): DeleteNoteController => {
  const repository = new DeleteNoteMongoRepository();
  const deleteNote = new DeleteNoteAdapter(repository);
  return new DeleteNoteController(deleteNote);
}
