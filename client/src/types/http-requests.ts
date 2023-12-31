import { Bimestre, Disciplina } from "./note";

export interface Body {
  bimestre: Bimestre;
  disciplina: Disciplina;
  nota: number;
}

export interface QueryParam {
  id: string;
}
