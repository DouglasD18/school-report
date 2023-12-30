import { AddNoteAdapter } from "../../data/useCases/add-note/add-note";
import { BodyValidateAdapter } from "../../data/useCases/body-validate/body-validate";
import { AddNoteMongoRepository } from "../../infra/db/mongodb/repositories/add-note/add-note";
import { AddNoteController } from "../../presentation/controllers/add-note/add-note";

export const makeAddNoteController = (): AddNoteController => {
  const repository = new AddNoteMongoRepository();
  const addNote = new AddNoteAdapter(repository);
  const bodyValidate = new BodyValidateAdapter();
  return new AddNoteController(addNote, bodyValidate);
}
