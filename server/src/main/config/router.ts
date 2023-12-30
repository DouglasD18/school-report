import { Router, Express } from "express";

import addNoteRouter from "../routes/add-note/add-note";

export default (app: Express): void => {
  const router = Router();
  app.use("/api/note", router);
  addNoteRouter(router);
}
