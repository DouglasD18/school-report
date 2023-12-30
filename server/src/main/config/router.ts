import { Router, Express } from "express";

import addNoteRouter from "../routes/add-note/add-note";
import listNotesRouter from "../routes/list-notes/list-notes";
import deleteNoteRouter from "../routes/delete-note/delete-note";

export default (app: Express): void => {
  const router = Router();
  app.use("/api/note", router);
  addNoteRouter(router);
  listNotesRouter(router);
  deleteNoteRouter(router);
}
