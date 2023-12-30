import { expressAdapter } from "../../adapter/express-adapter";
import { makeAddNoteController } from "../../factories/add-note";
import { Router } from "express";

export default (router: Router): void => {
  router.post("/", expressAdapter(makeAddNoteController()));
}
