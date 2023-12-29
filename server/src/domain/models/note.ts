import { NoteBody } from ".";

export interface Note extends NoteBody {
  id: string;
  criadoEm: Date;
  atualizadoEm: Date;
}
