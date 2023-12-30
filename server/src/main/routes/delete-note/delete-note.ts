import { Router } from "express";
import { expressAdapter } from "../../adapter/express-adapter";
import { makeDeleteNoteController } from "../../factories/delete-note";

export default (router: Router): void => {
  router.delete("/:id", expressAdapter(makeDeleteNoteController()));
}
