import { expressAdapter } from "../../adapter/express-adapter";
import { makeListNotesController } from "../../factories/list-notes";
import { Router } from "express";

export default (router: Router): void => {
  router.get("/", expressAdapter(makeListNotesController()));
}
