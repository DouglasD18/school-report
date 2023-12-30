import { ListNotesAdapter } from "../../data/useCases/list-notes/list-notes";
import { ListNotesMongoRepository } from "../../infra/db/mongodb/repositories/list-notes/list-notes";
import { ListNotesController } from "../../presentation/controllers/list-note/list-note";

export const makeListNotesController = (): ListNotesController => {
  const repository = new ListNotesMongoRepository();
  const listNotes = new ListNotesAdapter(repository);
  return new ListNotesController(listNotes);
}
